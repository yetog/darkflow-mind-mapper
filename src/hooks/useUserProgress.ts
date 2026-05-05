import { useState, useEffect, useCallback } from 'react';

export interface PracticeSession {
  id: string;
  date: string;
  duration: number; // seconds
  overallScore: number;
  wordCount: number;
  metrics: {
    pace: number;
    fillerWords: number;
    energy: number;
    confidence: number;
    pausing: number;
    conciseness: number;
  };
}

export interface UserProgress {
  totalPracticeTime: number; // minutes
  speechesAnalyzed: number;
  currentStreak: number;
  level: {
    current: number;
    title: string;
    xp: number;
    xpToNextLevel: number;
  };
  topSkillsToImprove: { name: string; score: number; iconName: string }[];
  sessions: PracticeSession[];
}

const STORAGE_KEY = 'convoflow-progress';

const LEVEL_THRESHOLDS = [
  { xp: 0, title: 'Beginner Speaker' },
  { xp: 100, title: 'Warming Up' },
  { xp: 250, title: 'Finding Your Voice' },
  { xp: 500, title: 'Confident Communicator' },
  { xp: 800, title: 'Skilled Presenter' },
  { xp: 1200, title: 'Storytelling Pro' },
  { xp: 1800, title: 'Master Orator' },
  { xp: 2500, title: 'Legendary Speaker' },
];

function calculateLevel(xp: number) {
  let level = 1;
  let title = LEVEL_THRESHOLDS[0].title;
  let xpToNextLevel = LEVEL_THRESHOLDS[1]?.xp || 100;

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].xp) {
      level = i + 1;
      title = LEVEL_THRESHOLDS[i].title;
      xpToNextLevel = LEVEL_THRESHOLDS[i + 1]?.xp || LEVEL_THRESHOLDS[i].xp + 500;
      break;
    }
  }

  return { current: level, title, xp, xpToNextLevel };
}

function calculateStreak(sessions: PracticeSession[]): number {
  if (sessions.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const uniqueDays = [...new Set(sessions.map(s => {
    const d = new Date(s.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }))].sort((a, b) => b - a);

  // Check if today or yesterday is in the list
  const todayTime = today.getTime();
  const yesterdayTime = todayTime - 86400000;

  if (uniqueDays[0] !== todayTime && uniqueDays[0] !== yesterdayTime) return 0;

  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    if (uniqueDays[i - 1] - uniqueDays[i] === 86400000) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function calculateTopSkills(sessions: PracticeSession[]): { name: string; score: number; iconName: string }[] {
  if (sessions.length === 0) {
    return [
      { name: 'Confidence', score: 0, iconName: 'Target' },
      { name: 'Pausing', score: 0, iconName: 'Clock' },
    ];
  }

  const recent = sessions.slice(-5);
  const avgMetrics = {
    Pace: { score: avg(recent.map(s => s.metrics.pace)), iconName: 'Gauge' },
    'Filler Words': { score: avg(recent.map(s => s.metrics.fillerWords)), iconName: 'VolumeX' },
    Energy: { score: avg(recent.map(s => s.metrics.energy)), iconName: 'Zap' },
    Confidence: { score: avg(recent.map(s => s.metrics.confidence)), iconName: 'Target' },
    Pausing: { score: avg(recent.map(s => s.metrics.pausing)), iconName: 'Clock' },
    Conciseness: { score: avg(recent.map(s => s.metrics.conciseness)), iconName: 'AlignLeft' },
  };

  return Object.entries(avgMetrics)
    .sort((a, b) => a[1].score - b[1].score)
    .slice(0, 2)
    .map(([name, { score, iconName }]) => ({ name, score: Math.round(score), iconName }));
}

function avg(nums: number[]): number {
  return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function loadSessions(): PracticeSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: PracticeSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function useUserProgress() {
  const [sessions, setSessions] = useState<PracticeSession[]>(loadSessions);

  // Recompute on session changes
  const totalPracticeTime = Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / 60);
  const speechesAnalyzed = sessions.length;
  const currentStreak = calculateStreak(sessions);
  const totalXp = sessions.reduce((sum, s) => sum + Math.round(s.overallScore / 10) * 5, 0);
  const level = calculateLevel(totalXp);
  const topSkillsToImprove = calculateTopSkills(sessions);

  const addSession = useCallback((session: Omit<PracticeSession, 'id' | 'date'>) => {
    const newSession: PracticeSession = {
      ...session,
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setSessions(prev => {
      const updated = [...prev, newSession];
      saveSessions(updated);
      return updated;
    });
  }, []);

  const progress: UserProgress = {
    totalPracticeTime,
    speechesAnalyzed,
    currentStreak,
    level,
    topSkillsToImprove,
    sessions,
  };

  return { progress, addSession };
}