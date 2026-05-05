import { StorytellerTactic } from '@/types/tactics';

export const STORYTELLER_TACTICS: StorytellerTactic[] = [
  // CONCEPT TACTICS
  {
    id: 'dragon-and-city',
    name: 'The Dragon & The City',
    category: 'concept',
    description: 'Turn your project goals into an epic story about a City (the status quo, safe but limited) and a Dragon (threatening but full of potential).',
    whenToUse: [
      'Starting a new project',
      'Explaining complex goals',
      'Getting people excited about change',
      'Framing strategic decisions',
    ],
    steps: [
      'Define your City: What is good and valuable in the status quo? What is wrong or wasteful?',
      'Define your Dragon: Where is the threat coming from? Is there opportunity here?',
      'Consider Escape: Where would you go? What should you take?',
      'Consider Defense: What is worth defending? How can you strengthen walls?',
      'Consider Attack: What\'s your best line of attack? What are the risks and rewards?',
    ],
    relatedTactics: ['three-great-conflicts', 'whats-it-about'],
    keywords: ['goals', 'vision', 'strategy', 'change', 'epic'],
    conversationTypes: ['meeting', 'presentation', 'lesson'],
  
    framework: {
      name: 'DRAGON',
      sections: [
        { label: 'Define the City', description: 'Map what is safe, valuable, and working in the current state' },
        { label: 'Reveal the Dragon', description: 'Identify the external threat or opportunity demanding change' },
        { label: 'Assess Options', description: 'Evaluate escape, defense, or attack strategies' },
        { label: 'Choose Your Path', description: 'Commit to a direction with clear risks and rewards' },
      ],
    },
    exampleStory: {
      title: 'The Legacy System Dragon',
      story: 'Our engineering team had built a reliable platform over five years — it worked, clients trusted it, and revenue was steady. But a new competitor launched with AI-powered features that made our product look outdated overnight. We had to decide: fortify our existing platform with incremental upgrades, or burn the boats and rebuild from scratch. We chose to attack — a six-month sprint to rebuild our core. It was the hardest thing we ever did, but we emerged with a product three years ahead of the competition.',
    },
    terminology: [
      { term: 'The City', definition: 'The status quo — comfortable but potentially stagnant or vulnerable' },
      { term: 'The Dragon', definition: 'An external force that threatens the City but also holds opportunity' },
      { term: 'Escape', definition: 'Abandoning the old to find something entirely new' },
      { term: 'Defense', definition: 'Strengthening what you have against the incoming threat' },
      { term: 'Attack', definition: 'Confronting the Dragon head-on to capture its treasure' },
    ],
  },
  {
    id: 'three-great-conflicts',
    name: 'Three Great Conflicts',
    category: 'concept',
    description: 'Show how your work helps people with life\'s great battles: Hero vs Nature, Hero vs Society, Hero vs Self.',
    whenToUse: [
      'Raising the stakes of your story',
      'Creating dramatic tension',
      'Connecting to universal themes',
    ],
    steps: [
      'Identify Hero Against Nature conflicts: fighting monsters, disease, weather, accidents',
      'Identify Hero Against Society conflicts: fighting over resources, goals, or values',
      'Identify Hero Against Self conflicts: struggling to do what we know is right',
      'Define the Dream version of your project',
      'Define the Nightmare version',
      'Find conflict points between Dream and Nightmare',
    ],
    relatedTactics: ['dragon-and-city', 'happy-ever-afters'],
    keywords: ['conflict', 'drama', 'stakes', 'hero', 'battle'],
    conversationTypes: ['presentation', 'panel', 'lesson'],
  
    framework: {
      name: 'THREE CONFLICTS',
      sections: [
        { label: 'Hero vs Nature', description: 'External forces: disease, environment, disasters, physical challenges' },
        { label: 'Hero vs Society', description: 'Fighting over resources, competing goals, clashing values' },
        { label: 'Hero vs Self', description: 'Internal struggle to do what is right despite personal cost' },
      ],
    },
    exampleStory: {
      title: 'The Product Launch Battle',
      story: 'We were launching a health app in three markets simultaneously. Nature fought us — a server outage during peak signup. Society fought us — regulators demanded last-minute compliance changes. But the hardest battle was with ourselves: do we cut corners to hit the deadline, or delay and do it right? We chose integrity. The launch slipped two weeks, but we earned trust that our competitors never could.',
    },
    terminology: [
      { term: 'Dream Version', definition: 'The ideal outcome if everything goes perfectly' },
      { term: 'Nightmare Version', definition: 'The worst-case scenario you are trying to avoid' },
      { term: 'Conflict Points', definition: 'Where the dream and nightmare intersect, creating tension and stakes' },
    ],
  },
  {
    id: 'order-and-chaos',
    name: 'Order & Chaos',
    category: 'concept',
    description: 'Show how your project can impose order on a chaotic mess – or disrupt a system that\'s too rigid.',
    whenToUse: [
      'Clarifying your mission',
      'Explaining innovation',
      'Positioning your work',
    ],
    steps: [
      'Describe the Known world: What\'s positive (utility, safety)? What\'s negative (boring, incomplete)?',
      'Describe the Unknown world: What\'s negative (threats)? What\'s positive (potential)?',
      'Show how Chaos disrupts Order',
      'Define your Hero response: imposing order or injecting new life?',
    ],
    relatedTactics: ['dragon-and-city', 'voyage-and-return'],
    keywords: ['change', 'disruption', 'innovation', 'balance'],
    conversationTypes: ['meeting', 'presentation', 'lesson'],
  
    framework: {
      name: 'ORDER-CHAOS',
      sections: [
        { label: 'Known World', description: 'The ordered, familiar system with its strengths and limitations' },
        { label: 'Unknown World', description: 'The chaotic, unfamiliar territory with threats and potential' },
        { label: 'Disruption', description: 'How chaos breaks into the ordered world' },
        { label: 'Hero Response', description: 'Imposing new order or harnessing chaos for positive change' },
      ],
    },
    exampleStory: {
      title: 'When Remote Work Changed Everything',
      story: 'For years our company ran like clockwork — everyone in the office by nine, meetings in conference rooms, watercooler creativity. Then the pandemic threw us into chaos. Schedules dissolved, communication broke down, and projects stalled. But in that chaos we discovered asynchronous collaboration, global talent, and a flexibility our best people had always wanted. We did not go back to the old order — we built a new one.',
    },
    terminology: [
      { term: 'Known World', definition: 'The structured, predictable environment that feels safe but may be limiting' },
      { term: 'Unknown World', definition: 'Uncharted territory full of both danger and untapped potential' },
    ],
  },
  {
    id: 'secrets-and-puzzles',
    name: 'Secrets & Puzzles',
    category: 'concept',
    description: 'Make your story stick by promising a secret waiting to be revealed or a puzzle waiting to be solved.',
    whenToUse: [
      'Getting audience attention',
      'Creating intrigue',
      'Opening a presentation',
    ],
    steps: [
      'Identify secrets: What new information did you discover? How was it kept secret?',
      'Identify puzzles: Find anomalies, ironies, or inconsistencies',
      'Use keywords: secret, confidential, insider, exclusive, hidden, revealed',
      'Create an information gap your audience wants to close',
    ],
    keywords: ['attention', 'mystery', 'intrigue', 'curiosity'],
    conversationTypes: ['presentation', 'lesson', 'panel'],
  
    framework: {
      name: 'REVEAL',
      sections: [
        { label: 'The Secret', description: 'New information that was hidden, exclusive, or overlooked' },
        { label: 'The Puzzle', description: 'An anomaly, irony, or inconsistency that demands explanation' },
        { label: 'The Gap', description: 'Create an information gap the audience needs to close' },
        { label: 'The Reveal', description: 'Deliver the answer in a way that creates an aha moment' },
      ],
    },
    exampleStory: {
      title: 'The Hidden Customer Insight',
      story: 'We spent months wondering why our best feature had the lowest adoption. The answer was hiding in plain sight: users loved it but could not find it. It was buried three clicks deep behind a settings menu. When we moved it to the home screen, adoption jumped 340% in two weeks. The secret was not what we built — it was where we put it.',
    },
    terminology: [
      { term: 'Information Gap', definition: 'The space between what the audience knows and what they want to know' },
      { term: 'Anomaly', definition: 'Something that does not fit the expected pattern, creating curiosity' },
    ],
  },
  {
    id: 'good-and-evil',
    name: 'Good & Evil',
    category: 'concept',
    description: 'Show which side you take in important moral battles.',
    whenToUse: [
      'Establishing values',
      'Building trust',
      'Taking a stand',
    ],
    steps: [
      'Identify the moral dimension of your work',
      'Show what you stand for and against',
      'Give examples of doing the right thing',
    ],
    keywords: ['values', 'morality', 'ethics', 'principles'],
    conversationTypes: ['presentation', 'panel', 'meeting'],
  
    framework: {
      name: 'MORAL STAND',
      sections: [
        { label: 'Identify the Moral Dimension', description: 'Find the ethical layer in your work or decision' },
        { label: 'Take Your Stand', description: 'Clearly show what you stand for and against' },
        { label: 'Prove It', description: 'Give examples where you did the right thing at a cost' },
      ],
    },
    exampleStory: {
      title: 'The Deal We Walked Away From',
      story: 'A Fortune 500 company offered us a contract that would have doubled our revenue overnight. The catch: they wanted us to build surveillance features into our product. We said no. We lost the deal and had to lay off two people. But our existing customers heard about it, and three of them expanded their contracts. Doing the right thing was expensive in the short term and invaluable in the long run.',
    },
    terminology: [
      { term: 'Moral Dimension', definition: 'The ethical aspect of a decision that goes beyond profit and pragmatism' },
    ],
  },

  // EXPLORE TACTICS
  {
    id: 'story-listening',
    name: 'Story Listening',
    category: 'explore',
    description: 'Reach out to people by listening to the wisdom contained in their stories.',
    whenToUse: [
      'User research',
      'Team building',
      'Understanding stakeholders',
      'Gathering insights',
    ],
    steps: [
      '1st listen: Is this a memorable story? Why does it stick?',
      '2nd listen: Create a basic timeline. What happened?',
      '3rd listen: Add key decisions. What were the options?',
      '4th listen: Identify the expertise. Where might a novice have failed?',
    ],
    relatedTactics: ['abstractions', 'emotional-dashboard'],
    keywords: ['research', 'empathy', 'listening', 'insights'],
    conversationTypes: ['meeting', 'gathering', 'lesson'],
  
    framework: {
      name: 'FOUR LISTENS',
      sections: [
        { label: 'First Listen', description: 'Is this memorable? Why does it stick with you?' },
        { label: 'Second Listen', description: 'Build a timeline — what actually happened?' },
        { label: 'Third Listen', description: 'Find key decisions — what were the options?' },
        { label: 'Fourth Listen', description: 'Identify expertise — where might a novice have failed?' },
      ],
    },
    exampleStory: {
      title: 'Listening to the Night Nurse',
      story: 'During hospital research, we kept interviewing doctors. Then we sat with a night-shift nurse. She told us about the workaround she invented — using colored tape on IV lines because the labels were too small to read in dim light. That one conversation redesigned our entire product labeling system. The wisdom was not at the top — it was at the bedside.',
    },
    terminology: [
      { term: 'Story Listening', definition: 'Active, layered listening that extracts wisdom from someone else\'s narrative' },
      { term: 'Key Decision Points', definition: 'Moments in a story where the outcome could have gone differently' },
    ],
  },
  {
    id: 'emotional-dashboard',
    name: 'Emotional Dashboard',
    category: 'explore',
    description: 'Find stories in the highs and lows of any project by mapping emotional moments.',
    whenToUse: [
      'Finding compelling stories',
      'Understanding journey moments',
      'Building empathy',
    ],
    steps: [
      'Map emotions: happiness, delight, excitement, sadness, fear, anger, trust, shame, pride',
      'For each strong emotion, write: "I felt... when I realized... because I wanted... and so I..."',
      'Apply the same exercise from your customer\'s point of view',
    ],
    relatedTactics: ['movie-time', 'abstractions'],
    keywords: ['emotions', 'feelings', 'journey', 'highs', 'lows'],
    conversationTypes: ['meeting', 'presentation', 'lesson'],
  
    framework: {
      name: 'EMOTION MAP',
      sections: [
        { label: 'Map Emotions', description: 'Chart the highs and lows across your project timeline' },
        { label: 'Write the Moment', description: 'I felt... when I realized... because I wanted... and so I...' },
        { label: 'Switch Perspectives', description: 'Repeat from your customer or user\'s point of view' },
      ],
    },
    exampleStory: {
      title: 'The Launch Day Rollercoaster',
      story: 'I felt elation when we hit 10,000 signups on day one, because we had worked for eighteen months toward this moment. Then I felt dread when I realized our onboarding flow was broken for mobile users — half our audience. I felt pride when my team fixed it in four hours without a single finger pointed. The dashboard of emotions told the real story of our launch, not the press release.',
    },
    terminology: [
      { term: 'Emotional Dashboard', definition: 'A visual map of emotional highs and lows across a journey or timeline' },
      { term: 'Perspective Shift', definition: 'Re-experiencing the same events from another stakeholder\'s emotional viewpoint' },
    ],
  },
  {
    id: 'data-detectives',
    name: 'Data Detectives',
    category: 'explore',
    description: 'Turn your research data into compelling stories using detective frameworks.',
    whenToUse: [
      'Presenting research findings',
      'Making data memorable',
      'Explaining insights',
    ],
    steps: [
      'Data Zoomer: Zoom out for big picture, zoom in for vivid example',
      'Data Detective: Frame as mystery - problem, evidence, vital clue, solution',
      'Data Skeptic: Acknowledge gaps, alternative conclusions, what can\'t be measured',
    ],
    relatedTactics: ['hero-and-guide', 'three-is-magic-number'],
    keywords: ['data', 'research', 'evidence', 'analysis'],
    conversationTypes: ['presentation', 'meeting', 'panel'],
  
    framework: {
      name: 'THREE LENSES',
      sections: [
        { label: 'Data Zoomer', description: 'Zoom out for the big picture, zoom in for the vivid example' },
        { label: 'Data Detective', description: 'Frame as mystery: problem, evidence, vital clue, solution' },
        { label: 'Data Skeptic', description: 'Acknowledge gaps, alternatives, and what cannot be measured' },
      ],
    },
    exampleStory: {
      title: 'The Missing Metric',
      story: 'Our dashboard showed customer satisfaction at 92%. Leadership was thrilled. But when I zoomed into one-star reviews, I found a pattern: enterprise clients were leaving quietly without complaining. The vital clue was in what we were not measuring — silence. We added a "no response" tracker and discovered 30% of our biggest accounts had gone dark. The mystery was not in the data we had, but in the data we were not collecting.',
    },
    terminology: [
      { term: 'Data Zoomer', definition: 'Technique of alternating between macro trends and micro human details' },
      { term: 'Vital Clue', definition: 'The single piece of evidence that reframes the entire finding' },
    ],
  },
  {
    id: 'thats-funny',
    name: 'That\'s Funny',
    category: 'explore',
    description: 'Find unexpected insights through moments of humor, contradiction, or anomaly.',
    whenToUse: [
      'Finding breakthrough insights',
      'Creating memorable moments',
      'Engaging audiences',
    ],
    steps: [
      'Look for Funny ha-ha: What made you or others laugh?',
      'Look for Funny peculiar: Contradictions, coincidences, anomalies',
      'Look for Acting funny: Someone acting out of character',
    ],
    relatedTactics: ['order-and-chaos', 'data-detectives'],
    keywords: ['insight', 'humor', 'anomaly', 'discovery'],
    conversationTypes: ['presentation', 'gathering', 'meeting'],
  
    framework: {
      name: 'THREE FUNNIES',
      sections: [
        { label: 'Funny Ha-Ha', description: 'What made you or others laugh? What is absurd about the situation?' },
        { label: 'Funny Peculiar', description: 'Contradictions, coincidences, and anomalies that do not add up' },
        { label: 'Acting Funny', description: 'Someone behaving out of character or against expectations' },
      ],
    },
    exampleStory: {
      title: 'The Accidental Feature',
      story: 'Our analytics showed users spending 40 minutes on a page that should take 2 minutes. Funny peculiar. We investigated and discovered a bug had accidentally turned our settings page into a color customization playground. Users were designing themes instead of configuring accounts. We shipped it as a feature the next quarter and it became our most-shared capability.',
    },
    terminology: [
      { term: 'Anomaly', definition: 'An observation that contradicts expectations and signals something worth investigating' },
    ],
  },
  {
    id: 'abstractions',
    name: 'Abstractions',
    category: 'explore',
    description: 'Understand users by observing multiple levels of behavior, from action to rationalization.',
    whenToUse: [
      'User research',
      'Deep understanding',
      'Finding hidden motivations',
    ],
    steps: [
      'Observe Action: What is your user doing?',
      'Look for Imitation: Who are they modeling?',
      'Identify Ritual/Play: What patterns are they following?',
      'Find the Narrative: What story do they tell?',
      'Note Rationalization: How do they explain it?',
    ],
    relatedTactics: ['story-listening', 'whats-my-motivation'],
    keywords: ['observation', 'behavior', 'research', 'understanding'],
    conversationTypes: ['meeting', 'lesson'],
  
    framework: {
      name: 'BEHAVIOR LAYERS',
      sections: [
        { label: 'Action', description: 'What is the user physically doing?' },
        { label: 'Imitation', description: 'Who or what are they modeling their behavior on?' },
        { label: 'Ritual', description: 'What patterns and routines do they follow?' },
        { label: 'Narrative', description: 'What story do they tell themselves about why?' },
        { label: 'Rationalization', description: 'How do they explain and justify it to others?' },
      ],
    },
    exampleStory: {
      title: 'The Sticky Note Mystery',
      story: 'We watched a project manager use our digital tool, then immediately copy everything onto physical sticky notes on her wall. Action: duplicating work. Imitation: she learned project management from a mentor who used whiteboards. Ritual: the morning wall scan with coffee. Narrative: I need to see the big picture. Rationalization: digital tools are for documentation, walls are for thinking. We redesigned our tool to feel like a wall.',
    },
    terminology: [
      { term: 'Abstraction Ladder', definition: 'Moving from concrete observable actions to abstract motivations and beliefs' },
    ],
  },
  {
    id: 'thoughtful-failures',
    name: 'Thoughtful Failures',
    category: 'explore',
    description: 'Turn painful failures into valuable lessons using the GAINS framework.',
    whenToUse: [
      'Learning from mistakes',
      'Team retrospectives',
      'Building resilience',
    ],
    steps: [
      'Document what went wrong without blame',
      'Apply GAINS: Goals, Assumptions, Insights, New Skills',
      'Ask "What could we do differently?"',
      'Share the story so others don\'t repeat the mistake',
    ],
    relatedTactics: ['epic-fail', 'drive-stories'],
    keywords: ['failure', 'learning', 'improvement', 'resilience'],
    conversationTypes: ['meeting', 'lesson', 'panel'],
  
    framework: {
      name: 'GAINS',
      sections: [
        { label: 'Goals', description: 'What were you trying to achieve when things went wrong?' },
        { label: 'Assumptions', description: 'What did you believe that turned out to be incorrect?' },
        { label: 'Insights', description: 'What did you learn that you would not have learned otherwise?' },
        { label: 'New Skills', description: 'What capabilities did you develop through the failure?' },
      ],
    },
    exampleStory: {
      title: 'The Failed Pivot',
      story: 'We pivoted our B2B product to B2C because the market seemed bigger. Goal: reach millions instead of hundreds. Assumption: consumers would pay for what enterprises valued. Insight: consumers wanted simplicity, not power. New skill: we learned to build onboarding flows in minutes instead of days. When we pivoted back to B2B, that speed became our competitive advantage. The failed pivot taught us more than any success.',
    },
    terminology: [
      { term: 'GAINS Framework', definition: 'A structured method for extracting value from failure: Goals, Assumptions, Insights, New Skills' },
      { term: 'Thoughtful Failure', definition: 'A failure analyzed without blame, focused on learning and improvement' },
    ],
  },
  {
    id: 'social-proof',
    name: 'Social Proof',
    category: 'explore',
    description: 'Establish credibility through trends, prototypes, and testimonials.',
    whenToUse: [
      'Building trust',
      'Selling ideas',
      'Reducing perceived risk',
    ],
    steps: [
      'Gather Trends: Data showing many people acting a certain way',
      'Share Prototypes: Tests and trials with real reactions',
      'Collect Testimonials: Ask for specific stories, not just ratings',
    ],
    relatedTactics: ['simple-sales-stories', 'innovation-curve'],
    keywords: ['trust', 'credibility', 'evidence', 'testimonials'],
    conversationTypes: ['presentation', 'meeting', 'panel'],
  
    framework: {
      name: 'PROOF STACK',
      sections: [
        { label: 'Trends', description: 'Data showing many people acting a certain way' },
        { label: 'Prototypes', description: 'Tests and trials with documented real reactions' },
        { label: 'Testimonials', description: 'Specific stories from real people, not just star ratings' },
      ],
    },
    exampleStory: {
      title: 'From Zero to Trusted',
      story: 'When we launched, nobody had heard of us. We ran a free pilot with twelve companies and documented every result. We turned those twelve stories into case studies with specific numbers. Then we asked three pilot clients to join sales calls. Within six months, prospects were asking us for references we did not even need to offer. Social proof compounds — the first twelve stories unlocked the next twelve hundred.',
    },
    terminology: [
      { term: 'Social Proof', definition: 'Evidence that others have made the same choice, reducing perceived risk' },
    ],
  },

  // CHARACTER TACTICS
  {
    id: 'trust-me-expert',
    name: 'Trust Me, I\'m An Expert',
    category: 'character',
    description: 'Win trust by showing your expertise through stories of values, lessons, and principles.',
    whenToUse: [
      'Establishing credibility',
      'Building trust with new audiences',
      'Positioning yourself as an authority',
    ],
    steps: [
      'Share what matters more than money to you',
      'Tell stories of hard lessons learned',
      'Show when you did the right thing even when costly',
      'Explain rules you\'ve followed, broken, or rewritten',
    ],
    relatedTactics: ['hero-and-guide', 'pitch-perfect'],
    keywords: ['expertise', 'trust', 'credibility', 'authority'],
    conversationTypes: ['presentation', 'meeting', 'panel'],
  
    framework: {
      name: 'TRUST BUILDER',
      sections: [
        { label: 'Values', description: 'Share what matters more to you than money or status' },
        { label: 'Hard Lessons', description: 'Tell stories of mistakes that shaped your expertise' },
        { label: 'Integrity', description: 'Show when you did the right thing at personal cost' },
        { label: 'Principles', description: 'Explain rules you follow, break, or have rewritten' },
      ],
    },
    exampleStory: {
      title: 'The Honest Consultant',
      story: 'A client asked me to recommend an expensive solution I knew they did not need. I told them the truth: a free open-source tool would solve their problem. I lost the project fee but gained something more valuable. They called me back six months later with a problem only I could solve — one worth ten times the original contract. Trust is the longest game in business.',
    },
    terminology: [
      { term: 'Expert Trust', definition: 'Credibility built not from credentials alone but from demonstrated integrity and experience' },
    ],
  },
  {
    id: 'hero-and-guide',
    name: 'Hero & Guide',
    category: 'character',
    description: 'Make your user the Hero and position yourself as their Expert Guide.',
    whenToUse: [
      'Customer-focused storytelling',
      'Positioning your role',
      'Service-oriented pitches',
    ],
    steps: [
      'Map your user\'s journey: Where are they? What\'s their problem? Where do they want to be?',
      'Choose your Guide archetype: Explorer, Rebel, Sage, Defender, Muse, or Warrior',
      'Define what special gift you offer them',
    ],
    relatedTactics: ['three-great-conflicts', 'rags-to-riches', 'no-easy-way'],
    keywords: ['hero', 'guide', 'journey', 'user-centered'],
    conversationTypes: ['presentation', 'meeting', 'lesson'],
  
    framework: {
      name: 'HERO-GUIDE',
      sections: [
        { label: 'Map the Journey', description: 'Where is the hero now? What is their problem? Where do they want to be?' },
        { label: 'Choose Your Archetype', description: 'Explorer, Rebel, Sage, Defender, Muse, or Warrior' },
        { label: 'Define Your Gift', description: 'What unique ability or insight do you offer the hero?' },
      ],
    },
    exampleStory: {
      title: 'The Sage and the Startup',
      story: 'Our client was a first-time founder drowning in advice from investors, mentors, and Twitter threads. They did not need another opinion — they needed a guide who could help them think clearly. We positioned ourselves as the Sage: we asked questions instead of giving answers, helped them see patterns in their own data, and gave them a framework to make decisions independently. Within a year they stopped needing us. That was the whole point.',
    },
    terminology: [
      { term: 'Hero', definition: 'Your user or audience — the protagonist of the story, not you' },
      { term: 'Guide', definition: 'Your role — the experienced mentor who helps the hero succeed' },
      { term: 'Archetype', definition: 'A universal character pattern that audiences instinctively understand and trust' },
    ],
  },
  {
    id: 'whats-my-motivation',
    name: 'What\'s My Motivation?',
    category: 'character',
    description: 'Understand key actors by applying Method Acting questions to stakeholders.',
    whenToUse: [
      'Stakeholder analysis',
      'Understanding motivations',
      'Predicting responses',
    ],
    steps: [
      'List key actors in your project',
      'For each, ask: Who am I? Where am I? What do I want? Why? How will I get it?',
      'Map cooperation and conflict between actors',
    ],
    relatedTactics: ['audience-profile', 'good-and-evil'],
    keywords: ['motivation', 'character', 'stakeholder', 'analysis'],
    conversationTypes: ['meeting', 'lesson'],
  
    framework: {
      name: 'METHOD ACTING',
      sections: [
        { label: 'Who Am I?', description: 'Define the stakeholder\'s identity and role' },
        { label: 'What Do I Want?', description: 'Identify their core desire and goal' },
        { label: 'Why Do I Want It?', description: 'Uncover the deeper motivation behind the goal' },
        { label: 'How Will I Get It?', description: 'Map their strategy and potential actions' },
      ],
    },
    exampleStory: {
      title: 'Understanding the Reluctant Sponsor',
      story: 'Our project sponsor kept delaying approvals. Instead of frustration, we asked the Method Acting questions. Who is she? A VP two years from retirement. What does she want? No career-ending mistakes. Why? She has seen three colleagues fired for failed projects. How will she get it? By slowing everything down until risk is minimal. Once we understood her motivation, we restructured our proposals around risk mitigation instead of innovation. Approvals started flowing.',
    },
    terminology: [
      { term: 'Method Acting Questions', definition: 'Five questions borrowed from acting to deeply understand any stakeholder\'s perspective' },
    ],
  },
  {
    id: 'drive-stories',
    name: 'Drive Stories',
    category: 'character',
    description: 'Motivate teams through stories of autonomy, mastery, and purpose.',
    whenToUse: [
      'Team motivation',
      'Culture building',
      'Leadership moments',
    ],
    steps: [
      'Explore Autonomy stories: Control over how you work',
      'Explore Mastery stories: Skills steadily improving',
      'Explore Purpose stories: Doing worthwhile work',
      'Share both positive and negative experiences',
    ],
    relatedTactics: ['five-ts', 'cut-to-the-chase'],
    keywords: ['motivation', 'team', 'leadership', 'culture'],
    conversationTypes: ['meeting', 'gathering', 'lesson'],
  
    framework: {
      name: 'AMP',
      sections: [
        { label: 'Autonomy', description: 'Stories about control over how, when, and where you work' },
        { label: 'Mastery', description: 'Stories about skills steadily improving through practice' },
        { label: 'Purpose', description: 'Stories about doing work that matters beyond profit' },
      ],
    },
    exampleStory: {
      title: 'The Engineer Who Needed Purpose',
      story: 'Our best engineer was about to quit. She had autonomy — flexible hours, choice of tools. She had mastery — the hardest problems landed on her desk. What was missing was purpose. She did not know who used her code or why it mattered. We arranged for her to visit a hospital using our software. She watched a nurse save twenty minutes per shift because of a feature she built. She never mentioned quitting again.',
    },
    terminology: [
      { term: 'Intrinsic Motivation', definition: 'Drive that comes from within — autonomy, mastery, and purpose — rather than external rewards' },
    ],
  },
  {
    id: 'circle-of-life',
    name: 'Circle of Life',
    category: 'character',
    description: 'Develop relatable stories based on universal life stages and archetypes.',
    whenToUse: [
      'Creating relatable characters',
      'Understanding life transitions',
      'Building empathy',
    ],
    steps: [
      'Identify life stages: Child, Teenager, Adult, Parent',
      'Map character traits for each stage',
      'Find Conflict between life stages',
      'Show Change and rites of passage',
    ],
    relatedTactics: ['no-easy-way', 'hero-and-guide'],
    keywords: ['archetypes', 'life stages', 'relatable', 'universal'],
    conversationTypes: ['presentation', 'lesson'],
  
    framework: {
      name: 'LIFE STAGES',
      sections: [
        { label: 'Child', description: 'Innocent, curious, dependent — learning the rules' },
        { label: 'Teenager', description: 'Rebellious, testing boundaries, seeking identity' },
        { label: 'Adult', description: 'Competent, responsible, building and maintaining' },
        { label: 'Parent', description: 'Nurturing, passing wisdom, thinking of legacy' },
      ],
    },
    exampleStory: {
      title: 'The Startup Life Cycle',
      story: 'Every company goes through life stages. As a Child, we followed every best practice and copied competitors. As a Teenager, we rebelled — throwing out the rulebook and doing things our way, some brilliantly, some disastrously. As an Adult, we found our balance: disciplined execution with creative freedom. Now, as a Parent company, we mentor startups in our accelerator, passing on lessons we wish someone had taught us.',
    },
    terminology: [
      { term: 'Rite of Passage', definition: 'A defining event that transitions a character from one life stage to the next' },
      { term: 'Archetype', definition: 'A universal character pattern that audiences instinctively recognize' },
    ],
  },
  {
    id: 'universal-stories',
    name: 'Universal Stories',
    category: 'character',
    description: 'Find common ground through shared human experiences.',
    whenToUse: [
      'Connecting with diverse audiences',
      'Building rapport',
      'Opening conversations',
    ],
    steps: [
      'Look for common ground and shared experiences',
      'Find universal themes everyone relates to',
      'Build bridges across differences',
    ],
    keywords: ['connection', 'common ground', 'universal', 'shared'],
    conversationTypes: ['gathering', 'presentation', 'panel'],
  
    framework: {
      name: 'COMMON GROUND',
      sections: [
        { label: 'Shared Experiences', description: 'Find moments everyone has lived through' },
        { label: 'Universal Themes', description: 'Connect to themes like belonging, struggle, and hope' },
        { label: 'Bridge Building', description: 'Use commonality to connect across differences' },
      ],
    },
    exampleStory: {
      title: 'The First Day Story',
      story: 'I open every all-hands by asking: remember your first day at any job? The nervousness, the awkward lunch, wondering if you made the right choice. Everyone nods. Then I say: someone in this room is having that first day right now. Suddenly one hundred people are looking around with warmth instead of indifference. Universal stories do not create agreement — they create empathy.',
    },
    terminology: [
      { term: 'Universal Theme', definition: 'A human experience so common that it transcends culture, industry, and background' },
    ],
  },

  // FUNCTION TACTICS
  {
    id: 'pitch-perfect',
    name: 'Pitch Perfect',
    category: 'function',
    description: 'Convince people to back your idea with structured elevator pitches.',
    whenToUse: [
      'Pitching ideas',
      'Seeking approval',
      'Quick summaries',
    ],
    steps: [
      'Very Basic Pitch: Problem, Solution, Why trust me',
      'POPP structure: Problem (negative), Opportunity (positive), Practical Steps (negative), Promise (positive)',
      'Use Show & Tell for visual presentations',
    ],
    relatedTactics: ['audience-profile', 'trust-me-expert', 'show-and-tell'],
    keywords: ['pitch', 'elevator', 'persuasion', 'summary'],
    conversationTypes: ['meeting', 'presentation'],
  
    framework: {
      name: 'POPP',
      sections: [
        { label: 'Problem', description: 'Start negative — what is broken, painful, or missing?' },
        { label: 'Opportunity', description: 'Flip to positive — what becomes possible if we solve this?' },
        { label: 'Practical Steps', description: 'Ground it — what specifically will we do?' },
        { label: 'Promise', description: 'End positive — what is the outcome we guarantee?' },
      ],
    },
    exampleStory: {
      title: 'The Elevator Pitch That Landed',
      story: 'Problem: Sales teams waste 40% of their time on leads that will never convert. Opportunity: What if they could focus only on prospects ready to buy? Practical steps: Our AI scores every lead in real time based on 200 behavioral signals. Promise: Our clients close 35% more deals with 50% less effort. That pitch, delivered in 30 seconds, secured our Series A.',
    },
    terminology: [
      { term: 'POPP', definition: 'Problem-Opportunity-Practical Steps-Promise — a balanced pitch structure alternating negative and positive' },
      { term: 'Elevator Pitch', definition: 'A compelling summary deliverable in the time of an elevator ride (30-60 seconds)' },
    ],
  },
  {
    id: 'simple-sales-stories',
    name: 'Simple Sales Stories',
    category: 'function',
    description: 'Win new customers by telling stories about existing satisfied customers.',
    whenToUse: [
      'Sales conversations',
      'Building trust',
      'Showing track record',
    ],
    steps: [
      '"Someone like you" stories: We solved their problem, we can solve yours',
      '"Someone you like" stories: People you admire trust us',
      'Old, Regular, and Tricky customer stories',
    ],
    relatedTactics: ['social-proof', 'audience-profile'],
    keywords: ['sales', 'customers', 'trust', 'testimonials'],
    conversationTypes: ['meeting', 'presentation'],
  
    framework: {
      name: 'SALES STORIES',
      sections: [
        { label: 'Someone Like You', description: 'We solved their problem — we can solve yours' },
        { label: 'Someone You Like', description: 'People you admire and respect already trust us' },
        { label: 'Customer Spectrum', description: 'Old, regular, and tricky customer examples showing range' },
      ],
    },
    exampleStory: {
      title: 'The Reluctant Reference',
      story: 'A prospect said: I like your demo but I have heard that before. So I said: let me tell you about a company your size, in your industry, with your exact problem. They were skeptical too. Six months later, they expanded to all departments. I can connect you with their CTO if you like. The prospect did not call the reference — just knowing we offered was enough.',
    },
    terminology: [
      { term: 'Mirror Story', definition: 'A customer story featuring someone similar to your prospect, reducing perceived risk' },
    ],
  },
  {
    id: 'storyish-conversations',
    name: 'Story-ish Conversations',
    category: 'function',
    description: 'Find insights buried in everyday conversations by making them more story-like.',
    whenToUse: [
      'Daily conversations',
      'Meetings going nowhere',
      'Extracting insights',
    ],
    steps: [
      'Find vivid moments: What might it look like in action?',
      'Get specific: Where were you? Who was there?',
      'Find emotion: What\'s the strongest feeling?',
      'Find conflict: Who did you need to win over?',
      'Find change: What forced you to change?',
    ],
    relatedTactics: ['story-listening', 'emotional-dashboard'],
    keywords: ['conversation', 'everyday', 'insights', 'natural'],
    conversationTypes: ['meeting', 'gathering'],
  
    framework: {
      name: 'STORY TRIGGERS',
      sections: [
        { label: 'Find the Moment', description: 'What might it look like in action? Get vivid.' },
        { label: 'Get Specific', description: 'Where were you? Who was there? What did you see?' },
        { label: 'Find Emotion', description: 'What was the strongest feeling in the room?' },
        { label: 'Find Change', description: 'What forced someone to act or think differently?' },
      ],
    },
    exampleStory: {
      title: 'The Meeting That Almost Ended',
      story: 'In a status meeting going nowhere, I asked: what was the hardest moment this week? Silence. Then a developer said: I almost deleted the production database on Tuesday. Everyone leaned in. She described the moment — hand on the keyboard, wrong terminal window, the split-second save. That one story revealed a systemic access-control problem we fixed that afternoon. The insight was hiding in a conversation that almost stayed boring.',
    },
    terminology: [
      { term: 'Story Trigger', definition: 'A specific question that pulls narrative detail out of flat conversation' },
    ],
  },
  {
    id: 'whats-it-about',
    name: 'What\'s It About?',
    category: 'function',
    description: 'Escape the curse of knowledge by explaining your work simply.',
    whenToUse: [
      'Elevator pitches',
      'Email summaries',
      'Profile descriptions',
    ],
    steps: [
      'Focus on Change: responding to threat or initiating opportunity',
      'Share New Information: something you realized or spotted',
      'Show Personal Benefit: who benefits and how',
    ],
    relatedTactics: ['dragon-and-city', 'story-hooks'],
    keywords: ['clarity', 'summary', 'simplicity', 'explanation'],
    conversationTypes: ['meeting', 'presentation', 'gathering'],
  
    framework: {
      name: 'THREE SIGNALS',
      sections: [
        { label: 'Change', description: 'Are you responding to a threat or initiating an opportunity?' },
        { label: 'New Information', description: 'What did you realize or discover that others have not?' },
        { label: 'Personal Benefit', description: 'Who benefits and exactly how does their life improve?' },
      ],
    },
    exampleStory: {
      title: 'Explaining AI to My Mother',
      story: 'My mother asked what my company does. I used to say: we build machine learning models for predictive analytics. Her eyes glazed over. Now I say: you know how Netflix knows what you want to watch? We do that for hospitals — we help them predict which patients need extra attention before something goes wrong. She not only understood, she told all her friends.',
    },
    terminology: [
      { term: 'Curse of Knowledge', definition: 'The inability to explain something simply because you know too much about it' },
    ],
  },
  {
    id: 'icebreaker-stories',
    name: 'Icebreaker Stories',
    category: 'function',
    description: 'Warm up your team\'s storytelling muscles with creative exercises.',
    whenToUse: [
      'Team workshops',
      'Starting meetings',
      'Building creativity',
    ],
    steps: [
      'Photo Story: Choose 3 images, arrange as Before/During/After',
      'Love and Hate: Create opposing stories about the same object',
      'Practice making stories visual, emotive, and dramatic',
    ],
    keywords: ['icebreaker', 'warm-up', 'creativity', 'team'],
    conversationTypes: ['meeting', 'lesson', 'gathering'],
  
    framework: {
      name: 'WARM-UP',
      sections: [
        { label: 'Photo Story', description: 'Choose three images and arrange as Before, During, After' },
        { label: 'Love and Hate', description: 'Create opposing emotional stories about the same object' },
        { label: 'Make It Dramatic', description: 'Practice making stories visual, emotive, and dramatic' },
      ],
    },
    exampleStory: {
      title: 'The Paperclip Exercise',
      story: 'I gave each team member a paperclip and said: tell me a two-minute story where this object saves the day. One person told a story about picking a lock during a fire drill. Another described a paperclip holding together the contract that saved a company. By the end, everyone was laughing and competing to tell the most creative story. The meeting that followed was the most productive we had all quarter.',
    },
    terminology: [
      { term: 'Icebreaker', definition: 'A short creative exercise that warms up storytelling muscles before serious work' },
    ],
  },
  {
    id: 'cut-to-the-chase',
    name: 'Cut To The Chase',
    category: 'function',
    description: 'Emergency escape plan when you\'re losing your audience.',
    whenToUse: [
      'Losing audience attention',
      'Story going badly',
      'Need to refocus',
    ],
    steps: [
      'Cut to Action: "So, basically, what happened was..."',
      'Cut to Emotion: "I was amazed... shocked... relieved..."',
      'Cut to Meaning: "That\'s when I realized..."',
      'Or stop talking and ask a question',
    ],
    relatedTactics: ['five-ts', 'emotional-dashboard'],
    keywords: ['attention', 'recovery', 'focus', 'escape'],
    conversationTypes: ['presentation', 'meeting', 'panel'],
  
    framework: {
      name: 'ESCAPE ROUTES',
      sections: [
        { label: 'Cut to Action', description: 'So, basically, what happened was...' },
        { label: 'Cut to Emotion', description: 'I was amazed, shocked, relieved...' },
        { label: 'Cut to Meaning', description: 'That is when I realized...' },
        { label: 'Ask a Question', description: 'Stop talking and hand the floor to your audience' },
      ],
    },
    exampleStory: {
      title: 'Saving a Dying Presentation',
      story: 'Five minutes into my keynote, I saw phones coming out. I was losing them. I dropped my next three slides and said: Let me tell you what actually happened when we tried this. I cut straight to the moment our server crashed on demo day and the CEO was in the room. Phones went down. Eyes came up. Sometimes the best thing you can do is skip the buildup and go straight to the explosion.',
    },
    terminology: [
      { term: 'Escape Plan', definition: 'A pre-planned pivot strategy for when your current approach is not landing' },
    ],
  },

  // STRUCTURE TACTICS
  {
    id: 'man-in-a-hole',
    name: 'Man In A Hole',
    category: 'structure',
    description: 'Classic story arc: comfort zone, trigger, crisis, recovery, better place.',
    whenToUse: [
      'Showing lessons learned',
      'Transformation stories',
      'Before/after narratives',
    ],
    steps: [
      'Comfort Zone: Not bad, but something is missing',
      'Trigger: Something knocks you down',
      'Crisis: In the hole, but finding treasure in the dark',
      'Recovery: Using what you learned to climb back',
      'Better Place: Older, wiser, stronger',
    ],
    relatedTactics: ['simple-sales-stories', 'rags-to-riches'],
    keywords: ['arc', 'transformation', 'journey', 'recovery'],
    conversationTypes: ['presentation', 'meeting', 'lesson'],
  
    framework: {
      name: 'FALL & RISE',
      sections: [
        { label: 'Comfort Zone', description: 'Not bad, but something is missing or vulnerable' },
        { label: 'The Trigger', description: 'An event that knocks you down into the hole' },
        { label: 'The Hole', description: 'Crisis and struggle, but finding unexpected treasure in the dark' },
        { label: 'The Climb', description: 'Using what you learned to pull yourself back up' },
        { label: 'Better Place', description: 'Arriving somewhere stronger than where you started' },
      ],
    },
    exampleStory: {
      title: 'The Team That Fell Apart',
      story: 'Our startup was thriving — three features shipped in Q1, morale was high. Then we lost our lead engineer and two critical bugs crashed production the same week. For two months, we worked weekends, argued constantly, and questioned everything. But in that hole, we rebuilt our deployment pipeline from scratch and cross-trained every team member. When we climbed out, we were twice as resilient. The hole gave us something comfort never could.',
    },
    terminology: [
      { term: 'The Hole', definition: 'The lowest point in the story where the protagonist faces their greatest challenge' },
      { term: 'Comfort Zone', definition: 'The stable starting state that feels safe but often masks vulnerability' },
      { term: 'Trigger', definition: 'The disruptive event that shatters the status quo and starts the fall' },
    ],
  },
  {
    id: 'rags-to-riches',
    name: 'Rags To Riches',
    category: 'structure',
    description: 'Optimistic story arc from hidden value to deserved recognition.',
    whenToUse: [
      'Success stories',
      'Underdog narratives',
      'Transformation tales',
    ],
    steps: [
      'Hidden Value: Hero in a bad place, but something valuable within',
      'Trigger: Something makes the hero want to change',
      'Struggle: Hero gets outside help but ultimately on their own',
      'Deserved Recognition: Talent is recognized',
    ],
    relatedTactics: ['man-in-a-hole', 'hero-and-guide'],
    keywords: ['success', 'transformation', 'recognition', 'growth'],
    conversationTypes: ['presentation', 'lesson'],
  
    framework: {
      name: 'HIDDEN VALUE',
      sections: [
        { label: 'Hidden Value', description: 'Hero in a bad place, but something valuable lies within' },
        { label: 'The Trigger', description: 'Something makes the hero want or need to change' },
        { label: 'The Struggle', description: 'Outside help comes but the hero must ultimately do it alone' },
        { label: 'Recognition', description: 'Talent and worth are finally seen and rewarded' },
      ],
    },
    exampleStory: {
      title: 'The Intern Who Saved the Product',
      story: 'She joined as a summer intern, assigned to documentation — the task nobody wanted. But she noticed the docs were organized by engineering logic, not user needs. She quietly rewrote the entire help system from the user\'s perspective. Support tickets dropped 60% in three months. By September, she was leading the UX team. The value was always there — it just needed the right environment to emerge.',
    },
    terminology: [
      { term: 'Hidden Value', definition: 'Unrecognized talent or potential that exists before the story begins' },
      { term: 'Deserved Recognition', definition: 'The moment when hidden worth becomes visible to others through demonstrated results' },
    ],
  },
  {
    id: 'no-easy-way',
    name: 'No Easy Way',
    category: 'structure',
    description: 'Show the realistic challenges of the journey ahead.',
    whenToUse: [
      'Setting realistic expectations',
      'Building credibility',
      'Motivating through honesty',
    ],
    steps: [
      'Define the destination',
      'Outline the challenges honestly',
      'Show why it\'s worth the difficulty',
      'Demonstrate your capability to guide through it',
    ],
    relatedTactics: ['hero-and-guide', 'circle-of-life'],
    keywords: ['challenge', 'realistic', 'honest', 'journey'],
    conversationTypes: ['meeting', 'presentation', 'lesson'],
  
    framework: {
      name: 'HONEST PATH',
      sections: [
        { label: 'The Destination', description: 'Define clearly where you are heading and why it matters' },
        { label: 'The Challenges', description: 'Outline honestly what obstacles stand in the way' },
        { label: 'The Worth', description: 'Show why the difficulty is justified by the outcome' },
        { label: 'The Capability', description: 'Demonstrate why you can guide through this journey' },
      ],
    },
    exampleStory: {
      title: 'The Honest Roadmap',
      story: 'Instead of promising our board a smooth path to profitability, I showed them the real road: eighteen months of investment, a complete platform rewrite, and the risk of losing two enterprise clients during migration. Then I showed them what waited on the other side: a product that could scale to ten thousand customers instead of fifty. They funded us not because the path was easy, but because we were honest about how hard it would be.',
    },
    terminology: [
      { term: 'Honest Path', definition: 'A narrative approach that builds trust through transparency about challenges rather than false optimism' },
    ],
  },
  {
    id: 'five-ts',
    name: 'Five Ts',
    category: 'structure',
    description: 'Quick story structure: Timeline, Turning Points, Tensions, Temptations, Teachable Moments.',
    whenToUse: [
      'Quick storytelling',
      'On-the-spot stories',
      'Structuring any narrative',
    ],
    steps: [
      'Timeline: Beginning, Middle, End ("At first... Then... Now...")',
      'Turning Points: Key moments of realization or change',
      'Tensions: Anxious moments and conflict',
      'Temptations: Easy way out vs. right thing',
      'Teachable Moments: The moral of the story',
    ],
    relatedTactics: ['cut-to-the-chase', 'story-listening'],
    keywords: ['structure', 'quick', 'framework', 'beats'],
    conversationTypes: ['presentation', 'meeting', 'lesson', 'panel'],
  
    framework: {
      name: 'FIVE Ts',
      sections: [
        { label: 'Timeline', description: 'Beginning, Middle, End — At first... Then... Now...' },
        { label: 'Turning Points', description: 'Key moments of realization or irreversible change' },
        { label: 'Tensions', description: 'Anxious moments, conflict, and uncertainty' },
        { label: 'Temptations', description: 'The easy way out versus the right thing to do' },
        { label: 'Teachable Moments', description: 'The lesson — the moral of the story' },
      ],
    },
    exampleStory: {
      title: 'Five Ts of a Product Decision',
      story: 'Timeline: At first we built for developers. Then enterprises came knocking. Now we serve both. Turning point: a Fortune 100 asked us to add compliance features. Tension: our developer community hated enterprise bloat. Temptation: fork the product and serve both separately. Teachable moment: you can serve two audiences with one product if you make complexity optional, not mandatory.',
    },
    terminology: [
      { term: 'Turning Point', definition: 'A moment in the story where the direction permanently changes' },
      { term: 'Teachable Moment', definition: 'The insight or lesson that makes the story worth telling' },
    ],
  },
  {
    id: 'voyage-and-return',
    name: 'Voyage & Return',
    category: 'structure',
    description: 'Story of leaving home, adventure in a strange world, and returning changed.',
    whenToUse: [
      'Innovation journeys',
      'Change stories',
      'Adventure narratives',
    ],
    steps: [
      'Home: Safe but dull. Why is the hero anxious for adventure?',
      'Voyage: Into the strange new world. What are the dangers and opportunities?',
      'Return: How has the hero changed? How will they make home better?',
    ],
    relatedTactics: ['order-and-chaos', 'happy-ever-afters'],
    keywords: ['journey', 'adventure', 'change', 'return'],
    conversationTypes: ['presentation', 'lesson'],
  
    framework: {
      name: 'JOURNEY HOME',
      sections: [
        { label: 'Home', description: 'Safe but dull — why is the hero anxious for adventure?' },
        { label: 'The Voyage', description: 'Into the strange new world with dangers and opportunities' },
        { label: 'The Return', description: 'Coming back changed, making home better with new wisdom' },
      ],
    },
    exampleStory: {
      title: 'The Sabbatical That Changed Everything',
      story: 'After eight years at the same company, I took a three-month sabbatical to work with a nonprofit in Southeast Asia. Everything was different — no Slack, no sprints, decisions made over tea. I learned patience, simplicity, and that most meetings are unnecessary. When I returned, I cut our meeting load by 70% and introduced deep-work blocks. I brought the best of both worlds home.',
    },
    terminology: [
      { term: 'The Voyage', definition: 'A journey into unfamiliar territory that challenges assumptions and builds new perspective' },
      { term: 'The Return', definition: 'Coming home transformed, able to improve the familiar world with foreign wisdom' },
    ],
  },
  {
    id: 'happy-ever-afters',
    name: 'Happy Ever Afters',
    category: 'structure',
    description: 'Craft satisfying story endings: growing up, finding home, or doing the right thing.',
    whenToUse: [
      'Crafting endings',
      'Showing transformation',
      'Resolving stories',
    ],
    steps: [
      'Growing Up: How has your hero grown older and wiser?',
      'Finding Home: How do they find their place in the world?',
      'Doing the Right Thing: What bad thing did they face and resolve?',
    ],
    relatedTactics: ['three-great-conflicts', 'five-ts', 'circle-of-life'],
    keywords: ['ending', 'resolution', 'satisfaction', 'transformation'],
    conversationTypes: ['presentation', 'lesson'],
  
    framework: {
      name: 'THREE ENDINGS',
      sections: [
        { label: 'Growing Up', description: 'The hero becomes older, wiser, and more capable' },
        { label: 'Finding Home', description: 'The hero discovers where they truly belong' },
        { label: 'Doing Right', description: 'The hero confronts wrong and restores justice' },
      ],
    },
    exampleStory: {
      title: 'Finding Our Product-Market Home',
      story: 'We spent two years building features for a market that tolerated us but never loved us. Then a healthcare company used our API in a way we never intended — and their patients benefited immediately. We had been looking for home in the wrong neighborhood. We pivoted to healthcare, rebuilt our positioning, and for the first time, customers came to us instead of the other way around. We finally found home.',
    },
    terminology: [
      { term: 'Satisfying Ending', definition: 'A story resolution that feels earned, not given — the result of struggle and growth' },
    ],
  },
  {
    id: 'innovation-curve',
    name: 'Innovation Curve',
    category: 'structure',
    description: 'Tailor your story for different audience risk tolerances.',
    whenToUse: [
      'Selling innovation',
      'Reducing perceived risk',
      'Audience-specific messaging',
    ],
    steps: [
      'Identify audience type: Innovator, Pioneer, Early/Late Mainstream, Traditional',
      'Adjust story for their hopes and fears',
      'Pioneers: excitement about new; Mainstream: tested and recommended; Traditional: everyone does it',
    ],
    relatedTactics: ['audience-profile', 'simple-sales-stories'],
    keywords: ['innovation', 'adoption', 'risk', 'audience'],
    conversationTypes: ['presentation', 'meeting'],
  
    framework: {
      name: 'ADOPTION CURVE',
      sections: [
        { label: 'Innovators', description: 'Thrill-seekers who love the new and experimental' },
        { label: 'Pioneers', description: 'Early adopters excited by potential and willing to take risks' },
        { label: 'Mainstream', description: 'Majority who want tested, recommended, and safe solutions' },
        { label: 'Traditional', description: 'Late adopters who move only when everyone else already has' },
      ],
    },
    exampleStory: {
      title: 'Selling the Same Product Four Ways',
      story: 'To innovators we said: this has never been done before. To pioneers: you will have an 18-month head start. To mainstream: 500 companies already use this. To traditionalists: this is now the industry standard. Same product, four stories. The mistake most companies make is telling the innovator story to the mainstream audience. Match the story to the listener.',
    },
    terminology: [
      { term: 'Innovation Curve', definition: 'The bell curve of technology adoption from risk-loving innovators to risk-averse traditionalists' },
      { term: 'Chasm', definition: 'The gap between early adopters and mainstream that many innovations fail to cross' },
    ],
  },
  {
    id: 'epic-fail',
    name: 'Epic Fail',
    category: 'structure',
    description: 'Tell different types of failure stories: catharsis, blame, or external factors.',
    whenToUse: [
      'Learning from failure',
      'Building resilience',
      'Honest storytelling',
    ],
    steps: [
      'Catharsis Story: Self-blame leads to personal growth',
      'Hubris Story: Find a villain to blame',
      'Fate Story: External factors beyond control',
      'Choose the type that fits your situation and purpose',
    ],
    relatedTactics: ['thoughtful-failures', 'downfall'],
    keywords: ['failure', 'learning', 'honesty', 'resilience'],
    conversationTypes: ['meeting', 'lesson', 'panel'],
  
    framework: {
      name: 'FAILURE TYPES',
      sections: [
        { label: 'Catharsis', description: 'Self-blame leading to personal growth and transformation' },
        { label: 'Hubris', description: 'Finding a villain or systemic cause to blame' },
        { label: 'Fate', description: 'External factors beyond anyone\'s control' },
      ],
    },
    exampleStory: {
      title: 'Three Ways to Tell the Same Failure',
      story: 'Our product launch flopped. Catharsis version: I pushed for features nobody asked for — I learned to listen. Hubris version: the sales team promised capabilities we had not built yet. Fate version: a global pandemic hit two weeks before launch and nobody was buying anything. All three are true. The version you choose depends on what lesson you want your audience to take away.',
    },
    terminology: [
      { term: 'Catharsis', definition: 'Emotional release through acknowledging your own role in failure, leading to growth' },
      { term: 'Hubris', definition: 'Excessive pride or confidence that leads to downfall' },
    ],
  },
  {
    id: 'downfall',
    name: 'Downfall',
    category: 'structure',
    description: 'Tell the cautionary tale of someone who had it all, made fatal mistakes, and lost everything. The opposite of Rags to Riches.',
    whenToUse: [
      'Warning stories and cautionary tales',
      'Explaining what to avoid',
      'Risk communication',
      'Lessons from hubris',
    ],
    steps: [
      'Heights: Show initial success, power, or advantage',
      'Pride: Reveal the fatal flaw or overconfidence',
      'The Mistake: A critical error in judgment that starts the fall',
      'The Fall: Watch as consequences unfold',
      'Rock Bottom: The final loss and its lesson',
    ],
    relatedTactics: ['epic-fail', 'tragedy', 'man-in-a-hole'],
    keywords: ['warning', 'hubris', 'cautionary', 'failure', 'pride'],
    conversationTypes: ['presentation', 'lesson', 'meeting'],
  
    framework: {
      name: 'FALL FROM GRACE',
      sections: [
        { label: 'Heights', description: 'Initial success, power, or advantage at its peak' },
        { label: 'Pride', description: 'The fatal flaw or overconfidence that plants the seed' },
        { label: 'The Mistake', description: 'A critical error in judgment that starts the fall' },
        { label: 'The Fall', description: 'Consequences unfolding with increasing momentum' },
        { label: 'Rock Bottom', description: 'The final loss and its lesson for others' },
      ],
    },
    exampleStory: {
      title: 'The Market Leader Who Stopped Listening',
      story: 'They owned 80% of the market. They stopped doing user research — why bother? They ignored three consecutive customer surveys warning about a clunky mobile experience. A startup with half their features but twice the usability entered the market. In eighteen months, market share dropped to 30%. The lesson was not about technology — it was about the arrogance of assuming you know what customers want.',
    },
    terminology: [
      { term: 'Fatal Flaw', definition: 'A character weakness that, left unchecked, leads to inevitable downfall' },
      { term: 'Cautionary Tale', definition: 'A story told specifically to warn others against repeating the same mistakes' },
    ],
  },
  {
    id: 'the-quest',
    name: 'The Quest',
    category: 'structure',
    description: 'Take your audience on a purposeful journey toward a clear goal, facing challenges, finding allies, and ultimately achieving or learning from the attempt.',
    whenToUse: [
      'Project narratives',
      'Team journey stories',
      'Product development stories',
      'Mission-driven content',
    ],
    steps: [
      'The Call: A clear goal or mission emerges that demands action',
      'The Journey Begins: Leave the familiar behind and commit',
      'Challenges & Allies: Face obstacles and find helpers along the way',
      'The Ordeal: The ultimate test before reaching the goal',
      'The Reward: Achievement or a meaningful lesson learned',
    ],
    relatedTactics: ['hero-and-guide', 'voyage-and-return', 'three-great-conflicts'],
    keywords: ['journey', 'goal', 'mission', 'adventure', 'hero'],
    conversationTypes: ['presentation', 'meeting', 'lesson'],
  
    framework: {
      name: 'QUEST ARC',
      sections: [
        { label: 'The Call', description: 'A clear goal or mission emerges that demands action' },
        { label: 'The Journey', description: 'Leave the familiar behind and commit to the path' },
        { label: 'Challenges & Allies', description: 'Face obstacles and find helpers along the way' },
        { label: 'The Ordeal', description: 'The ultimate test before reaching the goal' },
        { label: 'The Reward', description: 'Achievement or a meaningful lesson learned' },
      ],
    },
    exampleStory: {
      title: 'The Quest for Product-Market Fit',
      story: 'The call came from our first paying customer who said: I love the idea but hate the product. That was our mission: make the product match the vision. We left behind our original architecture and rebuilt. Along the way, we found allies — a designer who joined for equity, an advisor who opened doors. The ordeal was demo day with investors watching. The reward was not funding — it was knowing we had built something people actually wanted.',
    },
    terminology: [
      { term: 'The Call', definition: 'The initiating event that gives the hero a clear mission or purpose' },
      { term: 'The Ordeal', definition: 'The supreme test that proves whether the hero is worthy of the reward' },
    ],
  },
  {
    id: 'overcoming-the-monster',
    name: 'Overcoming The Monster',
    category: 'structure',
    description: 'Position your work as a battle against a threatening force - whether a competitor, systemic problem, or industry challenge that must be defeated.',
    whenToUse: [
      'Competitive positioning',
      'Problem-solving narratives',
      'Disruption stories',
      'Fighting injustice or inefficiency',
    ],
    steps: [
      'Identify The Monster: Name the threat clearly so everyone understands',
      'Show The Danger: What harm does this monster cause?',
      'The Call To Action: Why must we fight? What\'s at stake?',
      'The Battle: The struggle, strategy, and effort required',
      'Victory (or Sacrifice): How the monster is defeated and what it cost',
    ],
    relatedTactics: ['dragon-and-city', 'three-great-conflicts', 'hero-and-guide'],
    keywords: ['battle', 'threat', 'hero', 'victory', 'conflict'],
    conversationTypes: ['presentation', 'meeting', 'panel'],
  
    framework: {
      name: 'MONSTER SLAYER',
      sections: [
        { label: 'Name the Monster', description: 'Identify the threat clearly so everyone understands' },
        { label: 'Show the Danger', description: 'What harm does this monster cause to real people?' },
        { label: 'The Call to Action', description: 'Why must we fight? What is at stake if we do not?' },
        { label: 'The Battle', description: 'The struggle, strategy, and effort required to win' },
        { label: 'Victory', description: 'How the monster is defeated and what it cost' },
      ],
    },
    exampleStory: {
      title: 'Defeating Technical Debt',
      story: 'Our monster had a name: four years of accumulated technical debt. It slowed every feature by weeks, caused outages monthly, and was driving our best engineers away. We declared war — a six-week code freeze dedicated to slaying the beast. It cost us a quarter of new features. But deployment time dropped from hours to minutes, bugs fell 70%, and our engineers started smiling again. Some monsters you cannot outrun — you have to fight.',
    },
    terminology: [
      { term: 'The Monster', definition: 'Any threatening force — competitor, problem, or challenge — that must be confronted and defeated' },
    ],
  },
  {
    id: 'comedy',
    name: 'Comedy',
    category: 'structure',
    description: 'Use the comedy structure for stories about misunderstandings and mix-ups that eventually resolve into clarity, connection, and a happy ending.',
    whenToUse: [
      'Lightening the mood',
      'Team retrospectives',
      'Customer service stories',
      'Building rapport through shared confusion',
    ],
    steps: [
      'Normal World: Things seem fine on the surface',
      'Confusion Begins: Misunderstandings start to accumulate',
      'Escalating Chaos: Things get worse through miscommunication',
      'The Reveal: Truth comes to light unexpectedly',
      'Resolution: Everyone laughs, connects, and moves forward',
    ],
    relatedTactics: ['five-ts', 'happy-ever-afters', 'thats-funny'],
    keywords: ['humor', 'misunderstanding', 'lightness', 'resolution', 'connection'],
    conversationTypes: ['presentation', 'gathering', 'meeting'],
  
    framework: {
      name: 'COMEDY ARC',
      sections: [
        { label: 'Normal World', description: 'Things seem fine on the surface' },
        { label: 'Confusion', description: 'Misunderstandings start to accumulate' },
        { label: 'Escalating Chaos', description: 'Things get worse through miscommunication' },
        { label: 'The Reveal', description: 'Truth comes to light unexpectedly' },
        { label: 'Resolution', description: 'Everyone connects and moves forward together' },
      ],
    },
    exampleStory: {
      title: 'The Feature Nobody Requested',
      story: 'Sales said clients wanted real-time notifications. Engineering built a notification engine. At launch, clients were confused — they wanted a weekly email digest, not pop-ups every five minutes. Support tickets exploded. Then someone noticed: users who accidentally discovered the real-time feed loved it, they just did not want it as the default. We made it opt-in, and it became our most-praised feature. The miscommunication created something better than either side intended.',
    },
    terminology: [
      { term: 'Miscommunication Cascade', definition: 'When a small misunderstanding compounds through multiple parties into an absurd situation' },
      { term: 'Happy Accident', definition: 'An unintended positive outcome born from confusion or error' },
    ],
  },
  {
    id: 'tragedy',
    name: 'Tragedy',
    category: 'structure',
    description: 'Tell the story of a worthy protagonist whose flaw, circumstances, or choices lead to inevitable downfall. Use to create empathy and convey serious lessons.',
    whenToUse: [
      'Cautionary tales with emotional weight',
      'Building deep empathy',
      'Serious lessons about consequences',
      'Historical or business failure narratives',
    ],
    steps: [
      'Noble Beginning: A protagonist with admirable qualities we root for',
      'The Fatal Flaw: An internal weakness or external pressure that threatens',
      'Rising Action: Choices that compound the problem over time',
      'The Point of No Return: When tragedy becomes inevitable',
      'The Fall: Loss, but with meaning and catharsis for the audience',
    ],
    relatedTactics: ['downfall', 'epic-fail', 'no-easy-way'],
    keywords: ['catharsis', 'flaw', 'inevitable', 'empathy', 'lesson'],
    conversationTypes: ['presentation', 'lesson', 'panel'],
  
    framework: {
      name: 'TRAGIC ARC',
      sections: [
        { label: 'Noble Beginning', description: 'A protagonist with admirable qualities we root for' },
        { label: 'The Fatal Flaw', description: 'An internal weakness or external pressure that threatens' },
        { label: 'Rising Action', description: 'Choices that compound the problem over time' },
        { label: 'Point of No Return', description: 'When the tragic outcome becomes inevitable' },
        { label: 'The Fall', description: 'Loss with meaning and catharsis for the audience' },
      ],
    },
    exampleStory: {
      title: 'The Visionary Who Could Not Delegate',
      story: 'She was brilliant — a founder with a product vision that attracted top talent and major investors. But she could not let go. Every design decision, every line of code, every customer email went through her. Her team stopped contributing ideas. Her investors grew impatient. When the board finally replaced her, the company she built no longer felt like hers. The product succeeded, but the tragedy was that her greatest strength — attention to detail — became her fatal flaw.',
    },
    terminology: [
      { term: 'Fatal Flaw', definition: 'A character strength taken to excess that becomes the cause of downfall' },
      { term: 'Catharsis', definition: 'The emotional purging the audience experiences through witnessing the tragedy unfold' },
    ],
  },
  {
    id: 'rebirth',
    name: 'Rebirth',
    category: 'structure',
    description: 'Show how someone or something trapped in a dark place finds the path to redemption, transformation, and renewal. The ultimate story of hope.',
    whenToUse: [
      'Turnaround stories',
      'Brand reinvention',
      'Personal transformation narratives',
      'Second chance stories',
    ],
    steps: [
      'Under A Shadow: Trapped in a negative state or bad situation',
      'Worsening Condition: The darkness deepens before dawn',
      'The Catalyst: Something triggers the possibility of change',
      'The Struggle: Fighting to break free from the old patterns',
      'Emergence: Reborn into light and new possibility',
    ],
    relatedTactics: ['man-in-a-hole', 'rags-to-riches', 'happy-ever-afters'],
    keywords: ['redemption', 'transformation', 'hope', 'renewal', 'second-chance'],
    conversationTypes: ['presentation', 'lesson', 'meeting'],
  
    framework: {
      name: 'REBIRTH ARC',
      sections: [
        { label: 'Under a Shadow', description: 'Trapped in a negative state or destructive pattern' },
        { label: 'Worsening', description: 'The darkness deepens before any change is possible' },
        { label: 'The Catalyst', description: 'Something triggers the possibility of transformation' },
        { label: 'The Struggle', description: 'Fighting to break free from old patterns' },
        { label: 'Emergence', description: 'Reborn into light and new possibility' },
      ],
    },
    exampleStory: {
      title: 'The Brand That Reinvented Itself',
      story: 'For three years, we were known as the cheap alternative — functional but forgettable. Our brand was a shadow we could not escape. It worsened when a competitor started using our name as a punchline. The catalyst was hiring a design lead who saw what we could not: our product was better than our brand. We went silent for six months, rebuilt everything from logo to landing page, and relaunched. The market saw a different company. We were the same people, reborn.',
    },
    terminology: [
      { term: 'Catalyst', definition: 'The event or person that makes transformation from darkness to light suddenly possible' },
      { term: 'Emergence', definition: 'The act of breaking through old patterns into a fundamentally new state of being' },
    ],
  },

  // STYLE TACTICS
  {
    id: 'movie-time',
    name: 'Movie Time',
    category: 'style',
    description: 'Help people see what you mean by creating vivid visual moments.',
    whenToUse: [
      'Making abstract concepts concrete',
      'Creating memorable moments',
      'Visual storytelling',
    ],
    steps: [
      'ACTION: Where are we? What is happening? What happens next?',
      'EMOTION: Who is involved? What is at stake? How does it feel?',
      'MEANING: What has changed? Why does this matter?',
    ],
    relatedTactics: ['show-and-tell', 'emotional-dashboard'],
    keywords: ['visual', 'vivid', 'concrete', 'memorable'],
    conversationTypes: ['presentation', 'lesson', 'meeting'],
  
    framework: {
      name: 'AEM',
      sections: [
        { label: 'Action', description: 'Where are we? What is happening? What happens next?' },
        { label: 'Emotion', description: 'Who is involved? What is at stake? How does it feel?' },
        { label: 'Meaning', description: 'What has changed? Why does this matter?' },
      ],
    },
    exampleStory: {
      title: 'Making Strategy Visible',
      story: 'Instead of showing a slide about customer churn, I said: Picture this. It is Tuesday morning. Sarah, a customer of three years, opens our app for the last time. She pauses on the dashboard she customized with photos of her team. She clicks delete account. She feels nothing — and that is the problem. She used to love this product. We need to understand what changed between the day she customized that dashboard and the day she deleted it. That is our strategy for Q3.',
    },
    terminology: [
      { term: 'Visual Moment', definition: 'A scene described with enough sensory detail that the audience can see it in their minds' },
    ],
  },
  {
    id: 'story-hooks',
    name: 'Story Hooks',
    category: 'style',
    description: 'Grab attention using QUIRKS: Questions, Unexpected, Ironies, Relatable, Knowledge, Secrets.',
    whenToUse: [
      'Opening presentations',
      'Grabbing attention',
      'Headlines and titles',
    ],
    steps: [
      'Questions: Start with a Big Question',
      'Unexpected: Don\'t follow the crowd',
      'Ironies: Tell us something is wrong',
      'Relatable: Make it personal (You, We, Us)',
      'Knowledge: Offer lessons and life hacks',
      'Secrets: Promise something exclusive or hidden',
    ],
    relatedTactics: ['whats-it-about', 'curious-tales'],
    keywords: ['attention', 'hooks', 'opening', 'headlines'],
    conversationTypes: ['presentation', 'lesson', 'panel'],
  
    framework: {
      name: 'QUIRKS',
      sections: [
        { label: 'Questions', description: 'Start with a big, provocative question' },
        { label: 'Unexpected', description: 'Defy expectations — do not follow the crowd' },
        { label: 'Ironies', description: 'Point out something that is wrong or contradictory' },
        { label: 'Relatable', description: 'Make it personal using You, We, Us language' },
        { label: 'Knowledge', description: 'Offer exclusive lessons and life hacks' },
      ],
    },
    exampleStory: {
      title: 'The Hook That Filled the Room',
      story: 'I opened my talk with: What if I told you that the most productive team in this company has no manager, no standups, and no Slack channel? The room went silent. That is a hook — a question combined with the unexpected. I had their attention for the next 45 minutes because they needed to know which team and how it worked. The answer was less interesting than the question, but by then they had already heard my message.',
    },
    terminology: [
      { term: 'Hook', definition: 'The opening line or moment designed to capture attention and create the urge to hear more' },
      { term: 'Information Gap', definition: 'The space between what you hint at and what the audience wants to know' },
    ],
  },
  {
    id: 'three-is-magic-number',
    name: 'Three Is The Magic Number',
    category: 'style',
    description: 'Use the power of three to make your key points memorable.',
    whenToUse: [
      'Making points stick',
      'Structuring arguments',
      'Memorable messaging',
    ],
    steps: [
      'Attention Three: Repeat your core message three times',
      'Reversal Three: Setup, setup, reversal (like Three Little Pigs)',
      'Moderate Three: Two extremes, then the middle ground (Goldilocks)',
    ],
    relatedTactics: ['data-detectives', 'five-ts'],
    keywords: ['memory', 'three', 'pattern', 'memorable'],
    conversationTypes: ['presentation', 'lesson', 'meeting'],
  
    framework: {
      name: 'RULE OF THREE',
      sections: [
        { label: 'Attention Three', description: 'Repeat your core message three times in different ways' },
        { label: 'Reversal Three', description: 'Setup, setup, surprise — like the Three Little Pigs' },
        { label: 'Moderate Three', description: 'Two extremes and the middle ground — the Goldilocks principle' },
      ],
    },
    exampleStory: {
      title: 'Three Slides That Won the Deal',
      story: 'Slide one: Here is the problem (attention). Slide two: Here is why it is getting worse (attention again). Slide three: Here is how we fix it (reversal). Three slides. Three minutes. Three things to remember. The client said later: I have seen fifty pitches this quarter. Yours is the only one I can remember. That is the magic of three — the human brain craves patterns, and three is the smallest pattern that works.',
    },
    terminology: [
      { term: 'Rule of Three', definition: 'The principle that ideas presented in groups of three are more memorable and satisfying' },
      { term: 'Reversal', definition: 'Breaking the established pattern on the third beat for surprise and impact' },
    ],
  },
  {
    id: 'show-and-tell',
    name: 'Show & Tell',
    category: 'style',
    description: 'Present ideas with confidence using visual storytelling techniques.',
    whenToUse: [
      'Presentations with visuals',
      'Demonstrating ideas',
      'Avoiding business jargon',
    ],
    steps: [
      'Show concrete examples, not abstract concepts',
      'Tell the story behind the data',
      'Avoid dusty layers of business jargon',
    ],
    relatedTactics: ['movie-time', 'pitch-perfect'],
    keywords: ['visual', 'presentation', 'concrete', 'demonstration'],
    conversationTypes: ['presentation', 'lesson'],
  
    framework: {
      name: 'SHOW FIRST',
      sections: [
        { label: 'Show', description: 'Present concrete, tangible examples that people can see' },
        { label: 'Tell', description: 'Explain the story and meaning behind what you showed' },
        { label: 'Connect', description: 'Link the demonstration back to your bigger message' },
      ],
    },
    exampleStory: {
      title: 'The Demo That Sold Itself',
      story: 'Instead of explaining our analytics platform with slides, I opened the prospect\'s own website on screen and ran our tool live. In thirty seconds, it surfaced three conversion issues they did not know about. I did not say a word — I let the tool speak. Then I told the story: This is exactly what Company X saw on their first day. They fixed these three issues and saw a 28% revenue increase in six weeks. Show first, tell second.',
    },
    terminology: [
      { term: 'Dusty Jargon', definition: 'Abstract business language that obscures meaning and puts audiences to sleep' },
      { term: 'Concrete Example', definition: 'A tangible, specific demonstration that makes an abstract concept instantly clear' },
    ],
  },
  {
    id: 'rolls-royce-moment',
    name: 'Rolls Royce Moment',
    category: 'style',
    description: 'Help people see your strategy or product in action with a defining moment.',
    whenToUse: [
      'Explaining strategy',
      'Product demonstrations',
      'Making abstract concrete',
    ],
    steps: [
      'Find one vivid moment that captures your essence',
      'Make it sensory and specific',
      'Connect it to your bigger message',
    ],
    keywords: ['moment', 'demonstration', 'concrete', 'vivid'],
    conversationTypes: ['presentation', 'meeting'],
  
    framework: {
      name: 'DEFINING MOMENT',
      sections: [
        { label: 'Find the Moment', description: 'One vivid scene that captures your entire essence' },
        { label: 'Make It Sensory', description: 'Add specific, tangible details people can feel' },
        { label: 'Connect to Message', description: 'Link this moment to your bigger strategic point' },
      ],
    },
    exampleStory: {
      title: 'The Quiet Car',
      story: 'Rolls Royce did not talk about horsepower or engineering. They said: At 60 miles per hour, the loudest noise in the new Rolls Royce comes from the electric clock. One sentence. One vivid moment. It told you everything about the car without a single spec sheet. Find your electric clock moment — the one detail that makes the rest of the story unnecessary.',
    },
    terminology: [
      { term: 'Defining Moment', definition: 'A single, specific scene that encapsulates the essence of your entire message or brand' },
    ],
  },
  {
    id: 'curious-tales',
    name: 'Curious Tales',
    category: 'style',
    description: 'Find out what really makes your team members tick through curiosity.',
    whenToUse: [
      'Team building',
      'Understanding motivations',
      'Building relationships',
    ],
    steps: [
      'Ask open-ended questions about passions and interests',
      'Listen for underlying motivations',
      'Connect personal stories to work context',
    ],
    relatedTactics: ['story-hooks', 'whats-it-about'],
    keywords: ['curiosity', 'team', 'motivation', 'relationship'],
    conversationTypes: ['meeting', 'gathering'],
  
    framework: {
      name: 'CURIOSITY ENGINE',
      sections: [
        { label: 'Ask', description: 'Open-ended questions about passions, interests, and unusual experiences' },
        { label: 'Listen', description: 'Hear the underlying motivations beneath the surface answers' },
        { label: 'Connect', description: 'Bridge personal stories to professional context and shared goals' },
      ],
    },
    exampleStory: {
      title: 'The Quiet Engineer',
      story: 'Our quietest team member never spoke in meetings. During a one-on-one, I asked: What do you do when you are not coding? He built model trains — elaborate miniature worlds with working signals and schedules. I realized his superpower was systems thinking. I started routing architecture decisions through him. He became our most valuable technical voice, not because he changed, but because someone finally asked the right question.',
    },
    terminology: [
      { term: 'Curiosity Question', definition: 'An open-ended question designed to uncover hidden motivations and passions' },
    ],
  },

  // ORGANIZE TACTICS
  {
    id: 'story-bank',
    name: 'Story Bank',
    category: 'organize',
    description: 'Collect and organize useful stories your whole team can learn from.',
    whenToUse: [
      'Building organizational memory',
      'Sharing knowledge',
      'Training and onboarding',
    ],
    steps: [
      'Create a system for collecting stories',
      'Categorize by type, lesson, and use case',
      'Make stories accessible to the team',
      'Regularly review and update the bank',
    ],
    relatedTactics: ['thoughtful-failures', 'drive-stories'],
    keywords: ['collection', 'organization', 'knowledge', 'team'],
    conversationTypes: ['meeting', 'lesson'],
  
    framework: {
      name: 'BANK SYSTEM',
      sections: [
        { label: 'Collect', description: 'Create a systematic way to capture stories as they happen' },
        { label: 'Categorize', description: 'Tag by type, lesson, audience, and use case' },
        { label: 'Access', description: 'Make stories findable and shareable across the team' },
        { label: 'Refresh', description: 'Regularly review, update, and retire stories' },
      ],
    },
    exampleStory: {
      title: 'The Sales Team Story Vault',
      story: 'Our top salesperson closed three times more than anyone else. Her secret was not charisma — it was a spreadsheet of 47 customer stories, tagged by industry, problem type, and company size. Before every call, she picked three relevant stories. We turned her spreadsheet into a team-wide story bank. Within a quarter, the entire team\'s close rate improved by 40%. Institutional memory is a competitive advantage.',
    },
    terminology: [
      { term: 'Story Bank', definition: 'A curated, searchable collection of organizational stories that can be reused and adapted' },
    ],
  },
  {
    id: 'audience-profile',
    name: 'Audience Profile',
    category: 'organize',
    description: 'Understand your audience before crafting your story.',
    whenToUse: [
      'Preparing presentations',
      'Planning conversations',
      'Tailoring messages',
    ],
    steps: [
      'Define audience size and composition',
      'Assess their expertise level',
      'Understand their relationship to you',
      'Identify their expectations and needs',
    ],
    relatedTactics: ['whats-my-motivation', 'innovation-curve'],
    keywords: ['audience', 'preparation', 'planning', 'targeting'],
    conversationTypes: ['presentation', 'meeting', 'panel', 'lesson'],
  
    framework: {
      name: 'KNOW YOUR AUDIENCE',
      sections: [
        { label: 'Who', description: 'Size, composition, expertise level, and diversity of the group' },
        { label: 'Relationship', description: 'Their connection to you — allies, skeptics, strangers, or bosses' },
        { label: 'Expectations', description: 'What they hope to gain and what they fear hearing' },
        { label: 'Adapt', description: 'Tailor your story\'s language, depth, and tone to match' },
      ],
    },
    exampleStory: {
      title: 'The Wrong Room',
      story: 'I once gave a deeply technical presentation to a room I assumed was full of engineers. It was the marketing team. Ten minutes of blank stares before someone politely asked what an API was. Now I always profile my audience before I craft my story. The same message — our platform saves time — sounds completely different to engineers (fewer deployment steps), marketers (faster campaign launches), and executives (lower operational costs).',
    },
    terminology: [
      { term: 'Audience Profile', definition: 'A structured assessment of who you are speaking to, guiding how you tell your story' },
    ],
  },

  // RECIPE TACTICS
  {
    id: 'stories-that-sell',
    name: 'Stories That Sell',
    category: 'recipe',
    description: 'Recipe combining tactics to show your value to potential customers.',
    whenToUse: [
      'Sales situations',
      'Marketing content',
      'Customer conversations',
    ],
    steps: [
      '1. Audience Profile: Who are you solving problems for?',
      '2. Simple Sales Stories: Show how you helped someone like them',
      '3. Social Proof: Trends, prototypes, testimonials',
      '4. Rags To Riches: Optimistic story with customer at heart',
      '5. Pitch Perfect: Boil it down to elevator pitch',
    ],
    keywords: ['sales', 'marketing', 'persuasion', 'value'],
    conversationTypes: ['meeting', 'presentation'],
  
    framework: {
      name: 'SELL RECIPE',
      sections: [
        { label: 'Profile', description: 'Audience Profile — who exactly are you selling to?' },
        { label: 'Mirror', description: 'Simple Sales Stories — show someone like them succeeding' },
        { label: 'Proof', description: 'Social Proof — trends, prototypes, testimonials' },
        { label: 'Arc', description: 'Rags to Riches — optimistic transformation narrative' },
        { label: 'Pitch', description: 'Pitch Perfect — boil it down to an elevator pitch' },
      ],
    },
    exampleStory: {
      title: 'The Five-Step Close',
      story: 'Profile: mid-market SaaS companies with 50-200 employees. Mirror: Acme Corp had the same scaling problems you have. Proof: 340 companies in your segment use us, here are three case studies. Arc: Acme went from manual processes drowning in spreadsheets to automated workflows saving 20 hours per week. Pitch: We turn your operations chaos into calm for less than the cost of one hire. Five steps, one story, closed deal.',
    },
    terminology: [
      { term: 'Recipe Tactic', definition: 'A combination of multiple individual tactics assembled into a proven sequence' },
    ],
  },
  {
    id: 'stories-that-motivate',
    name: 'Stories That Motivate',
    category: 'recipe',
    description: 'Recipe combining tactics to inspire action and change.',
    whenToUse: [
      'Leadership moments',
      'Change initiatives',
      'Motivation challenges',
    ],
    steps: [
      '1. Dragon & City: Big picture goals',
      '2. Drive Stories: What motivates you and might motivate them',
      '3. Three Great Conflicts: What\'s stopping you',
      '4. Innovation Curve: Reassure about risks',
      '5. No Easy Way: Realistic journey ahead',
    ],
    keywords: ['motivation', 'change', 'leadership', 'action'],
    conversationTypes: ['meeting', 'presentation', 'lesson'],
  
    framework: {
      name: 'MOTIVATE RECIPE',
      sections: [
        { label: 'Vision', description: 'Dragon & City — paint the big picture of what is at stake' },
        { label: 'Drive', description: 'Drive Stories — tap into autonomy, mastery, and purpose' },
        { label: 'Stakes', description: 'Three Great Conflicts — show what is stopping progress' },
        { label: 'Safety', description: 'Innovation Curve — reassure about calculated risks' },
        { label: 'Honesty', description: 'No Easy Way — set realistic expectations for the journey' },
      ],
    },
    exampleStory: {
      title: 'Motivating a Reluctant Team',
      story: 'Vision: Our market is shifting and we can either lead or be replaced. Drive: This project lets you build with the tools you have been asking for. Stakes: Our competitor just hired fifteen engineers — they are coming for our customers. Safety: We are not betting everything — this is a focused experiment with clear success metrics. Honesty: It will take six months of intense work, but what we build will define the next three years.',
    },
    terminology: [
      { term: 'Motivation Stack', definition: 'Layering multiple motivational appeals to address different concerns and personality types' },
    ],
  },
  {
    id: 'stories-that-convince',
    name: 'Stories That Convince',
    category: 'recipe',
    description: 'Recipe combining tactics to explain expertise convincingly.',
    whenToUse: [
      'Expert presentations',
      'Data-heavy content',
      'Building credibility',
    ],
    steps: [
      '1. Three Is Magic Number: How many facts can they remember?',
      '2. That\'s Funny: Share excitement behind insights',
      '3. Data Detectives: Handle facts in a story-ish way',
      '4. Trust Me Expert: Explain experience to non-experts',
      '5. Hero & Guide: Position yourself helping them',
    ],
    keywords: ['expertise', 'data', 'credibility', 'convincing'],
    conversationTypes: ['presentation', 'meeting', 'panel'],
  
    framework: {
      name: 'CONVINCE RECIPE',
      sections: [
        { label: 'Structure', description: 'Three Is Magic Number — keep it to three memorable points' },
        { label: 'Excitement', description: 'That\'s Funny — share the genuine excitement behind insights' },
        { label: 'Evidence', description: 'Data Detectives — present data as a compelling mystery' },
        { label: 'Trust', description: 'Trust Me Expert — establish credibility through experience' },
        { label: 'Positioning', description: 'Hero & Guide — make them the hero, you the helpful guide' },
      ],
    },
    exampleStory: {
      title: 'Convincing the Skeptical Board',
      story: 'Three points: market timing, team readiness, financial model. Excitement: we found something our competitors missed entirely. Evidence: the data tells a detective story — here is the clue everyone overlooked. Trust: I have been wrong before, here is what I learned and why this time is different. Positioning: this is not my vision — it is your company\'s opportunity, and I am here to help you seize it.',
    },
    terminology: [
      { term: 'Credibility Stack', definition: 'Building trust through multiple reinforcing layers of evidence, experience, and positioning' },
    ],
  },
  {
    id: 'stories-that-connect',
    name: 'Stories That Connect',
    category: 'recipe',
    description: 'Recipe combining tactics to build empathy and relationships.',
    whenToUse: [
      'Building relationships',
      'User research',
      'Team building',
    ],
    steps: [
      '1. Story Listening: Listen to their wisdom',
      '2. Abstractions: Watch behavior, not just words',
      '3. Universal Stories: Find common ground',
      '4. Story-ish Conversations: Look for stories in everyday situations',
      '5. Circle of Life: Develop relatable character journeys',
    ],
    keywords: ['empathy', 'connection', 'relationships', 'understanding'],
    conversationTypes: ['meeting', 'gathering', 'lesson'],
  
    framework: {
      name: 'CONNECT RECIPE',
      sections: [
        { label: 'Listen', description: 'Story Listening — hear their wisdom before sharing yours' },
        { label: 'Observe', description: 'Abstractions — watch behavior, not just words' },
        { label: 'Common Ground', description: 'Universal Stories — find shared human experiences' },
        { label: 'Uncover', description: 'Story-ish Conversations — mine everyday talk for stories' },
        { label: 'Relate', description: 'Circle of Life — develop relatable character journeys' },
      ],
    },
    exampleStory: {
      title: 'Connecting With a New Team',
      story: 'Listen: I spent my first week asking questions and writing down answers. Observe: I noticed the team communicated best in code reviews, not meetings. Common ground: I shared my own story of joining a team where I felt like an outsider. Uncover: casual coffee conversations revealed the real dynamics. Relate: I discovered we all shared the same fear — that good work would go unnoticed. Connection is not a moment, it is a process.',
    },
    terminology: [
      { term: 'Empathy Bridge', definition: 'A shared experience or vulnerability that creates genuine connection between people' },
    ],
  },
  {
    id: 'stories-that-explain',
    name: 'Stories That Explain',
    category: 'recipe',
    description: 'Recipe combining tactics to clarify goals and strategy.',
    whenToUse: [
      'Strategy presentations',
      'Goal setting',
      'Organizational communication',
    ],
    steps: [
      '1. Order & Chaos: Where do you stand in a changing world?',
      '2. Good & Evil: Which side do you take?',
      '3. What\'s It About: Why does this strategy matter?',
      '4. Rolls Royce Moment: See the strategy in action',
      '5. Story Hooks: Make it interesting enough to read',
    ],
    keywords: ['strategy', 'clarity', 'goals', 'explanation'],
    conversationTypes: ['meeting', 'presentation'],
  
    framework: {
      name: 'EXPLAIN RECIPE',
      sections: [
        { label: 'Context', description: 'Order & Chaos — where do you stand in a changing world?' },
        { label: 'Values', description: 'Good & Evil — which side do you take and why?' },
        { label: 'Clarity', description: 'What\'s It About — why does this strategy matter, simply?' },
        { label: 'Demonstration', description: 'Rolls Royce Moment — see the strategy in vivid action' },
        { label: 'Hook', description: 'Story Hooks — make it interesting enough to remember' },
      ],
    },
    exampleStory: {
      title: 'Explaining a Pivot',
      story: 'Context: our industry is splitting into two camps — platform vs point solution. Values: we believe in giving customers freedom, not lock-in. Clarity: we are becoming an open platform because our customers deserve choice. Demonstration: imagine a client adding any tool they want to our system with one click — that is what this means in practice. Hook: what if the best product was not a product at all, but an ecosystem?',
    },
    terminology: [
      { term: 'Strategic Narrative', definition: 'A story that makes organizational strategy clear, compelling, and memorable' },
    ],
  },
  {
    id: 'stories-that-lead',
    name: 'Stories That Lead',
    category: 'recipe',
    description: 'Recipe combining tactics to build and lead stronger teams.',
    whenToUse: [
      'Team leadership',
      'Culture building',
      'Onboarding',
    ],
    steps: [
      '1. Curious Tales: What makes team members tick',
      '2. Man In A Hole: Frame work as epic journey',
      '3. Emotional Dashboard: Find stories in highs and lows',
      '4. Thoughtful Failures: Learn from team mistakes',
      '5. Story Bank: Collect useful stories to share',
    ],
    keywords: ['leadership', 'team', 'culture', 'guidance'],
    conversationTypes: ['meeting', 'lesson', 'gathering'],
  
    framework: {
      name: 'LEAD RECIPE',
      sections: [
        { label: 'Curiosity', description: 'Curious Tales — discover what makes each team member tick' },
        { label: 'Journey', description: 'Man In A Hole — frame work as an epic shared journey' },
        { label: 'Emotions', description: 'Emotional Dashboard — find stories in team highs and lows' },
        { label: 'Learning', description: 'Thoughtful Failures — turn mistakes into team wisdom' },
        { label: 'Memory', description: 'Story Bank — collect and share useful team stories' },
      ],
    },
    exampleStory: {
      title: 'Building a Storytelling Culture',
      story: 'Curiosity: I started every one-on-one with a personal question. Journey: I framed our quarterly goals as a shared adventure with real stakes. Emotions: we mapped our team morale monthly and talked about the dips honestly. Learning: every retro included one thoughtful failure and what we gained from it. Memory: we built a Notion page of our best team stories. Within six months, storytelling was not a skill we practiced — it was how we operated.',
    },
    terminology: [
      { term: 'Storytelling Culture', definition: 'An organizational environment where narrative thinking is a natural part of communication and decision-making' },
    ],
  },
  {
    id: 'stories-that-impress',
    name: 'Stories That Impress',
    category: 'recipe',
    description: 'Recipe combining tactics to nail presentations.',
    whenToUse: [
      'Important presentations',
      'Public speaking',
      'High-stakes meetings',
    ],
    steps: [
      '1. Movie Time: Actually tell a story, not just facts',
      '2. Five Ts: Get the beats right with structure',
      '3. Story Hooks: Grab attention from start to finish',
      '4. Show & Tell: Present with confidence, no jargon',
      '5. Cut To The Chase: Have an escape plan if it falls flat',
    ],
    keywords: ['presentation', 'speaking', 'impressive', 'performance'],
    conversationTypes: ['presentation', 'panel'],
  
    framework: {
      name: 'IMPRESS RECIPE',
      sections: [
        { label: 'Show', description: 'Movie Time — tell a real story, not just facts and bullets' },
        { label: 'Structure', description: 'Five Ts — get the narrative beats right' },
        { label: 'Hook', description: 'Story Hooks — grab and hold attention throughout' },
        { label: 'Confidence', description: 'Show & Tell — present with poise, skip the jargon' },
        { label: 'Backup', description: 'Cut To The Chase — have an escape plan if needed' },
      ],
    },
    exampleStory: {
      title: 'The Keynote That Got a Standing Ovation',
      story: 'Show: I opened with a one-minute story about a customer\'s worst day. Structure: Timeline from crisis to resolution in five clear beats. Hook: I asked the audience to raise their hands if they had experienced something similar — 80% went up. Confidence: no slides for the first ten minutes, just eye contact and story. Backup: I had three off-ramps planned in case I lost the room. I did not need them.',
    },
    terminology: [
      { term: 'Presentation Architecture', definition: 'The deliberate structural design of a talk combining multiple storytelling techniques' },
    ],
  },

  // BEAT TACTICS - Advanced Storytelling Beats
  {
    id: 'dark-night-of-the-soul',
    name: 'Dark Night of the Soul',
    category: 'beat',
    description: 'The lowest emotional point in your story - the moment of deepest doubt or despair that precedes transformation. This beat forces the audience to feel the stakes.',
    whenToUse: [
      'After a major setback in your narrative',
      'Before revealing a breakthrough or pivot',
      'Crisis communication',
      'Transformation stories',
    ],
    steps: [
      'Show everything falling apart - make the stakes viscerally clear',
      'Let your protagonist (or team) sit in the despair briefly',
      'Reveal a small spark - a realization, memory, or outside help',
      'Build from the spark into renewed determination',
      'Transition into the climb back up with new wisdom',
    ],
    examples: [
      '"We had lost 80% of our customers. Our investors stopped returning calls. I sat in the empty office wondering if it was time to give up..."',
      '"The diagnosis was devastating. For three days, I couldn\'t get out of bed. Then my daughter said something that changed everything..."',
    ],
    relatedTactics: ['man-in-a-hole', 'rebirth', 'all-is-lost'],
    keywords: ['crisis', 'despair', 'transformation', 'breakthrough', 'emotional low'],
    conversationTypes: ['presentation', 'panel', 'lesson'],
  
    framework: {
      name: 'DARKEST HOUR',
      sections: [
        { label: 'Everything Falls Apart', description: 'Make the stakes viscerally clear to the audience' },
        { label: 'Sit in the Despair', description: 'Let the protagonist and audience feel the weight' },
        { label: 'The Spark', description: 'A realization, memory, or outside help breaks through' },
        { label: 'Renewed Determination', description: 'Build from the spark into forward momentum' },
        { label: 'The Climb', description: 'Transition into the ascent with new wisdom' },
      ],
    },
    exampleStory: {
      title: 'The Night Before Shutdown',
      story: 'We had three days of runway left. Our lead investor ghosted us. I sat in the empty office at midnight staring at a termination letter template. Then I opened my inbox one more time and found an email from a customer I had forgotten about — they wanted to expand their contract and had referred two friends. Those three contracts bought us six months. The darkest night was not the end — it was the last hour before dawn.',
    },
    terminology: [
      { term: 'Dark Night', definition: 'The lowest emotional point in a narrative, where hope seems completely lost' },
      { term: 'The Spark', definition: 'The small, often unexpected catalyst that breaks through despair and reignites hope' },
    ],
  },
  {
    id: 'the-mirror-moment',
    name: 'The Mirror Moment',
    category: 'beat',
    description: 'The pivotal scene where the hero confronts their true self and must choose who they want to become. This beat creates profound character development.',
    whenToUse: [
      'Personal growth stories',
      'Leadership transformation narratives',
      'Career pivot explanations',
      'Values-based decisions',
    ],
    steps: [
      'Set up the moment of confrontation - literal or metaphorical mirror',
      'Show the character recognizing who they\'ve become',
      'Present the choice: stay the same or transform',
      'Make the decision feel weighted and meaningful',
      'Show the immediate first step of the new path',
    ],
    examples: [
      '"I looked at my calendar and realized I hadn\'t seen my kids awake in two weeks. In that moment, I knew something had to change..."',
      '"The client asked me why I was working on something I clearly didn\'t believe in. I had no answer. That question haunted me for weeks..."',
    ],
    relatedTactics: ['circle-of-life', 'rebirth', 'no-easy-way'],
    keywords: ['self-reflection', 'identity', 'choice', 'transformation', 'character'],
    conversationTypes: ['presentation', 'lesson', 'panel'],
  
    framework: {
      name: 'MIRROR',
      sections: [
        { label: 'Confrontation', description: 'The moment of seeing yourself — literal or metaphorical' },
        { label: 'Recognition', description: 'Acknowledging who you have become versus who you meant to be' },
        { label: 'The Choice', description: 'Stay the same or transform — the decision point' },
        { label: 'First Step', description: 'The immediate action that begins the new path' },
      ],
    },
    exampleStory: {
      title: 'The Calendar Mirror',
      story: 'I looked at my calendar and realized I had not had a single uninterrupted hour for creative work in six weeks. Every slot was filled with meetings about meetings. I was the bottleneck I kept complaining about. The mirror moment was brutal: I had become the kind of manager I swore I would never be. The next morning I cancelled 70% of my recurring meetings. My team\'s output doubled in a month — they had been waiting for me to get out of the way.',
    },
    terminology: [
      { term: 'Mirror Moment', definition: 'The scene where a character confronts the gap between who they are and who they want to be' },
      { term: 'Identity Choice', definition: 'The pivotal decision about what kind of person or leader you will become' },
    ],
  },
  {
    id: 'the-inciting-incident',
    name: 'The Inciting Incident',
    category: 'beat',
    description: 'The disrupting event that shatters the ordinary world and sets your entire story in motion. Without this beat, there is no story.',
    whenToUse: [
      'Opening hooks',
      'Problem statements',
      'Origin stories',
      'Explaining why now',
    ],
    steps: [
      'Briefly establish the "before" - the ordinary world',
      'Introduce the disruption with specificity and surprise',
      'Show the immediate impact - nothing can stay the same',
      'Create urgency - why action is required now',
      'Hint at what\'s at stake if the call isn\'t answered',
    ],
    examples: [
      '"On March 15th, we got a call that changed everything..."',
      '"The email arrived at 3am. By morning, our entire industry would be different..."',
    ],
    relatedTactics: ['story-hooks', 'five-ts', 'dragon-and-city'],
    keywords: ['opening', 'disruption', 'trigger', 'catalyst', 'beginning'],
    conversationTypes: ['presentation', 'meeting', 'panel'],
  
    framework: {
      name: 'DISRUPTION',
      sections: [
        { label: 'The Before', description: 'Briefly establish the ordinary, stable world' },
        { label: 'The Disruption', description: 'Introduce the event with specificity and surprise' },
        { label: 'Immediate Impact', description: 'Show that nothing can stay the same after this' },
        { label: 'Urgency', description: 'Why action is required right now, not later' },
      ],
    },
    exampleStory: {
      title: 'The Email That Changed Our Company',
      story: 'We were a comfortable consulting firm, steady clients, predictable revenue. Then on a Tuesday morning, our largest client — 40% of revenue — sent a one-line email: We are taking everything in-house effective immediately. That single email transformed us from a services company into a product company within eighteen months. We did not choose disruption — disruption chose us.',
    },
    terminology: [
      { term: 'Inciting Incident', definition: 'The specific event that disrupts the status quo and makes the story necessary' },
      { term: 'Ordinary World', definition: 'The stable reality that exists before the disruption arrives' },
    ],
  },
  {
    id: 'point-of-no-return',
    name: 'The Point of No Return',
    category: 'beat',
    description: 'The moment of commitment where retreat becomes impossible. This beat locks your protagonist into their path and raises stakes dramatically.',
    whenToUse: [
      'Investment decisions',
      'Major commitment narratives',
      'Explaining irreversible choices',
      'Building tension before the climax',
    ],
    steps: [
      'Show what the character is leaving behind',
      'Make the threshold crossing clear and deliberate',
      'Burn the bridges - show why going back is impossible',
      'Acknowledge the fear while demonstrating resolve',
      'Face forward toward the unknown with commitment',
    ],
    examples: [
      '"When I handed in my resignation, my boss offered to double my salary. I declined. There was no going back..."',
      '"We had committed our last funding round to this bet. If it failed, we were done..."',
    ],
    relatedTactics: ['voyage-return', 'the-quest', 'tragedy'],
    keywords: ['commitment', 'decision', 'threshold', 'irreversible', 'stakes'],
    conversationTypes: ['presentation', 'meeting', 'panel'],
  
    framework: {
      name: 'THRESHOLD',
      sections: [
        { label: 'What You Leave', description: 'Show what the character is giving up or leaving behind' },
        { label: 'The Crossing', description: 'Make the threshold crossing clear and deliberate' },
        { label: 'Burn the Bridges', description: 'Show why going back is no longer possible' },
        { label: 'Face Forward', description: 'Acknowledge fear while demonstrating resolve' },
      ],
    },
    exampleStory: {
      title: 'The Resignation',
      story: 'When I handed in my resignation to start my own company, my boss offered to double my salary and promote me to VP. For a moment I hesitated — security, prestige, a clear path. Then I realized: if I went back now, I would always wonder what if. I declined, cleared my desk, and walked out. My hands were shaking. I had no clients, no revenue, and no safety net. But for the first time in years, I had direction.',
    },
    terminology: [
      { term: 'Point of No Return', definition: 'The moment where retreat becomes impossible and full commitment is the only option' },
      { term: 'Threshold', definition: 'The boundary between the familiar world and the unknown that must be crossed' },
    ],
  },
  {
    id: 'all-is-lost',
    name: 'All Is Lost',
    category: 'beat',
    description: 'The false defeat moment that appears just before the final push to victory. This beat creates maximum tension and makes the eventual win more satisfying.',
    whenToUse: [
      'Before revealing success',
      'Turnaround stories',
      'Resilience narratives',
      'Dramatic tension building',
    ],
    steps: [
      'Set up what feels like final, complete defeat',
      'Let the audience sit in the hopelessness briefly',
      'Introduce the "whiff of death" - something that symbolizes ending',
      'Then reveal the hidden resource, ally, or insight that was overlooked',
      'Transition rapidly into the final push',
    ],
    examples: [
      '"The bank called in our loan. Our largest customer left. Our lead engineer quit. It was over. Or so we thought..."',
      '"I had failed the exam three times. This was my last attempt. I was certain I had failed again..."',
    ],
    relatedTactics: ['dark-night-of-the-soul', 'man-in-a-hole', 'epic-fail'],
    keywords: ['defeat', 'turnaround', 'tension', 'resilience', 'false ending'],
    conversationTypes: ['presentation', 'lesson', 'panel'],
  
    framework: {
      name: 'FALSE DEFEAT',
      sections: [
        { label: 'Complete Defeat', description: 'Set up what feels like final, total failure' },
        { label: 'The Pause', description: 'Let the audience sit briefly in the hopelessness' },
        { label: 'Whiff of Death', description: 'Something symbolic that signals the end' },
        { label: 'Hidden Resource', description: 'Reveal the overlooked ally, insight, or strength' },
        { label: 'The Final Push', description: 'Rapid transition into the climactic effort' },
      ],
    },
    exampleStory: {
      title: 'The Last Attempt',
      story: 'I had failed the certification exam three times. The study materials were scattered across my desk next to a rejection letter from my dream employer. I was done. Then I found an old notebook — practice problems I had written for a friend years ago. They were better than any study guide I had used. I studied from my own notes for two weeks. On the fourth attempt, I passed with the highest score in my testing center.',
    },
    terminology: [
      { term: 'False Defeat', definition: 'A moment that appears to be the final failure but is actually the last obstacle before victory' },
      { term: 'Whiff of Death', definition: 'A symbolic element suggesting finality — a resignation letter, an empty office, a goodbye' },
    ],
  },
  {
    id: 'midpoint-shift',
    name: 'The Midpoint Shift',
    category: 'beat',
    description: 'The revelation or reversal exactly halfway through your narrative that changes everything. This beat prevents sagging middles and re-energizes the audience.',
    whenToUse: [
      'Long presentations',
      'Complex narratives',
      'Plot twists',
      'Perspective changes',
    ],
    steps: [
      'Build toward what seems like the obvious direction',
      'Introduce new information that reframes everything',
      'Show the protagonist realizing the implications',
      'Shift from reactive to proactive (or vice versa)',
      'Raise the stakes with this new understanding',
    ],
    examples: [
      '"Halfway through our research, we discovered we had been solving the wrong problem entirely..."',
      '"Then we got the data back. Everything we thought we knew was backwards..."',
    ],
    relatedTactics: ['secrets-and-puzzles', 'data-detectives', 'order-and-chaos'],
    keywords: ['twist', 'revelation', 'midpoint', 'reversal', 'reframe'],
    conversationTypes: ['presentation', 'lesson', 'panel'],
  
    framework: {
      name: 'MIDPOINT REVERSAL',
      sections: [
        { label: 'Build Expectation', description: 'Move toward what seems like the obvious direction' },
        { label: 'New Information', description: 'Introduce a fact that reframes everything' },
        { label: 'Realization', description: 'Show the protagonist understanding the implications' },
        { label: 'Shift Direction', description: 'Move from reactive to proactive, or vice versa' },
      ],
    },
    exampleStory: {
      title: 'The Research Reversal',
      story: 'Halfway through our market research, we were confident: customers wanted more features. Then we ran a cohort analysis and discovered the opposite. Our highest-retention users used only three features. The customers asking for more features were the ones most likely to churn — they were confused, not sophisticated. The midpoint shift changed our entire product strategy: instead of adding, we started subtracting.',
    },
    terminology: [
      { term: 'Midpoint Shift', definition: 'A revelation at the story\'s halfway mark that changes the protagonist\'s understanding and approach' },
      { term: 'Reframe', definition: 'Seeing the same situation from a completely new angle that changes its meaning' },
    ],
  },
  {
    id: 'the-final-push',
    name: 'The Final Push',
    category: 'beat',
    description: 'Gathering all resources, allies, and lessons for one last attempt at success. This beat brings everything together for the climactic moment.',
    whenToUse: [
      'Before call-to-action',
      'Closing arguments',
      'Summarizing key points',
      'Motivational finales',
    ],
    steps: [
      'Gather the team/resources - show what you\'ve accumulated',
      'Acknowledge all the lessons learned along the way',
      'Make the plan clear and simple',
      'Build momentum and energy toward action',
      'End with clear direction and confidence',
    ],
    examples: [
      '"We had learned from every failure. We had the right team. We had one shot left. This was it..."',
      '"Armed with these insights, we\'re ready to take action. Here\'s exactly what we need to do..."',
    ],
    relatedTactics: ['cut-to-the-chase', 'pitch-perfect', 'the-quest'],
    keywords: ['climax', 'action', 'momentum', 'finale', 'call-to-action'],
    conversationTypes: ['presentation', 'meeting'],
  
    framework: {
      name: 'CLIMAX',
      sections: [
        { label: 'Gather Resources', description: 'Collect all allies, tools, and lessons learned' },
        { label: 'The Plan', description: 'Apply accumulated wisdom to one final strategy' },
        { label: 'All or Nothing', description: 'Commit everything to this last attempt' },
        { label: 'Resolution', description: 'The outcome and its lasting impact' },
      ],
    },
    exampleStory: {
      title: 'The Demo Day Push',
      story: 'We had 48 hours before demo day. The product was 80% ready. We gathered every lesson from our failed demos, every piece of customer feedback, every technical shortcut we had learned. The plan: strip the demo to three features that worked perfectly instead of ten that worked mostly. We rehearsed until midnight, slept four hours, and delivered. The investors did not fund our product — they funded our clarity. Sometimes the final push is about subtraction, not addition.',
    },
    terminology: [
      { term: 'The Final Push', definition: 'The climactic moment where all accumulated resources and wisdom are applied to one decisive effort' },
    ],
  },
  {
    id: 'new-equilibrium',
    name: 'The New Equilibrium',
    category: 'beat',
    description: 'The transformed state after the journey, showing how things are different now. This beat provides closure and demonstrates lasting change.',
    whenToUse: [
      'Endings and conclusions',
      'Before and after contrasts',
      'Vision casting',
      'Demonstrating transformation',
    ],
    steps: [
      'Mirror an element from your opening (the ordinary world)',
      'Show how it\'s different now after the journey',
      'Demonstrate the character/organization\'s growth',
      'Hint at what\'s possible in this new state',
      'End with resonance - connect back to the opening theme',
    ],
    examples: [
      '"Today, when I walk into that same office, everything is different. Not the furniture - the people, the energy, the possibilities..."',
      '"We started with 3 customers. Now we have 3 million. But more importantly, we know who we are..."',
    ],
    relatedTactics: ['voyage-return', 'before-after', 'rags-to-riches'],
    keywords: ['ending', 'transformation', 'closure', 'resolution', 'change'],
    conversationTypes: ['presentation', 'lesson', 'meeting'],
  },
];

// Helper functions
export const getTacticById = (id: string): StorytellerTactic | undefined => {
  return STORYTELLER_TACTICS.find(tactic => tactic.id === id);
};

export const getTacticsByCategory = (category: string): StorytellerTactic[] => {
  return STORYTELLER_TACTICS.filter(tactic => tactic.category === category);
};

export const getTacticsForConversationType = (type: string): StorytellerTactic[] => {
  return STORYTELLER_TACTICS.filter(tactic => 
    tactic.conversationTypes.includes(type)
  );
};

export const searchTactics = (query: string): StorytellerTactic[] => {
  const lowerQuery = query.toLowerCase();
  return STORYTELLER_TACTICS.filter(tactic =>
    tactic.name.toLowerCase().includes(lowerQuery) ||
    tactic.description.toLowerCase().includes(lowerQuery) ||
    tactic.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
  );
};
