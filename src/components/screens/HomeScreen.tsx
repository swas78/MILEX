"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapView } from '@/components/ui/MapView';
import {
  Search, MapPin, Navigation, Bell, Calendar, Home, GraduationCap,
  Building2, Moon, Users, Shield, ShieldAlert, Sparkles, ChevronRight,
  Zap, CreditCard, History, Wallet, Settings, HelpCircle, Tag, Star,
  Battery, Mic, Power, Flag, BookMarked, Bus
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface HomeScreenProps {
  onComplete: () => void;
  onNavigate?: (screen: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 420, damping: 32 } },
};

type Section = 'home' | 'features';

export function HomeScreen({ onComplete, onNavigate }: HomeScreenProps) {
  const [section, setSection] = useState<Section>('home');

  const markers = [
    { lat: 28.9950, lng: 77.0160 },
    { lat: 28.9920, lng: 77.0120 },
    { lat: 28.9900, lng: 77.0180 },
  ];

  const quickPlaces = [
    { label: 'Home', icon: Home, color: '#06b6d4', screen: null },
    { label: 'College', icon: GraduationCap, color: '#3b82f6', screen: null },
    { label: 'Hostel', icon: Building2, color: '#8b5cf6', screen: null },
    { label: 'Saved', icon: MapPin, color: '#ffffff40', screen: 'savedLocations', dashed: true },
  ];

  // All feature categories
  const featureSections = [
    {
      title: '🚘 Booking',
      items: [
        { icon: Search, label: 'Book a Ride', sub: 'Search destination', color: '#06b6d4', screen: 'search' },
        { icon: Calendar, label: 'Schedule', sub: 'Plan ahead', color: '#3b82f6', screen: 'schedule' },
        { icon: Moon, label: 'Night Ride', sub: 'Instant priority', color: '#8b5cf6', screen: 'nightRide' },
        { icon: Users, label: 'Campus Pool', sub: 'Split & save', color: '#22c55e', screen: 'campusPool' },
        { icon: Bus, label: 'Student Pass', sub: 'Monthly pass', color: '#f59e0b', screen: 'pass' },
      ]
    },
    {
      title: '🛡️ Safety',
      items: [
        { icon: ShieldAlert, label: 'Safety Center', sub: 'SOS & monitoring', color: '#ef4444', screen: 'safety' },
        { icon: Shield, label: 'Women Mode', sub: 'Verified drivers', color: '#ec4899', screen: 'safety' },
        { icon: Battery, label: 'Low Battery Alert', sub: 'Auto-share location', color: '#f97316', screen: 'safety' },
        { icon: Power, label: 'Shutdown Alert', sub: 'Emergency contact', color: '#a855f7', screen: 'safety' },
        { icon: Mic, label: 'Voice Evidence', sub: 'SOS recording', color: '#ef4444', screen: 'safety' },
        { icon: Flag, label: 'Report Driver', sub: 'Unsafe behaviour', color: '#eab308', screen: 'safety' },
      ]
    },
    {
      title: '💳 Account',
      items: [
        { icon: Wallet, label: 'Wallet', sub: 'Balance & add money', color: '#06b6d4', screen: 'wallet' },
        { icon: History, label: 'Ride History', sub: 'Past trips', color: '#8b5cf6', screen: 'rides' },
        { icon: Tag, label: 'Promos & Referral', sub: 'Save more', color: '#22c55e', screen: 'promo' },
        { icon: CreditCard, label: 'Payment', sub: 'Manage methods', color: '#3b82f6', screen: 'wallet' },
      ]
    },
    {
      title: '⚙️ More',
      items: [
        { icon: Bell, label: 'Notifications', sub: 'Alerts & offers', color: '#06b6d4', screen: 'notifications' },
        { icon: MapPin, label: 'Saved Places', sub: 'Home, College...', color: '#8b5cf6', screen: 'savedLocations' },
        { icon: Settings, label: 'Settings', sub: 'App preferences', color: '#64748b', screen: 'settings' },
        { icon: HelpCircle, label: 'Help & Support', sub: 'FAQ & chat', color: '#3b82f6', screen: 'help' },
      ]
    },
  ];

  return (
    <div className="absolute inset-0 flex flex-col bg-[#070709] overflow-hidden">
      {/* Map */}
      <div className={`absolute inset-0 z-0 transition-all duration-500 ${section === 'features' ? 'opacity-20' : 'opacity-100'}`}>
        <MapView markers={markers} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-0 pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 px-4 pt-14 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="w-9 h-9 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]" />
          <div>
            <div className="text-[10px] text-white/30 font-medium">Good Evening</div>
            <div className="text-sm font-bold text-white leading-tight">Swastik 👋</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate?.('notifications')}
            className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/15 transition relative">
            <Bell size={16} className="text-white" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          </button>
          <button onClick={() => onNavigate?.('safety')}
            className="w-9 h-9 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center hover:bg-red-500/25 transition">
            <ShieldAlert size={16} className="text-red-400" />
          </button>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="relative z-10 px-4 mb-2">
        <div className="flex bg-black/40 backdrop-blur-xl border border-white/8 rounded-2xl p-1 w-fit mx-auto">
          {(['home', 'features'] as Section[]).map(s => (
            <button key={s} onClick={() => setSection(s)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${section === s ? 'bg-white text-black shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
              {s === 'home' ? '🗺 Home' : '✨ All Features'}
            </button>
          ))}
        </div>
      </div>

      {/* AI suggestion card — home only */}
      <AnimatePresence>
        {section === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="relative z-10 px-4 mb-2">
            <button onClick={onComplete}
              className="w-full flex items-center gap-3 bg-gradient-to-r from-brand-cyan/15 to-brand-blue/10 backdrop-blur-xl border border-brand-cyan/25 rounded-2xl px-4 py-3 hover:border-brand-cyan/50 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 flex items-center justify-center shrink-0 group-hover:bg-brand-cyan/30 transition">
                <Sparkles size={16} className="text-brand-cyan" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] text-brand-cyan font-bold uppercase tracking-widest mb-0.5">AI Suggestion</div>
                <div className="text-sm font-semibold text-white">Campus North Gate <span className="text-white/40">· Auto</span></div>
                <div className="text-[10px] text-white/30">Usual route · 2 min · ₹40</div>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 transition" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Sheet — animated */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.7 }}
        className="relative z-20 mt-auto bg-[#0a0a0f]/97 backdrop-blur-2xl border-t border-white/8 rounded-t-[32px] shadow-[0_-30px_60px_rgba(0,0,0,0.6)] flex flex-col"
        style={{ maxHeight: '75vh' }}
      >
        <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mt-4 mb-4 shrink-0" />

        <AnimatePresence mode="wait">
          {section === 'home' && (
            <motion.div key="home-tab"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-4 pb-24 flex flex-col gap-4 overflow-y-auto no-scrollbar">

              {/* Search */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className="w-full flex items-center gap-3 bg-white/[0.06] border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 flex items-center justify-center shrink-0 group-hover:bg-brand-cyan/25 transition">
                  <Search size={18} className="text-brand-cyan" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Where to?</div>
                  <div className="text-xs text-white/30 mt-0.5">Campus, Metro, Market...</div>
                </div>
                <div className="px-2 py-1 rounded-lg bg-white/5 text-[10px] text-white/30 font-medium">Search</div>
              </motion.button>

              {/* Quick places */}
              <div className="flex gap-2">
                {quickPlaces.map(({ label, icon: Icon, color, screen, dashed }) => (
                  <motion.button
                    key={label}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => screen ? onNavigate?.(screen) : onComplete()}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border transition-all hover:scale-105 ${dashed ? 'border-dashed border-white/10 bg-white/3' : 'border-white/8 bg-white/[0.04] hover:bg-white/8'}`}
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span className="text-[10px] font-bold text-white/40">{label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Recent chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
                {['Library', 'North Gate', 'Hostel Block C', 'Metro Station'].map((place) => (
                  <button key={place} onClick={onComplete}
                    className="whitespace-nowrap px-3 py-1.5 bg-white/5 border border-white/8 rounded-full text-xs font-medium text-white/50 hover:bg-white/10 hover:text-white transition flex items-center gap-1.5 shrink-0">
                    <Navigation size={9} className="text-brand-cyan" /> {place}
                  </button>
                ))}
              </div>

              {/* Night Ride + Campus Pool highlight */}
              <div className="grid grid-cols-2 gap-2">
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => onNavigate?.('nightRide')}
                  className="relative overflow-hidden flex flex-col gap-2 bg-gradient-to-br from-brand-purple/20 to-brand-blue/10 border border-brand-purple/30 rounded-2xl p-3.5 hover:border-brand-purple/60 transition-all group">
                  <div className="absolute -right-3 -top-3 w-16 h-16 bg-brand-purple/10 rounded-full blur-lg" />
                  <div className="w-9 h-9 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                    <Moon size={16} className="text-brand-purple" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Night Ride</div>
                    <div className="text-[9px] text-white/30 mt-0.5">Instant · Priority · Safe</div>
                  </div>
                  <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                </motion.button>

                <motion.button whileTap={{ scale: 0.96 }} onClick={() => onNavigate?.('campusPool')}
                  className="relative overflow-hidden flex flex-col gap-2 bg-gradient-to-br from-brand-cyan/20 to-green-500/10 border border-brand-cyan/30 rounded-2xl p-3.5 hover:border-brand-cyan/60 transition-all group">
                  <div className="absolute -right-3 -top-3 w-16 h-16 bg-brand-cyan/10 rounded-full blur-lg" />
                  <div className="w-9 h-9 rounded-xl bg-brand-cyan/15 flex items-center justify-center">
                    <Users size={16} className="text-brand-cyan" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Campus Pool</div>
                    <div className="text-[9px] text-white/30 mt-0.5">Batchmates · Split fare</div>
                  </div>
                  <div className="absolute top-2.5 right-2.5 text-[9px] font-bold text-brand-cyan bg-brand-cyan/10 px-1.5 py-0.5 rounded-sm">62% OFF</div>
                </motion.button>
              </div>

              {/* Quick nav to features */}
              <button onClick={() => setSection('features')}
                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-white/10 rounded-2xl text-xs text-white/30 hover:border-white/20 hover:text-white/50 transition">
                <Sparkles size={12} /> View all 23 features →
              </button>
            </motion.div>
          )}

          {section === 'features' && (
            <motion.div key="features-tab"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-4 pb-24 overflow-y-auto no-scrollbar flex flex-col gap-5">

              {featureSections.map((sec, si) => (
                <div key={si}>
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2.5 px-1">{sec.title}</div>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 gap-2"
                  >
                    {sec.items.map((feat, fi) => {
                      const Icon = feat.icon;
                      return (
                        <motion.button
                          key={fi}
                          variants={item}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => feat.screen === 'search' ? onComplete() : onNavigate?.(feat.screen)}
                          className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl px-3 py-3.5 hover:bg-white/8 hover:border-white/15 transition-all text-left group"
                        >
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${feat.color}18` }}>
                            <Icon size={15} style={{ color: feat.color }} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-bold text-white leading-tight truncate">{feat.label}</div>
                            <div className="text-[9px] text-white/30 mt-0.5 truncate">{feat.sub}</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
