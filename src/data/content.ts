import { Guna, Language, LearningStep } from '../types';

export interface TranslationBundle {
  nav: {
    about: string;
    curriculum: string;
    howItWorks: string;
    modes: string;
    login: string;
    register: string;
  };
  motto: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
  };
  entrance: {
    exploreBtn: string;
    beginBtn: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    philosophyTitle: string;
    philosophyText: string;
    objectivesTitle: string;
    objectivesList: string[];
    outcomesTitle: string;
    outcomesList: string[];
  };
  curriculum: {
    badge: string;
    title: string;
    subtitle: string;
    gunasCount: string;
    gunasHeading: string;
    sourcesTitle: string;
    modernSkillsTitle: string;
    gradeTabs: { id: string; label: string; ageRange: string }[];
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    steps: LearningStep[];
    sampleTitle: string;
    sampleSubtitle: string;
  };
  modes: {
    badge: string;
    title: string;
    subtitle: string;
    sharedCoreTitle: string;
    sharedCoreDescription: string;
    individualTitle: string;
    individualSubtitle: string;
    individualPoints: string[];
    collectiveTitle: string;
    collectiveSubtitle: string;
    collectivePoints: string[];
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contact: string;
    privacy: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationBundle> = {
  en: {
    nav: {
      about: "About",
      curriculum: "Curriculum",
      howItWorks: "How It Works",
      modes: "Learning Modes",
      login: "Login",
      register: "Register Now"
    },
    motto: {
      sanskrit: "आत्मवत् सर्वभूतेषु यः पश्यति स पश्यति।",
      transliteration: "ātmavat sarvabhūteṣu yaḥ paśyati sa paśyati.",
      meaning: "One who sees all living beings as one's own self, truly sees."
    },
    entrance: {
      exploreBtn: "Explore Our Curriculum",
      beginBtn: "Begin Learning"
    },
    about: {
      badge: "About Samskara Bharat",
      title: "Rooted in Wisdom, Ready for Tomorrow",
      subtitle: "A conscious educational initiative for students from LKG to Class 10, synthesizing India's civilizational values with modern character education.",
      visionTitle: "Our Vision",
      visionText: "To nurture generations of young citizens who embody inner ethical fortitude, deep empathy for society and nature, and the clarity to thrive with honor in an interconnected world.",
      missionTitle: "Our Mission",
      missionText: "To integrate values naturally into school education through culturally rooted, reflection-based pedagogy—transforming moral learning from passive recitation into active introspection.",
      philosophyTitle: "Educational Philosophy: 'Chintan' (Experiential Reflection)",
      philosophyText: "Character cannot be taught by preaching or memorization. True Samskara takes root when a child engages in 'Chintan'—encountering a living narrative dilemma, examining their inner motives, testing virtues against real situations, and consciously choosing Dharma.",
      objectivesTitle: "Core Objectives",
      objectivesList: [
        "Inculcate 16 foundational human virtues (Gunas) progressively from early childhood to adolescence.",
        "Ground students in timeless stories from the Ramayana, Mahabharata, and Panchatantra without dogmatism.",
        "Bridge classical ethics directly into contemporary life skills: digital balance, emotional resilience, peer kindness, and civic duty.",
        "Equip schools with measurable, non-judgmental reflective rubrics that track holistic character growth."
      ],
      outcomesTitle: "Expected Outcomes",
      outcomesList: [
        "Moral Autonomy: Ability to discern right from expedient when unobserved.",
        "Universal Empathy: Living the truth that every fellow being shares the same divine spark.",
        "Emotional Poise (Samatvam): Resilience in facing scholastic setbacks, competition, and peer pressures.",
        "Reverence for Heritage: Pride in civilizational wisdom while upholding progressive, scientific inquiry."
      ]
    },
    curriculum: {
      badge: "Curriculum Architecture",
      title: "16 Gunas & The Three Timeless Streams",
      subtitle: "A balanced multi-tier syllabus uniting classical epics with practical 21st-century modern life skills for grades LKG to 10.",
      gunasCount: "16 Foundational Gunas",
      gunasHeading: "The Moral Compass of Bharat",
      sourcesTitle: "Three Streams of Living Wisdom",
      modernSkillsTitle: "Modern Life Skills Integration",
      gradeTabs: [
        { id: "all", label: "All Grades (LKG - 10)", ageRange: "Ages 3 to 16" },
        { id: "lkg-2", label: "LKG - Class 2", ageRange: "Early Explorers (Ages 3-7)" },
        { id: "3-5", label: "Class 3 - 5", ageRange: "Foundations (Ages 8-10)" },
        { id: "6-8", label: "Class 6 - 8", ageRange: "Middle Scholars (Ages 11-13)" },
        { id: "9-10", label: "Class 9 - 10", ageRange: "Senior Thinkers (Ages 14-16)" }
      ]
    },
    howItWorks: {
      badge: "Pedagogy",
      title: "The 5-Phase Reflection Cycle",
      subtitle: "Every module moves systematically from narrative immersion to personal introspection and everyday practice.",
      steps: [
        {
          number: "01",
          title: "Storytelling (Katha)",
          subtitle: "Living narrative immersion",
          description: "Captivating, culturally authentic tales from the Ramayana, Mahabharata, or Panchatantra that capture imagination and present an emotional dilemma.",
          iconName: "BookOpen"
        },
        {
          number: "02",
          title: "Reflection Passage (Prashna Prasanga)",
          subtitle: "The central moral knot",
          description: "A focused, age-calibrated passage highlighting where a character stood at a crossroads between comfort and Dharma, honesty and fear.",
          iconName: "Feather"
        },
        {
          number: "03",
          title: "Reflection Questions (Chintan)",
          subtitle: "Introspective inquiry",
          description: "Carefully calibrated questions: 'What would you feel in their place?', 'Why did patience win?', and 'Where did you face this recently?'",
          iconName: "HelpCircle"
        },
        {
          number: "04",
          title: "Guided Explanation (Bodha)",
          subtitle: "Connecting value to modern life",
          description: "The teacher or platform provides a clear, compassionate synthesis connecting the ancient episode to school life, digital conduct, and family harmony.",
          iconName: "Compass"
        },
        {
          number: "05",
          title: "Progress Tracking (Sadhana Record)",
          subtitle: "Continuous character awareness",
          description: "Non-competitive, positive milestone journaling where students observe their own growth in patience, truthfulness, and helpfulness.",
          iconName: "TrendingUp"
        }
      ],
      sampleTitle: "Interactive Pedagogy Preview",
      sampleSubtitle: "See how a single narrative transforms into student self-discovery"
    },
    modes: {
      badge: "Dual Learning Modes",
      title: "Individual Mode & Collective Mode",
      subtitle: "Both modes share the identical learning journey and moral foundations, yet differ in participation style and reflection medium.",
      sharedCoreTitle: "The Shared Foundation",
      sharedCoreDescription: "Whether studying alone or in a bustling classroom, every student explores the same 16 Gunas, the same canonical stories, and the same 5-stage reflection framework.",
      individualTitle: "Individual Mode (Swadhyaya)",
      individualSubtitle: "Independent thinking & personal introspective responses",
      individualPoints: [
        "Self-paced exploration tailored for quiet home study or individual library hours.",
        "Private digital reflection notebook where personal struggles and breakthroughs remain safe.",
        "Direct introspective answering without fear of peer judgment or rush.",
        "Encourages deep personal accountability, conscience-building, and self-honesty."
      ],
      collectiveTitle: "Collective Mode (Satsanga / Sahachintan)",
      collectiveSubtitle: "Group discussion, shared perspectives & teacher-guided reflection",
      collectivePoints: [
        "Classroom or study-circle setting led by a trained value-education educator.",
        "Open dialogue circles where students hear how classmates view the same moral dilemma.",
        "Fosters deep empathy, active listening, respect for diverse viewpoints, and civic debate.",
        "Teacher-guided synthesis that grounds collective consensus in timeless Dharma."
      ]
    },
    footer: {
      tagline: "Empowering children from LKG to Class 10 with timeless values, cultural reverence, and modern character.",
      quickLinks: "Quick Navigation",
      contact: "Contact & School Inquiries",
      privacy: "Privacy & Data Ethics",
      rights: "All rights reserved. Dedicated to the holistic character education of Indian youth."
    }
  },
  te: {
    nav: {
      about: "మా గురించి",
      curriculum: "పాఠ్యప్రణాళిక",
      howItWorks: "ఇది ఎలా పనిచేస్తుంది",
      modes: "అభ్యాస విధానాలు",
      login: "లాగిన్",
      register: "ఇప్పుడే నమోదు చేసుకోండి"
    },
    motto: {
      sanskrit: "आत्मवत् सर्वभूतेषु यः पश्यति स पश्यति।",
      transliteration: "ఆత్మవత్ సర్వభూతేషు యః పశ్యతి స పశ్యతి।",
      meaning: "సకల ప్రాణులను తనతో సమానంగా దర్శించేవాడే నిజమైన జ్ఞాని."
    },
    entrance: {
      exploreBtn: "మా పాఠ్యప్రణాళికను అన్వేషించండి",
      beginBtn: "నేర్చుకోవడం ప్రారంభించండి"
    },
    about: {
      badge: "సంస్కార భారత్ గురించి",
      title: "భారతీయ విలువల పునాది - ఆధునిక విద్యా వికాసం",
      subtitle: "LKG నుండి 10వ తరగతి వరకు విద్యార్థుల కోసం భారతదేశ సనాతన ధర్మం మరియు ఆధునిక జీవన నైపుణ్యాల సంపూర్ణ సమ్మేళనం.",
      visionTitle: "మా లక్ష్య దర్శనం (Vision)",
      visionText: "అంతర్గత నైతిక బలం, సమాజం మరియు ప్రకృతి పట్ల గాఢమైన అనురాగం, సత్యనిష్ఠతో జీవించే ధీరత్వాన్ని కలిగిన ఉత్తమ భావి పౌరులను తీర్చిదిద్దడం.",
      missionTitle: "మా కార్యాచరణ (Mission)",
      missionText: "కథాకథనం మరియు ఆత్మపరిశీలన (చింతన) ద్వారా పాఠశాల విద్యలో మానవతా విలువలను సహజంగా సమ్మిళితం చేయడం.",
      philosophyTitle: "విద్యా తత్వశాస్త్రం: 'చింతన' (అనుభవపూర్వక పరిశీలన)",
      philosophyText: "కేవలం వల్లెవేయడం వల్ల సంస్కారాలు అలవడవు. విద్యార్థి స్వయంగా ఒక నైతిక సమస్యను ఎదుర్కొని, ఆలోచించి, ధర్మాన్ని ఎంచుకున్నప్పుడే నిజమైన పరివర్తన కలుగుతుంది.",
      objectivesTitle: "ప్రధాన లక్ష్యాలు",
      objectivesList: [
        "16 మౌలిక సుగుణాలను (గుణాలు) బాల్యం నుండి క్రమపద్ధతిలో పెంపొందించడం.",
        "రామాయణ, మహాభారత, పంచతంత్ర కథల ద్వారా హృదయానికి హత్తుకునేలా విలువల బోధన.",
        "డిజిటల్ క్రమశిక్షణ, మానసిక స్థైర్యం, సాటివారిపై కరుణ వంటి ఆధునిక జీవన నైపుణ్యాలతో అనుసంధానం.",
        "విద్యార్థుల నైతిక ప్రగతిని అంచనా వేసే సానుకూల సాధనాలు అందించడం."
      ],
      outcomesTitle: "ఆశించిన ఫలితాలు",
      outcomesList: [
        "నైతిక స్వయంప్రతిపత్తి: ఎవరూ చూడనప్పుడు కూడా న్యాయంగా ప్రవర్తించే వివేకం.",
        "సర్వభూత దయ: అన్ని జీవుల పట్ల సహానుభూతి మరియు పరస్పర గౌరవం.",
        "సమత్వం: పోటీ పరీక్షలు, ఒత్తిళ్లలో ప్రశాంతతను కాపాడుకునే సంయమనం.",
        "వారసత్వ గౌరవం: భారతీయ విజ్ఞానం పట్ల గౌరవం మరియు ఆధునిక శాస్త్రీయ దృక్పథం."
      ]
    },
    curriculum: {
      badge: "పాఠ్యప్రణాళికా స్వరూపం",
      title: "16 గుణాలు & మూడు సనాతన కథా ప్రవాహాలు",
      subtitle: "LKG నుండి 10వ తరగతి విద్యార్థుల సమగ్ర వికాసం కోసం రూపొందించిన విలువలు మరియు జీవన నైపుణ్యాలు.",
      gunasCount: "16 ప్రాథమిక గుణాలు",
      gunasHeading: "భారతీయ జీవన సూత్రాలు",
      sourcesTitle: "మూడు విజ్ఞాన ప్రవాహాలు",
      modernSkillsTitle: "ఆధునిక జీవన నైపుణ్యాల సమ్మేళనం",
      gradeTabs: [
        { id: "all", label: "అన్ని తరగతులు (LKG - 10)", ageRange: "3 నుండి 16 సంవత్సరాలు" },
        { id: "lkg-2", label: "LKG - 2వ తరగతి", ageRange: "ప్రారంభ అభ్యాసం (3-7 ఏళ్ళు)" },
        { id: "3-5", label: "3 - 5 తరగతులు", ageRange: "పునాది దశ (8-10 ఏళ్ళు)" },
        { id: "6-8", label: "6 - 8 తరగతులు", ageRange: "మాధ్యమిక దశ (11-13 ఏళ్ళు)" },
        { id: "9-10", label: "9 - 10 తరగతులు", ageRange: "ఉన్నత ఆలోచనా దశ (14-16 ఏళ్ళు)" }
      ]
    },
    howItWorks: {
      badge: "బోధనా పద్ధతి",
      title: "5-దశల ఆత్మపరిశీలనా చక్రం",
      subtitle: "కథా శ్రవణం నుండి వ్యక్తిగత చింతన మరియు దైనందిన ఆచరణ వరకు సాగే స్పష్టమైన పద్ధతి.",
      steps: [
        {
          number: "01",
          title: "కథా శ్రవణం (కథ)",
          subtitle: "భావోద్వేగపూరిత కథా ప్రవేశం",
          description: "రామాయణం, భారతం లేదా పంచతంత్రం నుండి ధర్మసంకటాన్ని పరిచయం చేసే ఆసక్తికరమైన కథ.",
          iconName: "BookOpen"
        },
        {
          number: "02",
          title: "పరిశీలనా ఘట్టం (ప్రశ్న ప్రసంగం)",
          subtitle: "ముఖ్యమైన నైతిక అంశం",
          description: "పాత్ర ఎదుర్కొన్న క్లిష్టమైన నిర్ణయం - స్వార్థమా లేక సత్యమా అనే అంతర్గత సంఘర్షణ.",
          iconName: "Feather"
        },
        {
          number: "03",
          title: "చింతన ప్రశ్నలు (ఆత్మపరిశీలన)",
          subtitle: "వ్యక్తిగత ఆలోచన",
          description: "'మీరైతే ఏం చేస్తారు?', 'ఓర్పు ఎందుకు విజయం సాధించింది?' వంటి ఆలోచింపజేసే ప్రశ్నలు.",
          iconName: "HelpCircle"
        },
        {
          number: "04",
          title: "మార్గదర్శక బోధ (బోధ)",
          subtitle: "ఆధునిక జీవితంతో అనుసంధానం",
          description: "ప్రాచీన కథను నేటి విద్యార్థి జీవితం, డిజిటల్ అలవాట్లు, స్నేహాలతో ముడిపెట్టే వివరణ.",
          iconName: "Compass"
        },
        {
          number: "05",
          title: "సాధనా నమోదు (ప్రగతి సమీక్ష)",
          subtitle: "నిరంతర సంస్కార జాగృతి",
          description: "పోటీతత్వం లేని, ఆత్మవిశ్వాసాన్ని నింపే స్వీయ పురోగతి డైరీ.",
          iconName: "TrendingUp"
        }
      ],
      sampleTitle: "అభ్యాస నమూనా ప్రదర్శన",
      sampleSubtitle: "ఒక కథ విద్యార్థిలో ఎలా ఆత్మపరిశీలనను కలిగిస్తుందో పరిశీలించండి"
    },
    modes: {
      badge: "ద్వివిధ అభ్యాస విధానాలు",
      title: "వ్యక్తిగత విధానం & సమష్టి విధానం",
      subtitle: "రెండు విధానాలూ ఒకే అభ్యాస ప్రయాణాన్ని పంచుకుంటాయి, కానీ విద్యార్థుల భాగస్వామ్యం మరియు ప్రతిస్పందనలలో భిన్నమైన అనుభూతినిస్తాయి.",
      sharedCoreTitle: "ఉమ్మడి మూలస్తంభం",
      sharedCoreDescription: "ఒంటరిగా చదివినా లేదా తరగతి గదిలో చర్చించినా - 16 గుణాలు, ఇతిహాస గాథలు మరియు 5-దశల పరిశీలనా ప్రక్రియ అందరికీ సమానమే.",
      individualTitle: "వ్యక్తిగత విధానం (స్వాధ్యాయం)",
      individualSubtitle: "స్వతంత్ర ఆలోచన & వ్యక్తిగత ప్రతిస్పందనలు",
      individualPoints: [
        "విద్యార్థి తన స్వంత వేగంతో, ప్రశాంతమైన వాతావరణంలో అభ్యసించవచ్చు.",
        "వ్యక్తిగత ఆలోచనలు భద్రంగా ఉండే ప్రత్యేక డిజిటల్ డైరీ సౌకర్యం.",
        "ఎవరి ఒత్తిడీ లేకుండా మనసులోని భావాలను స్వేచ్ఛగా వ్యక్తీకరించే అవకాశం.",
        "స్వీయ బాధ్యత, నిజాయితీ మరియు అంతరాత్మ ప్రబోధాన్ని పెంపొందిస్తుంది."
      ],
      collectiveTitle: "సమష్టి విధానం (సత్సంగం / సహచింతన)",
      collectiveSubtitle: "సమూహ చర్చ, ఆలోచనల మార్పిడి & ఉపాధ్యాయ మార్గదర్శకత్వం",
      collectivePoints: [
        "శిక్షణ పొందిన ఉపాధ్యాయుల ఆధ్వర్యంలో తరగతి గదిలో లేదా అధ్యయన బృందాలలో నిర్వహణ.",
        "ఒకే సమస్యపై తోటి మిత్రుల భిన్న దృక్పథాలను విని అర్థం చేసుకునే అవకాశం.",
        "పరస్పర గౌరవం, ఓర్పుతో వినడం మరియు సంభాషణా నైపుణ్యాల వికాసం.",
        "సమూహ చర్చ ద్వారా సత్యం, ధర్మాల సారాంశాన్ని సులభంగా గ్రహించడం."
      ]
    },
    footer: {
      tagline: "LKG నుండి 10వ తరగతి విద్యార్థులలో సనాతన సంస్కారాలు, సంస్కృతి పట్ల గౌరవం మరియు ఆధునిక వికాసాన్ని నింపే వేదిక.",
      quickLinks: "ముఖ్య లింకులు",
      contact: "సంప్రదించండి & పాఠశాల విచారణలు",
      privacy: "గోప్యతా విధానం & నైతిక నిబంధనలు",
      rights: "సర్వహక్కులూ ప్రత్యేకించబడ్డాయి. భారతీయ విద్యార్థుల సంపూర్ణ వ్యక్తిత్వ వికాసానికి అంకితం."
    }
  },
  hi: {
    nav: {
      about: "हमारे बारे में",
      curriculum: "पाठ्यक्रम",
      howItWorks: "यह कैसे काम करता है",
      modes: "अध्ययन पद्धतियां",
      login: "लॉगिन",
      register: "अभी पंजीकरण करें"
    },
    motto: {
      sanskrit: "आत्मवत् सर्वभूतेषु यः पश्यति स पश्यति।",
      transliteration: "आत्मवत् सर्वभूतेषु यः पश्यति स पश्यति।",
      meaning: "जो सभी प्राणियों को अपने समान देखता है, वही वास्तव में देखता है।"
    },
    entrance: {
      exploreBtn: "हमारे पाठ्यक्रम को जानें",
      beginBtn: "सीखना शुरू करें"
    },
    about: {
      badge: "संस्कार भारत के विषय में",
      title: "संस्कृति की जड़ें - आधुनिक दृष्टिकोण",
      subtitle: "एलकेजी से कक्षा 10 तक के छात्रों के लिए भारत के शाश्वत मूल्यों और 21वीं सदी के जीवन कौशलों का सुदृढ़ संगम।",
      visionTitle: "हमारा दृष्टिकोण (Vision)",
      visionText: "ऐसी युवा पीढ़ी का निर्माण करना जो आंतरिक नैतिक बल, समाज व प्रकृति के प्रति संवेदनशील करुणा तथा आत्म-सम्मान के साथ विश्व में प्रगति करने की क्षमता रखती हो।",
      missionTitle: "हमारा ध्येय (Mission)",
      missionText: "कथावाचन और चिंतन-आधारित शिक्षण के माध्यम से विद्यालयी शिक्षा में मानवीय मूल्यों को सहजता से आत्मसात कराना।",
      philosophyTitle: "शैक्षणिक दर्शन: 'चिंतन' (अनुभवपरक अंतर्दृष्टि)",
      philosophyText: "संस्कार केवल उपदेश या रटने से नहीं बनते। वास्तविक परिवर्तन तब आता है जब बच्चा नैतिक दुविधाओं पर विचार करता है, अंतर्मन को टटोलता है और स्वयं धर्म का मार्ग चुनता है।",
      objectivesTitle: "प्रमुख उद्देश्य",
      objectivesList: [
        "16 आधारभूत मानवीय गुणों को बाल्यावस्था से किशोरावस्था तक क्रमबद्ध विकसित करना।",
        "रामायण, महाभारत और पंचतंत्र की प्रेरक कथाओं से नैतिक दिशा प्रदान करना।",
        "प्राचीन मूल्यों को आधुनिक जीवन कौशलों (डिजिटल संतुलन, सहिष्णुता, सामाजिक उत्तरदायित्व) से जोड़ना।",
        "छात्रों के सर्वांगीण चरित्र निर्माण का निरंतर और सकारात्मक मूल्यांकन।"
      ],
      outcomesTitle: "अपेक्षित परिणाम",
      outcomesList: [
        "नैतिक स्वायत्तता: किसी के न देखने पर भी सही निर्णय लेने का विवेक।",
        "सर्वभूत समता: प्रत्येक प्राणी में आत्मभाव और परस्पर आदर का भाव।",
        "समतत्व: परीक्षाओं और प्रतिस्पर्धा के दबाव में भी मानसिक संतुलन।",
        "विरासत के प्रति गौरव: भारतीय ज्ञान परंपरा का आदर और वैज्ञानिक दृष्टिकोण।"
      ]
    },
    curriculum: {
      badge: "पाठ्यक्रम रूपरेखा",
      title: "16 गुण और तीन शाश्वत ज्ञान धाराएं",
      subtitle: "एलकेजी से कक्षा 10 के विद्यार्थियों के संतुलित चरित्र निर्माण हेतु शास्त्र और व्यावहारिक जीवन कौशलों का समन्वय।",
      gunasCount: "16 आधारभूत मानवीय गुण",
      gunasHeading: "भारत का नैतिक पथप्रदर्शक",
      sourcesTitle: "तीन जीवंत ज्ञान धाराएं",
      modernSkillsTitle: "आधुनिक जीवन कौशल समन्वय",
      gradeTabs: [
        { id: "all", label: "सभी कक्षाएं (LKG - 10)", ageRange: "आयु 3 से 16 वर्ष" },
        { id: "lkg-2", label: "एलकेजी - कक्षा 2", ageRange: "आरंभिक अन्वेषक (3-7 वर्ष)" },
        { id: "3-5", label: "कक्षा 3 - 5", ageRange: "बुनियादी स्तर (8-10 वर्ष)" },
        { id: "6-8", label: "कक्षा 6 - 8", ageRange: "माध्यमिक स्तर (11-13 वर्ष)" },
        { id: "9-10", label: "कक्षा 9 - 10", ageRange: "वरिष्ठ विचारक (14-16 वर्ष)" }
      ]
    },
    howItWorks: {
      badge: "शिक्षण प्रक्रिया",
      title: "5-चरणीय चिंतन चक्र",
      subtitle: "कथा श्रवण से लेकर आत्म-चिंतन और दैनिक आचरण तक की वैज्ञानिक व सुव्यवस्थित यात्रा।",
      steps: [
        {
          number: "01",
          title: "कथा श्रवण (कथा)",
          subtitle: "हृदयस्पर्शी कथानक",
          description: "रामायण, महाभारत या पंचतंत्र से ली गई प्रेरक कथा जो नैतिक दुविधा को सजीव रूप में प्रस्तुत करती है।",
          iconName: "BookOpen"
        },
        {
          number: "02",
          title: "चिंतन प्रसंग (प्रसंग)",
          subtitle: "मुख्य नैतिक क्षण",
          description: "पात्र के जीवन का वह मोड़ जहां स्वार्थ बनाम धर्म, भय बनाम सत्य का चुनाव करना होता है।",
          iconName: "Feather"
        },
        {
          number: "03",
          title: "चिंतन प्रश्न (आत्म-मंथन)",
          subtitle: "अंतर्मुखी अन्वेषण",
          description: "'आप उस स्थान पर होते तो क्या करते?', 'धैर्य ने स्थिति को कैसे बदला?' जैसे विचारोत्तेजक प्रश्न।",
          iconName: "HelpCircle"
        },
        {
          number: "04",
          title: "मार्गदर्शन व बोध (बोध)",
          subtitle: "आधुनिक जीवन से जुड़ाव",
          description: "शिक्षक या मंच द्वारा कथा के मर्म को आज के विद्यालयी जीवन, डिजिटल व्यवहार और परिवार से जोड़ना।",
          iconName: "Compass"
        },
        {
          number: "05",
          title: "साधना अभिलेख (प्रगति अवलोकन)",
          subtitle: "सकारात्मक चरित्र विकास",
          description: "गैर-प्रतिस्पर्धी, आत्म-जागरूकता बढ़ाने वाली डायरी जहां विद्यार्थी अपनी नैतिक उन्नति दर्ज करते हैं।",
          iconName: "TrendingUp"
        }
      ],
      sampleTitle: "शिक्षण पद्धति का प्रत्यक्ष उदाहरण",
      sampleSubtitle: "देखें कि कैसे एक प्राचीन प्रसंग आधुनिक विद्यार्थी के आत्म-बोध में परिणत होता है"
    },
    modes: {
      badge: "दोहरी अध्ययन प्रणाली",
      title: "व्यक्तिगत पद्धति एवं सामूहिक पद्धति",
      subtitle: "दोनों पद्धतियां एक ही नैतिक यात्रा और पाठ्यक्रम पर आधारित हैं, केवल सहभागिता और चिंतन के स्वरूप में भिन्नता है।",
      sharedCoreTitle: "समान आधारशिला",
      sharedCoreDescription: "चाहे विद्यार्थी एकांत में पढ़े या कक्षा में, 16 गुण, प्रामाणिक कथाएं और 5-चरणीय चिंतन पद्धति सभी के लिए एक समान रहती हैं।",
      individualTitle: "व्यक्तिगत पद्धति (स्वाध्याय)",
      individualSubtitle: "स्वतंत्र विचार एवं व्यक्तिगत अंतर्दृष्टि",
      individualPoints: [
        "शांत वातावरण में अपनी गति से अध्ययन करने की स्वतंत्रता।",
        "सुरक्षित व्यक्तिगत डिजिटल डायरी जहां अपने विचारों को बेझिझक लिखा जा सके।",
        "किसी सहपाठी के दबाव के बिना अपनी अंतरात्मा से संवाद।",
        "आत्म-विश्वास, सत्यनिष्ठा और व्यक्तिगत उत्तरदायित्व का विकास।"
      ],
      collectiveTitle: "सामूहिक पद्धति (सत्संग / सह-चिंतन)",
      collectiveSubtitle: "समूह चर्चा, दृष्टिकोणों का आदान-प्रदान व शिक्षक मार्गदर्शन",
      collectivePoints: [
        "प्रशिक्षित शिक्षक के मार्गदर्शन में कक्षा या समूह परिचर्चा।",
        "एक ही नैतिक प्रसंग पर सहपाठियों के विविध दृष्टिकोणों को सुनना और समझना।",
        "सहानुभूति, ध्यानपूर्वक सुनने की कला और तार्किक संवाद का विकास।",
        "सामूहिक विमर्श के माध्यम से धर्म और सदाचार के मर्म को गहराई से समझना।"
      ]
    },
    footer: {
      tagline: "एलकेजी से कक्षा 10 तक के बच्चों में शाश्वत मूल्य, सांस्कृतिक निष्ठा और आधुनिक चरित्र का विकास।",
      quickLinks: "त्वरित नेविगेशन",
      contact: "संपर्क एवं विद्यालय सहयोग",
      privacy: "गोपनीयता नीति एवं डेटा नैतिकता",
      rights: "सर्वाधिकार सुरक्षित। भारतीय युवाओं के समग्र चरित्र निर्माण को समर्पित।"
    }
  }
};

export const sampleGunas: Guna[] = [
  {
    id: "satya",
    sanskrit: "सत्य (Satya)",
    nameEn: "Truthfulness & Integrity",
    nameTe: "సత్యం (నిజాయితీ)",
    nameHi: "सत्य (सत्यनिष्ठा)",
    meaningEn: "Aligning thoughts, speech, and action with moral reality, standing for truth without malice.",
    meaningTe: "మనసు, వాక్కు, కర్మలను సత్యంతో ఏకీకృతం చేయడం; నిష్కపటమైన నిజాయితీ.",
    meaningHi: "मन, वाणी और कर्म में एकरूपता तथा बिना द्वेष के सत्य पर अडिग रहना।",
    epicSource: "Ramayana",
    storyExample: "Sri Rama's adherence to his father's word (Pitr-Vakya Paripalana) without resentment.",
    grades: "LKG - 10",
    modernApplication: "Rejecting academic dishonesty, admitting personal mistakes, standing up against cyber-bullying."
  },
  {
    id: "dharma",
    sanskrit: "धर्म (Dharma)",
    nameEn: "Righteous Duty & Justice",
    nameTe: "ధర్మం (న్యాయ ప్రవర్తన)",
    nameHi: "धर्म (कर्तव्यनिष्ठा)",
    meaningEn: "Discerning and upholding one's highest moral duty towards family, peers, nature, and community.",
    meaningTe: "కుటుంబం, సమాజం, ప్రకృతి పట్ల నైతిక బాధ్యతను గుర్తించి న్యాయంగా నడుచుకోవడం.",
    meaningHi: "परिवार, समाज और प्रकृति के प्रति अपने सर्वोच्च नैतिक कर्तव्य का पालन करना।",
    epicSource: "Mahabharata",
    storyExample: "Yudhishthira choosing truth and justice even in moments of severe hardship and exile.",
    grades: "3 - 10",
    modernApplication: "Fulfilling student duties, respecting rules, treating everyone equally without favoritism."
  },
  {
    id: "ahimsa",
    sanskrit: "अहिंसा (Ahimsa)",
    nameEn: "Compassionate Non-Harm",
    nameTe: "అహింస (కరుణాపూర్వక ప్రవర్తన)",
    nameHi: "अहिंसा (करुणा व अहिंसक भाव)",
    meaningEn: "Causing no injury by physical action, hurtful words, or hostile thoughts; active benevolence.",
    meaningTe: "మాటల ద్వారా గానీ, చేతల ద్వారా గానీ ఎవరికీ బాధ కలిగించకపోవడం; సమస్త జీవులపై కరుణ.",
    meaningHi: "वाणी, विचार और कर्म से किसी को पीड़ा न पहुंचाना; सबके प्रति दया का भाव।",
    epicSource: "Panchatantra",
    storyExample: "The Golden Swan providing feathers willingly to sustain the impoverished family with care.",
    grades: "LKG - 10",
    modernApplication: "Refraining from harsh verbal teasing, caring for animals, gentle and constructive conflict resolution."
  },
  {
    id: "dhairya",
    sanskrit: "धैर्य (Dhairya)",
    nameEn: "Moral Courage & Steadfastness",
    nameTe: "ధైర్యం (స్థైర్యం, ధీరత్వం)",
    nameHi: "धैर्य (धैर्य व आंतरिक साहस)",
    meaningEn: "Inner fortitude to persevere through adversity and stand up for righteousness despite pressure.",
    meaningTe: "కష్టాలలో నిలకడగా ఉండడం; పరుల ఒత్తిడికి లొంగకుండా మంచి మార్గంలో నిలబడే గుండె నిబ్బరం.",
    meaningHi: "कठिनाइयों में विचलित न होना तथा बाह्य दबाव के बावजूद धर्म पर दृढ़ रहना।",
    epicSource: "Ramayana",
    storyExample: "Hanuman leaping across the ocean fueled by single-minded devotion and unwavering perseverance.",
    grades: "LKG - 10",
    modernApplication: "Facing exam anxiety with a calm mind, daring to speak up when someone is being mistreated."
  },
  {
    id: "vinaya",
    sanskrit: "विनय (Vinaya)",
    nameEn: "Humility & Respectfulness",
    nameTe: "వినయం (నమ్రత)",
    nameHi: "विनय (नम्रता व आदर)",
    meaningEn: "Recognizing one's limits, revering elders and teachers, and approaching learning with modesty.",
    meaningTe: "పెద్దలు, గురువుల పట్ల గౌరవం; అహంకారం లేని మృదు స్వభావం మరియు అభ్యాస తపన.",
    meaningHi: "अहंकार से मुक्ति, गुरुजनों का आदर तथा विनम्रतापूर्वक ज्ञान ग्रहण करने की वृत्ति।",
    epicSource: "Mahabharata",
    storyExample: "Arjuna humbly requesting Sri Krishna to be his charioteer and guide on the battlefield of life.",
    grades: "LKG - 8",
    modernApplication: "Listening actively in class, showing genuine gratitude to cafeteria and support staff."
  },
  {
    id: "daya",
    sanskrit: "दया (Daya)",
    nameEn: "Kindness & Active Empathy",
    nameTe: "దయ (సహానుభూతి)",
    nameHi: "दया (सहानुभूति व परोपकार)",
    meaningEn: "Feeling the distress of others as one's own and acting selflessly to relieve their suffering.",
    meaningTe: "ఇతరుల బాధను తన బాధగా భావించి చేతనైనంతగా ఆదుకునే దయాగుణం.",
    meaningHi: "दूसरों के दुःख को अनुभव कर निःस्वार्थ भाव से उनकी सहायता करने की तत्परता।",
    epicSource: "Ramayana",
    storyExample: "Sri Rama treating Shabari and Guha with overflowing reverence and boundless warmth.",
    grades: "LKG - 5",
    modernApplication: "Sharing lunch with an unwell classmate, helping younger students find their classrooms."
  },
  {
    id: "daan_seva",
    sanskrit: "दान & सेवा (Daan & Seva)",
    nameEn: "Generosity & Selfless Service",
    nameTe: "దానం & సేవ (త్యాగనిరతి)",
    nameHi: "दान एवं सेवा (निःस्वार्थ सेवा)",
    meaningEn: "Sharing one's resources, time, and skills for the upliftment of the underprivileged without vanity.",
    meaningTe: "ప్రతిఫలం ఆశించకుండా తన సమయాన్ని, వనరులను ఇతరుల మేలు కోసం వినియోగించడం.",
    meaningHi: "अहंकार रहित होकर समाज कल्याण के लिए अपने संसाधनों और समय का समर्पण।",
    epicSource: "Mahabharata",
    storyExample: "Karna's unmatched benevolence, giving away his ear-rings and armor for righteousness.",
    grades: "3 - 10",
    modernApplication: "Volunteering in school cleanliness drives, tutoring junior peers, donating books."
  },
  {
    id: "samatvam",
    sanskrit: "समत्व (Samatvam)",
    nameEn: "Equanimity & Emotional Poise",
    nameTe: "సమత్వం (చిత్తశాంతి)",
    nameHi: "समत्व (चित्त की स्थिरता)",
    meaningEn: "Maintaining mental balance in both triumph and failure, joy and grief.",
    meaningTe: "గెలుపులో పొంగిపోకుండా, ఓటమిలో కుంగిపోకుండా స్థిరచిత్తంతో ఉండే మనస్తత్వం.",
    meaningHi: "सफलता में अत्यधिक हर्ष तथा असफलता में विषाद से मुक्त संतुलित मन।",
    epicSource: "Mahabharata",
    storyExample: "Bhishma's calm clarity while guiding the Pandavas and Kauravas on statecraft and self-control.",
    grades: "6 - 10",
    modernApplication: "Taking sports losses with grace, handling social media likes or dislikes without mood swings."
  }
];

export const all16GunasList = [
  { id: "1", name: "सत्य (Satya)", en: "Truthfulness", te: "సత్యం", hi: "सत्य" },
  { id: "2", name: "धर्म (Dharma)", en: "Righteous Duty", te: "ధర్మం", hi: "धर्म" },
  { id: "3", name: "शान्ति (Shanti)", en: "Inner Peace", te: "శాంతి", hi: "शान्ति" },
  { id: "4", name: "प्रेम (Prema)", en: "Selfless Love", te: "ప్రేమ", hi: "प्रेम" },
  { id: "5", name: "अहिंसा (Ahimsa)", en: "Non-Injury", te: "అహింస", hi: "अहिंसा" },
  { id: "6", name: "धैर्य (Dhairya)", en: "Moral Courage", te: "ధైర్యం", hi: "धैर्य" },
  { id: "7", name: "विनय (Vinaya)", en: "Humility & Reverence", te: "వినయం", hi: "विनय" },
  { id: "8", name: "दया (Daya)", en: "Compassion & Empathy", te: "దయ", hi: "दया" },
  { id: "9", name: "दान (Daan)", en: "Charity & Generosity", te: "దానం", hi: "दान" },
  { id: "10", name: "सेवा (Seva)", en: "Selfless Service", te: "సేవ", hi: "सेवा" },
  { id: "11", name: "क्षमा (Kshama)", en: "Forgiveness & Patience", te: "క్షమ", hi: "क्षमा" },
  { id: "12", name: "विद्या (Vidya)", en: "Thirst for True Knowledge", te: "విద్య", hi: "विद्या" },
  { id: "13", name: "समत्व (Samatvam)", en: "Equanimity & Poise", te: "సమత్వం", hi: "समत्व" },
  { id: "14", name: "कृतज्ञता (Kritajnata)", en: "Gratitude & Thanksgiving", te: "కృతజ్ఞత", hi: "कृतज्ञता" },
  { id: "15", name: "मैत्री (Maitri)", en: "Universal Friendship", te: "మైత్రి", hi: "मैत्री" },
  { id: "16", name: "संयम (Sanyama)", en: "Self-Discipline & Focus", te: "సంయమం", hi: "संयम" }
];
