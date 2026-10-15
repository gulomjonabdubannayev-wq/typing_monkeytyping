// ==================== TYPES ====================
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  settings: UserSettings;
  stats: UserStats;
  achievements: string[];
  xp: number;
  level: number;
  streak: number;
  lastActive: string;
}

export interface UserSettings {
  theme: string;
  font: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  cursorStyle: 'line' | 'block' | 'underline';
  language: 'uz' | 'en' | 'ru';
  dailyGoal: number;
  customTheme?: CustomTheme;
}

export interface CustomTheme {
  name: string;
  bg: string;
  bgSecondary: string;
  primary: string;
  text: string;
  textSecondary: string;
  error: string;
  correct: string;
  border: string;
}

export interface UserStats {
  totalWPM: number;
  bestWPM: number;
  accuracy: number;
  totalTime: number;
  totalLessons: number;
  todayLessons: number;
  charsTyped: number;
  wordsLearned: number;
  testsCompleted: number;
  history: TestResult[];
}

export interface TestResult {
  id: string;
  date: string;
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  duration: number;
  text: string;
  mode: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  titleRu: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  text: string;
  description: string;
  order: number;
}

export interface Theme {
  id: string;
  name: string;
  bg: string;
  bgSecondary: string;
  bgCard: string;
  primary: string;
  primaryLight: string;
  text: string;
  textSecondary: string;
  error: string;
  correct: string;
  border: string;
  accent: string;
}

// ==================== THEMES ====================
export const THEMES: Theme[] = [
  { id: 'dark-pro', name: 'Dark Pro', bg: '#0f172a', bgSecondary: '#1e293b', bgCard: '#1e293b', primary: '#6366f1', primaryLight: '#818cf8', text: '#f8fafc', textSecondary: '#94a3b8', error: '#ef4444', correct: '#10b981', border: '#334155', accent: '#f59e0b' },
  { id: 'light-minimal', name: 'Light Minimal', bg: '#f8fafc', bgSecondary: '#ffffff', bgCard: '#ffffff', primary: '#6366f1', primaryLight: '#818cf8', text: '#1e293b', textSecondary: '#64748b', error: '#dc2626', correct: '#059669', border: '#e2e8f0', accent: '#f59e0b' },
  { id: 'cyberpunk', name: 'Cyberpunk', bg: '#0a0a0f', bgSecondary: '#1a0a2e', bgCard: '#1a0a2e', primary: '#ff00ff', primaryLight: '#ff66ff', text: '#00ffff', textSecondary: '#ff66ff', error: '#ff0040', correct: '#00ff88', border: '#330066', accent: '#ffff00' },
  { id: 'neon-blue', name: 'Neon Blue', bg: '#020617', bgSecondary: '#0f172a', bgCard: '#0f172a', primary: '#3b82f6', primaryLight: '#60a5fa', text: '#e0f2fe', textSecondary: '#7dd3fc', error: '#f43f5e', correct: '#22d3ee', border: '#1e3a5f', accent: '#06b6d4' },
  { id: 'matrix-green', name: 'Matrix Green', bg: '#000000', bgSecondary: '#001100', bgCard: '#001100', primary: '#00ff41', primaryLight: '#39ff14', text: '#00ff41', textSecondary: '#008f11', error: '#ff0000', correct: '#00ff41', border: '#003300', accent: '#7fff00' },
  { id: 'purple-galaxy', name: 'Purple Galaxy', bg: '#1a0533', bgSecondary: '#2d1b4e', bgCard: '#2d1b4e', primary: '#a855f7', primaryLight: '#c084fc', text: '#f3e8ff', textSecondary: '#c4b5fd', error: '#f43f5e', correct: '#34d399', border: '#4c1d95', accent: '#fbbf24' },
  { id: 'amoled-black', name: 'AMOLED Black', bg: '#000000', bgSecondary: '#0a0a0a', bgCard: '#0a0a0a', primary: '#ffffff', primaryLight: '#e0e0e0', text: '#ffffff', textSecondary: '#888888', error: '#ff3333', correct: '#00cc66', border: '#1a1a1a', accent: '#ffaa00' },
  { id: 'ocean-blue', name: 'Ocean Blue', bg: '#0c4a6e', bgSecondary: '#075985', bgCard: '#075985', primary: '#38bdf8', primaryLight: '#7dd3fc', text: '#f0f9ff', textSecondary: '#bae6fd', error: '#fb7185', correct: '#4ade80', border: '#0369a1', accent: '#fbbf24' },
  { id: 'sunset-orange', name: 'Sunset Orange', bg: '#1c1917', bgSecondary: '#292524', bgCard: '#292524', primary: '#f97316', primaryLight: '#fb923c', text: '#fef3c7', textSecondary: '#fcd34d', error: '#ef4444', correct: '#a3e635', border: '#44403c', accent: '#f59e0b' },
  { id: 'forest-green', name: 'Forest Green', bg: '#052e16', bgSecondary: '#14532d', bgCard: '#14532d', primary: '#22c55e', primaryLight: '#4ade80', text: '#f0fdf4', textSecondary: '#86efac', error: '#f87171', correct: '#22c55e', border: '#166534', accent: '#fbbf24' },
  { id: 'rose-pink', name: 'Rose Pink', bg: '#1a0a14', bgSecondary: '#2d1024', bgCard: '#2d1024', primary: '#f43f5e', primaryLight: '#fb7185', text: '#fff1f2', textSecondary: '#fda4af', error: '#ff0000', correct: '#34d399', border: '#4c0519', accent: '#fbbf24' },
  { id: 'dracula', name: 'Dracula', bg: '#282a36', bgSecondary: '#44475a', bgCard: '#44475a', primary: '#bd93f9', primaryLight: '#caa9fa', text: '#f8f8f2', textSecondary: '#6272a4', error: '#ff5555', correct: '#50fa7b', border: '#6272a4', accent: '#ffb86c' },
  { id: 'nord', name: 'Nord', bg: '#2e3440', bgSecondary: '#3b4252', bgCard: '#3b4252', primary: '#88c0d0', primaryLight: '#8fbcbb', text: '#eceff4', textSecondary: '#d8dee9', error: '#bf616a', correct: '#a3be8c', border: '#4c566a', accent: '#ebcb8b' },
  { id: 'solarized', name: 'Solarized', bg: '#002b36', bgSecondary: '#073642', bgCard: '#073642', primary: '#268bd2', primaryLight: '#2aa198', text: '#fdf6e3', textSecondary: '#93a1a1', error: '#dc322f', correct: '#859900', border: '#586e75', accent: '#b58900' },
  { id: 'retro-terminal', name: 'Retro Terminal', bg: '#1a1a0a', bgSecondary: '#2a2a1a', bgCard: '#2a2a1a', primary: '#ffcc00', primaryLight: '#ffdd44', text: '#ffcc00', textSecondary: '#998800', error: '#ff3300', correct: '#00ff00', border: '#444400', accent: '#ff6600' },
  { id: 'midnight-purple', name: 'Midnight Purple', bg: '#0d0015', bgSecondary: '#1a0029', bgCard: '#1a0029', primary: '#7c3aed', primaryLight: '#a78bfa', text: '#ede9fe', textSecondary: '#a78bfa', error: '#f43f5e', correct: '#10b981', border: '#2e1065', accent: '#fbbf24' },
  { id: 'clean-white', name: 'Clean White', bg: '#ffffff', bgSecondary: '#f1f5f9', bgCard: '#f8fafc', primary: '#2563eb', primaryLight: '#3b82f6', text: '#0f172a', textSecondary: '#475569', error: '#dc2626', correct: '#16a34a', border: '#cbd5e1', accent: '#ea580c' },
];

// ==================== FONTS ====================
export const FONTS = [
  { id: 'Inter', name: 'Inter', family: "'Inter', sans-serif" },
  { id: 'Roboto', name: 'Roboto', family: "'Roboto', sans-serif" },
  { id: 'Arial', name: 'Arial', family: "Arial, sans-serif" },
  { id: 'Poppins', name: 'Poppins', family: "'Poppins', sans-serif" },
  { id: 'Montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif" },
  { id: 'Open Sans', name: 'Open Sans', family: "'Open Sans', sans-serif" },
  { id: 'Lato', name: 'Lato', family: "'Lato', sans-serif" },
  { id: 'Nunito', name: 'Nunito', family: "'Nunito', sans-serif" },
  { id: 'Ubuntu', name: 'Ubuntu', family: "'Ubuntu', sans-serif" },
  { id: 'JetBrains Mono', name: 'JetBrains Mono', family: "'JetBrains Mono', monospace" },
  { id: 'Fira Code', name: 'Fira Code', family: "'Fira Code', monospace" },
  { id: 'Source Code Pro', name: 'Source Code Pro', family: "'Source Code Pro', monospace" },
  { id: 'IBM Plex Mono', name: 'IBM Plex Mono', family: "'IBM Plex Mono', monospace" },
  { id: 'Space Mono', name: 'Space Mono', family: "'Space Mono', monospace" },
  { id: 'Roboto Mono', name: 'Roboto Mono', family: "'Roboto Mono', monospace" },
  { id: 'Merriweather', name: 'Merriweather', family: "'Merriweather', serif" },
  { id: 'Georgia', name: 'Georgia', family: "Georgia, serif" },
  { id: 'System', name: 'System Default', family: "system-ui, -apple-system, sans-serif" },
];

// ==================== LESSONS ====================
export const LESSONS: Lesson[] = [
  { id: 'l1', title: 'Boshlang\'ich: ASDF', titleEn: 'Beginner: Home Row', titleRu: 'Начальный: Основной ряд', category: 'home-row', level: 'beginner', text: 'asdf jkl; asdf jkl; fjdk sla; fjdk sla; asdf jkl; fjdk sl;a', description: 'Asosiy qator tugmalarini o\'rganing', order: 1 },
  { id: 'l2', title: 'Boshlang\'ich: Harflar', titleEn: 'Beginner: Letters', titleRu: 'Начальный: Буквы', category: 'letters', level: 'beginner', text: 'the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog', description: 'Barcha harflarni mashq qiling', order: 2 },
  { id: 'l3', title: 'So\'zlar: Oddiy', titleEn: 'Words: Simple', titleRu: 'Слова: Простые', category: 'words', level: 'beginner', text: 'cat dog run sit top map red big sun fly cup pen box hat key log net', description: 'Qisqa so\'zlarni yozing', order: 3 },
  { id: 'l4', title: 'So\'zlar: O\'rta', titleEn: 'Words: Medium', titleRu: 'Слова: Средние', category: 'words', level: 'intermediate', text: 'apple banana computer keyboard monitor printer scanner telephone internet browser', description: 'O\'rta uzunlikdagi so\'zlar', order: 4 },
  { id: 'l5', title: 'Gaplar: Oddiy', titleEn: 'Sentences: Simple', titleRu: 'Предложения: Простые', category: 'sentences', level: 'intermediate', text: 'The sun is bright today. I like to read books. She walks to the park every day.', description: 'Oddiy gaplarni yozing', order: 5 },
  { id: 'l6', title: 'Gaplar: Murakkab', titleEn: 'Sentences: Complex', titleRu: 'Предложения: Сложные', category: 'sentences', level: 'advanced', text: 'Programming is the art of telling a computer what to do through carefully written instructions and logical thinking.', description: 'Murakkab gaplar', order: 6 },
  { id: 'l7', title: 'Raqamlar', titleEn: 'Numbers', titleRu: 'Числа', category: 'numbers', level: 'beginner', text: '123 456 789 012 345 678 901 234 567 890 1357 2468 9753 8642 1029 3847', description: 'Raqamlarni yozishni o\'rganing', order: 7 },
  { id: 'l8', title: 'Maxsus belgilar', titleEn: 'Special Characters', titleRu: 'Специальные символы', category: 'special', level: 'intermediate', text: '!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~ !@#$%^&*()_+-=[]{}|;:\'",.<>?/`~', description: 'Maxsus belgilarni mashq qiling', order: 8 },
  { id: 'l9', title: 'Katta harflar', titleEn: 'Capital Letters', titleRu: 'Заглавные буквы', category: 'caps', level: 'intermediate', text: 'Hello World My Name Is John The Quick Brown Fox Jumps Over The Lazy Dog New York City', description: 'Katta harflar bilan mashq', order: 9 },
  { id: 'l10', title: 'Chap qo\'l', titleEn: 'Left Hand', titleRu: 'Левая рука', category: 'hands', level: 'beginner', text: 'qwert asdfg zxcvb qaz wsx edc rfvtg bhy ujm qazwsx edcrfv tgbyhn qaz', description: 'Chap qo\'l uchun mashq', order: 10 },
  { id: 'l11', title: 'O\'ng qo\'l', titleEn: 'Right Hand', titleRu: 'Правая рука', category: 'hands', level: 'beginner', text: 'yuiop hjkl; nm,./ yhn ujm ikol; plop yhnujm ikol;p yhn ujmkol; p/', description: 'O\'ng qo\'l uchun mashq', order: 11 },
  { id: 'l12', title: 'Tinish belgilari', titleEn: 'Punctuation', titleRu: 'Пунктуация', category: 'punctuation', level: 'intermediate', text: 'Hello, world! How are you? I\'m fine, thanks. Let\'s go; don\'t wait. (Yes!) "Really?" she asked.', description: 'Tinish belgilari bilan mashq', order: 12 },
  { id: 'l13', title: 'Kod yozish', titleEn: 'Code Typing', titleRu: 'Написание кода', category: 'code', level: 'advanced', text: 'function hello() { console.log("Hello!"); } const x = 42; if (x > 0) { return true; }', description: 'Dasturlash kodini yozing', order: 13 },
  { id: 'l14', title: 'Uzun matn', titleEn: 'Long Text', titleRu: 'Длинный текст', category: 'long', level: 'advanced', text: 'The art of typing quickly and accurately is a valuable skill in the modern world. Whether you are writing emails, coding software, or creating documents, the ability to type efficiently can save you hours of time each week. Practice regularly and focus on accuracy before speed.', description: 'Uzun matnni yozing', order: 14 },
  { id: 'l15', title: 'Ingliz tili', titleEn: 'English Practice', titleRu: 'Английский язык', category: 'english', level: 'intermediate', text: 'Technology has transformed the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to reshape our daily experiences and open new possibilities for the future.', description: 'Ingliz tilida matn yozish', order: 15 },
  { id: 'l16', title: 'O\'zbek tili', titleEn: 'Uzbek Practice', titleRu: 'Узбекский язык', category: 'uzbek', level: 'intermediate', text: 'O\'zbekiston go\'zal mamlakat. Bu yerda ko\'plab tarixiy joylar mavjud. Samarqand va Buxoro shaharlari dunyoga mashhur. Tabiati ham juda chiroyli.', description: 'O\'zbek tilida matn yozish', order: 16 },
  { id: 'l17', title: 'Rus tili', titleEn: 'Russian Practice', titleRu: 'Русский язык', category: 'russian', level: 'intermediate', text: 'Moskva stolica Rossii. Eto krasiviy gorod s bogatoy istoriey. Krasnaya ploshad yavlyayetsya odnoy iz samix izvestnix dostoprimechatelnostey.', description: 'Rus tilida matn yozish', order: 17 },
  { id: 'l18', title: 'Barcha barmoqlar', titleEn: 'All Fingers', titleRu: 'Все пальцы', category: 'fingers', level: 'advanced', text: 'qaz wsx edc rfvtgb yhn ujm ikol; p;./ qazwsxedcrfvtgbyhnujmikol;p;./ the quick brown fox jumps', description: 'Barcha barmoqlar bilan mashq', order: 18 },
];

// ==================== ACHIEVEMENTS ====================
export const ACHIEVEMENTS = [
  { id: 'first-lesson', name: 'Birinchi qadam', nameEn: 'First Step', nameRu: 'Первый шаг', icon: '🎯', description: 'Birinchi mashg\'ulotni tugatish', condition: (stats: UserStats) => stats.totalLessons >= 1 },
  { id: 'ten-lessons', name: '10 ta mashg\'ulot', nameEn: '10 Lessons', nameRu: '10 уроков', icon: '📚', description: '10 ta mashg\'ulotni tugatish', condition: (stats: UserStats) => stats.totalLessons >= 10 },
  { id: 'hundred-lessons', name: '100 ta mashg\'ulot', nameEn: '100 Lessons', nameRu: '100 уроков', icon: '🏆', description: '100 ta mashg\'ulotni tugatish', condition: (stats: UserStats) => stats.totalLessons >= 100 },
  { id: 'accuracy-95', name: '95% aniqlik', nameEn: '95% Accuracy', nameRu: '95% точность', icon: '🎯', description: '95% aniqlikka erishish', condition: (stats: UserStats) => stats.accuracy >= 95 },
  { id: 'accuracy-98', name: '98% aniqlik', nameEn: '98% Accuracy', nameRu: '98% точность', icon: '💎', description: '98% aniqlikka erishish', condition: (stats: UserStats) => stats.accuracy >= 98 },
  { id: 'wpm-100', name: '100 WPM', nameEn: '100 WPM', nameRu: '100 WPM', icon: '⚡', description: '100 WPM tezlikka erishish', condition: (stats: UserStats) => stats.bestWPM >= 100 },
  { id: 'streak-30', name: '30 kunlik faollik', nameEn: '30 Day Streak', nameRu: '30 дней подряд', icon: '🔥', description: '30 kun ketma-ket mashq qilish', condition: (_stats: UserStats, streak: number) => streak >= 30 },
  { id: 'beginner-complete', name: 'Boshlang\'ich tugatildi', nameEn: 'Beginner Complete', nameRu: 'Начальный завершён', icon: '🌟', description: 'Barcha boshlang\'ich darslarni tugatish', condition: () => false },
  { id: 'new-record', name: 'Yangi rekord', nameEn: 'New Record', nameRu: 'Новый рекорд', icon: '🏅', description: 'Shaxsiy rekordni yangilash', condition: (stats: UserStats) => stats.bestWPM >= 50 },
  { id: 'million-chars', name: '1 million belgi', nameEn: '1M Characters', nameRu: '1 млн символов', icon: '💫', description: '1 million belgi yozish', condition: (stats: UserStats) => stats.charsTyped >= 1000000 },
];

// ==================== WORD LISTS ====================
export const WORD_LISTS = {
  common: ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'great', 'between', 'need', 'large', 'often', 'hand', 'high', 'place', 'hold', 'free', 'real', 'life', 'few', 'north', 'open', 'seem', 'together', 'next', 'white', 'children', 'begin', 'got', 'walk', 'example', 'ease', 'paper', 'group', 'always', 'music', 'those', 'both', 'mark', 'book', 'letter', 'until', 'mile', 'river', 'car', 'feet', 'care', 'second', 'enough', 'plain', 'girl', 'usual', 'young', 'ready', 'above', 'ever', 'red', 'list', 'though', 'feel', 'talk', 'bird', 'soon', 'body', 'dog', 'family', 'direct', 'pose', 'leave', 'song', 'measure', 'door', 'product', 'black', 'short', 'numeral', 'class', 'wind', 'question', 'happen', 'complete', 'ship', 'area', 'half', 'rock', 'order', 'fire', 'south', 'problem', 'piece', 'told', 'knew', 'pass', 'since', 'top', 'whole', 'king', 'space', 'heard', 'best', 'hour', 'better', 'true', 'during', 'hundred', 'five', 'remember', 'step', 'early', 'hold', 'west', 'ground', 'interest', 'reach', 'fast', 'verb', 'sing', 'listen', 'six', 'table', 'travel', 'less', 'morning', 'ten', 'simple', 'several', 'vowel', 'toward', 'war', 'lay', 'against', 'pattern', 'slow', 'center', 'love', 'person', 'money', 'serve', 'appear', 'road', 'map', 'rain', 'rule', 'govern', 'pull', 'cold', 'notice', 'voice', 'unit', 'power', 'town', 'fine', 'certain', 'fly', 'fall', 'lead', 'cry', 'dark', 'machine', 'note', 'wait', 'plan', 'figure', 'star', 'box', 'noun', 'field', 'rest', 'correct', 'able', 'pound', 'done', 'beauty', 'drive', 'stood', 'contain', 'front', 'teach', 'week', 'final', 'gave', 'green', 'oh', 'quick', 'develop', 'ocean', 'warm', 'object', 'column', 'nature', 'guess', 'corner', 'property', 'surface', 'deep', 'multiply', 'nothing', 'course', 'stay', 'wheel', 'full', 'force', 'blue', 'wish', 'drop', 'basis', 'shine', 'heat', 'snow', 'tire', 'bring', 'yes', 'distant', 'fill', 'east', 'paint', 'language', 'among', 'grand', 'ball', 'yet', 'wave', 'drop', 'heart', 'am', 'present', 'heavy', 'dance', 'engine', 'position', 'arm', 'wide', 'sail', 'material', 'size', 'vary', 'settle', 'speak', 'weight', 'general', 'ice', 'matter', 'circle', 'pair', 'include', 'divide', 'syllable', 'felt', 'perhaps', 'pick', 'sudden', 'count', 'square', 'reason', 'length', 'represent', 'art', 'subject', 'region', 'energy', 'hunt', 'probable', 'bed', 'brother', 'egg', 'ride', 'cell', 'believe', 'fraction', 'forest', 'sit', 'race', 'window', 'store', 'summer', 'train', 'sleep', 'prove', 'lone', 'leg', 'exercise', 'wall', 'catch', 'mount', 'sky', 'board', 'joy', 'winter', 'sat', 'written', 'wild', 'instrument', 'kept', 'glass', 'grass', 'cow', 'job', 'edge', 'sign', 'visit', 'past', 'soft', 'fun', 'bright', 'gas', 'weather', 'month', 'million', 'bear', 'finish', 'happy', 'hope', 'flower', 'clothe', 'strange', 'gone', 'jump', 'baby', 'eight', 'village', 'meet', 'root', 'buy', 'raise', 'solve', 'metal', 'whether', 'push', 'seven', 'paragraph', 'third', 'shall', 'held', 'hair', 'describe', 'cook', 'floor', 'either', 'result', 'burn', 'hill', 'safe', 'cat', 'century', 'consider', 'type', 'law', 'bit', 'coast', 'copy', 'phrase', 'silent', 'tall', 'sand', 'soil', 'roll', 'temperature', 'finger', 'industry', 'value', 'fight', 'lie', 'beat', 'excite', 'natural', 'view', 'sense', 'ear', 'else', 'quite', 'broke', 'case', 'middle', 'kill', 'lake', 'moment', 'scale', 'loud', 'spring', 'observe', 'child', 'straight', 'consonant', 'nation', 'dictionary', 'milk', 'speed', 'method', 'organ', 'pay', 'age', 'section', 'dress', 'cloud', 'surprise', 'quiet', 'stone', 'tiny', 'climb', 'cool', 'design', 'poor', 'lot', 'experiment', 'bottom', 'key', 'iron', 'single', 'stick', 'flat', 'twenty', 'skin', 'smile', 'crease', 'hole', 'trade', 'melody', 'trip', 'office', 'receive', 'row', 'mouth', 'exact', 'symbol', 'die', 'least', 'trouble', 'shout', 'except', 'wrote', 'seed', 'tone', 'join', 'suggest', 'clean', 'break', 'lady', 'yard', 'rise', 'bad', 'blow', 'oil', 'blood', 'touch', 'grew', 'cent', 'mix', 'team', 'wire', 'cost', 'lost', 'brown', 'wear', 'garden', 'equal', 'sent', 'choose', 'fell', 'fit', 'flow', 'fair', 'bank', 'collect', 'save', 'control', 'decimal', 'gentle', 'woman', 'captain', 'practice', 'separate', 'difficult', 'doctor', 'please', 'protect', 'noon', 'crop', 'modern', 'element', 'hit', 'student', 'corner', 'party', 'supply', 'whose', 'locate', 'ring', 'character', 'insect', 'caught', 'period', 'indicate', 'radio', 'spoke', 'atom', 'human', 'history', 'effect', 'electric', 'expect', 'crop', 'modern', 'bone', 'rail', 'imagine', 'provide', 'agree', 'thus', 'capital', 'chair', 'danger', 'fruit', 'rich', 'thick', 'soldier', 'process', 'operate', 'necessary', 'log', 'kept', 'young', 'language', 'unit', 'power', 'town', 'fine', 'certain', 'fly', 'fall', 'lead', 'cry'],
  programming: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'null', 'undefined', 'true', 'false', 'array', 'object', 'string', 'number', 'boolean', 'interface', 'type', 'enum', 'switch', 'case', 'break', 'continue', 'do', 'typeof', 'instanceof', 'void', 'delete', 'in', 'of', 'yield', 'static', 'public', 'private', 'protected', 'extends', 'implements', 'super', 'constructor', 'get', 'set', 'map', 'filter', 'reduce', 'forEach', 'push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'concat', 'join', 'split', 'replace', 'match', 'test', 'search', 'includes', 'indexOf', 'find', 'some', 'every', 'keys', 'values', 'entries', 'assign', 'create', 'freeze', 'parse', 'stringify', 'log', 'error', 'warn', 'info', 'debug', 'promise', 'then', 'resolve', 'reject', 'fetch', 'response', 'request', 'header', 'body', 'status', 'json', 'text', 'blob', 'form', 'data', 'state', 'props', 'render', 'component', 'hook', 'effect', 'context', 'provider', 'consumer', 'ref', 'memo', 'callback', 'mount', 'unmount', 'update', 'lifecycle', 'virtual', 'dom', 'node', 'element', 'attribute', 'property', 'event', 'listener', 'handler', 'click', 'change', 'submit', 'focus', 'blur', 'input', 'output', 'value', 'target', 'current', 'previous', 'next', 'parent', 'child', 'sibling', 'root', 'tree', 'graph', 'stack', 'queue', 'list', 'hash', 'table', 'binary', 'search', 'sort', 'merge', 'quick', 'bubble', 'insertion', 'selection', 'linear', 'recursive', 'iterative', 'dynamic', 'greedy', 'divide', 'conquer', 'backtrack', 'branch', 'bound', 'algorithm', 'complexity', 'space', 'time', 'memory', 'cache', 'buffer', 'stream', 'pipe', 'socket', 'server', 'client', 'database', 'query', 'table', 'column', 'row', 'index', 'primary', 'foreign', 'constraint', 'transaction', 'commit', 'rollback', 'schema', 'migration', 'model', 'controller', 'route', 'middleware', 'template', 'view', 'component', 'module', 'package', 'dependency', 'build', 'deploy', 'test', 'debug', 'lint', 'format', 'compile', 'transpile', 'bundle', 'minify', 'optimize', 'compress', 'encrypt', 'decrypt', 'hash', 'token', 'session', 'cookie', 'auth', 'login', 'logout', 'register', 'verify', 'validate', 'sanitize', 'escape', 'encode', 'decode', 'serialize', 'deserialize', 'transform', 'convert', 'parse', 'format', 'render', 'display', 'show', 'hide', 'toggle', 'animate', 'transition', 'transform', 'scale', 'rotate', 'translate', 'opacity', 'color', 'background', 'border', 'margin', 'padding', 'width', 'height', 'position', 'display', 'flex', 'grid', 'block', 'inline', 'absolute', 'relative', 'fixed', 'sticky', 'overflow', 'scroll', 'cursor', 'pointer', 'hover', 'active', 'focus', 'disabled', 'enabled', 'visible', 'hidden', 'responsive', 'mobile', 'desktop', 'tablet', 'breakpoint', 'media', 'query', 'viewport', 'resolution', 'pixel', 'density', 'retina', 'animation', 'keyframe', 'duration', 'delay', 'timing', 'easing', 'iteration', 'direction', 'fill', 'mode', 'play', 'pause', 'stop', 'restart', 'reverse', 'alternate', 'infinite'],
  science: ['atom', 'molecule', 'electron', 'proton', 'neutron', 'photon', 'quark', 'boson', 'fermion', 'nucleus', 'orbital', 'quantum', 'relativity', 'gravity', 'force', 'energy', 'mass', 'velocity', 'acceleration', 'momentum', 'inertia', 'friction', 'tension', 'compression', 'stress', 'strain', 'elasticity', 'plasticity', 'viscosity', 'density', 'pressure', 'temperature', 'entropy', 'enthalpy', 'thermodynamics', 'kinetics', 'equilibrium', 'catalyst', 'reaction', 'compound', 'element', 'isotope', 'ion', 'acid', 'base', 'salt', 'oxide', 'hydroxide', 'carbonate', 'sulfate', 'nitrate', 'phosphate', 'organic', 'inorganic', 'polymer', 'monomer', 'protein', 'enzyme', 'amino', 'nucleic', 'genome', 'chromosome', 'gene', 'allele', 'mutation', 'evolution', 'natural', 'selection', 'adaptation', 'species', 'population', 'ecosystem', 'biosphere', 'habitat', 'niche', 'symbiosis', 'parasite', 'host', 'predator', 'prey', 'photosynthesis', 'respiration', 'metabolism', 'homeostasis', 'neuron', 'synapse', 'dendrite', 'axon', 'brain', 'cortex', 'hippocampus', 'amygdala', 'cerebellum', 'hormone', 'insulin', 'adrenaline', 'cortisol', 'testosterone', 'estrogen', 'antibody', 'antigen', 'vaccine', 'virus', 'bacteria', 'fungus', 'parasite', 'pathogen', 'immune', 'inflammation', 'fever', 'infection', 'disease', 'symptom', 'diagnosis', 'treatment', 'surgery', 'therapy', 'medicine', 'pharmacology', 'dosage', 'prescription', 'clinical', 'trial', 'placebo', 'control', 'variable', 'hypothesis', 'theory', 'law', 'principle', 'model', 'simulation', 'experiment', 'observation', 'measurement', 'data', 'analysis', 'conclusion', 'peer', 'review', 'publication', 'citation', 'reference', 'abstract', 'methodology', 'result', 'discussion', 'introduction', 'background', 'objective', 'aim', 'scope', 'limitation', 'assumption', 'implication', 'application', 'innovation', 'discovery', 'invention', 'technology', 'engineering', 'mathematics', 'physics', 'chemistry', 'biology', 'astronomy', 'geology', 'ecology', 'psychology', 'sociology', 'anthropology', 'archaeology', 'linguistics', 'philosophy', 'logic', 'ethics', 'aesthetics', 'epistemology', 'metaphysics', 'ontology', 'phenomenology', 'hermeneutics', 'semiotics', 'rhetoric', 'dialectic', 'syllogism', 'paradox', 'fallacy', 'premise', 'deduction', 'induction', 'abduction', 'inference', 'argument', 'evidence', 'proof', 'theorem', 'lemma', 'corollary', 'axiom', 'postulate', 'conjecture', 'algorithm', 'heuristic', 'optimization', 'simulation', 'modeling', 'prediction', 'forecast', 'extrapolation', 'interpolation', 'regression', 'correlation', 'causation', 'probability', 'statistics', 'distribution', 'variance', 'deviation', 'mean', 'median', 'mode', 'range', 'quartile', 'percentile', 'histogram', 'scatter', 'plot', 'graph', 'chart', 'diagram', 'figure', 'table', 'matrix', 'vector', 'tensor', 'scalar', 'magnitude', 'direction', 'dimension', 'coordinate', 'axis', 'origin', 'slope', 'intercept', 'function', 'derivative', 'integral', 'limit', 'continuity', 'differentiation', 'integration', 'differential', 'equation', 'solution', 'boundary', 'condition', 'initial', 'final', 'steady', 'transient', 'periodic', 'oscillation', 'wave', 'frequency', 'amplitude', 'wavelength', 'phase', 'resonance', 'interference', 'diffraction', 'refraction', 'reflection', 'absorption', 'emission', 'transmission', 'scattering', 'polarization', 'spectrum', 'wavelength', 'infrared', 'ultraviolet', 'visible', 'radio', 'microwave', 'gamma', 'cosmic', 'solar', 'lunar', 'planetary', 'stellar', 'galactic', 'universal', 'expansion', 'contraction', 'collapse', 'explosion', 'implosion', 'fusion', 'fission', 'radioactive', 'decay', 'half-life', 'isotope', 'dating', 'fossil', 'sediment', 'strata', 'layer', 'epoch', 'era', 'period', 'age', 'eon', 'precambrian', 'paleozoic', 'mesozoic', 'cenozoic', 'jurassic', 'cretaceous', 'tertiary', 'quaternary', 'pleistocene', 'holocene', 'anthropocene'],
};

// ==================== I18N ====================
export const TRANSLATIONS = {
  uz: {
    welcome: 'Xush kelibsiz',
    hello: 'Salom',
    dashboard: 'Bosh sahifa',
    practice: 'Mashq',
    lessons: 'Darslar',
    test: 'Test',
    freeWrite: 'Erkin yozish',
    settings: 'Sozlamalar',
    profile: 'Profil',
    achievements: 'Yutuqlar',
    admin: 'Admin',
    logout: 'Chiqish',
    login: 'Kirish',
    register: 'Ro\'yxatdan o\'tish',
    email: 'Email',
    password: 'Parol',
    firstName: 'Ism',
    lastName: 'Familiya',
    username: 'Foydalanuvchi nomi',
    totalWPM: 'Umumiy WPM',
    bestWPM: 'Eng yuqori WPM',
    accuracy: 'Aniqlik',
    totalTime: 'Jami vaqt',
    todayLessons: 'Bugungi mashg\'ulotlar',
    charsTyped: 'Yozilgan belgilar',
    wordsLearned: 'O\'rganilgan so\'zlar',
    continue: 'Davom ettirish',
    start: 'Boshlash',
    pause: 'Pauza',
    resume: 'Davom',
    restart: 'Qayta boshlash',
    finish: 'Tugatish',
    wpm: 'WPM',
    cpm: 'CPM',
    errors: 'Xatolar',
    time: 'Vaqt',
    theme: 'Tema',
    font: 'Shrift',
    fontSize: 'Shrift o\'lchami',
    sound: 'Ovoz',
    animations: 'Animatsiyalar',
    language: 'Til',
    dailyGoal: 'Kunlik maqsad',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    reset: 'Qayta o\'rnatish',
    beginner: 'Boshlang\'ich',
    intermediate: 'O\'rta',
    advanced: 'Yuqori',
    noAccount: 'Akkauntingiz yo\'qmi?',
    hasAccount: 'Akkauntingiz bormi?',
    forgotPassword: 'Parolni unutdingizmi?',
    typingSpeed: 'Yozish tezligi',
    progress: 'Taraqqiyot',
    level: 'Daraja',
    xp: 'Tajriba',
    streak: 'Ketma-ketlik',
    minutes: 'daqiqa',
    seconds: 'soniya',
    customTime: 'O\'z vaqti',
    unlimited: 'Cheklanmagan',
    dailyGoalMsg: 'Kunlik maqsad',
    lessonsToday: 'Bugungi darslar',
    recentActivity: 'Oxirgi faollik',
    noResults: 'Natijalar yo\'q',
    newRecord: 'Yangi rekord!',
    congratulations: 'Tabriklaymiz!',
    selectTopic: 'Mavzuni tanlang',
    enterText: 'Matnni kiriting',
    pasteText: 'Matnni joylashtiring',
    checkErrors: 'Xatolarni tekshirish',
    timedMode: 'Vaqtli rejim',
    untimedMode: 'Vaqtsiz rejim',
    words: 'So\'zlar',
    worldTime: 'Dunyo vaqti',
    wordCount: 'So\'zlar soni',
    commonWords: 'Oddiy so\'zlar',
    programmingWords: 'Dasturlash',
    scienceWords: 'Fan',
    refresh: 'Yangilash',
    wordMode: 'So\'z rejimi',
  },
  en: {
    welcome: 'Welcome',
    hello: 'Hello',
    dashboard: 'Dashboard',
    practice: 'Practice',
    lessons: 'Lessons',
    test: 'Test',
    freeWrite: 'Free Write',
    settings: 'Settings',
    profile: 'Profile',
    achievements: 'Achievements',
    admin: 'Admin',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    totalWPM: 'Average WPM',
    bestWPM: 'Best WPM',
    accuracy: 'Accuracy',
    totalTime: 'Total Time',
    todayLessons: 'Today\'s Lessons',
    charsTyped: 'Characters Typed',
    wordsLearned: 'Words Learned',
    continue: 'Continue',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    restart: 'Restart',
    finish: 'Finish',
    wpm: 'WPM',
    cpm: 'CPM',
    errors: 'Errors',
    time: 'Time',
    theme: 'Theme',
    font: 'Font',
    fontSize: 'Font Size',
    sound: 'Sound',
    animations: 'Animations',
    language: 'Language',
    dailyGoal: 'Daily Goal',
    save: 'Save',
    cancel: 'Cancel',
    reset: 'Reset',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    noAccount: 'Don\'t have an account?',
    hasAccount: 'Already have an account?',
    forgotPassword: 'Forgot password?',
    typingSpeed: 'Typing Speed',
    progress: 'Progress',
    level: 'Level',
    xp: 'XP',
    streak: 'Streak',
    minutes: 'minutes',
    seconds: 'seconds',
    customTime: 'Custom Time',
    unlimited: 'Unlimited',
    dailyGoalMsg: 'Daily Goal',
    lessonsToday: 'Lessons Today',
    recentActivity: 'Recent Activity',
    noResults: 'No results yet',
    newRecord: 'New Record!',
    congratulations: 'Congratulations!',
    selectTopic: 'Select Topic',
    enterText: 'Enter text',
    pasteText: 'Paste text',
    checkErrors: 'Check Errors',
    timedMode: 'Timed Mode',
    untimedMode: 'Untimed Mode',
    words: 'Words',
    worldTime: 'World Time',
    wordCount: 'Word Count',
    commonWords: 'Common Words',
    programmingWords: 'Programming',
    scienceWords: 'Science',
    refresh: 'Refresh',
    wordMode: 'Word Mode',
  },
  ru: {
    welcome: 'Добро пожаловать',
    hello: 'Привет',
    dashboard: 'Главная',
    practice: 'Практика',
    lessons: 'Уроки',
    test: 'Тест',
    freeWrite: 'Свободное письмо',
    settings: 'Настройки',
    profile: 'Профиль',
    achievements: 'Достижения',
    admin: 'Админ',
    logout: 'Выйти',
    login: 'Войти',
    register: 'Регистрация',
    email: 'Эл. почта',
    password: 'Пароль',
    firstName: 'Имя',
    lastName: 'Фамилия',
    username: 'Имя пользователя',
    totalWPM: 'Средний WPM',
    bestWPM: 'Лучший WPM',
    accuracy: 'Точность',
    totalTime: 'Общее время',
    todayLessons: 'Сегодняшние уроки',
    charsTyped: 'Набранные символы',
    wordsLearned: 'Выученные слова',
    continue: 'Продолжить',
    start: 'Начать',
    pause: 'Пауза',
    resume: 'Продолжить',
    restart: 'Перезапустить',
    finish: 'Завершить',
    wpm: 'WPM',
    cpm: 'CPM',
    errors: 'Ошибки',
    time: 'Время',
    theme: 'Тема',
    font: 'Шрифт',
    fontSize: 'Размер шрифта',
    sound: 'Звук',
    animations: 'Анимации',
    language: 'Язык',
    dailyGoal: 'Дневная цель',
    save: 'Сохранить',
    cancel: 'Отмена',
    reset: 'Сбросить',
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
    noAccount: 'Нет аккаунта?',
    hasAccount: 'Уже есть аккаунт?',
    forgotPassword: 'Забыли пароль?',
    typingSpeed: 'Скорость печати',
    progress: 'Прогресс',
    level: 'Уровень',
    xp: 'Опыт',
    streak: 'Серия',
    minutes: 'минут',
    seconds: 'секунд',
    customTime: 'Своё время',
    unlimited: 'Без ограничений',
    dailyGoalMsg: 'Дневная цель',
    lessonsToday: 'Уроков сегодня',
    recentActivity: 'Последняя активность',
    noResults: 'Пока нет результатов',
    newRecord: 'Новый рекорд!',
    congratulations: 'Поздравляем!',
    selectTopic: 'Выберите тему',
    enterText: 'Введите текст',
    pasteText: 'Вставить текст',
    checkErrors: 'Проверять ошибки',
    timedMode: 'С таймером',
    untimedMode: 'Без таймера',
    words: 'Слова',
    worldTime: 'Мировое время',
    wordCount: 'Количество слов',
    commonWords: 'Общие слова',
    programmingWords: 'Программирование',
    scienceWords: 'Наука',
    refresh: 'Обновить',
    wordMode: 'Режим слов',
  },
};

// ==================== STORE ====================
const USERS_KEY = 'typingclub_users';
const CURRENT_USER_KEY = 'typingclub_current_user';

export function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  const id = localStorage.getItem(CURRENT_USER_KEY);
  if (!id) return null;
  const users = getUsers();
  return users.find(u => u.id === id) || null;
}

export function setCurrentUser(id: string | null) {
  if (id) {
    localStorage.setItem(CURRENT_USER_KEY, id);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function registerUser(firstName: string, lastName: string, username: string, email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  if (users.find(u => u.username === username)) {
    return { success: false, error: 'Username already taken' };
  }
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already registered' };
  }
  const user: User = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    firstName,
    lastName,
    username,
    email,
    password: btoa(password),
    avatar: '',
    createdAt: new Date().toISOString(),
    settings: {
      theme: 'dark-pro',
      font: 'Inter',
      fontSize: 24,
      fontWeight: 400,
      lineHeight: 2,
      soundEnabled: true,
      animationsEnabled: true,
      cursorStyle: 'line',
      language: 'uz',
      dailyGoal: 5,
    },
    stats: {
      totalWPM: 0,
      bestWPM: 0,
      accuracy: 100,
      totalTime: 0,
      totalLessons: 0,
      todayLessons: 0,
      charsTyped: 0,
      wordsLearned: 0,
      testsCompleted: 0,
      history: [],
    },
    achievements: [],
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  setCurrentUser(user.id);
  return { success: true, user };
}

export function loginUser(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  const user = users.find(u => u.email === email && atob(u.password) === password);
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }
  setCurrentUser(user.id);
  // Update streak
  const lastActive = new Date(user.lastActive);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) {
    user.streak += 1;
  } else if (diffDays > 1) {
    user.streak = 1;
  }
  user.lastActive = now.toISOString();
  // Reset today lessons if new day
  const lastDay = lastActive.getDate();
  const today = now.getDate();
  if (lastDay !== today) {
    user.stats.todayLessons = 0;
  }
  saveUsers(users);
  return { success: true, user };
}

export function updateUser(user: User) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) {
    users[idx] = user;
    saveUsers(users);
  }
}

export function deleteUser(userId: string) {
  const users = getUsers().filter(u => u.id !== userId);
  saveUsers(users);
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function saveTestResult(user: User, result: TestResult): User {
  user.stats.history.unshift(result);
  if (user.stats.history.length > 100) user.stats.history = user.stats.history.slice(0, 100);
  user.stats.totalLessons += 1;
  user.stats.todayLessons += 1;
  user.stats.charsTyped += result.text.length;
  user.stats.totalTime += result.duration;
  
  // Update averages
  const allResults = user.stats.history;
  user.stats.totalWPM = Math.round(allResults.reduce((sum, r) => sum + r.wpm, 0) / allResults.length);
  user.stats.bestWPM = Math.max(user.stats.bestWPM, result.wpm);
  user.stats.accuracy = Math.round(allResults.reduce((sum, r) => sum + r.accuracy, 0) / allResults.length);
  user.stats.wordsLearned = Math.round(user.stats.charsTyped / 5);
  user.stats.testsCompleted += 1;
  
  // XP
  const xpGained = Math.round(result.wpm * (result.accuracy / 100) * 0.5);
  user.xp += xpGained;
  user.level = Math.floor(user.xp / 500) + 1;
  
  // Check achievements
  ACHIEVEMENTS.forEach(a => {
    if (!user.achievements.includes(a.id) && a.condition(user.stats, user.streak)) {
      user.achievements.push(a.id);
    }
  });
  
  updateUser(user);
  return user;
}

export function getTheme(id: string): Theme {
  return THEMES.find(t => t.id === id) || THEMES[0];
}

export function getFont(id: string) {
  return FONTS.find(f => f.id === id) || FONTS[0];
}

export function t(key: keyof typeof TRANSLATIONS.uz, lang: 'uz' | 'en' | 'ru'): string {
  return TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
}
