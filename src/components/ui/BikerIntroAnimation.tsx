"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Spark({ delay, angle }: { delay: number; angle: number }) {
  const rad = (angle * Math.PI) / 180;
  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{ opacity: 0, x: Math.cos(rad) * 50, y: Math.sin(rad) * 40, scale: 0 }}
      transition={{ duration: 0.6 + Math.random() * 0.3, delay, ease: 'easeOut' }}
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{ background: delay % 2 === 0 ? '#06b6d4' : '#fbbf24', boxShadow: '0 0 6px currentColor', left: '50%', top: '50%' }}
    />
  );
}

function NinjaBike({ animate: isAnimating }: { animate: boolean }) {
  const rw = { cx: 58, cy: 130 };
  const fw = { cx: 248, cy: 130 };
  const r = 36;

  const spokes = (cx: number, cy: number) =>
    [0, 72, 144, 216, 288].map(a => ({
      x2: cx + 26 * Math.cos(((a - 90) * Math.PI) / 180),
      y2: cy + 26 * Math.sin(((a - 90) * Math.PI) / 180),
    }));

  const Wheel = ({ cx, cy }: { cx: number; cy: number }) => (
    <motion.g
      animate={{ rotate: isAnimating ? 360 : 0 }}
      transition={{ duration: 0.25, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Outer tire */}
      <circle cx={cx} cy={cy} r={r} fill="#06090f" stroke="#0d1117" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r - 2} fill="none" stroke="#111827" strokeWidth="8" />
      {/* Rim */}
      <circle cx={cx} cy={cy} r={r - 8} fill="#0a0e1a" stroke="#1e293b" strokeWidth="2" />
      {/* Brake disc */}
      <circle cx={cx} cy={cy} r={r - 13} fill="none" stroke="#334155" strokeWidth="3.5" strokeDasharray="7 5" />
      <circle cx={cx} cy={cy} r={r - 13} fill="none" stroke="#475569" strokeWidth="1.5" />
      {/* 5-Spokes */}
      {spokes(cx, cy).map((s, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={s.x2} y2={s.y2} stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={s.x2} y2={s.y2} stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      {/* Hub */}
      <circle cx={cx} cy={cy} r={8} fill="#0d1117" stroke="#334155" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={4} fill="#06b6d4" opacity="0.8" />
      {/* Rim glow accent */}
      <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.45" />
    </motion.g>
  );

  return (
    <svg width="310" height="170" viewBox="0 0 310 170" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1b4b" />
          <stop offset="100%" stopColor="#050a1f" />
        </linearGradient>
        <linearGradient id="fairGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111c40" />
          <stop offset="100%" stopColor="#060c20" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="headBeam" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="forkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id="helmetGloss" cx="35%" cy="30%">
          <stop offset="0%" stopColor="white" stopOpacity="0.12" />
          <stop offset="60%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Headlight beam */}
      <path d="M256 100 L310 76 L310 118 Z" fill="url(#headBeam)" opacity="0.18" />
      <path d="M256 100 L305 85 L305 112 Z" fill="url(#headBeam)" opacity="0.1" />

      {/* Wheels */}
      <Wheel cx={rw.cx} cy={rw.cy} />
      <Wheel cx={fw.cx} cy={fw.cy} />

      {/* Chain */}
      <path d="M58 138 Q153 148 222 138" stroke="#1e293b" strokeWidth="3" fill="none" strokeDasharray="5 4" />

      {/* Swingarm */}
      <path d="M58 124 L95 106 L105 108 L98 118 L84 128 Z" fill="#111827" stroke="#1e293b" strokeWidth="1" />
      <path d="M72 115 L95 106" stroke="#1e4068" strokeWidth="1.5" />

      {/* Engine block */}
      <rect x="90" y="96" width="100" height="42" rx="7" fill="#0a0f1e" stroke="#1a2030" strokeWidth="1.5" />
      <rect x="96" y="102" width="44" height="30" rx="3" fill="#0d1322" stroke="#1e293b" strokeWidth="1" />
      {[0,1,2,3,4].map(i=>(
        <line key={i} x1={142+i*9} y1="104" x2={142+i*9} y2="134" stroke="#121c2e" strokeWidth="1.5" />
      ))}
      {/* Radiator */}
      <rect x="188" y="100" width="22" height="28" rx="2" fill="#080d18" stroke="#1e293b" strokeWidth="1" />
      {[0,1,2,3,4,5,6].map(i=>(
        <line key={i} x1="188" y1={102+i*3.8} x2="210" y2={102+i*3.8} stroke="#141e2e" strokeWidth="1" />
      ))}

      {/* Exhaust pipes */}
      <path d="M150 136 Q180 145 210 140 L220 134" stroke="#1e293b" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M150 136 Q180 145 210 140 L220 134" stroke="#2d3748" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M150 136 Q180 145 210 140 L220 134" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="221" cy="133" rx="6" ry="4" fill="#0d1117" stroke="#475569" strokeWidth="1.5" />

      {/* Front forks (telescopic) */}
      <path d="M214 80 L228 98 L232 130" stroke="url(#forkGrad)" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M222 80 L236 98 L240 130" stroke="url(#forkGrad)" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M214 80 L228 98 L232 130" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M222 80 L236 98 L240 130" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Fork brace */}
      <path d="M222 110 L238 112" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

      {/* Front mudguard */}
      <path d="M218 118 Q224 106 228 98 Q234 106 238 118" fill="#0a0e1e" stroke="#1e293b" strokeWidth="1.5" />

      {/* === MAIN FAIRING BODY === */}
      <path d="
        M 90 130 L 84 110 L 80 88 L 86 70 L 94 56
        Q 112 44 140 40 Q 168 36 190 42
        Q 208 46 220 62 L 228 76 L 232 92
        Q 218 84 205 82 Q 185 78 162 80 Q 132 82 112 90 Q 100 96 94 110 L 90 130 Z
      " fill="url(#bodyGrad)" stroke="#1a2540" strokeWidth="1.2" />

      {/* Belly pan */}
      <path d="
        M 94 110 Q 100 96 112 90 Q 132 82 162 80 Q 185 78 205 82 Q 218 84 228 92
        L 230 106 Q 216 100 200 98 Q 165 94 135 96 Q 112 98 100 103 Z
      " fill="#060c1e" stroke="#1a2030" strokeWidth="1" />

      {/* Upper fairing / front body */}
      <path d="
        M 190 42 Q 210 44 224 62 L 235 78 L 244 92 L 256 100 L 252 106 L 242 100
        L 232 88 L 224 76 L 216 62 Q 208 50 196 46 Z
      " fill="url(#fairGrad)" stroke="#162040" strokeWidth="1" />

      {/* Windscreen */}
      <path d="
        M 192 44 Q 208 42 222 58 L 232 72 L 220 68
        Q 210 56 198 50 Z
      " fill="#091228" stroke="#1e3a80" strokeWidth="1" opacity="0.92" />
      <path d="M 196 46 Q 210 44 222 58" stroke="#3b82f6" strokeWidth="0.8" opacity="0.5" fill="none" />

      {/* Fairing accent stripe (neon) */}
      <path d="M 92 86 Q 118 74 148 72 Q 175 70 200 76 L 216 82" stroke="url(#accentGrad)" strokeWidth="2" fill="none" opacity="0.85" filter="url(#glow)" />
      <path d="M 100 102 Q 150 106 200 100" stroke="url(#accentGrad)" strokeWidth="1.5" fill="none" opacity="0.6" filter="url(#glow)" />

      {/* Fairing gloss highlight */}
      <path d="M 110 68 Q 145 58 178 60 Q 160 56 128 60 Q 110 63 100 70 Z" fill="white" opacity="0.04" />

      {/* Tail section */}
      <path d="M 80 88 L 86 70 L 94 56 Q 84 52 76 62 L 68 74 L 66 88 Z" fill="#080e22" stroke="#1a2030" strokeWidth="1" />
      {/* Tail light */}
      <ellipse cx="72" cy="66" rx="7" ry="3.5" fill="#ef4444" filter="url(#glow)" opacity="0.95" />
      <ellipse cx="72" cy="66" rx="4" ry="2" fill="#fca5a5" opacity="0.9" />

      {/* === RIDER === */}
      {/* Thighs gripping tank */}
      <path d="M 128 54 L 140 40 L 160 38 L 165 52 Q 148 48 132 50 Z" fill="#050912" stroke="#0d1520" strokeWidth="1" />
      {/* Torso stretched forward */}
      <path d="M 142 46 Q 170 34 198 40 Q 180 36 162 37 Q 148 38 142 44 Z" fill="#040810" />
      {/* Race suit detail line */}
      <path d="M 148 44 Q 172 34 196 39" stroke="#0e2040" strokeWidth="1.5" fill="none" opacity="0.8" />
      {/* Arms to clipons */}
      <path d="M 178 40 Q 200 38 220 58" stroke="#040810" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M 178 40 Q 200 38 220 58" stroke="#0a1428" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Gloves */}
      <circle cx="221" cy="59" r="5.5" fill="#050912" stroke="#1e293b" strokeWidth="1.2" />
      {/* Left arm */}
      <path d="M 160 50 Q 188 42 221 59" stroke="#040810" strokeWidth="8" strokeLinecap="round" fill="none" />

      {/* Helmet — full race */}
      <ellipse cx="153" cy="34" rx="20" ry="19" fill="#050912" stroke="#0d1525" strokeWidth="1.5" />
      <path d="M 135 38 Q 138 48 153 50 Q 168 48 171 38" fill="#050912" stroke="#0d1525" strokeWidth="1" />
      {/* Visor */}
      <path d="M 137 30 Q 153 20 169 30 L 168 40 Q 153 34 138 40 Z" fill="#081530" stroke="#1e3a80" strokeWidth="1.2" />
      <path d="M 141 25 Q 153 19 165 25" stroke="white" strokeWidth="1.2" opacity="0.12" fill="none" strokeLinecap="round" />
      {/* Helmet gloss */}
      <ellipse cx="153" cy="34" rx="20" ry="19" fill="url(#helmetGloss)" />
      {/* Chin vent */}
      <path d="M 146 42 L 160 42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      {/* MX decal */}
      <text x="148" y="35" fontSize="6.5" fill="#06b6d4" opacity="0.75" fontFamily="monospace" fontWeight="bold">MX</text>

      {/* === HEADLIGHT === */}
      <path d="M 244 90 L 255 84 L 262 92 L 261 106 L 252 110 L 243 104 Z" fill="#070d1e" stroke="#1e293b" strokeWidth="1.2" />
      {/* LED DRL */}
      <path d="M 245 92 L 253 86 L 259 93 L 258 104 L 251 108 L 244 103 Z" fill="none" stroke="#06b6d4" strokeWidth="1.8" opacity="0.9" filter="url(#glow)" />
      {/* Main lens */}
      <ellipse cx="251" cy="97" rx="5.5" ry="6.5" fill="#fbbf24" opacity="0.95" />
      <ellipse cx="251" cy="97" rx="3" ry="4" fill="white" />

      {/* Handlebar / clipon */}
      <path d="M 218 58 L 226 62" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

    </svg>
  );
}

export function BikerIntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'city' | 'ride' | 'brand'>('city');
  const [sparks, setSparks] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('ride'), 500);
    const t2 = setTimeout(() => setSparks(true), 2000);
    const t3 = setTimeout(() => setPhase('brand'), 2300);
    const t4 = setTimeout(onComplete, 5200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  const floats = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100, y: 20 + Math.random() * 60,
    s: 1.5 + Math.random() * 2.5, d: i * 0.25,
  }));

  return (
    <div className="absolute inset-0 bg-[#030308] flex flex-col items-center justify-center overflow-hidden select-none">

      {/* Fine grid */}
      <div className="absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,1) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Ambient float particles */}
      {floats.map((p, i) => (
        <motion.div key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0], y: [0, -25] }}
          transition={{ duration: 3 + Math.random() * 2, delay: p.d, repeat: Infinity }}
          className="absolute rounded-full bg-brand-cyan"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, filter: 'blur(1px)' }}
        />
      ))}

      {/* City lights horizon glow */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ duration: 1.2 }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-blue/20 to-transparent pointer-events-none" />

      {/* Road */}
      <motion.div
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/25 to-transparent"
        style={{
          transformOrigin: 'left center',
          bottom: '28%',
        }}
      />  

      {/* Big centre glow (grows on brand phase) */}
      <motion.div
        animate={phase === 'brand' ? { opacity: 0.18, scale: 2.2 } : { opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute w-64 h-64 rounded-full bg-brand-cyan blur-[90px] pointer-events-none"
      />

      {/* ── BIKE streak ── */}
      <motion.div
        initial={{ x: '-130%' }}
        animate={phase === 'ride' ? { x: ['-130%', '10%', '160%'] } : phase === 'brand' ? { x: '160%' } : { x: '-130%' }}
        transition={{ duration: 1.9, times: [0, 0.46, 1], ease: ['easeOut', 'easeIn'] }}
        className="absolute flex items-end"
        style={{ bottom: '27%' }}
      >
        {/* Long cyan light trail */}
        <motion.div
          animate={{ width: phase === 'ride' ? [0, 300, 0] : 0 }}
          transition={{ duration: 1.9, times: [0, 0.46, 1] }}
          className="absolute h-[3px] bg-gradient-to-r from-transparent via-brand-cyan to-brand-cyan/70 right-full top-1/2"
          style={{ filter: 'blur(2px)', transform: 'translateY(-300%)' }}
        />
        <motion.div
          animate={{ width: phase === 'ride' ? [0, 200, 0] : 0 }}
          transition={{ duration: 1.9, times: [0, 0.46, 1], delay: 0.04 }}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-brand-blue/50 to-brand-blue/30 right-full"
          style={{ top: '48%', filter: 'blur(1px)' }}
        />
        {/* Sparks */}
        {sparks && Array.from({ length: 16 }, (_, i) => (
          <Spark key={i} delay={i * 0.03} angle={-160 + i * 22} />
        ))}
        <NinjaBike animate={phase === 'ride'} />
      </motion.div>

      {/* ── Brand reveal ── */}
      <AnimatePresence>
        {phase === 'brand' && (
          <motion.div key="brand"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            className="relative z-20 flex flex-col items-center"
          >
            {/* Orbital rings */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute w-40 h-40 rounded-full border border-brand-cyan/15 pointer-events-none"
              style={{ top: -14, left: '50%', transform: 'translateX(-50%)' }} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute w-56 h-56 rounded-full border border-brand-blue/10 pointer-events-none"
              style={{ top: -34, left: '50%', transform: 'translateX(-50%)' }} />

            {/* MX badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
              className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-purple p-[2px] mb-6 shadow-[0_0_50px_rgba(6,182,212,0.5)]"
            >
              <div className="w-full h-full rounded-[26px] bg-[#030308] flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-cyan to-brand-blue leading-none">MX</span>
                <div className="w-8 h-[1.5px] bg-gradient-to-r from-brand-cyan to-brand-blue rounded-full mt-1 opacity-60" />
              </div>
            </motion.div>

            {/* Letter-by-letter MILEX */}
            <div className="flex items-center gap-[0.1em] mb-3">
              {'MILEX'.split('').map((ch, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.28 + i * 0.08, duration: 0.38 }}
                  className="text-5xl font-display font-black text-white"
                  style={{ letterSpacing: '0.08em' }}
                >{ch}</motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-brand-cyan/50" />
              <span className="text-[10px] font-black text-brand-cyan/60 tracking-[0.4em] uppercase">Smart Mobility</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-brand-cyan/50" />
            </motion.div>

            {/* Loading bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}
              className="w-44 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.9, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple rounded-full"
              />
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
              className="mt-3 text-[9px] font-bold text-white/15 uppercase tracking-[0.3em]">
              Initialising ecosystem…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
