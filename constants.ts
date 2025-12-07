import { MedicalTerm, Difficulty, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'general', name: 'General Clinical', icon: 'ClipboardList', count: 0 },
  { id: 'symptoms', name: 'Symptoms', icon: 'Activity', count: 0 },
  { id: 'body_parts', name: 'Body Parts', icon: 'User', count: 0 },
  { id: 'vital_signs', name: 'Vital Signs', icon: 'HeartPulse', count: 0 },
  { id: 'pain', name: 'Pain Scale', icon: 'Thermometer', count: 0 },
  { id: 'directions', name: 'Directions & Instructions', icon: 'ArrowRightCircle', count: 0 },
  { id: 'emergency', name: 'Emergency & Trauma', icon: 'Siren', count: 0 },
  { id: 'nursing', name: 'Nursing / Home Care', icon: 'Heart', count: 0 },
  { id: 'lab', name: 'Lab & Diagnostics', icon: 'Microscope', count: 0 },
  { id: 'meds', name: 'Medications', icon: 'Pill', count: 0 },
  { id: 'chronic', name: 'Chronic Diseases', icon: 'Clock', count: 0 },
  { id: 'mental', name: 'Mental Health', icon: 'Brain', count: 0 },
  { id: 'departments', name: 'Hospital Departments', icon: 'Building', count: 0 },
  { id: 'admin', name: 'Admin & Insurance', icon: 'FileText', count: 0 },
];

export const SEED_TERMS: MedicalTerm[] = [
  // General Clinical
  {
    id: 'gen_1',
    english: 'Diagnosis',
    cantonese: '診斷',
    pronunciation: 'can2 dyun3',
    category: 'General Clinical',
    exampleEn: 'The doctor will explain the diagnosis to you.',
    exampleCan: '醫生會同你解釋診斷結果。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'gen_2',
    english: 'Side effect',
    cantonese: '副作用',
    pronunciation: 'fu3 zok3 jung6',
    category: 'General Clinical',
    exampleEn: 'This medication might have some side effects.',
    exampleCan: '呢隻藥可能會有啲副作用。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'gen_3',
    english: 'Inflammation',
    cantonese: '發炎',
    pronunciation: 'faat3 jim4',
    category: 'General Clinical',
    exampleEn: 'The wound shows signs of inflammation.',
    exampleCan: '傷口有發炎嘅跡象。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },

  // Symptoms
  {
    id: 'sym_1',
    english: 'Dizziness',
    cantonese: '頭暈',
    pronunciation: 'tau4 wan4',
    category: 'Symptoms',
    exampleEn: 'How long have you felt dizziness?',
    exampleCan: '你頭暈咗幾耐？',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'sym_2',
    english: 'Nausea',
    cantonese: '作嘔 / 反胃',
    pronunciation: 'zok3 au2 / faan2 wai6',
    category: 'Symptoms',
    exampleEn: 'Do you feel nausea after eating?',
    exampleCan: '你食完嘢有冇覺得作嘔？',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'sym_3',
    english: 'Shortness of breath',
    cantonese: '氣促 / 抖唔到氣',
    pronunciation: 'hei3 cuk1 / dau2 m4 dou2 hei3',
    category: 'Symptoms',
    exampleEn: 'Do you experience shortness of breath when walking?',
    exampleCan: '你行路嗰陣會唔會覺得氣促？',
    difficulty: Difficulty.MEDIUM,
    isHard: true
  },
  {
    id: 'sym_4',
    english: 'Phlegm',
    cantonese: '痰',
    pronunciation: 'taam4',
    category: 'Symptoms',
    exampleEn: 'Is there any phlegm when you cough?',
    exampleCan: '你咳嗰陣有冇痰？',
    difficulty: Difficulty.EASY,
    isHard: false
  },

  // Body Parts
  {
    id: 'body_1',
    english: 'Abdomen / Stomach',
    cantonese: '肚 / 腹部',
    pronunciation: 'tou5 / fuk1 bou6',
    category: 'Body Parts',
    exampleEn: 'Does your abdomen hurt?',
    exampleCan: '你個肚痛唔痛？',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'body_2',
    english: 'Lungs',
    cantonese: '肺',
    pronunciation: 'fai3',
    category: 'Body Parts',
    exampleEn: 'We need to take an X-ray of your lungs.',
    exampleCan: '我們要幫你的肺部照X光。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'body_3',
    english: 'Joint',
    cantonese: '關節',
    pronunciation: 'gwaan1 zit3',
    category: 'Body Parts',
    exampleEn: 'Is there any swelling in your joints?',
    exampleCan: '你嘅關節有冇腫？',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },

  // Vital Signs
  {
    id: 'vital_1',
    english: 'Blood Pressure',
    cantonese: '血壓',
    pronunciation: 'hyut3 aat3',
    category: 'Vital Signs',
    exampleEn: 'Your blood pressure is a bit high.',
    exampleCan: '你嘅血壓有啲高。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'vital_2',
    english: 'Temperature / Fever',
    cantonese: '體溫 / 發燒',
    pronunciation: 'tai2 wan1 / faat3 siu1',
    category: 'Vital Signs',
    exampleEn: 'I am going to measure your temperature.',
    exampleCan: '我同你量吓體溫。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'vital_3',
    english: 'Pulse / Heart Rate',
    cantonese: '脈搏 / 心跳',
    pronunciation: 'mak6 bok3 / sam1 tiu3',
    category: 'Vital Signs',
    exampleEn: 'Your pulse is regular.',
    exampleCan: '你嘅脈搏好正常。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },

  // Pain Scale
  {
    id: 'pain_1',
    english: 'Sharp pain',
    cantonese: '刺痛',
    pronunciation: 'ci3 tung3',
    category: 'Pain Scale',
    exampleEn: 'Do you feel a sharp pain or a dull pain?',
    exampleCan: '你覺得係刺痛定係隱隱作痛？',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'pain_2',
    english: 'Dull pain',
    cantonese: '隱隱作痛',
    pronunciation: 'jan2 jan2 zok3 tung3',
    category: 'Pain Scale',
    exampleEn: 'I have a dull pain in my back.',
    exampleCan: '我個背脊隱隱作痛。',
    difficulty: Difficulty.HARD,
    isHard: true
  },
  {
    id: 'pain_3',
    english: 'Throbbing pain',
    cantonese: '跳痛 / 搏動性痛',
    pronunciation: 'tiu3 tung3 / bok3 dung6 sing3 tung3',
    category: 'Pain Scale',
    exampleEn: 'Is it a throbbing pain?',
    exampleCan: '係唔係跳住咁痛？',
    difficulty: Difficulty.HARD,
    isHard: true
  },

  // Directions
  {
    id: 'dir_1',
    english: 'Take a deep breath',
    cantonese: '深呼吸',
    pronunciation: 'sam1 fu1 kap1',
    category: 'Directions & Instructions',
    exampleEn: 'Please take a deep breath and hold it.',
    exampleCan: '請深呼吸，忍住。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'dir_2',
    english: 'Lie down flat',
    cantonese: '瞓平',
    pronunciation: 'fan3 ping4',
    category: 'Directions & Instructions',
    exampleEn: 'Please lie down flat on the bed.',
    exampleCan: '請係張床度瞓平。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'dir_3',
    english: 'Fasting',
    cantonese: '空肚 / 禁食',
    pronunciation: 'hung1 tou5 / gam3 sik6',
    category: 'Directions & Instructions',
    exampleEn: 'You need to be fasting for 8 hours before the surgery.',
    exampleCan: '手術前你需要空肚八個鐘。',
    difficulty: Difficulty.MEDIUM,
    isHard: true
  },

  // Emergency
  {
    id: 'er_1',
    english: 'Fracture',
    cantonese: '骨折',
    pronunciation: 'gwat1 zit3',
    category: 'Emergency & Trauma',
    exampleEn: 'The X-ray shows a minor fracture.',
    exampleCan: 'X光顯示有輕微骨折。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'er_2',
    english: 'Concussion',
    cantonese: '腦震盪',
    pronunciation: 'nou5 zan3 dong6',
    category: 'Emergency & Trauma',
    exampleEn: 'You have a mild concussion.',
    exampleCan: '你有輕微腦震盪。',
    difficulty: Difficulty.MEDIUM,
    isHard: true
  },
  {
    id: 'er_3',
    english: 'Stroke',
    cantonese: '中風',
    pronunciation: 'zung3 fung1',
    category: 'Emergency & Trauma',
    exampleEn: 'Time is critical for stroke patients.',
    exampleCan: '對於中風病人嚟講，時間好關鍵。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },

  // Nursing
  {
    id: 'nurs_1',
    english: 'Catheter',
    cantonese: '尿喉',
    pronunciation: 'niu6 hau4',
    category: 'Nursing / Home Care',
    exampleEn: 'The nurse will change your catheter.',
    exampleCan: '護士會幫你換尿喉。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'nurs_2',
    english: 'Wheelchair',
    cantonese: '輪椅',
    pronunciation: 'leon4 ji2',
    category: 'Nursing / Home Care',
    exampleEn: 'Do you need a wheelchair?',
    exampleCan: '你需唔需要輪椅？',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'nurs_3',
    english: 'Bed sore / Pressure ulcer',
    cantonese: '壓瘡 / 褥瘡',
    pronunciation: 'aat3 cong1 / juk6 cong1',
    category: 'Nursing / Home Care',
    exampleEn: 'We need to turn you over to prevent bed sores.',
    exampleCan: '我哋要幫你轉身，預防生褥瘡。',
    difficulty: Difficulty.HARD,
    isHard: true
  },

  // Lab
  {
    id: 'lab_1',
    english: 'Blood test',
    cantonese: '驗血',
    pronunciation: 'jim6 hyut3',
    category: 'Lab & Diagnostics',
    exampleEn: 'The doctor ordered a blood test.',
    exampleCan: '醫生吩咐要驗血。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'lab_2',
    english: 'Urine sample',
    cantonese: '尿液樣本 / 驗尿',
    pronunciation: 'niu6 jik6 joeng6 bun2 / jim6 niu6',
    category: 'Lab & Diagnostics',
    exampleEn: 'Please provide a urine sample.',
    exampleCan: '唔該留個尿液樣本。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'lab_3',
    english: 'Ultrasound',
    cantonese: '超聲波',
    pronunciation: 'ciu1 sing1 bo1',
    category: 'Lab & Diagnostics',
    exampleEn: 'You need an abdominal ultrasound.',
    exampleCan: '你需要照腹部超聲波。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },

  // Medications
  {
    id: 'med_1',
    english: 'Painkiller',
    cantonese: '止痛藥',
    pronunciation: 'zi2 tung3 joek6',
    category: 'Medications',
    exampleEn: 'Take the painkiller when needed.',
    exampleCan: '有需要嗰陣食止痛藥。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'med_2',
    english: 'Antibiotics',
    cantonese: '抗生素',
    pronunciation: 'kong3 sang1 sou3',
    category: 'Medications',
    exampleEn: 'You must finish the full course of antibiotics.',
    exampleCan: '你一定要食晒成個療程嘅抗生素。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'med_3',
    english: 'Steroid',
    cantonese: '類固醇',
    pronunciation: 'leoi6 gu3 seon4',
    category: 'Medications',
    exampleEn: 'This cream contains steroids.',
    exampleCan: '呢支藥膏含有類固醇。',
    difficulty: Difficulty.HARD,
    isHard: true
  },

  // Chronic Diseases
  {
    id: 'chron_1',
    english: 'Diabetes',
    cantonese: '糖尿病',
    pronunciation: 'tong4 niu6 beng6',
    category: 'Chronic Diseases',
    exampleEn: 'You need to control your sugar intake for diabetes.',
    exampleCan: '你有糖尿病，要控制糖分攝取。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'chron_2',
    english: 'Hypertension / High Blood Pressure',
    cantonese: '高血壓',
    pronunciation: 'gou1 hyut3 aat3',
    category: 'Chronic Diseases',
    exampleEn: 'Do you take medication for hypertension?',
    exampleCan: '你有冇食高血壓藥？',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'chron_3',
    english: 'Asthma',
    cantonese: '哮喘',
    pronunciation: 'haau1 cyun2',
    category: 'Chronic Diseases',
    exampleEn: 'Do you have an inhaler for asthma?',
    exampleCan: '你有冇哮喘藥噴霧？',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },

  // Mental Health
  {
    id: 'ment_1',
    english: 'Depression',
    cantonese: '抑鬱症',
    pronunciation: 'jik1 wat1 zing3',
    category: 'Mental Health',
    exampleEn: 'Depression is a common mental health condition.',
    exampleCan: '抑鬱症係常見嘅精神健康問題。',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'ment_2',
    english: 'Anxiety',
    cantonese: '焦慮',
    pronunciation: 'ziu1 leoi6',
    category: 'Mental Health',
    exampleEn: 'Do you feel anxiety often?',
    exampleCan: '你係咪成日覺得焦慮？',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'ment_3',
    english: 'Suicidal thoughts',
    cantonese: '自殺念頭',
    pronunciation: 'zi6 saat3 nim6 tau4',
    category: 'Mental Health',
    exampleEn: 'Have you had any suicidal thoughts?',
    exampleCan: '你有冇自殺嘅念頭？',
    difficulty: Difficulty.HARD,
    isHard: true
  },

  // Hospital Departments
  {
    id: 'dept_1',
    english: 'Emergency Room (A&E)',
    cantonese: '急症室',
    pronunciation: 'gap1 zing3 sat1',
    category: 'Hospital Departments',
    exampleEn: 'Go to the Emergency Room immediately.',
    exampleCan: '即刻去急症室。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'dept_2',
    english: 'Intensive Care Unit (ICU)',
    cantonese: '深切治療部',
    pronunciation: 'sam1 cit3 zi6 liu4 bou6',
    category: 'Hospital Departments',
    exampleEn: 'The patient is in the ICU.',
    exampleCan: '病人依家喺深切治療部。',
    difficulty: Difficulty.HARD,
    isHard: true
  },
  {
    id: 'dept_3',
    english: 'Pharmacy',
    cantonese: '藥房',
    pronunciation: 'joek6 fong4',
    category: 'Hospital Departments',
    exampleEn: 'Pick up your medicine at the pharmacy.',
    exampleCan: '去藥房攞藥。',
    difficulty: Difficulty.EASY,
    isHard: false
  },

  // Admin & Insurance
  {
    id: 'admin_1',
    english: 'Identity Card',
    cantonese: '身分證',
    pronunciation: 'san1 fan2 zing3',
    category: 'Admin & Insurance',
    exampleEn: 'Please show me your identity card.',
    exampleCan: '唔該出示你嘅身分證。',
    difficulty: Difficulty.EASY,
    isHard: false
  },
  {
    id: 'admin_2',
    english: 'Insurance Policy',
    cantonese: '保險單',
    pronunciation: 'bou2 him2 daan1',
    category: 'Admin & Insurance',
    exampleEn: 'Do you have your insurance policy number?',
    exampleCan: '你有冇你嘅保險單號碼？',
    difficulty: Difficulty.MEDIUM,
    isHard: false
  },
  {
    id: 'admin_3',
    english: 'Registration',
    cantonese: '登記',
    pronunciation: 'dang1 gei3',
    category: 'Admin & Insurance',
    exampleEn: 'Please go to the counter for registration.',
    exampleCan: '唔該去櫃台登記。',
    difficulty: Difficulty.EASY,
    isHard: false
  }
];