import { Lesson, ExplanationSection } from '../types';

export const satyavrataLesson: Lesson = {
  id: 'class-6-satyavrata',
  classLevel: 'Class 6',
  gradeBand: '6-8',
  gunaId: 'satya',
  gunaName: 'सत्य (Satya - Truthfulness, Discernment & Compassion)',
  title: 'Class 6 — Satyavrata: The Dilemma of Truth',
  storyTitle: 'Satyavrata & The Hunter: When Truth Meets Compassion',
  sourceEpic: 'Mahabharata',
  durationMinutes: 9,
  videoThumbnailGradient: 'from-[#FF9933]/35 via-[#FFD166]/20 to-[#22A06B]/30',
  videoSynopsis: 
    'An earnest forest seeker named Satyavrata has taken a sacred lifelong vow: under no circumstance will he ever speak an untruth. One quiet afternoon, a terrified deer, fleeing for its life, darts past his cottage and hides in the dense brush by the hermitage stream. Moments later, a fierce, exhausted hunter with a drawn bow rushes in and asks directly: "O seeker of truth, did you see the deer? Where is it hiding?" If Satyavrata speaks the literal truth, an innocent creature dies. If he denies seeing it, his sacred vow of truthfulness is broken. Satyavrata is caught at the agonizing crossroads where literal honesty threatens compassion and life itself.',
  videoUrl: (import.meta as any).env?.VITE_LESSON_VIDEO_URL || 'https://sueccxsiimptiaingzjg.supabase.co/storage/v1/object/public/videos/Team-Integrity-SnapYT.App.mp4',
  passageText: 
`A Difficult Choice at School

During a school exhibition, a student notices that a classmate has accidentally damaged an important project. Another student is wrongly blamed for the damage. The teacher asks the class what happened.

The student who witnessed the incident faces a difficult choice. Telling the truth could embarrass the classmate who caused the damage. Remaining silent could allow an innocent student to be punished for something they did not do.

The student must decide how to respond while considering truth, compassion, fairness, and responsibility.

Central reflection: What should you do when truth, compassion, and justice seem to conflict?`,
  questions: [
    {
      id: 'q1-probable-action',
      questionNumber: 1,
      question: 'What will most probably happen in this situation?',
      hint: 'Think about human nature under pressure: do most witnesses immediately stand up, look down in silence, or whisper to friends?',
      category: 'Likely Human Behaviour',
      facilitatorNotes: 'Encourage students to be honest about realistic human reactions rather than jumping straight to idealized hero answers.',
      options: [
        {
          id: 'q1-opt-a',
          text: 'The witness remains silent or looks away, hoping someone else will speak up or that the teacher will drop the matter.',
          tag: 'Passive Silence'
        },
        {
          id: 'q1-opt-b',
          text: 'The witness immediately calls out the classmate’s name publicly in front of the entire class, blurted out in the rush of the moment.',
          tag: 'Public Accusation'
        },
        {
          id: 'q1-opt-c',
          text: 'The classmate who caused the accidental damage speaks up honestly on their own before anyone else has to speak.',
          tag: 'Spontaneous Confession'
        },
        {
          id: 'q1-opt-d',
          text: 'The wrongly accused student is unfairly punished because everyone stays quiet to avoid conflict or social embarrassment.',
          tag: 'Unjust Outcome'
        }
      ]
    },
    {
      id: 'q2-probable-reason',
      questionNumber: 2,
      question: 'Why will people most probably act in that way?',
      hint: 'What inner feelings drive hesitation? Is it fear of being called a "snitch", fear of angering friends, or anxiety about punishment?',
      category: 'Underlying Motives & Psychology',
      facilitatorNotes: 'Explore the emotional drivers: peer loyalty vs fear of rejection vs bystander paralysis.',
      options: [
        {
          id: 'q2-opt-a',
          text: 'Fear of peer disapproval, being labeled a "snitch" or "informer," and losing friends in the class.',
          tag: 'Peer Pressure & Fear'
        },
        {
          id: 'q2-opt-b',
          text: 'Panic about consequences—the student who damaged the project fears harsh scolding, parent calls, or marks deduction.',
          tag: 'Fear of Consequences'
        },
        {
          id: 'q2-opt-c',
          text: 'The "Bystander Effect"—assuming someone else who saw it will speak, or feeling it is not one’s personal business.',
          tag: 'Diffusion of Responsibility'
        },
        {
          id: 'q2-opt-d',
          text: 'Relief that the accusation did not fall on oneself, leading to quiet self-protection.',
          tag: 'Self-Preservation'
        }
      ]
    },
    {
      id: 'q3-recommended-action',
      questionNumber: 3,
      question: 'What should be done in this situation?',
      hint: 'Consider how to prevent an innocent person from taking the blame, while treating the person who made the mistake with dignity.',
      category: 'Ethical & Responsible Action',
      facilitatorNotes: 'Guide the class to see that truthfulness and compassion can work together rather than cancelling each other out.',
      options: [
        {
          id: 'q3-opt-a',
          text: 'Privately approach the classmate who caused the accident, support them with kindness, and encourage them to go together to the teacher to explain.',
          tag: 'Empathetic Encouragement'
        },
        {
          id: 'q3-opt-b',
          text: 'Speak privately and respectfully to the teacher after class, ensuring the innocent student is cleared without publicly humiliating the classmate.',
          tag: 'Discreet Truth'
        },
        {
          id: 'q3-opt-c',
          text: 'Stand up immediately and calmly tell the teacher in class that the accused student is innocent, asking to explain the details privately.',
          tag: 'Immediate Upstanding'
        },
        {
          id: 'q3-opt-d',
          text: 'Stay silent about the cause, but offer to stay after school and help the wrongly accused student repair the project together.',
          tag: 'Silent Compensation'
        }
      ]
    },
    {
      id: 'q4-recommended-reason',
      questionNumber: 4,
      question: 'Why should it be done that way?',
      hint: 'Why is it crucial that truth does not become an instrument of cruelty, and compassion does not become a cover for injustice?',
      category: 'Moral Rationale & Civilizational Wisdom',
      facilitatorNotes: 'Synthesize the principle: Satya (truth) seeks restoration and justice, not public humiliation or revenge.',
      options: [
        {
          id: 'q4-opt-a',
          text: 'Because justice strictly requires that an innocent person must never bear punishment for someone else’s unintentional accident.',
          tag: 'Fairness & Justice'
        },
        {
          id: 'q4-opt-b',
          text: 'Because true compassion does not mean hiding wrongdoing; it means handling the truth with gentleness, dignity, and restorative help.',
          tag: 'Compassionate Truth'
        },
        {
          id: 'q4-opt-c',
          text: 'Because public humiliation creates bitter resentment, whereas respectful truth-telling fosters genuine remorse and character growth.',
          tag: 'Restorative Growth'
        },
        {
          id: 'q4-opt-d',
          text: 'Because taking responsibility for mistakes without fear of cruelty builds lasting moral courage (Dhairya) and trust in school.',
          tag: 'Moral Fortitude'
        }
      ]
    }
  ],
  explanationText: 
    'The story of Satyavrata and the school exhibition dilemma teach the profound difference between blind, literal speech and true Satya. Satya in Indian thought is rooted in "Sat"—that which sustains the ultimate welfare, harmony, and dignity of all living beings. When truth is spoken with malice to hurt, or when silence protects injustice against the innocent, Dharma is violated. True ethical wisdom requires speaking the truth in a manner that protects the innocent from harm while giving the mistaken person an honorable path to responsibility without public cruelty.',
  lifeSkillTitle: 'Courageous, Restorative Truth-Telling',
  lifeSkillApplication: 
    'Speaking up for falsely blamed classmates, communicating sensitive facts privately rather than spreading public gossip, and creating a supportive environment where peers can admit accidents without terror.',
  collectiveDiscussionPrompt: 
    'If you were the teacher in this classroom, how would you respond when a student confesses an accidental mistake? How can teachers and schools make it safe for students to be honest?',
  classmatePerspectives: [
    { studentName: 'Aarav S.', grade: 'Class 6A', perspective: 'If someone broke it by accident, they are already scared. If I help them tell the teacher together, they will feel supported to do the right thing.' },
    { studentName: 'Ananya G.', grade: 'Class 6B', perspective: 'Staying silent when an innocent person gets punished is not friendship—it is watching someone get hurt to protect your own comfort.' },
    { studentName: 'Vihaan T.', grade: 'Class 6C', perspective: 'Speaking privately to the teacher saves the innocent student while saving the classmate from being teased by everyone.' }
  ]
};

export const satyavrataExplanationParts: ExplanationSection[] = [
  {
    partNumber: 1,
    heading: 'Part 1: What might happen?',
    title: 'The Realities of Human Reaction Under Social Pressure',
    content: 
      'In real school environments, when an accident occurs and an innocent student is blamed, the most frequent initial response is awkward silence. Many witnesses look down at their desks or pretend not to have seen anything. Others might whisper to their seatmates. Occasionally, someone might impulsively blurt out the classmate\'s name out of panic or excitement. The classmate who caused the damage is often paralyzed by fear, hoping the moment passes. Consequently, without intervention, misunderstandings often lead to an innocent student bearing the consequence.',
    keyTakeaway: 'Natural fear and social embarrassment often cause people to hesitate, leaving innocent peers vulnerable.'
  },
  {
    partNumber: 2,
    heading: 'Part 2: Why might they act that way?',
    title: 'Deconstructing Fear, Loyalty, and the Bystander Effect',
    content: 
      'Why do well-meaning students hesitate to speak? The primary driver is fear: fear of being ostracized as a "complainer" or "snitch," fear of damaging a friendship, and fear of the teacher\'s strict disciplinary anger. The classmate who damaged the project is terrified of public humiliation, parental disappointment, or marks penalties. Furthermore, the "diffusion of responsibility" convinces individuals that someone else will surely speak up. These are understandable human emotions, but allowing fear to dictate action results in injustice.',
    keyTakeaway: 'Misguided loyalty and fear of consequences frequently silence students, confusing solidarity with enabling injustice.'
  },
  {
    partNumber: 3,
    heading: 'Part 3: What should be done?',
    title: 'A Responsible Response That Protects the Innocent Respectfully',
    content: 
      'The ethically mature response bridges both justice and compassion. The student witness should take active responsibility: \n\n1. Privately approach the classmate who caused the accident: "I saw that it was an accident. But it isn\'t fair that our classmate is taking the blame. Let us go talk to the teacher together; I will stand with you."\n2. If the classmate is too frightened, the witness should speak privately and respectfully to the teacher or a trusted school counselor after class: "Ma\'am/Sir, the student being blamed did not do it. It was an unintentional accident, and I wanted to ensure the innocent student is cleared without creating a public spectacle."\n\nThis prevents the innocent student from being punished while shielding the classmate from harsh public mockery.',
    keyTakeaway: 'Responsible action protects the innocent from false blame while communicating the truth with private dignity.'
  },
  {
    partNumber: 4,
    heading: 'Part 4: Why should it be done that way?',
    title: 'The Harmony of Satya, Ahimsa, and Nyaya (Fairness)',
    content: 
      'Ancient Indian philosophy offers a timeless compass: "सत्यं ब्रूयात् प्रियं ब्रूयात् न ब्रूयात् सत्यमप्रियम्" (Satyam bruyat, priyam bruyat—Speak the truth that elevates; speak it with benevolence, not as a weapon of destruction). \n\nCompassion does NOT require covering up wrongdoing or letting an innocent person suffer. Similarly, honesty does NOT require public shaming, loud accusations, or cruelty. By separating the truth from public humiliation, we uphold justice (Nyaya), preserve compassion (Daya), and cultivate a school culture where students have the moral fortitude (Dhairya) to admit mistakes and make amends.',
    keyTakeaway: 'Compassion never requires hiding injustice, and honesty never requires cruelty. True Satya restores fairness with compassion.'
  }
];
