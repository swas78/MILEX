"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowRight, Shield, Zap, Map as MapIcon, GraduationCap, ShieldAlert, UserCheck, Navigation, Users, BellRing, MapPin, Leaf, Moon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { AppPrototype } from '@/components/ui/AppPrototype';
import { Footer } from '@/components/ui/Footer';
import { Logo } from '@/components/ui/Logo';
import { BikerIntroAnimation } from '@/components/ui/BikerIntroAnimation';
import { Capacitor } from '@capacitor/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NeonButton = dynamic(() => import('@/components/ui/NeonButton').then(m => m.NeonButton), { ssr: false });

export default function LandingPage() {
  const router = useRouter();
  const [isNative, setIsNative] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      setIsNative(true);
      router.replace('/app');
    }
  }, [router]);

  const targetRef = useRef<HTMLDivElement>(null);

  // If running natively, don't render the marketing page to avoid flicker before redirect
  if (isNative) {
    return <div className="min-h-screen bg-black" />;
  }
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      {/* ── Cinematic Biker Intro Overlay ── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[9999]"
          >
            <BikerIntroAnimation onComplete={() => setShowIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>

    <main className="min-h-screen bg-brand-dark text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Floating Island Navbar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-auto"
        >
          <div className="px-6 md:px-8 h-16 flex items-center justify-between relative">
          
          {/* Left: Navigation Links */}
          <div className="hidden md:flex flex-1 items-center gap-2">
            {['Features', 'Safety', 'Campus'].map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`#${item.toLowerCase()}`} className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 relative group overflow-hidden flex items-center justify-center">
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Professional Tech Vector Logo */}
              <Logo className="w-9 h-9" />
              <span className="font-display font-bold text-xl tracking-wide text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all duration-300">MileX</span>
            </motion.div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-1 justify-end items-center gap-3 md:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/demo" className="hidden md:flex items-center justify-center px-5 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                Prototype
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <Link href="/app">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full blur opacity-40 group-hover:opacity-100 transition duration-300 animate-pulse" />
                <NeonButton variant="primary" size="sm" className="!rounded-full px-6 relative">
                  Open App
                </NeonButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>
      </div>

      {/* Hero Section - Massive Typography & Parallax */}
      <section ref={targetRef} className="relative min-h-[100vh] pt-40 pb-32 px-6 flex items-center justify-center bg-brand-dark border-b border-transparent">
        
        {/* Massive Background Typography */}
        <motion.div 
          style={{ y: textY }}
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden"
        >
          <h1 className="text-[25vw] font-display font-black text-white/[0.03] leading-none whitespace-nowrap tracking-tighter">
            MILEX
          </h1>
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
          
          {/* Floating Badges */}
          <div className="w-full flex justify-between items-start absolute top-0 px-4 md:px-0 z-30 pointer-events-none">
            {/* Left Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-24 h-24 rounded-full border border-white/20 flex flex-col items-center justify-center bg-brand-dark/50 backdrop-blur-md pointer-events-auto"
            >
              <Logo className="w-10 h-10 mb-1 group" />
              <div className="text-[8px] uppercase tracking-widest text-white/60 font-semibold group-hover:text-brand-cyan transition-colors">Mobility</div>
            </motion.div>
          </div>

          {/* Hero Subheadline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            className="flex flex-col items-center justify-center text-center mt-8 mb-6 md:mt-12 md:mb-10 z-30 px-4"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl mb-6 group cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              </span>
              <span className="text-xs md:text-sm font-semibold text-brand-cyan tracking-widest uppercase group-hover:text-white transition-colors relative z-10">
                Safety Meets Innovation
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 tracking-tight max-w-3xl leading-tight drop-shadow-2xl">
              Experience next-gen <br className="hidden md:block"/> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-blue drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">smart mobility</span> for students.
            </h2>
          </motion.div>

          {/* Central 3D Centerpiece */}
          <motion.div 
            style={{ y: imageY, scale: imageScale }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            className="relative z-20 mt-10 md:mt-0 flex justify-center w-full max-w-[800px] perspective-[2000px]"
          >
            {/* Inner Floating Animation */}
            <motion.div
              animate={{ y: [0, -15, 0], rotateX: [10, 15, 10], rotateY: [-5, 0, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative shadow-[0_0_100px_rgba(6,182,212,0.3)] rounded-[50px] transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Backglow */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-brand-blue/30 to-brand-purple/30 blur-[60px] rounded-[50px] -z-10 animate-pulse pointer-events-none" />
              
              <AppPrototype initialScreen="vehicle" />
            </motion.div>
          </motion.div>

          {/* Bottom Action Area */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute -bottom-16 z-30"
          >
            <Link href="/demo">
              <NeonButton size="lg" className="px-10 py-6 text-lg font-bold shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                EXPLORE DEMO <ArrowRight size={24} className="ml-2" />
              </NeonButton>
            </Link>
          </motion.div>
          
        </div>
      </section>

      {/* Features - Next-Gen 3D Scroll Cards */}
      <section id="features" className="pt-40 pb-32 px-6 relative z-10 bg-black/60 bg-gradient-to-b from-transparent to-black/60">
        <div className="max-w-7xl mx-auto">
          
          {/* SECTION 1: Women Safety Hub */}
          <div className="mb-32">
            <div className="text-center mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-bold mb-4 glow-pink"
              >
                <ShieldAlert size={18} /> Ultimate Protection
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Women Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">First</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Late-night hostel returns or metro commutes, MileX ensures every female passenger feels secure with zero compromises.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Women Safety Mode", desc: "Special ride preferences prioritizing trusted drivers and enhanced monitoring.", icon: <Shield size={32} />, color: "pink" },
                { title: "Women-Only Rides", desc: "Choose female drivers or women-only shared rides for late-night travel.", icon: <UserCheck size={32} />, color: "purple" },
                { title: "Live Ride Tracking", desc: "Real-time GPS tracking and route monitoring sent directly to MileX safety ops.", icon: <Navigation size={32} />, color: "blue" },
                { title: "Family Sharing", desc: "Auto-share live location, driver details, and ETA with parents or roommates.", icon: <Users size={32} />, color: "cyan" },
                { title: "SOS Emergency", desc: "One-tap emergency trigger alerts nearby authorities and emergency contacts.", icon: <BellRing size={32} />, color: "red" }
              ].map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 100, rotateX: 30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -100, rotateX: -30 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: idx * 0.1 }}
                  className="perspective-[1000px]"
                >
                  <div className="relative h-full rounded-[32px] p-8 border border-white/10 overflow-hidden group hover:border-white/30 transition-colors transform-gpu" style={{ transformStyle: "preserve-3d" }}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${feat.color}-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-${feat.color}-500/30 blur-[80px] rounded-full group-hover:bg-${feat.color}-400/40 transition-colors duration-700`} />
                    <div className="absolute inset-0 backdrop-blur-3xl bg-brand-dark/40" />
                    <div className="relative z-10 transform-gpu translate-z-[30px]">
                      <div className={`w-16 h-16 rounded-2xl bg-${feat.color}-500/20 border border-${feat.color}-500/30 flex items-center justify-center text-${feat.color}-400 mb-8 glow-${feat.color} group-hover:scale-110 transition-transform duration-500`}>
                        {feat.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
                      <p className="text-white/60 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SECTION 2: Student Campus Features */}
          <div>
            <div className="text-center mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-bold mb-4 glow-cyan"
              >
                <GraduationCap size={18} /> Exclusive to Students
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Campus Life</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                No more haggling with autos. MileX adapts to your university schedule, budget, and short-distance needs.
              </p>
            </div>

            <div className="flex flex-col gap-6 max-w-4xl mx-auto relative pb-20">
              {[
                { title: "Campus Zones", desc: "Special geo-fenced zones with student-only pricing and verified campus entry clearance.", icon: <MapIcon size={40} />, color: "cyan" },
                { title: "No Short-Ride Refusals", desc: "Smart route grouping ensures drivers never refuse your 1km ride from the Metro to your hostel.", icon: <MapPin size={40} />, color: "blue" },
                { title: "Student Eco-Passes", desc: "Subscribe to monthly passes, ride EVs, and earn Eco Rewards for reducing carbon footprints.", icon: <Leaf size={40} />, color: "green" },
                { title: "Late-Night Shuttles", desc: "Dedicated high-capacity shared rides connecting major campus hubs after library hours.", icon: <Moon size={40} />, color: "purple" }
              ].map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                  className="sticky perspective-[1000px] w-full"
                  style={{ top: `calc(15vh + ${idx * 40}px)`, zIndex: idx }}
                >
                  <div className="relative rounded-[40px] p-10 border border-white/10 overflow-hidden group hover:border-white/30 transition-colors transform-gpu flex flex-col justify-end min-h-[300px] shadow-[0_-20px_40px_rgba(0,0,0,0.6)]" style={{ transformStyle: "preserve-3d" }}>
                    <div className={`absolute inset-0 bg-gradient-to-t from-${feat.color}-600/30 via-${feat.color}-900/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700`} />
                    <div className={`absolute left-1/2 -top-1/4 -translate-x-1/2 w-full h-full bg-${feat.color}-500/20 blur-[100px] rounded-full group-hover:bg-${feat.color}-400/30 transition-colors duration-700`} />
                    <div className="absolute inset-0 backdrop-blur-[40px] bg-brand-dark/80" />
                    <div className="relative z-10 transform-gpu translate-z-[40px] flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div>
                        <div className={`w-20 h-20 rounded-3xl bg-${feat.color}-500/20 border border-${feat.color}-500/30 flex items-center justify-center text-${feat.color}-400 mb-8 glow-${feat.color} group-hover:-translate-y-2 transition-transform duration-500`}>
                          {feat.icon}
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-4">{feat.title}</h3>
                        <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                          {feat.desc}
                        </p>
                      </div>
                      <div className="text-[120px] font-display font-bold text-white/5 leading-none absolute right-4 top-4 select-none pointer-events-none">
                        0{idx + 1}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
    </>
  );
}
