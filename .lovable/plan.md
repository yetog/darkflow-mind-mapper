
# Fix Non-AI Functional Gaps

Skipping: AI Chat Builder, AI Coach, database persistence (those are AI/backend enhancements for later).

## 1. Lesson Viewer — Clicking a lesson opens nothing

**Problem**: `onStartLesson` is passed to `LessonsBrowser` but never connected in `ConvoFlowApp`. No lesson content view exists.

**Fix**: Create a `LessonPlayer` component that displays exercises step-by-step (instruction, tips, evaluation criteria). Wire it in `ConvoFlowApp` with a new `active-lesson` section state that receives the lesson ID.

- Exercise types: `breathing` shows the existing `BreathingExercise` component, `prompt`/`reading`/`timed-speech` show the instruction + a timer + a "Record" button linking to Practice Mode, `articulation` shows the text to read aloud.
- Navigation: Next/Previous exercise buttons, progress bar across exercises.

## 2. Dashboard Stats — Hardcoded mock data

**Problem**: `mockProgress` has static numbers (145 min, 23 speeches, etc.).

**Fix**: Create a `useUserProgress` hook that reads from localStorage:
- Track practice sessions (duration, date, scores) whenever PracticeMode completes an analysis
- Derive total practice time, speeches analyzed, streak, level/XP from stored sessions
- Dashboard reads from this hook instead of `mockProgress`

## 3. Export / Save / Share — Buttons exist, no implementation

**Problem**: Header has Save/Share/Export buttons but they're not wired in `ConvoFlowApp` (no callbacks passed).

**Fix**:
- **Save**: Persist current plan to localStorage (auto-save on changes + manual save with toast)
- **Export**: Download plan as JSON file (`plan.json`) and optionally a markdown outline
- **Share**: Copy a shareable text summary to clipboard (no backend needed)
- Wire these callbacks from `ConvoFlowApp` through to `Header`

## 4. Tactic "Apply to Plan" — Adds to root instead of merging

**Problem**: `handleApplyTacticToMindMap` in `ConvoFlowApp` does `[...prev.nodes, ...nodes]` which adds a second root node.

**Fix**: Merge tactic steps as children of the existing root node instead:
```
children: [...(existingRoot.children || []), ...tacticRootNode.children]
```

## 5. Conversation Type Insight — Z-index issue

**Problem**: The expanded tips panel uses `z-30` but the `main` content area can render on top.

**Fix**: Increase to `z-50` and ensure the header has `position: relative` with higher stacking context.

## 6. Practice Mode — Analysis is real but results aren't persisted

**Problem**: The speech analyzer actually works (not mocked!), analyzing transcript for pace, fillers, confidence, etc. But results disappear after leaving the page.

**Fix**: Store completed practice sessions in localStorage via the `useUserProgress` hook (same as item 2). This also feeds Dashboard stats.

## Files to Create
- `src/components/lessons/LessonPlayer.tsx` — Step-by-step exercise viewer
- `src/hooks/useUserProgress.ts` — localStorage-based progress tracking

## Files to Modify
- `src/components/ConvoFlowApp.tsx` — Wire lesson player, save/export/share, fix tactic merge
- `src/components/layout/Sidebar.tsx` — Add `active-lesson` section type
- `src/components/progress/ProgressDashboard.tsx` — Use `useUserProgress` hook
- `src/components/practice/PracticeMode.tsx` — Save completed sessions
- `src/components/layout/Header.tsx` — Z-index fix
- `src/components/common/ConversationTypeInsight.tsx` — Z-index fix
- `src/components/lessons/LessonsBrowser.tsx` — Wire `onStartLesson` properly
