"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Zap, ArrowLeft, Clock, ShieldCheck, Navigation, Star, BadgeCheck, Phone, ChevronRight, Users } from 'lucide-react';
import { MapView } from '@/components/ui/MapView';
import { NeonButton } from '@/components/ui/NeonButton';

const NIGHT_HOURS = true; // simulate it's night

export function NightRideScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'searching' | 'found'>('idle');
  const [countdown, setCountdown] = useState(3);

  const handleBookNow = () => {
    setPhase('searching');
    let c = 3;
    const t = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(t);
        setPhase('found');
      }
    }, 900);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-brand-dark overflow-hidden">
      {/* Night map background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <MapView markers={[{ lat: 28.9945, lng: 77.013 }]} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 z-0" />

      {/* Stars / night ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-white/60 animate-pulse"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 55}%`, animationDelay: `${Math.random() * 3}s` }} />
        ))}
      </div>

      {/* Top bar */}
      <div className="relative z-10 px-5 pt-14 pb-3 flex items-center gap-3 mt-safe">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/70 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-purple/20 border border-brand-purple/40 rounded-full">
          <Moon size={13} className="text-brand-purple" />
          <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">Night Safe Mode</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto px-3 py-1.5 bg-black/40 border border-white/10 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-white/70">Priority ON</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 px-5 mt-6 mb-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-3xl font-display font-black text-white mb-1">
            Instant Night<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">Safe Ride</span>
          </h1>
          <p className="text-white/50 text-sm">One-tap priority booking after 10 PM · Verified drivers only</p>
        </motion.div>
      </div>

      {/* Night guarantees */}
      <div className="relative z-10 px-5 mb-4">
        <div className="flex gap-2">
          {[
            { icon: <ShieldCheck size={13} />, label: 'Verified Driver', color: 'cyan' },
            { icon: <Zap size={13} />, label: '<2 min ETA', color: 'yellow' },
            { icon: <Users size={13} />, label: 'Live Monitored', color: 'purple' },
          ].map((b) => (
            <div key={b.label} className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl bg-white/5 border border-white/8`}>
              <div className={`text-brand-${b.color}`}>{b.icon}</div>
              <span className="text-[9px] font-bold text-white/50 text-center leading-tight">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom sheet */}
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
        className="relative z-20 mt-auto bg-brand-dark/96 backdrop-blur-2xl border-t border-white/10 rounded-t-[32px] pt-4 pb-safe px-5 shadow-[0_-30px_60px_rgba(0,0,0,0.7)]"
      >
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Route */}
              <div className="flex items-start gap-3 mb-5">
                <div className="flex flex-col items-center gap-1 pt-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                  <div className="w-0.5 h-7 bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-brand-cyan" />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="bg-white/5 rounded-xl px-3 py-2 text-sm text-white/70">Hostel Block C</div>
                  <div className="bg-brand-cyan/8 border border-brand-cyan/20 rounded-xl px-3 py-2 text-sm text-brand-cyan font-medium">Campus North Gate</div>
                </div>
              </div>

              {/* Vehicle */}
              <div className="flex items-center justify-between bg-brand-purple/8 border border-brand-purple/20 rounded-2xl px-4 py-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center">
                    <Navigation size={18} className="text-brand-purple" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Night Auto</div>
                    <div className="text-xs text-white/40">Priority · Verified female-preferred</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">₹45</div>
                  <div className="text-[10px] text-brand-cyan font-medium">~2 min ETA</div>
                </div>
              </div>

              {/* Safety note */}
              <div className="flex items-start gap-2.5 bg-green-500/5 border border-green-500/20 rounded-xl px-3 py-3 mb-5">
                <ShieldCheck size={14} className="text-green-400 mt-0.5 shrink-0" />
                <p className="text-xs text-green-400/80 leading-relaxed">
                  Night rides are monitored by our 24/7 safety ops team. Your location is shared with your emergency contacts automatically.
                </p>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white/60 hover:bg-white/10 transition">
                  Schedule Later
                </button>
                <button onClick={handleBookNow}
                  className="flex-[2] py-4 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-2xl text-sm font-black text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] transition-all flex items-center justify-center gap-2">
                  <Zap size={16} className="fill-white" /> Book Now — Instant
                </button>
              </div>
            </motion.div>
          )}

          {phase === 'searching' && (
            <motion.div key="searching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center py-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 20px rgba(139,92,246,0.3)', '0 0 40px rgba(139,92,246,0.7)', '0 0 20px rgba(139,92,246,0.3)'] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-brand-purple/20 border-2 border-brand-purple/60 flex items-center justify-center mb-5"
              >
                <span className="text-4xl font-display font-black text-white">{countdown}</span>
              </motion.div>
              <h3 className="text-lg font-bold text-white">Priority Matching...</h3>
              <p className="text-white/40 text-sm mt-1">Finding nearest verified night driver</p>
            </motion.div>
          )}

          {phase === 'found' && (
            <motion.div key="found" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl px-4 py-3 mb-5">
                <BadgeCheck size={20} className="text-green-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Driver Found — 1.8 min away</div>
                  <div className="text-xs text-white/40">Emergency contacts auto-notified</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-brand-purple/40 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">SK</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Sunita Kumari</span>
                    <BadgeCheck size={14} className="text-brand-cyan" />
                    <span className="text-[9px] bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded-sm font-bold uppercase">Female</span>
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">White WagonR · HR10 XY 9876 · <span className="text-yellow-400">★ 4.9</span></div>
                </div>
                <button className="w-10 h-10 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                  <Phone size={16} className="text-brand-cyan" />
                </button>
              </div>

              <NeonButton variant="primary" fullWidth onClick={onComplete}>
                Track Ride Live →
              </NeonButton>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
