"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Layout, Sparkles, ShieldCheck, Wallet, UserCircle, Settings } from 'lucide-react';
import { AppPrototype, ScreenType } from '@/components/ui/AppPrototype';

export default function DemoPage() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const sidebarRef = useRef<HTMLDivElement>(null);

  const groups = [
    {
      name: 'Auth & Onboarding',
      icon: <Sparkles size={14} className="text-brand-cyan" />,
      items: [
        { id: 'splash', label: '1. Splash' },
        { id: 'onboarding', label: '2. Onboarding' },
        { id: 'login', label: '3. Login / Signup' },
      ]
    },
    {
      name: 'Ride Experience',
      icon: <Layout size={14} className="text-brand-blue" />,
      items: [
        { id: 'home', label: '4. Home Hub' },
        { id: 'search', label: '5. Search' },
        { id: 'vehicle', label: '6. Vehicles' },
        { id: 'driverMatching', label: '7. Matching' },
        { id: 'tracking', label: '8. Tracking' },
        { id: 'completion', label: '9. Arrival' },
        { id: 'payment', label: '10. Payment' },
      ]
    },
    {
      name: 'Smart Features',
      icon: <ShieldCheck size={14} className="text-brand-purple" />,
      items: [
        { id: 'nightRide', label: '🌙 22. Night Ride' },
        { id: 'campusPool', label: '🎓 23. Campus Pool' },
        { id: 'safety', label: '20. Safety Center' },
        { id: 'pass', label: '21. Student Pass' },
        { id: 'schedule', label: '17. Schedule' },
      ]
    },
    {
      name: 'User & Wallet',
      icon: <Wallet size={14} className="text-brand-green" />,
      items: [
        { id: 'wallet', label: '12. Wallet' },
        { id: 'rides', label: '11. History' },
        { id: 'promo', label: '18. Promo' },
        { id: 'savedLocations', label: '19. Locations' },
      ]
    },
    {
      name: 'Settings & Support',
      icon: <Settings size={14} className="text-white/40" />,
      items: [
        { id: 'profile', label: '13. Profile' },
        { id: 'notifications', label: '14. Alerts' },
        { id: 'settings', label: '16. Settings' },
        { id: 'help', label: '15. Help' },
      ]
    }
  ];

  return (
    <div className="min-h-[100dvh] bg-[#050508] flex overflow-hidden font-sans selection:bg-brand-cyan selection:text-black">
      {/* ── Sidebar Navigation ─────────────────────────────────────── */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-72 border-r border-white/5 bg-[#07070a]/80 backdrop-blur-3xl p-6 flex flex-col hidden lg:flex relative z-50"
      >
        <Link href="/" className="group flex items-center gap-3 text-white/40 hover:text-white mb-10 transition-all duration-300">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-cyan/20 group-hover:text-brand-cyan transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em]">Landing</span>
        </Link>

        <div className="mb-6 px-2 flex items-center justify-between">
          <h2 className="text-lg font-display font-black text-white tracking-tight">Ecosystem</h2>
          <div className="px-2 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            <span className="text-[9px] font-black text-brand-cyan uppercase">v1.2</span>
          </div>
        </div>

        {/* Scrollable Container with Crazy Animations */}
        <div 
          ref={sidebarRef}
          className="flex-1 overflow-y-auto pr-3 no-scrollbar space-y-8"
        >
          {groups.map((group, gIdx) => (
            <motion.div 
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gIdx * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 px-2 mb-4">
                {group.icon}
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{group.name}</span>
              </div>

              <div className="space-y-1">
                {group.items.map((item, iIdx) => {
                  const isSelected = currentScreen === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setCurrentScreen(item.id as ScreenType)}
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0.3, scale: 0.9, rotateX: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                      viewport={{ margin: "-10% 0px -10% 0px" }}
                      className={`relative w-full text-left px-4 py-3.5 rounded-2xl text-sm transition-all duration-300 border flex items-center justify-between group ${
                        isSelected 
                          ? 'bg-white/10 text-white font-black border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                          : 'text-white/30 border-transparent hover:text-white/60 hover:bg-white/[0.03]'
                      }`}
                    >
                      {isSelected && (
                        <motion.div 
                          layoutId="sidebarActive"
                          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-cyan/10 to-transparent border-l-2 border-brand-cyan z-0"
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                      {isSelected && (
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(6,182,212,1)]" 
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-white/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
              <UserCircle size={16} className="text-brand-blue" />
            </div>
            <div>
              <div className="text-[10px] text-white/60 font-black uppercase">Demo Session</div>
              <div className="text-[9px] text-white/20">University Campus Route</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Main Content Area ────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative overflow-hidden bg-[#050508]">
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-blue/20 blur-[150px] rounded-full pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-cyan/20 blur-[150px] rounded-full pointer-events-none" 
        />
        
        {/* Device Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotateY: 15 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ type: "spring", bounce: 0.3, duration: 1 }}
          className="relative z-10"
        >
          <AppPrototype 
            currentScreen={currentScreen} 
            onScreenChange={setCurrentScreen} 
          />
        </motion.div>

        {/* Floating Screen Indicator */}
        <div className="absolute top-8 right-8 pointer-events-none hidden xl:block">
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[28px] p-6 text-right">
            <div className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.3em] mb-2">Live View</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-2xl font-display font-black text-white"
              >
                {groups.flatMap(g => g.items).find(i => i.id === currentScreen)?.label.split('. ')[1] ?? currentScreen}
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex justify-end gap-2 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(34,197,94,1)]" />
              <div className="text-[9px] font-bold text-white/20 uppercase">Prototype Connected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
