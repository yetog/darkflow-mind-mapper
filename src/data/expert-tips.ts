// Expert Tips for ConvoFlow - 50 Expert Speaking Tips

export interface ExpertTip {
  id: string;
  expert: {
    name: string;
    title: string;
    twitter?: string;
    linkedin?: string;
  };
  tip: string;
  category: 'preparation' | 'delivery' | 'audience' | 'mindset' | 'structure' | 'virtual';
  keywords: string[];
}

export const EXPERT_TIPS: ExpertTip[] = [
  {
    id: 'tip-1',
    expert: {
      name: 'Vanessa Van Edwards',
      title: 'Lead Behavioral Investigator at Science of People',
      twitter: '@vaborres',
    },
    tip: 'Hit a sweet spot of warmth and competence. Often people come across as too warm and not competent, or too competent and not warm. When you\'re public speaking, balance the two.',
    category: 'delivery',
    keywords: ['warmth', 'competence', 'balance', 'presence'],
  },
  {
    id: 'tip-2',
    expert: {
      name: 'Dave Kerpen',
      title: 'Founder of Likeable Local and Apprentice',
      twitter: '@DaveKerpen',
    },
    tip: 'Practice makes perfect. Record yourself speaking and watch, even if it\'s painful. Also, practice at least 5x in front of smaller groups before presenting.',
    category: 'preparation',
    keywords: ['practice', 'recording', 'rehearsal'],
  },
  {
    id: 'tip-3',
    expert: {
      name: 'Pamela Slim',
      title: 'Author and Speaker',
      twitter: '@pamslim',
    },
    tip: 'The audience gives you a 30-60 second grace period when starting a speech. Use the time wisely to hook your audience immediately – but not nervously.',
    category: 'structure',
    keywords: ['opening', 'hook', 'beginning', 'attention'],
  },
  {
    id: 'tip-4',
    expert: {
      name: 'Shelly Sanchez Terrell',
      title: 'TEDx Speaker and Teacher Trainer',
      twitter: '@ShellTerrell',
    },
    tip: 'Don\'t tell the audience about your topic, show them. Add relevant stories, short video clips, polls, demonstrations, or pictures to make your speech vivid.',
    category: 'delivery',
    keywords: ['stories', 'visuals', 'demonstrations', 'engagement'],
  },
  {
    id: 'tip-5',
    expert: {
      name: 'Tamsen Webster',
      title: 'Founder and Chief Message Strategist at Find the Red Thread',
      twitter: '@tamsenwebster',
    },
    tip: 'The golden rule of speaking is: Be Interested, Not Interesting. If YOU are interested in your topic and your audience, they\'ll be interested in you.',
    category: 'mindset',
    keywords: ['interest', 'passion', 'audience focus'],
  },
  {
    id: 'tip-6',
    expert: {
      name: 'Sylvie di Giusto',
      title: 'Former CEO of Executive Image Consulting',
      twitter: '@SylviediGiusto',
    },
    tip: 'Your nonverbal communication conveys 80% of your message. Give your words the support they need and align your body language.',
    category: 'delivery',
    keywords: ['body language', 'nonverbal', 'gestures'],
  },
  {
    id: 'tip-7',
    expert: {
      name: 'Josh Steimle',
      title: 'Speaker and CEO at MWI',
      twitter: '@joshsteimle',
    },
    tip: 'Become a great speaker by reading, taking classes, and practicing. All speaking comes down to a transfer of feeling. Feel deeply and convey that feeling.',
    category: 'mindset',
    keywords: ['emotion', 'feeling', 'connection', 'learning'],
  },
  {
    id: 'tip-8',
    expert: {
      name: 'Steven Rosenbaum',
      title: 'CEO of NYC Media Lab',
      twitter: '@magnify',
    },
    tip: 'Simplicity and focus on the core message. Speak clearly, stay on message, and leave your audience with one or at most two key takeaways.',
    category: 'structure',
    keywords: ['simplicity', 'focus', 'core message', 'takeaways'],
  },
  {
    id: 'tip-9',
    expert: {
      name: 'Victor Antonio',
      title: 'Founder and CEO of the Sellinger Group',
      twitter: '@VictorAntonio',
    },
    tip: 'Have \'mental candy\' for everyone! Know the level of experience of your audience and include content that benefits all the levels.',
    category: 'audience',
    keywords: ['audience levels', 'inclusive content', 'engagement'],
  },
  {
    id: 'tip-10',
    expert: {
      name: 'Nir Eyal',
      title: 'Wall Street Journal Bestselling Author',
      twitter: '@nireyal',
    },
    tip: 'No matter what the message is: Don\'t be boring!',
    category: 'delivery',
    keywords: ['entertainment', 'engagement', 'energy'],
  },
  {
    id: 'tip-11',
    expert: {
      name: 'Nancy Duarte',
      title: 'Principal at Duarte',
      twitter: '@nancyduarte',
    },
    tip: 'For remote meetings, look at the camera. Scoot the image of the person you\'re talking to right in front of the camera to remember this. Show up with the right emotional energy and vocal variety.',
    category: 'virtual',
    keywords: ['remote', 'camera', 'eye contact', 'virtual'],
  },
  {
    id: 'tip-12',
    expert: {
      name: 'Theo Priestley',
      title: 'Principal at Theo Priestley',
      twitter: '@tprstly',
    },
    tip: 'There\'s a big difference between knowing the name of something and knowing something. A lot of people only get to Step 1.',
    category: 'preparation',
    keywords: ['knowledge', 'depth', 'expertise', 'understanding'],
  },
  {
    id: 'tip-13',
    expert: {
      name: 'Chris Croft',
      title: 'Founder of Chris Croft Training',
      twitter: '@chriscroft',
    },
    tip: 'Involve the audience – ask them questions as you go along. Have an agenda, and regularly signpost where you are on the agenda as you go through your talk.',
    category: 'audience',
    keywords: ['interaction', 'questions', 'signposting', 'agenda'],
  },
  {
    id: 'tip-14',
    expert: {
      name: 'John Basedow',
      title: 'TV Personality and Author',
      twitter: '@JohnBasedow',
    },
    tip: 'Think of your audience as your friends or fans, not your adversaries. They want you to do well, so they\'re entertained and informed. No one wants you to succeed more than they do.',
    category: 'mindset',
    keywords: ['audience', 'support', 'confidence', 'mindset'],
  },
  {
    id: 'tip-15',
    expert: {
      name: 'William Arruda',
      title: 'Co-Founder at CareerBlast and Reach',
      twitter: '@williamarruda',
    },
    tip: 'Don\'t repeat yourself. Most public speakers deliver repeat performances. Make each presentation unique and 100% audience-centric to truly captivate and make your mark.',
    category: 'audience',
    keywords: ['customization', 'uniqueness', 'audience-centric'],
  },
  {
    id: 'tip-16',
    expert: {
      name: 'Megan Cunningham',
      title: 'Founder and CEO of Magnet Media',
      twitter: '@megancunningham',
    },
    tip: 'Learn as much as you can about your audience before your presentation. For large conferences, learn from their \'greatest hits\'. For intimate gatherings, do a survey and request bios.',
    category: 'preparation',
    keywords: ['research', 'audience', 'customization', 'preparation'],
  },
  {
    id: 'tip-17',
    expert: {
      name: 'Daron K. Roberts, J.D.',
      title: 'Former NFL Coach and Lecturer at UT Austin',
      twitter: '@CoachDKR',
    },
    tip: 'Keep copious notes. I keep notes of the stories, points, and quotes that resonated with people. Create a \'greatest hits\' list so you have a core set that works for any speech.',
    category: 'preparation',
    keywords: ['notes', 'stories', 'quotes', 'preparation'],
  },
  {
    id: 'tip-18',
    expert: {
      name: 'Mike Robbins',
      title: 'Author and Principal at Mike-Robbins.com',
      twitter: '@mikedrobbins',
    },
    tip: 'Be yourself, focus on what you know about, connect with the audience on a personal level, share personal stories... be authentic and vulnerable.',
    category: 'mindset',
    keywords: ['authenticity', 'vulnerability', 'connection', 'personal stories'],
  },
  {
    id: 'tip-19',
    expert: {
      name: 'Marques Ogden',
      title: 'Former NFL Player and Best Selling Author',
      twitter: '@OgdenElite',
    },
    tip: 'Focus on the strength of your message and your desire to help others achieve success. As long as your heart is pure to help others succeed, you will always do and be your best!',
    category: 'mindset',
    keywords: ['service', 'helping others', 'purpose', 'heart'],
  },
  {
    id: 'tip-20',
    expert: {
      name: 'Barbara Bruno',
      title: 'Founder and CEO of Good as Gold Training',
      twitter: '@barbbruno',
    },
    tip: 'Conduct extensive research on your audience, so you sound like an insider who cared enough to learn about them and their industry before you addressed them.',
    category: 'preparation',
    keywords: ['research', 'audience', 'insider knowledge'],
  },
  {
    id: 'tip-21',
    expert: {
      name: 'Paul Salamanca',
      title: 'Vice President of Sales at SecurityScorecard',
      twitter: '@paulsalamanca',
    },
    tip: 'Have either pictures on a slide or words/bullet points that remind you of which stories to tell. Easy to remember stories so you\'ll never be left speechless.',
    category: 'preparation',
    keywords: ['slides', 'stories', 'memory aids', 'preparation'],
  },
  {
    id: 'tip-22',
    expert: {
      name: 'Marcus Sheridan',
      title: 'Founder of iMPACT and Marcus Sheridan International',
      twitter: '@TheSalesLion',
    },
    tip: 'The greatest speakers don\'t try to \'convince\' or \'persuade\' their audience. They put their audience in a position to convince and persuade themselves.',
    category: 'structure',
    keywords: ['persuasion', 'audience engagement', 'self-discovery'],
  },
  {
    id: 'tip-23',
    expert: {
      name: 'James Dodkins',
      title: 'Principal at James Dodkins',
      twitter: '@JDodkins',
    },
    tip: 'Find interesting and different ways to engage the audience and stand out. I use music and musical examples. Find the right balance between content and entertainment.',
    category: 'delivery',
    keywords: ['creativity', 'engagement', 'entertainment', 'uniqueness'],
  },
  {
    id: 'tip-24',
    expert: {
      name: 'Brant Cooper',
      title: 'CEO and Founder at Moves the Needle',
      twitter: '@brantcooper',
    },
    tip: 'Always have a go-to story. If you get stuck, you have a way out in your back pocket. It provides confidence, so in the end, you rarely get stuck!',
    category: 'preparation',
    keywords: ['backup', 'stories', 'confidence', 'safety net'],
  },
  {
    id: 'tip-25',
    expert: {
      name: 'Richard Foster-Fletcher',
      title: 'Founder of NeuralPath.io',
      twitter: '@RFosterFletcher',
    },
    tip: 'Your audience will only remember 20% of what you say. Your job is not to increase that percentage but to make sure they remember the right 20%. Repeat and reiterate your key points and pause.',
    category: 'structure',
    keywords: ['key points', 'repetition', 'pausing', 'memory'],
  },
  {
    id: 'tip-26',
    expert: {
      name: 'Sanjay Sehgal',
      title: 'Chairman and CEO of MSys Technologies',
      twitter: '@sanjaysehgal',
    },
    tip: 'Inspire others by doing things which inspire you.',
    category: 'mindset',
    keywords: ['inspiration', 'passion', 'authenticity'],
  },
  {
    id: 'tip-27',
    expert: {
      name: 'Nikki Greenberg',
      title: 'Founder of Women in PropTech',
      twitter: '@WomenInPropTech',
    },
    tip: 'You don\'t need to rehearse to be yourself.',
    category: 'mindset',
    keywords: ['authenticity', 'natural', 'confidence'],
  },
  {
    id: 'tip-28',
    expert: {
      name: 'Damon West',
      title: 'Professor at University of Houston Downtown',
      twitter: '@damonwest7',
    },
    tip: 'The three hardest words for people to say are \'I need help.\' Be on the lookout for someone you can help. This is what being a servant leader is all about.',
    category: 'mindset',
    keywords: ['service', 'leadership', 'helping others'],
  },
  {
    id: 'tip-29',
    expert: {
      name: 'Amas Tenumah',
      title: 'CEO & Founder of Better Experience Group',
      twitter: '@AmasTenumah',
    },
    tip: 'Help your audience throw rocks at their enemies! Illustration works every time.',
    category: 'audience',
    keywords: ['audience pain points', 'illustration', 'engagement'],
  },
  {
    id: 'tip-30',
    expert: {
      name: 'Tony Horton',
      title: 'CEO of Tony Horton Industries',
    },
    tip: 'Your greatest obstacles will be your greatest opportunity to grow.',
    category: 'mindset',
    keywords: ['growth', 'obstacles', 'challenges', 'resilience'],
  },
  {
    id: 'tip-31',
    expert: {
      name: 'Christopher Salem',
      title: 'Founder of CSR Group Holdings LLC',
      twitter: '@whealthteam',
    },
    tip: 'Have an image or statement that is compelling to them that relates in values.',
    category: 'structure',
    keywords: ['values', 'compelling content', 'connection'],
  },
  {
    id: 'tip-32',
    expert: {
      name: 'Doug Thompson',
      title: 'Host of Tech Story Podcasts',
      twitter: '@thedougthompson',
    },
    tip: 'Tell your audience a story. It\'s the most powerful tool a speaker has. The story is best if it\'s personal – one you know so well you can tell it in your sleep.',
    category: 'delivery',
    keywords: ['storytelling', 'personal stories', 'connection'],
  },
  {
    id: 'tip-33',
    expert: {
      name: 'Rebecca Brown',
      title: 'Founder of Think Wow',
    },
    tip: 'Always be you. Not only is being yourself \'good enough\' – it\'s the most powerful thing you can be. When you\'re authentic, your passion shines through naturally.',
    category: 'mindset',
    keywords: ['authenticity', 'passion', 'confidence'],
  },
  {
    id: 'tip-34',
    expert: {
      name: 'David Avrin',
      title: 'Principal at Visibility International',
      twitter: '@DavidAvrin',
    },
    tip: 'People overthink the presentation. The audience doesn\'t care as much as you think. Focus on being the same person you are off stage and simply teach them what you know.',
    category: 'mindset',
    keywords: ['authenticity', 'simplicity', 'teaching'],
  },
  {
    id: 'tip-35',
    expert: {
      name: 'Kerry Barrett',
      title: 'Founder of Kerry Barrett Consulting',
      twitter: '@TheReelKerryB',
    },
    tip: 'For virtual speeches, look into the lens of the webcam. Avoid looking at the monitor. Calibrate the way you speak to the differences in a virtual setting.',
    category: 'virtual',
    keywords: ['virtual', 'webcam', 'eye contact', 'remote'],
  },
  {
    id: 'tip-36',
    expert: {
      name: 'Akwasi Frimpong',
      title: 'Olympian and Philanthropist',
      twitter: '@FrimpongAkwasi',
    },
    tip: 'What you need for success is already in you. It\'s a matter of believing in yourself, having the will to work hard, and never giving up.',
    category: 'mindset',
    keywords: ['belief', 'hard work', 'perseverance', 'confidence'],
  },
  {
    id: 'tip-37',
    expert: {
      name: 'Stacey Boerhns',
      title: 'Customer Experience Consultant',
      twitter: '@staceyboehns',
    },
    tip: 'Look at people directly in the eye and be funny. Handouts make your speech memorable. Use visuals like PowerPoint or even props so people can relate.',
    category: 'delivery',
    keywords: ['eye contact', 'humor', 'visuals', 'handouts'],
  },
  {
    id: 'tip-38',
    expert: {
      name: 'Elizabeth Barry',
      title: 'Founder of Elizabeth Barry Consulting Agency',
      twitter: '@EBandAmarketing',
    },
    tip: 'Be kind and direct.',
    category: 'delivery',
    keywords: ['kindness', 'directness', 'clarity'],
  },
  {
    id: 'tip-39',
    expert: {
      name: 'Lindsay Boccardo',
      title: 'Founder of Lindsay Boccardo Training and Coaching',
      twitter: '@lindsayboccardo',
    },
    tip: 'Make sure your cup is full. Have a therapist, a coach, people who take care of you on your team. Then you can freely give without expectation to your audience.',
    category: 'mindset',
    keywords: ['self-care', 'support', 'giving', 'preparation'],
  },
  {
    id: 'tip-40',
    expert: {
      name: 'Mandy Hickson',
      title: 'Former RAF Fighter Pilot',
      twitter: '@MandyHickson',
    },
    tip: 'Be yourself. The audience can see if you are not authentic immediately.',
    category: 'mindset',
    keywords: ['authenticity', 'genuine', 'connection'],
  },
  {
    id: 'tip-41',
    expert: {
      name: 'Patrice Tanaka',
      title: 'Founder and Chief Joy Officer of Joyful Planet LLC',
      twitter: '@sambagal',
    },
    tip: 'Focus on putting your audience at ease, letting them know they don\'t have to worry about you. An audience will be on edge, hoping the speaker will be good.',
    category: 'audience',
    keywords: ['audience comfort', 'confidence', 'ease'],
  },
  {
    id: 'tip-42',
    expert: {
      name: 'Jeff Bonaldi',
      title: 'Founder and CEO of The Explorer\'s Passage',
      twitter: '@XplorersPassage',
    },
    tip: 'Know Your Audience! Before any speech, meeting, or interview, spend time researching and understanding your audience. The best speakers are those that know their audience!',
    category: 'preparation',
    keywords: ['audience research', 'preparation', 'understanding'],
  },
  {
    id: 'tip-43',
    expert: {
      name: 'Julienne Ryan',
      title: 'Principal at J.Ryan Partners',
      twitter: '@juliennryan',
    },
    tip: '1. Practice. 2. Test materials on friendly but objective resources. 3. Approach your audience with a positive attitude.',
    category: 'preparation',
    keywords: ['practice', 'testing', 'positive attitude'],
  },
  {
    id: 'tip-44',
    expert: {
      name: 'Kit Pang',
      title: 'Founder of BostonSpeaks',
      twitter: '@KitPangx',
    },
    tip: 'Here\'s a tip for great meetings: Show up. Be present. Most of the time we might be distracted or thinking about the future. How can you sit and pay attention to the people speaking?',
    category: 'mindset',
    keywords: ['presence', 'attention', 'focus', 'meetings'],
  },
  {
    id: 'tip-45',
    expert: {
      name: 'Gary Kayye',
      title: 'Founder of rAVe [PUBS]',
      twitter: '@gkayye',
    },
    tip: 'Being present in the moment – Meditation and Mindfulness.',
    category: 'mindset',
    keywords: ['mindfulness', 'meditation', 'presence'],
  },
  {
    id: 'tip-46',
    expert: {
      name: 'Alison Hadden',
      title: 'Founder of No Time to Waste',
    },
    tip: 'Stick to the rule of three for maximum impact. Introduce your three main points at the start, hit on each one, then summarize and repeat them at the end.',
    category: 'structure',
    keywords: ['rule of three', 'structure', 'key points', 'repetition'],
  },
  {
    id: 'tip-47',
    expert: {
      name: 'Jezra Kaye',
      title: 'Founder of Speak Up For Success',
      twitter: '@jezrakaye',
    },
    tip: 'Talk to the audience the exact same way you would talk to friends. Your attitude should be the same as it would be with anyone you really like.',
    category: 'delivery',
    keywords: ['conversational', 'friendly', 'natural', 'audience'],
  },
  {
    id: 'tip-48',
    expert: {
      name: 'Dutch Martin',
      title: 'Founder of SpeakOrBeSpokenTo',
      twitter: '@damartin1906',
    },
    tip: 'Don\'t just give a speech; tell a compelling story that resonates with your audience and forces them to LEAN IN, as opposed to SIT BACK.',
    category: 'delivery',
    keywords: ['storytelling', 'engagement', 'compelling', 'lean in'],
  },
  {
    id: 'tip-49',
    expert: {
      name: 'Stanley K. Ridgley',
      title: 'Associate Clinical Professor at LeBow College of Business',
      twitter: '@stanleyridgley',
    },
    tip: 'Treat online meetings seriously. Dress for the occasion. Don\'t think you can cut corners because it\'s virtual. Appear for virtual meetings just like face-to-face.',
    category: 'virtual',
    keywords: ['virtual', 'professionalism', 'remote', 'preparation'],
  },
  {
    id: 'tip-50',
    expert: {
      name: 'Robert Begley',
      title: 'Principal and Coach at Robert Begley',
    },
    tip: 'Leave your audience with a meaningful, memorable message.',
    category: 'structure',
    keywords: ['ending', 'memorable', 'message', 'takeaway'],
  },
];

export const getRandomTip = (): ExpertTip => {
  const randomIndex = Math.floor(Math.random() * EXPERT_TIPS.length);
  return EXPERT_TIPS[randomIndex];
};

export const getTipsByCategory = (category: ExpertTip['category']): ExpertTip[] => {
  return EXPERT_TIPS.filter(tip => tip.category === category);
};

export const searchTips = (query: string): ExpertTip[] => {
  const lowerQuery = query.toLowerCase();
  return EXPERT_TIPS.filter(tip => 
    tip.tip.toLowerCase().includes(lowerQuery) ||
    tip.keywords.some(k => k.toLowerCase().includes(lowerQuery)) ||
    tip.expert.name.toLowerCase().includes(lowerQuery)
  );
};

export const TIP_CATEGORIES: { id: ExpertTip['category']; label: string; icon: string }[] = [
  { id: 'preparation', label: 'Preparation', icon: '📝' },
  { id: 'delivery', label: 'Delivery', icon: '🎤' },
  { id: 'audience', label: 'Audience', icon: '👥' },
  { id: 'mindset', label: 'Mindset', icon: '🧠' },
  { id: 'structure', label: 'Structure', icon: '🏗️' },
  { id: 'virtual', label: 'Virtual', icon: '💻' },
];
