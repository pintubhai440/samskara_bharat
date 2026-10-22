import { Lesson, Badge } from '../types';

export const allClassLevels = [
  'LKG', 'UKG',
  'Class 1', 'Class 2',
  'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8',
  'Class 9', 'Class 10'
];

export const sampleLessons: Lesson[] = [
  {
    id: 'lesson-1',
    classLevel: 'Class 6',
    gradeBand: '6-8',
    gunaId: 'vinaya',
    gunaName: 'विनय (Vinaya - Humility & Modesty)',
    title: 'The Scholar, the Boatman & the River',
    storyTitle: 'The Pride of Erudition vs. The Wisdom of Modesty',
    sourceEpic: 'Panchatantra',
    durationMinutes: 8,
    videoThumbnailGradient: 'from-[#FF9933]/30 via-[#FFD166]/20 to-[#38BDF8]/30',
    videoSynopsis: 'A proud scholar ridicules a simple boatman for not studying grammar and astronomy. When a sudden storm cracks the boat, the scholar learns that intellectual arrogance cannot save a drowning soul—true knowledge begins with humility and respect for every honest craft.',
    passageText: 'The scholar watched in terror as the dark river churned into violent whirlpools. He clutched his voluminous palm-leaf scrolls against his chest, but the surging current offered no deference to his titles. The boatman, calm and steady at the oars, turned around and gently asked: "Sir, do you know how to swim?" In that piercing silence, the scholar realized that information without humility is like carrying heavy books into deep waters—it weighs down rather than lifts up.',
    questions: [
      {
        id: 'q1-1',
        question: 'Why did the scholar initially mock the boatman, and how did his mindset change when faced with the storm?',
        hint: 'Reflect on whether having book knowledge makes someone inherently superior to someone with practical, life-saving skills.',
        category: 'introspection'
      },
      {
        id: 'q1-2',
        question: 'Think of a moment in school or sports where you felt proud of a high score or skill. Did you share it gently or boastfully?',
        hint: 'Recall how classmates feel when someone shows off versus when someone quietly offers help.',
        category: 'empathy'
      },
      {
        id: 'q1-3',
        question: 'How can you practice "Vidya Dadati Vinayam" (knowledge gives humility) when interacting with peers online or on social platforms?',
        hint: 'Think about admitting when you do not know something and listening respectfully to differing viewpoints.',
        category: 'real-life'
      }
    ],
    explanationText: 'In classical Indian thought, the pinnacle of learning is not the display of ego, but the softening of the heart. The Sanskrit aphorism "विद्या ददाति विनयम्" (Vidya Dadati Vinayam) teaches that as knowledge deepens, modesty must expand naturally—just as a tree heavily laden with ripe fruit bows closest to the ground. In 21st-century classrooms, this manifests when high-achieving students celebrate their peers, acknowledge support staff with warm gratitude, and never use grades as a pedestal for arrogance.',
    lifeSkillTitle: 'Intellectual Modesty & Peer Respect',
    lifeSkillApplication: 'Valuing the diverse skills of every classmate, rejecting boastfulness on chat groups, and approaching learning with an open, inquiring mind.',
    collectiveDiscussionPrompt: 'If you were in the boat, what words of comfort would you have offered to help the scholar overcome his shame while learning the lesson of humility?',
    classmatePerspectives: [
      { studentName: 'Aarav M.', grade: 'Class 6A', perspective: 'True intelligence is being able to learn from everyone you meet, whether an auto driver or a professor.' },
      { studentName: 'Tanvi S.', grade: 'Class 6B', perspective: 'Boasting about marks only makes friends feel small. When I help my seatmate with fractions without laughing, we both win.' }
    ]
  },
  {
    id: 'lesson-2',
    classLevel: 'Class 6',
    gradeBand: '6-8',
    gunaId: 'satya',
    gunaName: 'सत्य (Satya - Truthfulness & Moral Courage)',
    title: 'Sri Rama & Guha: Friendship Beyond Status',
    storyTitle: 'The Pure Truth of Heart Over Caste and Crown',
    sourceEpic: 'Ramayana',
    durationMinutes: 9,
    videoThumbnailGradient: 'from-[#22A06B]/30 via-[#38BDF8]/20 to-[#FF9933]/30',
    videoSynopsis: 'When Sri Rama enters the forest in exile, Guha, the chieftain of the Nishada boatmen, rushes to welcome him with tears of love. Sri Rama embraces Guha as his own brother, demonstrating that genuine truth resides in purity of character and unwavering affection, never in royal status or birth.',
    passageText: 'Guha offered what he had: humble woodland fruits, roots, and fierce protective loyalty. Sri Rama stepped forward, bypassing all courtly etiquette, and wrapped the forest chieftain in a warm embrace: "You are as dear to me as Bharata himself." In that moment of embrace on the banks of the sacred Ganga, the artificial boundaries of wealth and status vanished in the radiant light of authentic brotherhood.',
    questions: [
      {
        id: 'q2-1',
        question: 'What made Sri Rama embrace Guha as his brother despite courtly advisors expecting formality?',
        hint: 'Consider what qualities Rama valued in a human being.',
        category: 'introspection'
      },
      {
        id: 'q2-2',
        question: 'Have you ever noticed a classmate being left out of lunch or games because of their background or quietness? How did it make you feel?',
        hint: 'Empathy means feeling another child’s loneliness and daring to bridge the gap.',
        category: 'empathy'
      },
      {
        id: 'q2-3',
        question: 'What is one concrete action you can take this week to include someone new in your study group or recess circle?',
        hint: 'A simple warm greeting or invitation to sit together can transform someone’s school day.',
        category: 'real-life'
      }
    ],
    explanationText: 'Satya (Truth) is not merely speaking the literal truth; it is honoring the inner truth of every human being as an equal. Sri Rama demonstrates that true noble character sees no distinction between a prince and a boatman. In our modern multi-cultural world, this translates to inclusive friendship, welcoming transfer students, and resisting social cliques in school.',
    lifeSkillTitle: 'Universal Brotherhood & Inclusive Leadership',
    lifeSkillApplication: 'Rejecting social prejudice, building friendships with students from all backgrounds, and being a welcoming presence in every classroom circle.',
    collectiveDiscussionPrompt: 'What steps can our classroom take to ensure no single student feels isolated during lunch breaks or group projects?',
    classmatePerspectives: [
      { studentName: 'Rohan K.', grade: 'Class 6C', perspective: 'When someone is sitting alone, taking your lunchbox to their bench requires only 10 seconds of courage, but creates lifelong trust.' },
      { studentName: 'Diya P.', grade: 'Class 6A', perspective: 'Rama showed that true nobility is measured by how warmly you treat those society often overlooks.' }
    ]
  },
  {
    id: 'lesson-3',
    classLevel: 'Class 7',
    gradeBand: '6-8',
    gunaId: 'dhairya',
    gunaName: 'धैर्य (Dhairya - Moral Fortitude & Perseverance)',
    title: 'Jatayu’s Valiant Stand: Courage Without Calculation',
    storyTitle: 'Standing Up for the Defenseless Despite Overwhelming Odds',
    sourceEpic: 'Ramayana',
    durationMinutes: 10,
    videoThumbnailGradient: 'from-[#FF9933]/35 via-[#FFD166]/25 to-[#17324D]/30',
    videoSynopsis: 'The aged bird Jatayu hears Mother Sita crying out in distress as the mighty ten-headed Ravana abducts her in his flying chariot. Fully aware that Ravana is armed with celestial blades and unmatched sorcery, Jatayu refuses to be a silent bystander and battles to his last breath to protect honor and justice.',
    passageText: 'Jatayu was old, frail, and possessed only his wings, beak, and talons. Ravana held the invincible sword Chandrahas. The easy choice was to look away, to rationalize that an old bird could never defeat the King of Lanka. Yet Jatayu plunged into the sky, attacking the chariot, shattering Ravana’s crown, and fighting until his wings were severed. His body fell to the earth, but his honor ascended to immortality.',
    questions: [
      {
        id: 'q3-1',
        question: 'Jatayu knew he was physically outmatched. Why did he still choose to fight Ravana?',
        hint: 'Dharma is measured by the righteousness of the cause, not the likelihood of winning.',
        category: 'introspection'
      },
      {
        id: 'q3-2',
        question: 'Have you ever seen someone being mocked or bullied in the corridor and remained silent out of fear of social retaliation?',
        hint: 'Reflect on how bystanders have the power to stop injustice simply by speaking up.',
        category: 'empathy'
      },
      {
        id: 'q3-3',
        question: 'How can you exercise "Moral Dhairya" when friends pressure you to do something unethical, like cheating on a test or spreading gossip?',
        hint: 'True courage is saying "No" to your friends when their actions harm someone else.',
        category: 'real-life'
      }
    ],
    explanationText: 'Moral courage (Dhairya) is the quiet inner resolve that refuses to compromise with wrongdoing. Mahatma Gandhi often cited Jatayu as the supreme exemplar of non-violent courage—a soul who intervened against sheer brute force not with cruelty, but with selfless duty. In school, this is the courage needed to stand next to a bullied student or report digital harassment.',
    lifeSkillTitle: 'Upstanding Against Bullying & Peer Pressure',
    lifeSkillApplication: 'Refusing to be a passive bystander, defending vulnerable peers, and having the integrity to say no to negative group behavior.',
    collectiveDiscussionPrompt: 'What is the difference between physical bravery and moral courage? Share an instance where saying "no" took more courage than fighting.',
    classmatePerspectives: [
      { studentName: 'Vihaan G.', grade: 'Class 7B', perspective: 'Standing up for the kid who gets teased isn’t easy, but staying quiet makes you part of the problem.' },
      { studentName: 'Meera N.', grade: 'Class 7A', perspective: 'Jatayu taught me that trying your absolute best for what is right is never a failure, even if you lose.' }
    ]
  },
  {
    id: 'lesson-4',
    classLevel: 'Class 8',
    gradeBand: '6-8',
    gunaId: 'samatvam',
    gunaName: 'समत्व (Samatvam - Equanimity & Emotional Balance)',
    title: 'Yudhishthira at the Enchanted Lake',
    storyTitle: 'The Yaksha Prashna: Clarity of Mind Under Deep Grief',
    sourceEpic: 'Mahabharata',
    durationMinutes: 11,
    videoThumbnailGradient: 'from-[#38BDF8]/30 via-[#22A06B]/20 to-[#17324D]/30',
    videoSynopsis: 'Dying of thirst in the dense Dwaita forest, four Pandava brothers drink from a forbidden lake without answering the crane-spirit’s questions and collapse dead. When Yudhishthira arrives, overcome with agonizing sorrow, he masterfully steadies his racing heart, masters his grief, and answers every profound riddle with radiant equanimity.',
    passageText: 'Yudhishthira knelt by the still water. His four beloved brothers lay motionless like fallen banyans. A storm of grief and fury raged in his chest. Yet when the unseen Yaksha spoke from the reeds, Yudhishthira did not lash out or panic. He took three deep breaths, anchored his mind in stillness, and calmly folded his hands: "I will not drink without answering your questions, O noble spirit. Ask, and I shall answer with honesty."',
    questions: [
      {
        id: 'q4-1',
        question: 'How was Yudhishthira able to control his panic and answer philosophical questions while his brothers lay dead beside him?',
        hint: 'Notice how anger and grief cloud logic, while calm breathing restores clear discernment.',
        category: 'introspection'
      },
      {
        id: 'q4-2',
        question: 'When an unexpected low mark or sports penalty happens, do you react with anger and blaming, or do you take time to reflect quietly?',
        hint: 'Examine your personal reflex to sudden disappointment.',
        category: 'empathy'
      },
      {
        id: 'q4-3',
        question: 'What is one breathing or mindfulness habit you can practice before opening examination papers or high-stress moments?',
        hint: 'Even 30 seconds of slow deep inhalation resets the nervous system into Samatvam.',
        category: 'real-life'
      }
    ],
    explanationText: 'The Bhagavad Gita defines Yoga as "समत्वं योग उच्यते" (Samatvam Yoga Uchyate—Equanimity is Yoga). Emotional poise is not about suppressing feelings, but about developing the inner ballast so that waves of success or failure do not capsize the boat of your mind. In modern academic life, this is the ultimate antidote to test anxiety, parental pressure, and gaming addiction.',
    lifeSkillTitle: 'Stress Resilience & Emotional Equilibrium',
    lifeSkillApplication: 'Handling high-stakes academic pressure, accepting defeat with sportsmanship, and making decisions with a calm, balanced intellect.',
    collectiveDiscussionPrompt: 'How can we help our friends remain calm and positive when board exam preparation or competitive stress feels overwhelming?',
    classmatePerspectives: [
      { studentName: 'Kabir D.', grade: 'Class 8C', perspective: 'When I get angry now, I count backwards from 10 before replying on group chats. It has saved me so many friendships.' },
      { studentName: 'Ananya R.', grade: 'Class 8A', perspective: 'Samatvam means knowing that one test score does not define your worth as a human being.' }
    ]
  },
  {
    id: 'lesson-5',
    classLevel: 'Class 3',
    gradeBand: '3-5',
    gunaId: 'ahimsa',
    gunaName: 'अहिंसा (Ahimsa - Kindness & Harmlessness)',
    title: 'The Golden Swan and the Forest Family',
    storyTitle: 'Gentle Benevolence Towards All Living Things',
    sourceEpic: 'Panchatantra',
    durationMinutes: 7,
    videoThumbnailGradient: 'from-[#FFD166]/40 via-[#FF9933]/25 to-[#22A06B]/25',
    videoSynopsis: 'A celestial golden swan visits an impoverished forest family and willingly sheds a golden feather to help them buy food. The story highlights the beauty of compassion towards animals and the danger of insatiable greed when the mother considers trapping the swan.',
    passageText: 'The golden swan landed gently on the straw roof of the mud cottage. He did not ask for grain or praise; seeing the children shivering, he simply ruffled his wings and dropped a single feather of pure gold. "Take this, sister, to the market," he chirped softly. Compassion gives without debt; it seeks only to soothe the suffering of the world.',
    questions: [
      {
        id: 'q5-1',
        question: 'Why did the swan return repeatedly to help the family, and what was the mother’s mistake?',
        hint: 'Reflect on the difference between gratitude and greed.',
        category: 'introspection'
      },
      {
        id: 'q5-2',
        question: 'How do you treat stray animals, birds, and insects in your school garden or home?',
        hint: 'Ahimsa includes feeding birds water during hot summers and not stomping on innocent creatures.',
        category: 'empathy'
      },
      {
        id: 'q5-3',
        question: 'Can words also cause harm like weapons? How can we speak kindly to younger siblings or friends?',
        hint: 'Verbal Ahimsa means never using insulting words or teasing that hurts someone’s self-esteem.',
        category: 'real-life'
      }
    ],
    explanationText: 'Ahimsa is the supreme virtue: Ahimsa Paramo Dharmah. It begins not just with avoiding physical blows, but with gentle speech and caring for flora and fauna. Cultivating Ahimsa in primary school lays the foundation for environmental conservation and empathetic citizenship.',
    lifeSkillTitle: 'Environmental Care & Gentle Speech',
    lifeSkillApplication: 'Caring for local ecology, feeding birds in summer, and using polite, gentle speech with peers and family.',
    collectiveDiscussionPrompt: 'What small eco-friendly actions can our class take together, like keeping a bird water bowl or planting tree saplings?',
    classmatePerspectives: [
      { studentName: 'Ishaan T.', grade: 'Class 3B', perspective: 'We started keeping an earthen bowl of water on our terrace, and so many sparrows come every morning!' }
    ]
  },
  {
    id: 'lesson-6',
    classLevel: 'Class 10',
    gradeBand: '9-10',
    gunaId: 'dharma',
    gunaName: 'धर्म (Dharma - Civic Ethics & Conscience)',
    title: 'Karna’s Moral Crossroads: Loyalty vs. Justice',
    storyTitle: 'The Agony of the Right Choice When Loyalty Clashes with Dharma',
    sourceEpic: 'Mahabharata',
    durationMinutes: 12,
    videoThumbnailGradient: 'from-[#17324D]/40 via-[#FF9933]/30 to-[#38BDF8]/20',
    videoSynopsis: 'On the eve of the Kurukshetra war, Sri Krishna reveals to Karna his true royal lineage and offers him the undisputed sovereignty of the earth. Karna must confront the profound existential tension between gratitude to his benefactor Duryodhana and the higher cosmic Dharma of the welfare of society.',
    passageText: 'The chariot stood silent in the amber twilight. Sri Krishna offered the golden crown of Hastinapura, the love of the Pandavas, and eternal renown. Karna wept silently. Duryodhana had sheltered him when the world laughed at his humble upbringing. Yet Karna knew Duryodhana walked the path of adharma and ruin. In that moment of agonizing clarity, Karna chose loyalty to his benefactor even while acknowledging that Dharma must triumph over personal bonds.',
    questions: [
      {
        id: 'q6-1',
        question: 'Why was Karna’s dilemma one of the most poignant moral crossroads in human literature?',
        hint: 'Consider how difficult it is when two genuine virtues—gratitude and justice—pull in opposite directions.',
        category: 'introspection'
      },
      {
        id: 'q6-2',
        question: 'Have you ever had a close friend ask you to help cover up something wrong they did? How did you handle that loyalty conflict?',
        hint: 'Real friendship sometimes means helping a friend face their mistakes rather than abetting wrong.',
        category: 'empathy'
      },
      {
        id: 'q6-3',
        question: 'How do you navigate civic conscience when public opinion on social media demands you take an extreme, polarized stance?',
        hint: 'Independent ethical thinking requires standing with truth, not with loudest mob.',
        category: 'real-life'
      }
    ],
    explanationText: 'As young adults enter Class 10, ethical decisions are rarely black-and-white. The story of Karna teaches senior students the mature art of moral discernment (Viveka). It challenges us to look beyond tribal loyalty and peer conformity, anchoring our conscience in universal justice and social welfare.',
    lifeSkillTitle: 'Independent Moral Discernment (Viveka)',
    lifeSkillApplication: 'Navigating ethical grey zones, resisting negative peer loyalty, and maintaining constitutional and civic integrity.',
    collectiveDiscussionPrompt: 'Is true loyalty blind, or does a real friend have a duty to stop their companion from making disastrous ethical mistakes?',
    classmatePerspectives: [
      { studentName: 'Sneha V.', grade: 'Class 10A', perspective: 'If my best friend is cheating or bullying, letting them continue isn’t loyalty—it’s helping them ruin their own future.' }
    ]
  }
];

export const initialBadges: Badge[] = [
  {
    id: 'badge-first-step',
    title: 'Pathfinder of Bharat',
    sanskritTitle: 'आरम्भिक साधक',
    description: 'Began your moral exploration journey by opening your first lesson module.',
    iconName: 'Compass',
    requiredMetric: 'Start 1 lesson',
    unlocked: true,
    unlockedAt: 'Today'
  },
  {
    id: 'badge-story-listener',
    title: 'Katha Shravana',
    sanskritTitle: 'कथा श्रवण',
    description: 'Fully watched and completed the story video for any classical moral tale.',
    iconName: 'Video',
    requiredMetric: 'Complete 1 video',
    unlocked: false
  },
  {
    id: 'badge-contemplative-mind',
    title: 'Chintan Seeker',
    sanskritTitle: 'चिन्तन साधक',
    description: 'Carefully studied a reflection passage and grasped the core moral crossroads.',
    iconName: 'Feather',
    requiredMetric: 'Complete 1 passage',
    unlocked: false
  },
  {
    id: 'badge-honest-pen',
    title: 'Swadhyaya Diarist',
    sanskritTitle: 'स्वाध्याय व्रत',
    description: 'Submitted your personal reflection responses to introspective dilemmas.',
    iconName: 'BookOpen',
    requiredMetric: 'Submit answers for 1 question set',
    unlocked: false
  },
  {
    id: 'badge-vinaya-master',
    title: 'Embodiment of Vinaya',
    sanskritTitle: 'विनय विभूषण',
    description: 'Mastered the lesson on Humility and Modesty across both Individual and Collective modes.',
    iconName: 'Award',
    requiredMetric: 'Complete all steps of Lesson 1',
    unlocked: false
  },
  {
    id: 'badge-satsanga-circle',
    title: 'Satsanga Harmonizer',
    sanskritTitle: 'सत्संग मित्र',
    description: 'Actively participated in Collective Mode dialogue and recorded group insights.',
    iconName: 'Users',
    requiredMetric: 'Complete 1 collective mode session',
    unlocked: false
  },
  {
    id: 'badge-guna-collector',
    title: 'Samskara Virtuoso',
    sanskritTitle: 'षोडश गुण रत्न',
    description: 'Completed modules across at least 3 distinct Gunas.',
    iconName: 'Sparkles',
    requiredMetric: 'Complete 3 full lessons',
    unlocked: false
  }
];
