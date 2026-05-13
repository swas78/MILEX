"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton } from '@/components/ui/NeonButton';
import { Shield, Zap, Moon, Users, Battery, Mic, MapPin, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    emoji: '⚡',
    title: "Never Get Refused",
    sub: "Instant booking · Priority matching",
    description: "Even at 2 AM, even just 500m away. Smart AI matching guarantees your ride in under 3 minutes.",
    icon: Zap,
    gradient: 'from-brand-cyan to-brand-blue',
    glow: 'rgba(6,182,212,0.4)',
    dot: 'bg-brand-cyan',
  },
  {
    id: 2,
    emoji: '🛡️',
    title: "Women Safety First",
    sub: "Verified drivers · 24/7 monitoring",
    description: "Female-preferred drivers, live guardian tracking, discreet SOS, and Women-Only ride mode built in.",
    icon: Shield,
    gradient: 'from-brand-blue to-brand-purple',
    glow: 'rgba(59,130,246,0.4)',
    dot: 'bg-brand-blue',
  },
  {
    id: 3,
    emoji: '🌙',
    title: "Night Safe Mode",
    sub: "Auto-alerts · Voice recording",
    description: "Low battery? Phone shutdown? Your location auto-shares with emergency contacts. Always protected.",
    icon: Moon,
    gradient: 'from-brand-purple to-pink-500',
    glow: 'rgba(139,92,246,0.4)',
    dot: 'bg-brand-purple',
  },
  {
    id: 4,
    emoji: '🎓',
    title: "Campus Pool Network",
    sub: "Batchmates · Split fare",
    description: "Find classmates heading the same way. Share rides, split fares via UPI, and travel safely together.",
    icon: Users,
    gradient: 'from-green-400 to-brand-cyan',
    glow: 'rgba(34,197,94,0.4)',
    dot: 'bg-green-400',
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 60 : -60, opacity: 0, scale: 0.96 }),
};

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [curr, setCurr] = useState(0);
  const [dir, setDir] = useState(1);
  const slide = slides[curr];
  const Icon = slide.icon;

  const handleNext = () => {
    if (curr === slides.length - 1) { onComplete(); return; }
    setDir(1);
    setCurr(c => c + 1);
  };
  const handlePrev = () => {
    if (curr === 0) return;
    setDir(-1);
    setCurr(c => c - 1);
  };

  return (
    <div className="absolute inset-0 bg-[#07070b] flex flex-col overflow-hidden">
      {/* Background glow that transitions with slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${curr}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, ${slide.glow} 0%, transparent 65%)`,
          }}
        />
      </AnimatePresence>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Skip */}
      <div className="relative z-10 px-6 pt-14 flex justify-end">
        <button onClick={onComplete} className="text-xs font-bold text-white/30 hover:text-white/60 transition px-3 py-1.5 rounded-full hover:bg-white/5">
          Skip →
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={curr}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Icon circle */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.05 }}
              className={`w-28 h-28 rounded-[36px] bg-gradient-to-br ${slide.gradient} p-[2px] mb-8 shadow-[0_0_50px_var(--glow)]`}
              style={{ '--glow': slide.glow } as React.CSSProperties}
            >
              <div className="w-full h-full rounded-[34px] bg-[#07070b]/80 backdrop-blur-sm flex items-center justify-center flex-col gap-1">
                <span className="text-4xl leading-none">{slide.emoji}</span>
              </div>
            </motion.div>

            {/* Sub label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent border border-white/10`}
            >
              {slide.sub}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="text-3xl font-display font-black text-white mb-4 leading-tight"
            >
              {slide.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="text-white/50 text-sm leading-relaxed max-w-[280px]"
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 px-6 pb-10 flex flex-col gap-5">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > curr ? 1 : -1); setCurr(i); }}>
              <motion.div
                animate={{ width: i === curr ? 28 : 8, opacity: i === curr ? 1 : 0.3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`h-1.5 rounded-full ${i === curr ? slide.dot : 'bg-white/30'}`}
              />
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {curr > 0 && (
            <button onClick={handlePrev}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition shrink-0">
              <ChevronRight size={18} className="text-white/50 rotate-180" />
            </button>
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className={`flex-1 h-12 rounded-2xl bg-gradient-to-r ${slide.gradient} text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_var(--glow)] transition-shadow hover:shadow-[0_0_35px_var(--glow)]`}
            style={{ '--glow': slide.glow } as React.CSSProperties}
          >
            {curr === slides.length - 1 ? '🚀 Get Started' : 'Next →'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
