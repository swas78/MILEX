"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapView } from '@/components/ui/MapView';
import { BadgeCheck, Phone, MessageSquare, X, Navigation, User, Star, Shield, Zap, Sparkles, ChevronRight } from 'lucide-react';

interface DriverMatchingScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function DriverMatchingScreen({ onBack, onComplete }: DriverMatchingScreenProps) {
  const [phase, setPhase] = useState<'searching' | 'found'>('searching');
  const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('found'), 4000);
    // Generate some random background particles for the radar
    setParticles([...Array(12)].map((_, i) => ({
      id: i,
      x: Math.random() * 80 - 40,
      y: Math.random() * 80 - 40,
    })));
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#07070a] overflow-hidden">
      {/* Map Background with Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 grayscale scale-110">
        <MapView markers={[
          { lat: 28.9935, lng: 77.0140 },
          { lat: 28.9910, lng: 77.0165 },
          { lat: 28.9950, lng: 77.0110 },
        ]} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-0 pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Top Header */}
      <div className="relative z-10 px-6 pt-14 flex justify-between items-start mt-safe pt-safe">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-black/70 transition shadow-2xl"
        >
          <X size={22} className="text-white" />
        </button>

        <AnimatePresence mode="wait">
          {phase === 'searching' ? (
            <motion.div
              key="searching-status"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="px-5 py-2.5 bg-black/40 backdrop-blur-xl rounded-full border border-brand-cyan/30 flex items-center gap-2.5 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
            >
              <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
              <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest">Searching Drivers</span>
            </motion.div>
          ) : (
            <motion.div
              key="found-status"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-5 py-2.5 bg-green-500/15 backdrop-blur-xl rounded-full border border-green-500/30 flex items-center gap-2.5 shadow-[0_0_30_rgba(34,197,94,0.2)]"
            >
              <BadgeCheck size={16} className="text-green-400" />
              <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Driver Confirmed</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-11 h-11" /> {/* Spacer */}
      </div>

      {/* Next-Gen Radar Animation */}
      <AnimatePresence>
        {phase === 'searching' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            style={{ top: '-10%' }}
          >
            {/* Pulsing Outer Rings */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-brand-cyan/20 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]"
                initial={{ width: 40, height: 40, opacity: 0 }}
                animate={{ width: 400, height: 400, opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: 'linear',
                }}
              />
            ))}

            {/* Rotating Radar Sweep */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[400px] h-[400px] rounded-full border border-brand-cyan/5 flex items-center justify-center"
            >
              <div className="absolute top-0 w-1/2 h-1/2 bg-gradient-to-tr from-transparent via-brand-cyan/10 to-brand-cyan/20 rounded-tr-full origin-bottom-left" />
            </motion.div>

            {/* Floating "Detected" Particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0], x: [p.x, p.x + 5], y: [p.y, p.y - 5] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute w-2 h-2 rounded-full bg-brand-cyan/60 blur-[1px]"
              />
            ))}

            {/* Central Node */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 20px rgba(6,182,212,0.2)', '0 0 40px rgba(6,182,212,0.5)', '0 0 20px rgba(6,182,212,0.2)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative w-20 h-20 rounded-3xl bg-[#0a0a0f] border-2 border-brand-cyan flex items-center justify-center glow-cyan"
            >
              <Navigation size={32} className="text-brand-cyan transform rotate-45" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Found Phase - Floating Driver Avatar on Map */}
      <AnimatePresence>
        {phase === 'found' && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            style={{ top: '-15%' }}
          >
            <div className="relative">
              {/* Pulsing circles around matched driver */}
              {[1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.75 }}
                  className="absolute inset-0 rounded-full bg-green-500/20 border border-green-500/40"
                />
              ))}
              <div className="w-24 h-24 rounded-[36px] bg-[#0a0a0f] border-4 border-green-500 p-1 flex items-center justify-center shadow-2xl">
                <div className="w-full h-full rounded-[28px] bg-white/10 flex items-center justify-center overflow-hidden">
                  <User size={48} className="text-white/40" />
                </div>
              </div>
              <motion.div 
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                className="absolute -right-12 top-0 bg-white px-3 py-1.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/10"
              >
                <BadgeCheck size={16} className="text-brand-cyan" />
                <span className="text-xs font-black text-black">TOP RATED</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
        className="relative z-20 mt-auto bg-[#0a0a0f]/98 backdrop-blur-3xl border-t border-white/5 rounded-t-[40px] pt-4 pb-safe px-6 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
      >
        <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />

        <AnimatePresence mode="wait">
          {phase === 'searching' ? (
            <motion.div
              key="searching-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pb-8"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <div className="px-4 py-1.5 bg-brand-cyan/10 rounded-full border border-brand-cyan/20 flex items-center gap-2 mb-4">
                  <Zap size={12} className="text-brand-cyan fill-brand-cyan" />
                  <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest">Priority Matching Active</span>
                </div>
                <h2 className="text-2xl font-display font-black text-white mb-2">Connecting to drivers</h2>
                <p className="text-white/40 text-sm max-w-[260px]">Matching with nearest verified autos & cabs for your college route.</p>
              </div>

              {/* Matching Progress List */}
              <div className="space-y-3">
                {[
                  { label: 'Analyzing nearby traffic', icon: Navigation, done: true },
                  { label: 'Filtering top-rated drivers', icon: Star, done: true },
                  { label: 'Dispatching your request', icon: Zap, done: false },
                ].map((s, i) => (
                  <div key={i} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all ${s.done ? 'bg-white/[0.04] border-white/10' : 'bg-white/[0.02] border-white/5 opacity-40'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.done ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-white/5 text-white/20'}`}>
                      <s.icon size={16} />
                    </div>
                    <span className={`text-xs font-bold flex-1 ${s.done ? 'text-white/80' : 'text-white/20'}`}>{s.label}</span>
                    {s.done ? <BadgeCheck size={16} className="text-brand-cyan" /> : <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="found-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="pb-8"
            >
              {/* Driver Premium Card */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-[32px] bg-gradient-to-br from-brand-cyan to-brand-blue p-[1.5px]">
                    <div className="w-full h-full rounded-[30.5px] bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
                      <User size={40} className="text-white/30" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-1 bg-yellow-400 text-black rounded-xl px-2 py-1 flex items-center gap-1 shadow-2xl scale-90 border border-black/20">
                    <span className="text-[11px] font-black">4.9</span>
                    <Star size={10} className="fill-current" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-2xl font-display font-black text-white">Ramesh Kumar</h3>
                    <div className="px-2 py-0.5 rounded-full bg-brand-cyan/20 border border-brand-cyan/40">
                      <span className="text-[9px] font-black text-brand-cyan uppercase tracking-tighter">Verified</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-bold text-white/60">White Swift Dzire</div>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-black text-white tracking-widest uppercase border border-white/10">HR10 AB 1234</div>
                      <span className="text-white/20 text-[10px]">•</span>
                      <span className="text-[10px] font-bold text-brand-cyan">1.2k RIDES</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ride Summary Matrix */}
              <div className="grid grid-cols-3 gap-2 mb-8">
                {[
                  { label: 'ETA', value: '2', unit: 'min', color: 'brand-cyan' },
                  { label: 'Dist', value: '0.8', unit: 'km', color: 'white' },
                  { label: 'Fare', value: '₹80', unit: 'UPI', color: 'white' },
                ].map((m, i) => (
                  <div key={i} className="bg-white/[0.04] border border-white/5 rounded-2xl p-4 text-center group hover:bg-white/10 transition-all">
                    <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">{m.label}</div>
                    <div className={`text-xl font-display font-black group-hover:scale-110 transition-transform ${m.color === 'brand-cyan' ? 'text-brand-cyan' : 'text-white'}`}>
                      {m.value} <span className="text-[10px] font-normal text-white/40 ml-0.5">{m.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact & Start */}
              <div className="flex gap-3 mb-4">
                <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 transition-all py-4 rounded-[22px] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest text-white/70">
                  <MessageSquare size={18} /> Chat
                </button>
                <button className="flex-1 bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/20 transition-all py-4 rounded-[22px] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest text-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  <Phone size={18} /> Call
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className="w-full py-4.5 bg-gradient-to-r from-brand-blue to-brand-cyan rounded-[22px] font-black text-white text-base tracking-widest shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-3 group"
              >
                Track Live Ride
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
