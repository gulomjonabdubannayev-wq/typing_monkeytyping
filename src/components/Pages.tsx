import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Target, Clock, Award, TrendingUp, BookOpen, ChevronRight, Star,
  Play, Palette, Type, Globe, Volume2, VolumeX, Sparkles, RotateCcw,
  User as UserIcon, Mail, Lock, Trash2, Save, Check, PenTool, Timer,
  Trophy, Medal, Lock as LockIcon, Eye, EyeOff
} from 'lucide-react';
import { useApp } from '../App';
import TypingEngine from './TypingEngine';
import { 
  THEMES, FONTS, LESSONS, ACHIEVEMENTS, updateUser, deleteUser, 
  setCurrentUser, TestResult, Lesson, getFont
} from '../store';

// ==================== DASHBOARD ====================
export function Dashboard({ setCurrentPage }: { setCurrentPage: (p: string) => void }) {
  const { user, theme, tr } = useApp();
  if (!user) return null;

  const stats = user.stats;
  const todayStr = new Date().toDateString();
  const todayResults = stats.history.filter(r => new Date(r.date).toDateString() === todayStr);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: theme.text }}>
            {tr('hello')}, {user.firstName}! 👋
          </h1>
          <p style={{ color: theme.textSecondary }}>{tr('dailyGoalMsg')}: {stats.todayLessons}/{user.settings.dailyGoal} {tr('lessonsToday')}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage('practice')}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white"
          style={{ background: theme.primary }}
        >
          <Play size={18} />
          {tr('continue')}
        </motion.button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard icon={<Zap size={20} />} label={tr('totalWPM')} value={stats.totalWPM.toString()} color={theme.primary} theme={theme} />
        <DashboardCard icon={<TrendingUp size={20} />} label={tr('bestWPM')} value={stats.bestWPM.toString()} color={theme.correct} theme={theme} />
        <DashboardCard icon={<Target size={20} />} label={tr('accuracy')} value={`${stats.accuracy}%`} color={theme.accent} theme={theme} />
        <DashboardCard icon={<Clock size={20} />} label={tr('totalTime')} value={formatTime(stats.totalTime)} color={theme.primaryLight} theme={theme} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction icon={<Keyboard />} label={tr('practice')} onClick={() => setCurrentPage('practice')} theme={theme} />
        <QuickAction icon={<BookOpen />} label={tr('lessons')} onClick={() => setCurrentPage('lessons')} theme={theme} />
        <QuickAction icon={<Timer />} label={tr('test')} onClick={() => setCurrentPage('test')} theme={theme} />
        <QuickAction icon={<PenTool />} label={tr('freeWrite')} onClick={() => setCurrentPage('freeWrite')} theme={theme} />
      </div>

      {/* Progress & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress */}
        <div className="p-6 rounded-2xl" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>{tr('progress')}</h3>
          <div className="space-y-4">
            <ProgressBar label={tr('level')} current={user.xp % 500} max={500} color={theme.primary} theme={theme} />
            <ProgressBar label={tr('dailyGoalMsg')} current={stats.todayLessons} max={user.settings.dailyGoal} color={theme.correct} theme={theme} />
            <ProgressBar label={tr('streak')} current={user.streak} max={30} color={theme.accent} theme={theme} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl" style={{ background: theme.bg }}>
              <p className="text-2xl font-bold" style={{ color: theme.primary }}>{user.level}</p>
              <p className="text-xs" style={{ color: theme.textSecondary }}>{tr('level')}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: theme.bg }}>
              <p className="text-2xl font-bold" style={{ color: theme.accent }}>{user.streak}🔥</p>
              <p className="text-xs" style={{ color: theme.textSecondary }}>{tr('streak')}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: theme.bg }}>
              <p className="text-2xl font-bold" style={{ color: theme.correct }}>{user.achievements.length}</p>
              <p className="text-xs" style={{ color: theme.textSecondary }}>{tr('achievements')}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 rounded-2xl" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>{tr('recentActivity')}</h3>
          {stats.history.length === 0 ? (
            <p className="text-sm" style={{ color: theme.textSecondary }}>{tr('noResults')}</p>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {stats.history.slice(0, 10).map((result, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: theme.bg }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${theme.primary}20` }}>
                      <Zap size={14} style={{ color: theme.primary }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: theme.text }}>{result.wpm} WPM</p>
                      <p className="text-xs" style={{ color: theme.textSecondary }}>{new Date(result.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium" style={{ color: theme.correct }}>{result.accuracy}%</p>
                    <p className="text-xs" style={{ color: theme.textSecondary }}>{result.duration}s</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile continue button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentPage('practice')}
        className="md:hidden w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white"
        style={{ background: theme.primary }}
      >
        <Play size={18} />
        {tr('continue')}
      </motion.button>
    </div>
  );
}

function Keyboard() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
    </svg>
  );
}

function DashboardCard({ icon, label, value, color, theme }: any) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-4 rounded-2xl"
      style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, color }}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ color: theme.text }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>{label}</p>
    </motion.div>
  );
}

function QuickAction({ icon, label, onClick, theme }: any) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-4 rounded-2xl flex flex-col items-center gap-2 transition-all"
      style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}
    >
      <div style={{ color: theme.primary }}>{icon}</div>
      <span className="text-sm font-medium" style={{ color: theme.text }}>{label}</span>
    </motion.button>
  );
}

function ProgressBar({ label, current, max, color, theme }: any) {
  const percent = Math.min(100, (current / max) * 100);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs" style={{ color: theme.textSecondary }}>{label}</span>
        <span className="text-xs font-medium" style={{ color: theme.text }}>{current}/{max}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: theme.bg }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

// ==================== LESSONS PAGE ====================
export function LessonsPage() {
  const { theme, tr } = useApp();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Barchasi', nameEn: 'All', nameRu: 'Все' },
    { id: 'home-row', name: 'Asosiy qator', nameEn: 'Home Row', nameRu: 'Основной ряд' },
    { id: 'letters', name: 'Harflar', nameEn: 'Letters', nameRu: 'Буквы' },
    { id: 'words', name: 'So\'zlar', nameEn: 'Words', nameRu: 'Слова' },
    { id: 'sentences', name: 'Gaplar', nameEn: 'Sentences', nameRu: 'Предложения' },
    { id: 'numbers', name: 'Raqamlar', nameEn: 'Numbers', nameRu: 'Числа' },
    { id: 'special', name: 'Maxsus belgilar', nameEn: 'Special', nameRu: 'Специальные' },
    { id: 'code', name: 'Kod', nameEn: 'Code', nameRu: 'Код' },
  ];

  const filteredLessons = filter === 'all' ? LESSONS : LESSONS.filter(l => l.category === filter);

  if (selectedLesson) {
    return (
      <div>
        <button onClick={() => setSelectedLesson(null)} className="mb-4 flex items-center gap-2 text-sm" style={{ color: theme.primary }}>
          ← {tr('lessons')}
        </button>
        <h2 className="text-xl font-bold mb-4" style={{ color: theme.text }}>{selectedLesson.title}</h2>
        <p className="text-sm mb-6" style={{ color: theme.textSecondary }}>{selectedLesson.description}</p>
        <TypingEngine mode="lesson" text={selectedLesson.text} duration={0} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: theme.text }}>{tr('lessons')}</h1>
      
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: filter === cat.id ? theme.primary : theme.bgCard,
              color: filter === cat.id ? '#fff' : theme.textSecondary,
              border: `1px solid ${filter === cat.id ? theme.primary : theme.border}`
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Lessons grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map(lesson => (
          <motion.button
            key={lesson.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedLesson(lesson)}
            className="p-5 rounded-2xl text-left transition-all"
            style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                lesson.level === 'beginner' ? 'bg-green-500/20 text-green-400' :
                lesson.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {lesson.level === 'beginner' ? tr('beginner') : lesson.level === 'intermediate' ? tr('intermediate') : tr('advanced')}
              </span>
              <ChevronRight size={16} style={{ color: theme.textSecondary }} />
            </div>
            <h3 className="font-semibold mb-1" style={{ color: theme.text }}>{lesson.title}</h3>
            <p className="text-xs line-clamp-2" style={{ color: theme.textSecondary }}>{lesson.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ==================== TEST PAGE ====================
export function TestPage() {
  const { theme, tr, user } = useApp();
  const [testDuration, setTestDuration] = useState(30);
  const [isStarted, setIsStarted] = useState(false);

  if (isStarted) {
    return (
      <div>
        <button onClick={() => setIsStarted(false)} className="mb-4 flex items-center gap-2 text-sm" style={{ color: theme.primary }}>
          ← {tr('test')}
        </button>
        <TypingEngine mode="test" duration={testDuration} onComplete={() => {}} />
      </div>
    );
  }

  const testOptions = [
    { label: '15 ' + tr('seconds'), value: 15 },
    { label: '30 ' + tr('seconds'), value: 30 },
    { label: '60 ' + tr('seconds'), value: 60 },
    { label: '2 ' + tr('minutes'), value: 120 },
    { label: '5 ' + tr('minutes'), value: 300 },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center" style={{ color: theme.text }}>{tr('test')}</h1>
      
      <div className="p-6 rounded-2xl" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>{tr('time')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {testOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setTestDuration(opt.value)}
              className="p-4 rounded-xl text-center transition-all"
              style={{
                background: testDuration === opt.value ? theme.primary : theme.bg,
                color: testDuration === opt.value ? '#fff' : theme.textSecondary,
                border: `1px solid ${testDuration === opt.value ? theme.primary : theme.border}`
              }}
            >
              <p className="text-lg font-bold">{opt.label}</p>
            </button>
          ))}
        </div>

        {user && user.stats.bestWPM > 0 && (
          <div className="mb-6 p-4 rounded-xl" style={{ background: theme.bg }}>
            <p className="text-sm" style={{ color: theme.textSecondary }}>{tr('bestWPM')}: <span className="font-bold" style={{ color: theme.primary }}>{user.stats.bestWPM}</span></p>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsStarted(true)}
          className="w-full py-4 rounded-xl font-semibold text-white text-lg"
          style={{ background: theme.primary }}
        >
          <Play size={20} className="inline mr-2" />
          {tr('start')}
        </motion.button>
      </div>
    </div>
  );
}

// ==================== FREE WRITE PAGE ====================
export function FreeWritePage() {
  const { theme, tr } = useApp();
  const [customText, setCustomText] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [timedMode, setTimedMode] = useState(false);
  const [duration, setDuration] = useState(60);
  const [checkErrors, setCheckErrors] = useState(true);

  const sampleTexts = [
    "Technology has transformed the way we communicate, work, and live in the modern world.",
    "The art of programming requires patience, creativity, and logical thinking to solve complex problems.",
    "Practice makes perfect. The more you type, the faster and more accurate you become.",
    "Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish.",
  ];

  if (isWriting && customText) {
    return (
      <div>
        <button onClick={() => setIsWriting(false)} className="mb-4 flex items-center gap-2 text-sm" style={{ color: theme.primary }}>
          ← {tr('freeWrite')}
        </button>
        <TypingEngine mode="freeWrite" text={customText} duration={timedMode ? duration : 0} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: theme.text }}>{tr('freeWrite')}</h1>
      
      <div className="p-6 rounded-2xl space-y-4" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
        {/* Mode toggle */}
        <div className="flex gap-3">
          <button
            onClick={() => setTimedMode(false)}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: !timedMode ? theme.primary : theme.bg, color: !timedMode ? '#fff' : theme.textSecondary, border: `1px solid ${!timedMode ? theme.primary : theme.border}` }}
          >
            {tr('untimedMode')}
          </button>
          <button
            onClick={() => setTimedMode(true)}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: timedMode ? theme.primary : theme.bg, color: timedMode ? '#fff' : theme.textSecondary, border: `1px solid ${timedMode ? theme.primary : theme.border}` }}
          >
            {tr('timedMode')}
          </button>
        </div>

        {timedMode && (
          <div className="flex gap-2 flex-wrap">
            {[15, 30, 60, 120, 300].map(t => (
              <button
                key={t}
                onClick={() => setDuration(t)}
                className="px-4 py-2 rounded-lg text-sm"
                style={{ background: duration === t ? theme.primary : theme.bg, color: duration === t ? '#fff' : theme.textSecondary, border: `1px solid ${duration === t ? theme.primary : theme.border}` }}
              >
                {t >= 60 ? `${t/60}m` : `${t}s`}
              </button>
            ))}
          </div>
        )}

        {/* Text input */}
        <textarea
          value={customText}
          onChange={e => setCustomText(e.target.value)}
          placeholder={tr('enterText') + '...'}
          className="w-full h-40 p-4 rounded-xl text-sm resize-none"
          style={{ background: theme.bg, color: theme.text, border: `1px solid ${theme.border}` }}
        />

        {/* Sample texts */}
        <div>
          <p className="text-xs mb-2" style={{ color: theme.textSecondary }}>{tr('selectTopic')}:</p>
          <div className="flex gap-2 flex-wrap">
            {sampleTexts.map((text, i) => (
              <button
                key={i}
                onClick={() => setCustomText(text)}
                className="px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-80"
                style={{ background: theme.bg, color: theme.textSecondary, border: `1px solid ${theme.border}` }}
              >
                {text.slice(0, 30)}...
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={checkErrors} onChange={e => setCheckErrors(e.target.checked)} className="w-4 h-4 rounded" />
            <span className="text-sm" style={{ color: theme.textSecondary }}>{tr('checkErrors')}</span>
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => customText && setIsWriting(true)}
          disabled={!customText}
          className="w-full py-4 rounded-xl font-semibold text-white text-lg disabled:opacity-50"
          style={{ background: theme.primary }}
        >
          <PenTool size={20} className="inline mr-2" />
          {tr('start')}
        </motion.button>
      </div>
    </div>
  );
}

// ==================== SETTINGS PAGE ====================
export function SettingsPage() {
  const { user, theme, lang, setLang, tr, updateUserData } = useApp();
  const [activeTab, setActiveTab] = useState('theme');
  if (!user) return null;

  const tabs = [
    { id: 'theme', label: tr('theme'), icon: Palette },
    { id: 'font', label: tr('font'), icon: Type },
    { id: 'general', label: tr('settings'), icon: Settings },
  ];

  const updateSetting = (key: string, value: any) => {
    const updated = { ...user, settings: { ...user.settings, [key]: value } };
    updateUserData(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: theme.text }}>{tr('settings')}</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.id ? theme.primary : theme.bgCard,
              color: activeTab === tab.id ? '#fff' : theme.textSecondary,
              border: `1px solid ${activeTab === tab.id ? theme.primary : theme.border}`
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Theme tab */}
      {activeTab === 'theme' && (
        <div className="p-6 rounded-2xl" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>{tr('theme')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => updateSetting('theme', t.id)}
                className="p-3 rounded-xl text-left transition-all relative"
                style={{ 
                  background: t.bg, 
                  border: `2px solid ${user.settings.theme === t.id ? t.primary : t.border}` 
                }}
              >
                {user.settings.theme === t.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: t.primary }}>
                    <Check size={12} color="#fff" />
                  </div>
                )}
                <div className="flex gap-1 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ background: t.primary }} />
                  <div className="w-4 h-4 rounded-full" style={{ background: t.correct }} />
                  <div className="w-4 h-4 rounded-full" style={{ background: t.error }} />
                </div>
                <p className="text-xs font-medium" style={{ color: t.text }}>{t.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Font tab */}
      {activeTab === 'font' && (
        <div className="p-6 rounded-2xl space-y-6" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>{tr('font')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
              {FONTS.map(f => (
                <button
                  key={f.id}
                  onClick={() => updateSetting('font', f.id)}
                  className="p-3 rounded-xl text-left transition-all"
                  style={{
                    background: user.settings.font === f.id ? `${theme.primary}20` : theme.bg,
                    border: `1px solid ${user.settings.font === f.id ? theme.primary : theme.border}`,
                    fontFamily: f.family
                  }}
                >
                  <p className="text-sm font-medium" style={{ color: theme.text }}>{f.name}</p>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>Aa Bb Cc 123</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: theme.text }}>{tr('fontSize')}: {user.settings.fontSize}px</label>
            <input type="range" min="14" max="40" value={user.settings.fontSize} onChange={e => updateSetting('fontSize', parseInt(e.target.value))} className="w-full" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: theme.text }}>Font Weight: {user.settings.fontWeight}</label>
            <input type="range" min="300" max="700" step="100" value={user.settings.fontWeight} onChange={e => updateSetting('fontWeight', parseInt(e.target.value))} className="w-full" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: theme.text }}>Line Height: {user.settings.lineHeight}</label>
            <input type="range" min="1.5" max="3" step="0.1" value={user.settings.lineHeight} onChange={e => updateSetting('lineHeight', parseFloat(e.target.value))} className="w-full" />
          </div>
        </div>
      )}

      {/* General tab */}
      {activeTab === 'general' && (
        <div className="p-6 rounded-2xl space-y-6" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
          {/* Language */}
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: theme.text }}>{tr('language')}</label>
            <div className="flex gap-2">
              {(['uz', 'en', 'ru'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => { setLang(l); updateSetting('language', l); }}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: lang === l ? theme.primary : theme.bg,
                    color: lang === l ? '#fff' : theme.textSecondary,
                    border: `1px solid ${lang === l ? theme.primary : theme.border}`
                  }}
                >
                  {l === 'uz' ? "O'zbekcha" : l === 'en' ? 'English' : 'Русский'}
                </button>
              ))}
            </div>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {user.settings.soundEnabled ? <Volume2 size={18} style={{ color: theme.text }} /> : <VolumeX size={18} style={{ color: theme.textSecondary }} />}
              <span className="text-sm" style={{ color: theme.text }}>{tr('sound')}</span>
            </div>
            <ToggleSwitch checked={user.settings.soundEnabled} onChange={v => updateSetting('soundEnabled', v)} theme={theme} />
          </div>

          {/* Animations */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} style={{ color: theme.text }} />
              <span className="text-sm" style={{ color: theme.text }}>{tr('animations')}</span>
            </div>
            <ToggleSwitch checked={user.settings.animationsEnabled} onChange={v => updateSetting('animationsEnabled', v)} theme={theme} />
          </div>

          {/* Cursor style */}
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: theme.text }}>Cursor Style</label>
            <div className="flex gap-2">
              {(['line', 'block', 'underline'] as const).map(style => (
                <button
                  key={style}
                  onClick={() => updateSetting('cursorStyle', style)}
                  className="px-4 py-2 rounded-xl text-sm capitalize"
                  style={{
                    background: user.settings.cursorStyle === style ? theme.primary : theme.bg,
                    color: user.settings.cursorStyle === style ? '#fff' : theme.textSecondary,
                    border: `1px solid ${user.settings.cursorStyle === style ? theme.primary : theme.border}`
                  }}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Daily goal */}
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: theme.text }}>{tr('dailyGoal')} (lessons)</label>
            <input type="range" min="1" max="20" value={user.settings.dailyGoal} onChange={e => updateSetting('dailyGoal', parseInt(e.target.value))} className="w-full" />
            <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>{user.settings.dailyGoal} lessons/day</p>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              const defaults = { theme: 'dark-pro', font: 'Inter', fontSize: 24, fontWeight: 400, lineHeight: 2, soundEnabled: true, animationsEnabled: true, cursorStyle: 'line' as const, language: lang, dailyGoal: 5 };
              updateUserData({ ...user, settings: defaults });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
            style={{ color: theme.error, border: `1px solid ${theme.error}40` }}
          >
            <RotateCcw size={14} />
            {tr('reset')}
          </button>
        </div>
      )}
    </div>
  );
}

function ToggleSwitch({ checked, onChange, theme }: { checked: boolean; onChange: (v: boolean) => void; theme: any }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-12 h-6 rounded-full relative transition-all"
      style={{ background: checked ? theme.primary : theme.border }}
    >
      <motion.div
        animate={{ x: checked ? 24 : 2 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white"
      />
    </button>
  );
}

function Settings() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ==================== PROFILE PAGE ====================
export function ProfilePage() {
  const { user, theme, tr, setUser, updateUserData } = useApp();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    updateUserData({ ...user, firstName, lastName });
    setEditing(false);
  };

  const handleDelete = () => {
    deleteUser(user.id);
    setUser(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: theme.text }}>{tr('profile')}</h1>

      {/* Profile card */}
      <div className="p-6 rounded-2xl" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: theme.primary, color: '#fff' }}>
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div>
            {editing ? (
              <div className="space-y-2">
                <input value={firstName} onChange={e => setFirstName(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm w-full" style={{ background: theme.bg, color: theme.text, border: `1px solid ${theme.border}` }} placeholder={tr('firstName')} />
                <input value={lastName} onChange={e => setLastName(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm w-full" style={{ background: theme.bg, color: theme.text, border: `1px solid ${theme.border}` }} placeholder={tr('lastName')} />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold" style={{ color: theme.text }}>{user.firstName} {user.lastName}</h2>
                <p className="text-sm" style={{ color: theme.textSecondary }}>@{user.username}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {editing ? (
            <>
              <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-white" style={{ background: theme.primary }}>
                <Save size={14} /> {tr('save')}
              </button>
              <button onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: theme.textSecondary, border: `1px solid ${theme.border}` }}>
                {tr('cancel')}
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="px-4 py-2 rounded-lg text-sm" style={{ color: theme.primary, border: `1px solid ${theme.primary}40` }}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 rounded-2xl" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatItem label={tr('totalWPM')} value={user.stats.totalWPM.toString()} theme={theme} />
          <StatItem label={tr('bestWPM')} value={user.stats.bestWPM.toString()} theme={theme} />
          <StatItem label={tr('accuracy')} value={`${user.stats.accuracy}%`} theme={theme} />
          <StatItem label={tr('totalTime')} value={formatTime(user.stats.totalTime)} theme={theme} />
          <StatItem label={tr('charsTyped')} value={user.stats.charsTyped.toLocaleString()} theme={theme} />
          <StatItem label={tr('lessons')} value={user.stats.totalLessons.toString()} theme={theme} />
          <StatItem label={tr('level')} value={user.level.toString()} theme={theme} />
          <StatItem label={tr('xp')} value={user.xp.toString()} theme={theme} />
          <StatItem label={tr('streak')} value={`${user.streak} 🔥`} theme={theme} />
        </div>
      </div>

      {/* Account info */}
      <div className="p-6 rounded-2xl" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>Account</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={16} style={{ color: theme.textSecondary }} />
            <span className="text-sm" style={{ color: theme.text }}>{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} style={{ color: theme.textSecondary }} />
            <span className="text-sm" style={{ color: theme.text }}>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="p-6 rounded-2xl" style={{ background: theme.bgCard, border: `1px solid ${theme.error}40` }}>
        <h3 className="text-lg font-semibold mb-2" style={{ color: theme.error }}>Danger Zone</h3>
        {!showDeleteConfirm ? (
          <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 rounded-lg text-sm" style={{ color: theme.error, border: `1px solid ${theme.error}40` }}>
            <Trash2 size={14} className="inline mr-1" /> Delete Account
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: theme.error }}>Are you sure?</span>
            <button onClick={handleDelete} className="px-3 py-1.5 rounded-lg text-sm text-white" style={{ background: theme.error }}>Yes, delete</button>
            <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1.5 rounded-lg text-sm" style={{ color: theme.textSecondary, border: `1px solid ${theme.border}` }}>{tr('cancel')}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatItem({ label, value, theme }: any) {
  return (
    <div className="p-3 rounded-xl text-center" style={{ background: theme.bg }}>
      <p className="text-lg font-bold" style={{ color: theme.text }}>{value}</p>
      <p className="text-xs" style={{ color: theme.textSecondary }}>{label}</p>
    </div>
  );
}

// ==================== ACHIEVEMENTS PAGE ====================
export function AchievementsPage() {
  const { user, theme, tr, lang } = useApp();
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: theme.text }}>{tr('achievements')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map(achievement => {
          const unlocked = user.achievements.includes(achievement.id);
          const name = lang === 'en' ? achievement.nameEn : lang === 'ru' ? achievement.nameRu : achievement.name;
          
          return (
            <motion.div
              key={achievement.id}
              whileHover={{ y: -2 }}
              className="p-5 rounded-2xl flex items-center gap-4 transition-all"
              style={{ 
                background: theme.bgCard, 
                border: `1px solid ${unlocked ? theme.primary : theme.border}`,
                opacity: unlocked ? 1 : 0.6
              }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: unlocked ? `${theme.primary}20` : theme.bg }}>
                {unlocked ? achievement.icon : '🔒'}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold" style={{ color: unlocked ? theme.text : theme.textSecondary }}>{name}</h3>
                <p className="text-xs" style={{ color: theme.textSecondary }}>{achievement.description}</p>
              </div>
              {unlocked && <Check size={20} style={{ color: theme.correct }} />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== HELPERS ====================
function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}
