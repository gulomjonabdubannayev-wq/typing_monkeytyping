import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Keyboard, BookOpen, Timer, PenTool, Settings, User, Trophy, 
  LogOut, Menu, X, ChevronRight, Zap, Target, Clock, Award, TrendingUp,
  Volume2, VolumeX, Eye, EyeOff, Check, AlertCircle, Type, Globe
} from 'lucide-react';
import { 
  User as UserType, getCurrentUser, loginUser, registerUser, updateUser, 
  setCurrentUser, getTheme, getFont, t, THEMES, FONTS, LESSONS, ACHIEVEMENTS,
  saveTestResult, TestResult, Theme as ThemeType
} from './store';
import TypingEngine from './components/TypingEngine';
import { Dashboard, LessonsPage, SettingsPage, ProfilePage, FreeWritePage, TestPage, AchievementsPage, WordsPage } from './components/Pages';

// ==================== CONTEXT ====================
interface AppContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  theme: ThemeType;
  lang: 'uz' | 'en' | 'ru';
  setLang: (lang: 'uz' | 'en' | 'ru') => void;
  tr: (key: string) => string;
  updateUserData: (user: UserType) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);
export const useApp = () => useContext(AppContext);

// ==================== AUTH PAGE ====================
function AuthPage() {
  const { setUser, theme, lang, tr } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      const result = loginUser(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setError(result.error || 'Login failed');
      }
    } else {
      if (!firstName || !lastName || !username || !email || !password) {
        setError('All fields are required');
        return;
      }
      const result = registerUser(firstName, lastName, username, email, password);
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setError(result.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.bg }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl"
        style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: theme.primary }}>
            <Keyboard size={32} color="#fff" />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: theme.text }}>Typing Club</h1>
          <p style={{ color: theme.textSecondary }}>{isLogin ? tr('login') : tr('register')}</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 rounded-lg flex items-center gap-2" style={{ background: `${theme.error}20`, color: theme.error }}>
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={tr('firstName')}
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                  style={{ background: theme.bgSecondary, color: theme.text, border: `1px solid ${theme.border}` }}
                />
                <input
                  type="text"
                  placeholder={tr('lastName')}
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                  style={{ background: theme.bgSecondary, color: theme.text, border: `1px solid ${theme.border}` }}
                />
              </div>
              <input
                type="text"
                placeholder={tr('username')}
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                style={{ background: theme.bgSecondary, color: theme.text, border: `1px solid ${theme.border}` }}
              />
            </>
          )}
          <input
            type="email"
            placeholder={tr('email')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm transition-all"
            style={{ background: theme.bgSecondary, color: theme.text, border: `1px solid ${theme.border}` }}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={tr('password')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm transition-all pr-12"
              style={{ background: theme.bgSecondary, color: theme.text, border: `1px solid ${theme.border}` }}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: theme.textSecondary }}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: theme.primary }}
          >
            {isLogin ? tr('login') : tr('register')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-sm hover:underline" style={{ color: theme.primary }}>
            {isLogin ? tr('noAccount') + ' ' + tr('register') : tr('hasAccount') + ' ' + tr('login')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== SIDEBAR ====================
function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }: { currentPage: string; setCurrentPage: (p: string) => void; isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const { user, setUser, theme, tr } = useApp();
  
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: tr('dashboard') },
    { id: 'practice', icon: Keyboard, label: tr('practice') },
    { id: 'words', icon: Type, label: tr('words') },
    { id: 'lessons', icon: BookOpen, label: tr('lessons') },
    { id: 'test', icon: Timer, label: tr('test') },
    { id: 'freeWrite', icon: PenTool, label: tr('freeWrite') },
    { id: 'achievements', icon: Trophy, label: tr('achievements') },
    { id: 'settings', icon: Settings, label: tr('settings') },
    { id: 'profile', icon: User, label: tr('profile') },
  ];

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
      
      <motion.aside 
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '260px', background: theme.bgSecondary, borderRight: `1px solid ${theme.border}` }}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: theme.primary }}>
              <Keyboard size={20} color="#fff" />
            </div>
            <span className="font-bold text-lg" style={{ color: theme.text }}>Typing Club</span>
          </div>
          <button className="lg:hidden" onClick={() => setIsOpen(false)} style={{ color: theme.textSecondary }}>
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="px-4 pb-4">
            <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: theme.bgCard }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: theme.primary, color: '#fff' }}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: theme.text }}>{user.firstName}</p>
                <p className="text-xs truncate" style={{ color: theme.textSecondary }}>{tr('level')} {user.level} • {user.xp} XP</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === item.id ? 'shadow-lg' : 'hover:opacity-80'}`}
              style={{ 
                background: currentPage === item.id ? theme.primary : 'transparent',
                color: currentPage === item.id ? '#fff' : theme.textSecondary
              }}
            >
              <item.icon size={18} />
              {item.label}
              {currentPage === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: theme.border }}>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-80" style={{ color: theme.error }}>
            <LogOut size={18} />
            {tr('logout')}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

// ==================== WORLD CLOCK ====================
function WorldClock({ theme, tr }: { theme: any; tr: (key: string) => string }) {
  const [time, setTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const zones = [
    { city: 'Toshkent', tz: 'Asia/Tashkent', flag: '🇺🇿' },
    { city: 'London', tz: 'Europe/London', flag: '🇬🇧' },
    { city: 'New York', tz: 'America/New_York', flag: '🇺🇸' },
    { city: 'Tokyo', tz: 'Asia/Tokyo', flag: '🇯🇵' },
    { city: 'Moskva', tz: 'Europe/Moscow', flag: '🇷🇺' },
    { city: 'Dubai', tz: 'Asia/Dubai', flag: '🇦🇪' },
    { city: 'Seoul', tz: 'Asia/Seoul', flag: '🇰🇷' },
    { city: 'Sydney', tz: 'Australia/Sydney', flag: '🇦🇺' },
  ];

  const formatTime = (tz: string) => {
    return time.toLocaleTimeString('en-US', { 
      timeZone: tz, 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const localTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
        style={{ background: theme.bg, border: `1px solid ${theme.border}` }}
      >
        <Globe size={14} style={{ color: theme.primary }} />
        <span className="text-xs font-mono font-medium" style={{ color: theme.text }}>{localTime}</span>
      </button>
      
      <AnimatePresence>
        {showDropdown && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute top-full right-0 mt-2 p-4 rounded-xl z-50 min-w-[280px] shadow-2xl"
              style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}
            >
              <h4 className="text-xs font-semibold mb-3 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                <Globe size={12} />
                {tr('worldTime')}
              </h4>
              <div className="space-y-2">
                {zones.map(zone => (
                  <div key={zone.city} className="flex items-center justify-between py-1.5 px-2 rounded-lg" style={{ background: theme.bg }}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{zone.flag}</span>
                      <span className="text-xs font-medium" style={{ color: theme.text }}>{zone.city}</span>
                    </div>
                    <span className="text-xs font-mono font-semibold" style={{ color: theme.primary }}>{formatTime(zone.tz)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<'uz' | 'en' | 'ru'>('uz');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
      setLang(savedUser.settings.language);
    }
    setLoading(false);
  }, []);

  const theme = user ? getTheme(user.settings.theme) : getTheme('dark-pro');
  
  const tr = (key: string) => t(key as any, lang);

  const updateUserData = (updatedUser: UserType) => {
    setUser({ ...updatedUser });
    updateUser(updatedUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: theme.bg }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 rounded-full border-4 border-t-transparent" style={{ borderColor: theme.primary, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!user) {
    return (
      <AppContext.Provider value={{ user, setUser, theme, lang, setLang, tr, updateUserData }}>
        <AuthPage />
      </AppContext.Provider>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'practice': return <TypingEngine mode="practice" />;
      case 'words': return <WordsPage />;
      case 'lessons': return <LessonsPage />;
      case 'test': return <TestPage />;
      case 'freeWrite': return <FreeWritePage />;
      case 'achievements': return <AchievementsPage />;
      case 'settings': return <SettingsPage />;
      case 'profile': return <ProfilePage />;
      default: return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AppContext.Provider value={{ user, setUser, theme, lang, setLang, tr, updateUserData }}>
      <div className="flex h-screen overflow-hidden" style={{ background: theme.bg }}>
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b shrink-0" style={{ borderColor: theme.border, background: theme.bgSecondary }}>
            <button className="lg:hidden p-2 rounded-lg" onClick={() => setSidebarOpen(true)} style={{ color: theme.text }}>
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <WorldClock theme={theme} tr={tr} />
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: theme.bg, border: `1px solid ${theme.border}` }}>
                <Zap size={14} style={{ color: theme.accent }} />
                <span className="text-xs font-medium" style={{ color: theme.text }}>{user.xp} XP</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: theme.bg, border: `1px solid ${theme.border}` }}>
                <Award size={14} style={{ color: theme.primary }} />
                <span className="text-xs font-medium" style={{ color: theme.text }}>{tr('level')} {user.level}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
}
