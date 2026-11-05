import { Lesson, ExplanationSection } from '../types';

export const panchatantraTruthLesson: Lesson = {
  id: 'class-6-panchatantra-truth',
  classLevel: 'Class 6',
  gradeBand: '6-8',
  gunaId: 'satya',
  gunaName: 'सत्य (Satya - Truthfulness, Discernment & Evidence)',
  title: 'Class 6 — Panchatantra: Dharma Buddhi & Papa Buddhi',
  storyTitle: 'Dharma Buddhi & Papa Buddhi: The False Witness & The Triumph of Truth',
  sourceEpic: 'Panchatantra',
  durationMinutes: 2,
  videoThumbnailGradient: 'from-[#22A06B]/35 via-[#38BDF8]/20 to-[#FF9933]/30',
  videoSynopsis:
    'Two companions, Dharma Buddhi (the virtuous) and Papa Buddhi (the wicked), earn great wealth and bury their shared treasure pot beneath an ancient banyan tree before entering their village. That very night, Papa Buddhi sneaks back, digs up the entire gold treasure, and steals it. Later, finding the pit empty, Papa Buddhi boldly points a finger and accuses innocent Dharma Buddhi of theft! Before the village elders, Papa Buddhi claims the sacred banyan tree itself will bear witness. Having secretly hidden his own father inside the tree trunk hollow, a ghostly voice emerges falsely proclaiming Dharma Buddhi the thief! While the elders prepare to punish the innocent, Dharma Buddhi remains calm and discerning. Suspecting human trickery, he piles dry leaves at the tree hollow and lights a smoke fire. The coughing father stumbles out, begging forgiveness and exposing his son’s greedy scheme. Papa Buddhi is punished, proving that truth cannot be fabricated by confident lies or false witnesses: facts and careful investigation alone establish the truth.',
  videoUrl: (import.meta as any).env?.VITE_PANCHATANTRA_VIDEO_URL || '/assets/videos/panchatantra_truth.mp4',
  passageText:
`The Missing Science Fair Pen Drive & The Confident Accusation

During recess before the annual inter-school science exhibition, the main USB pen drive containing the final presentation of Team Aryabhata goes missing from the computer lab desk. 

Ritik, the team leader, notices his pen drive is gone and panics. Without checking the lab computer logs or asking the teacher, he loudly points his finger at Samar, a quiet teammate who was the last person seen near the desk. Ritik declares in front of the whole class: "Samar took it! Gaurav told me he saw Samar putting something into his pencil pouch!"

Gaurav nods quickly, saying, "Yes, I saw Samar reaching near the teacher's table earlier."

Suddenly, the whole classroom turns against Samar. Students start whispering, and several urge the class teacher to disqualify Samar immediately. Samar is shocked and insists he only went to pick up his own dropped eraser. 

Anika, another teammate, feels uncomfortable with the rush to judgment. She knows that loud accusations and apparent witnesses can easily be mistaken or biased, and that truth requires calm fact-finding rather than angry crowd pressure.

Central reflection: How should students and teachers handle confident accusations when a crowd quickly decides someone is guilty without examining actual evidence?`,
  questions: [
    {
      id: 'pt-q1-probable-action',
      questionNumber: 1,
      question: 'What will most probably happen in the classroom in this situation?',
      hint: 'Think about typical school peer dynamics: do students pause to investigate logs, or do they immediately join the crowd in believing the loud accusation?',
      category: 'Likely Human Behaviour',
      facilitatorNotes: 'Encourage students to reflect honestly on mob mentality and how quickly rumors become accepted facts.',
      options: [
        {
          id: 'pt-q1-opt-a',
          text: 'Most classmates immediately side with Ritik because he is confident and has a witness, isolating Samar before any real evidence is verified.',
          tag: 'Bandwagon Condemnation'
        },
        {
          id: 'pt-q1-opt-b',
          text: 'The class falls completely silent, waiting for the teacher to conduct a thorough and objective search.',
          tag: 'Passive Waiting'
        },
        {
          id: 'pt-q1-opt-c',
          text: 'Samar loses his temper, shouting back in anger, which makes everyone believe he is guilty even though he is innocent.',
          tag: 'Defensive Escalation'
        },
        {
          id: 'pt-q1-opt-d',
          text: 'A peer stands up calmly and asks to check the computer lab recycling bin, teacher’s drawer, and system log before blaming anyone.',
          tag: 'Calm Investigation'
        }
      ]
    },
    {
      id: 'pt-q2-probable-reason',
      questionNumber: 2,
      question: 'Why do people so easily believe confident accusations without checking evidence?',
      hint: 'What makes human minds susceptible to false witnesses and loud blame? Consider authority bias, speed of drama, and fear of questioning the majority.',
      category: 'Underlying Motives & Psychology',
      facilitatorNotes: 'Discuss how Papa Buddhi used a fake tree voice to manipulate the elders’ belief in miracles.',
      options: [
        {
          id: 'pt-q2-opt-a',
          text: 'Because confidence and emotional intensity are often mistaken for truth, while verifying facts requires patience, effort, and neutral thinking.',
          tag: 'Superficial Confidence Bias'
        },
        {
          id: 'pt-q2-opt-b',
          text: 'People feel uncomfortable with uncertainty and prefer an immediate scapegoat rather than admitting they do not know what happened.',
          tag: 'Need for Closure'
        },
        {
          id: 'pt-q2-opt-c',
          text: 'Bystanders fear that speaking up for the accused person will make the group turn against them next.',
          tag: 'Social Fear & Conformity'
        },
        {
          id: 'pt-q2-opt-d',
          text: 'People automatically trust anyone who brings an apparent eyewitness, forgetting that witnesses can also lie or be mistaken.',
          tag: 'Uncritical Trust in Witnesses'
        }
      ]
    },
    {
      id: 'pt-q3-recommended-action',
      questionNumber: 3,
      question: 'What should be done when an accusation is made without clear proof?',
      hint: 'Recall how Dharma Buddhi tested the hollow tree with smoke instead of accepting the voice blindly.',
      category: 'Ethical & Responsible Action',
      facilitatorNotes: 'Highlight the legal and moral principle: innocence until proven guilty, and the duty to investigate with facts.',
      options: [
        {
          id: 'pt-q3-opt-a',
          text: 'Stop the blame game immediately, separate emotions from facts, and systematically examine verifiable evidence (like searching bags together or checking lab logs).',
          tag: 'Systematic Fact-Finding'
        },
        {
          id: 'pt-q3-opt-b',
          text: 'Allow both Ritik and Samar to present their sides calmly before an impartial teacher without interrupting or shouting.',
          tag: 'Impartial Hearing'
        },
        {
          id: 'pt-q3-opt-c',
          text: 'Privately speak with Gaurav to verify what he actually saw, distinguishing real observation from assumptions.',
          tag: 'Witness Clarification'
        },
        {
          id: 'pt-q3-opt-d',
          text: 'Refuse to condemn or exclude Samar socially until the physical facts are indisputably established.',
          tag: 'Refusal to Prejudge'
        }
      ]
    },
    {
      id: 'pt-q4-recommended-reason',
      questionNumber: 4,
      question: 'Why must truth be established through evidence rather than crowd belief or loud claims?',
      hint: 'What is the civilizational lesson of Satya? Connect to the Panchatantra quote: "Facts alone establish the truth."',
      category: 'Moral Rationale & Civilizational Wisdom',
      facilitatorNotes: 'Connect with Satyam Eva Jayate — Truth alone triumphs, but only when people have the courage to uncover real facts.',
      options: [
        {
          id: 'pt-q4-opt-a',
          text: 'Because condemning an innocent person destroys trust, causes irreversible emotional harm, and allows the real culprit to escape.',
          tag: 'Justice & Protection of Innocent'
        },
        {
          id: 'pt-q4-opt-b',
          text: 'Because the confidence of a claim and the number of people who believe it have zero bearing on whether it is actually true.',
          tag: 'Principle of Objective Truth'
        },
        {
          id: 'pt-q4-opt-c',
          text: 'Because Dharma Buddhi demonstrated that intelligent discernment (Viveka) uncovers deceit, while blind belief enables corruption.',
          tag: 'Viveka & Discernment'
        },
        {
          id: 'pt-q4-opt-d',
          text: 'Because a society that replaces evidence with rumors and false witnesses will eventually collapse under injustice.',
          tag: 'Civilizational Integrity'
        }
      ]
    }
  ],
  explanationText:
    'The Panchatantra tale of Dharma Buddhi and Papa Buddhi teaches one of the greatest civilizational lessons of Bharat: "Truth cannot be established merely by the confidence of an accusation, the apparent authority of a witness, or the number of people who believe a claim." Papa Buddhi used high confidence, emotional fury, and even a staged divine voice from a hollow banyan tree to frame his virtuous friend. Yet Dharma Buddhi did not panic or react with anger. He applied sharp discernment (Viveka), tested the claim with smoke, and revealed the hidden deception. In 21st-century school life and digital media, where rumors, fake news, and confident accusations can ruin an innocent student’s reputation in minutes, cultivating Dharma Buddhi’s calm commitment to verifiable truth is the ultimate life skill.',
  lifeSkillTitle: 'Critical Discernment & Refusing False Accusations',
  lifeSkillApplication:
    'Refusing to forward unverified rumors or social media call-outs, demanding verifiable facts before judging a classmate, and staying calm and analytical when facing false blame.',
  collectiveDiscussionPrompt:
    'When a whole group or crowd has already decided that someone is guilty based on a confident rumor, what gives a person the moral courage to say: "Wait, where is the actual proof?"',
  classmatePerspectives: [
    { studentName: 'Rohan M.', grade: 'Class 6A', perspective: 'When Papa Buddhi claimed the tree spoke, the elders were ready to punish Dharma Buddhi. It showed me that even elders can be fooled if they don’t look for proof.' },
    { studentName: 'Megha V.', grade: 'Class 6B', perspective: 'Dharma Buddhi’s idea to use smoke was genius. He didn’t fight or cry; he investigated calmly. That is true presence of mind.' },
    { studentName: 'Yash S.', grade: 'Class 6C', perspective: 'On WhatsApp groups, people share fake screenshots and everyone starts blaming someone. This Panchatantra story should be taught to everyone on social media.' }
  ]
};

export const panchatantraExplanationParts: ExplanationSection[] = [
  {
    partNumber: 1,
    heading: 'Part 1: What might happen?',
    title: 'The Velocity of Accusations & Mob Consensus',
    content:
      'When an accusation is delivered with aggressive confidence and reinforced by an apparent eyewitness, social groups undergo a psychological phenomenon known as confirmation cascade. Bystanders assume that because someone speaks with certainty and points a finger, the accusation must be grounded in truth. The accused student is immediately put on the defensive, where even silence or trembling is misinterpreted as a sign of guilt. In school corridors and online chat groups, a reputation can be shattered within minutes before any teacher or neutral third party examines the timeline or physical evidence.',
    keyTakeaway: 'Loud confidence and emotional outrage often create an instant illusion of guilt before facts are examined.'
  },
  {
    partNumber: 2,
    heading: 'Part 2: Why might they act that way?',
    title: 'The Deceptive Psychology of False Authority & Staged Witnesses',
    content:
      'In the Panchatantra, Papa Buddhi did not merely lie; he engineered an apparent miracle by putting his father inside the hollow banyan tree. Why did the village elders believe the tree? Because human beings naturally defer to authority, tradition, and dramatic spectacles. When someone produces an "eyewitness" or claims "everyone knows," our critical thinking shuts down. Furthermore, doubting the accusation requires intellectual effort and courage, whereas joining the chorus of blame feels safe and socially rewarding. Papa Buddhi counted on this exact human weakness to steal the gold and destroy his friend.',
    keyTakeaway: 'Deceivers rely on dramatic claims and staged witnesses because crowds rarely pause to investigate the hollow trunk.'
  },
  {
    partNumber: 3,
    heading: 'Part 3: What should be done?',
    title: 'Dharma Buddhi’s Method: Calmness, Reason & The Smoke Test',
    content:
      'Notice Dharma Buddhi’s extraordinary composure. He did not yell, curse, or collapse in despair. Instead, he employed Viveka (discernment). He asked himself a logical question: "Trees do not speak. There must be a physical explanation." By setting dry leaves on fire, the smoke forced the concealed witness into the open.\n\nIn modern school life, the "smoke test" means:\n1. Requiring objective evidence: Checking computer logs, security cameras, or physical locations.\n2. Cross-examining testimonies: Asking what the witness actually saw versus what they inferred.\n3. Protecting the dignity of the accused: Never imposing punishment or social ostracism without verified proof.',
    keyTakeaway: 'Face false accusations with calm investigation (Viveka) rather than panicked aggression.'
  },
  {
    partNumber: 4,
    heading: 'Part 4: Why should it be done that way?',
    title: 'Satyam Eva Jayate: The Civilizational Foundation of Bharat',
    content:
      'The sacred national motto of Bharat, "सत्यमेव जयते" (Satyam Eva Jayate — Truth Alone Triumphs), is not just an idealistic slogan; it is a practical law of life demonstrated in this tale. Dishonesty may win the first round through clever plots and loud accusations, but falsehood is inherently fragile. It requires endless lies and hollow hiding places to survive.\n\nWhen we refuse to participate in unverified gossip, when we insist on fairness and evidence, we protect our school, our friends, and our own moral character. As the Panchatantra sage concluded: "Facts alone establish the truth."',
    keyTakeaway: 'Truth cannot be defeated by noise; when tested by evidence and moral courage, truth always prevails.'
  }
];
