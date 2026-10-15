import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Check, Clock, Zap, Target, AlertTriangle, ChevronDown } from 'lucide-react';
import { useApp } from '../App';
import { saveTestResult, TestResult, LESSONS } from '../store';

interface TypingEngineProps {
  mode: 'practice' | 'lesson' | 'test' | 'freeWrite';
  text?: string;
  duration?: number; // seconds, 0 = unlimited
  onComplete?: (result: TestResult) => void;
}

const TIME_OPTIONS = [
  { label: '15s', value: 15 },
  { label: '30s', value: 30 },
  { label: '60s', value: 60 },
  { label: '2m', value: 120 },
  { label: '3m', value: 180 },
  { label: '5m', value: 300 },
  { label: '10m', value: 600 },
  { label: '∞', value: 0 },
];

export default function TypingEngine({ mode, text, duration = 60, onComplete }: TypingEngineProps) {
  const { user, theme, lang, tr, updateUserData } = useApp();
  const [inputText, setInputText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState(duration);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayText = text || "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Practice makes perfect and consistency builds mastery.";

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const e = (now - startTime) / 1000;
        setElapsed(e);
        
        if (selectedTime > 0) {
          const remaining = selectedTime - e;
          setTimeLeft(Math.max(0, remaining));
          if (remaining <= 0) {
            finishTestRef.current();
          }
        }

        // Calculate stats
        const minutes = e / 60;
        if (minutes > 0) {
          const words = correctChars / 5;
          setWpm(Math.round(words / minutes));
          setCpm(Math.round(correctChars / minutes));
        }
        const total = correctChars + errors;
        setAccuracy(total > 0 ? Math.round((correctChars / total) * 100) : 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime, correctChars, errors, selectedTime]);

  const startCountdown = useCallback(() => {
    setCountdown(3);
    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        startTyping();
      }
    }, 1000);
  }, []);

  const startTyping = () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setTimeLeft(selectedTime);
    inputRef.current?.focus();
  };

  const handleStart = () => {
    if (isFinished) {
      restart();
      return;
    }
    if (!isRunning && !countdown) {
      startCountdown();
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleResume = () => {
    if (!isRunning && !isFinished && startTime) {
      // Adjust start time to account for paused duration
      const pausedDuration = Date.now() - (startTime + elapsed * 1000);
      setStartTime(Date.now() - elapsed * 1000);
      setIsRunning(true);
      inputRef.current?.focus();
    }
  };

  const restart = () => {
    setInputText('');
    setCurrentIndex(0);
    setErrors(0);
    setCorrectChars(0);
    setIsRunning(false);
    setIsFinished(false);
    setStartTime(null);
    setElapsed(0);
    setWpm(0);
    setCpm(0);
    setAccuracy(100);
    setTimeLeft(selectedTime);
    setCountdown(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const finishTestRef = useRef<() => void>(() => {});
  
  const finishTest = useCallback(() => {
    setIsRunning(false);
    setIsFinished(true);
    
    if (user && correctChars > 0) {
      const currentWpm = elapsed > 0 ? Math.round((correctChars / 5) / (elapsed / 60)) : 0;
      const total = correctChars + errors;
      const currentAccuracy = total > 0 ? Math.round((correctChars / total) * 100) : 100;
      
      const result: TestResult = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        wpm: currentWpm,
        cpm: Math.round(correctChars / (elapsed / 60)),
        accuracy: currentAccuracy,
        errors,
        duration: Math.round(elapsed),
        text: displayText,
        mode,
      };
      const updatedUser = saveTestResult(user, result);
      updateUserData(updatedUser);
      onComplete?.(result);
    }
  }, [user, correctChars, errors, elapsed, displayText, mode, updateUserData, onComplete]);

  finishTestRef.current = finishTest;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isFinished) return;
    
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (currentIndex > 0) {
        const newInput = inputText.slice(0, -1);
        setInputText(newInput);
        setCurrentIndex(currentIndex - 1);
      }
      return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      
      // Auto-start on first keypress
      if (!isRunning && !countdown) {
        setCountdown(3);
        let count = 3;
        const interval = setInterval(() => {
          count--;
          if (count > 0) {
            setCountdown(count);
          } else {
            clearInterval(interval);
            setCountdown(null);
            setIsRunning(true);
            setStartTime(Date.now());
            setTimeLeft(selectedTime);
          }
        }, 1000);
        // Process the first character after countdown
        const expected = displayText[currentIndex];
        const newInput = inputText + e.key;
        setInputText(newInput);
        if (e.key === expected) {
          setCorrectChars(prev => prev + 1);
        } else {
          setErrors(prev => prev + 1);
        }
        setCurrentIndex(currentIndex + 1);
        return;
      }
      
      if (!isRunning) return;
      
      const expected = displayText[currentIndex];
      const newInput = inputText + e.key;
      setInputText(newInput);
      
      if (e.key === expected) {
        setCorrectChars(prev => prev + 1);
      } else {
        setErrors(prev => prev + 1);
      }
      
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      
      if (newIndex >= displayText.length) {
        finishTestRef.current();
      }
    }
  }, [isRunning, isFinished, currentIndex, inputText, displayText, countdown, selectedTime]);

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setShowTimeSelect(false);
    restart();
  };

  const handleCustomTime = () => {
    const seconds = parseInt(customTime);
    if (seconds > 0) {
      handleTimeSelect(seconds);
    }
  };

  // Auto-scroll to current position
  useEffect(() => {
    if (containerRef.current) {
      const cursorEl = containerRef.current.querySelector('.cursor-blink');
      if (cursorEl) {
        cursorEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  const font = user?.settings.font || 'Inter';
  const fontSize = user?.settings.fontSize || 24;
  const fontWeight = user?.settings.fontWeight || 400;
  const lineHeight = user?.settings.lineHeight || 2;

  // Render characters
  const renderChars = () => {
    const chars = displayText.split('');
    const visibleStart = Math.max(0, currentIndex - 50);
    const visibleEnd = Math.min(chars.length, currentIndex + 200);
    
    return chars.slice(visibleStart, visibleEnd).map((char, i) => {
      const actualIndex = visibleStart + i;
      let color = theme.textSecondary;
      let bg = 'transparent';
      
      if (actualIndex < currentIndex) {
        const typed = inputText[actualIndex];
        if (typed === char) {
          color = theme.correct;
        } else {
          color = theme.error;
          bg = `${theme.error}30`;
        }
      } else if (actualIndex === currentIndex) {
        color = theme.text;
        bg = `${theme.primary}30`;
      }
      
      return (
        <span
          key={actualIndex}
          className="typing-char relative"
          style={{ color, backgroundColor: bg, fontFamily: `'${font}', sans-serif`, fontSize: `${fontSize}px`, fontWeight, lineHeight }}
        >
          {actualIndex === currentIndex && (
            <span 
              className="absolute left-0 top-0 bottom-0 w-0.5 cursor-blink"
              style={{ 
                background: theme.primary,
                ...(user?.settings.cursorStyle === 'block' ? { width: `${fontSize * 0.6}px`, opacity: 0.3 } : {}),
                ...(user?.settings.cursorStyle === 'underline' ? { width: `${fontSize * 0.6}px`, top: 'auto', bottom: 0, height: '2px' } : {})
              }}
            />
          )}
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="max-w-5xl mx-auto" ref={containerRef}>
      {/* Time selector */}
      {(mode === 'practice' || mode === 'test') && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {TIME_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleTimeSelect(opt.value)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ 
                background: selectedTime === opt.value ? theme.primary : theme.bgCard,
                color: selectedTime === opt.value ? '#fff' : theme.textSecondary,
                border: `1px solid ${selectedTime === opt.value ? theme.primary : theme.border}`
              }}
            >
              {opt.label}
            </button>
          ))}
          <div className="relative">
            <button
              onClick={() => setShowTimeSelect(!showTimeSelect)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1"
              style={{ background: theme.bgCard, color: theme.textSecondary, border: `1px solid ${theme.border}` }}
            >
              {tr('customTime')} <ChevronDown size={14} />
            </button>
            {showTimeSelect && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 right-0 p-3 rounded-xl z-10 flex items-center gap-2"
                style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}
              >
                <input
                  type="number"
                  value={customTime}
                  onChange={e => setCustomTime(e.target.value)}
                  placeholder={tr('seconds')}
                  className="w-24 px-3 py-1.5 rounded-lg text-sm"
                  style={{ background: theme.bg, color: theme.text, border: `1px solid ${theme.border}` }}
                />
                <button onClick={handleCustomTime} className="px-3 py-1.5 rounded-lg text-sm" style={{ background: theme.primary, color: '#fff' }}>
                  <Check size={14} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard icon={<Zap size={18} />} label="WPM" value={wpm.toString()} color={theme.primary} theme={theme} />
        <StatCard icon={<Target size={18} />} label={tr('accuracy')} value={`${accuracy}%`} color={theme.correct} theme={theme} />
        <StatCard icon={<AlertTriangle size={18} />} label={tr('errors')} value={errors.toString()} color={theme.error} theme={theme} />
        <StatCard icon={<Clock size={18} />} label={tr('time')} value={selectedTime > 0 ? `${Math.ceil(timeLeft)}s` : `${Math.floor(elapsed)}s`} color={theme.accent} theme={theme} />
      </div>

      {/* Typing area */}
      <div 
        className="relative rounded-2xl p-6 md:p-8 mb-6 min-h-[200px] cursor-text overflow-hidden"
        style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}
        onClick={() => inputRef.current?.focus()}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Countdown overlay */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl"
              style={{ background: `${theme.bg}ee` }}
            >
              <motion.span 
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-7xl font-bold"
                style={{ color: theme.primary }}
              >
                {countdown}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text display */}
        <div className="relative overflow-hidden" style={{ maxHeight: '300px' }}>
          <div className="whitespace-pre-wrap break-words">
            {renderChars()}
          </div>
        </div>

        {/* Hidden input */}
        <input
          ref={inputRef}
          type="text"
          className="absolute opacity-0 w-0 h-0"
          autoFocus
          onKeyDown={handleKeyDown}
          value=""
          readOnly
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isRunning && !isFinished && !countdown && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all"
            style={{ background: theme.primary }}
          >
            <Play size={18} />
            {tr('start')}
          </motion.button>
        )}
        {isRunning && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePause}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
            style={{ background: theme.bgCard, color: theme.text, border: `1px solid ${theme.border}` }}
          >
            <Pause size={18} />
            {tr('pause')}
          </motion.button>
        )}
        {!isRunning && !isFinished && startTime && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResume}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all"
            style={{ background: theme.primary }}
          >
            <Play size={18} />
            {tr('resume')}
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={restart}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
          style={{ background: theme.bgCard, color: theme.text, border: `1px solid ${theme.border}` }}
        >
          <RotateCcw size={18} />
          {tr('restart')}
        </motion.button>
        {isRunning && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={finishTest}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
            style={{ background: theme.bgCard, color: theme.text, border: `1px solid ${theme.border}` }}
          >
            <Check size={18} />
            {tr('finish')}
          </motion.button>
        )}
      </div>

      {/* Results */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-2xl"
            style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}
          >
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: theme.text }}>
              {tr('congratulations')} 🎉
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ResultItem label="WPM" value={wpm.toString()} theme={theme} />
              <ResultItem label="CPM" value={cpm.toString()} theme={theme} />
              <ResultItem label={tr('accuracy')} value={`${accuracy}%`} theme={theme} />
              <ResultItem label={tr('errors')} value={errors.toString()} theme={theme} />
              <ResultItem label={tr('time')} value={`${Math.round(elapsed)}s`} theme={theme} />
              <ResultItem label={tr('charsTyped')} value={correctChars.toString()} theme={theme} />
            </div>
            <div className="mt-6 text-center">
              <button onClick={restart} className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: theme.primary }}>
                {tr('restart')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon, label, value, color, theme }: { icon: React.ReactNode; label: string; value: string; color: string; theme: any }) {
  return (
    <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: theme.bgCard, border: `1px solid ${theme.border}` }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <div>
        <p className="text-xs" style={{ color: theme.textSecondary }}>{label}</p>
        <p className="text-lg font-bold" style={{ color: theme.text }}>{value}</p>
      </div>
    </div>
  );
}

function ResultItem({ label, value, theme }: { label: string; value: string; theme: any }) {
  return (
    <div className="text-center p-3 rounded-xl" style={{ background: theme.bg }}>
      <p className="text-xs mb-1" style={{ color: theme.textSecondary }}>{label}</p>
      <p className="text-2xl font-bold" style={{ color: theme.text }}>{value}</p>
    </div>
  );
}
