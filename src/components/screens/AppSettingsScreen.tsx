"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Globe, Bell, Lock, ChevronRight, Check, ShieldCheck, Zap, User, Smartphone, Palette } from 'lucide-react';

/* ─── Reusable Toggle ─────────────────────────────────────────── */
function Toggle({ enabled, onChange, accent = '#06b6d4' }: { enabled: boolean; onChange: () => void; accent?: string }) {
  return (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-all duration-300 shrink-0 border border-white/5 shadow-inner"
      style={{ background: enabled ? accent : 'rgba(255,255,255,0.05)' }}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-0.5 bottom-0.5 aspect-square rounded-full bg-white shadow-xl"
        style={{ left: enabled ? 'calc(100% - 21px)' : '2px' }}
      />
    </button>
  );
}

/* ─── Setting Row ─────────────────────────────────────────────── */
function SettingRow({
  label, desc, enabled, onToggle, accent = '#06b6d4',
}: {
  label: string; desc: string; enabled: boolean; onToggle: () => void; accent?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 group">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white tracking-tight group-hover:text-white transition-colors">{label}</p>
        <p className="text-[10px] text-white/30 font-medium tracking-wide mt-0.5">{desc}</p>
      </div>
      <Toggle enabled={enabled} onChange={onToggle} accent={accent} />
    </div>
  );
}

export function AppSettingsScreen({ onBack }: { onBack: () => void }) {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('en');
  const [settings, setSettings] = useState({
    rideAlerts: true,
    promoNotifs: false,
    soundAlerts: true,
    locationAlways: true,
    biometric: true,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'ta', label: 'Tamil' },
    { code: 'bn', label: 'Bengali' },
  ];

  return (
    <div className="absolute inset-0 bg-[#07070a] flex flex-col overflow-hidden">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div 
            key="dark-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-cyan/5 blur-[120px] rounded-full" />
          </motion.div>
        ) : (
          <motion.div 
            key="light-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 bg-gray-50"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-5">
        <button onClick={onBack} className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition shadow-2xl">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-black text-white">App Settings</h1>
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Preferences & Privacy</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-2 pb-12 relative z-10 space-y-8">
        
        {/* Appearance Group */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Palette size={14} className="text-brand-purple" />
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Aesthetics</span>
          </div>
          
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsDark(true)}
                className={`relative p-4 rounded-[24px] border transition-all duration-300 ${isDark ? 'bg-white/10 border-brand-purple shadow-lg' : 'bg-white/[0.02] border-white/5'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-brand-purple/20 text-brand-purple' : 'bg-white/5 text-white/20'}`}>
                  <Moon size={20} />
                </div>
                <div className="text-left">
                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-white/40'}`}>Dark Mode</div>
                  <div className="text-[9px] text-white/20 font-medium mt-0.5">OLED optimized</div>
                </div>
                {isDark && (
                  <motion.div layoutId="check" className="absolute top-4 right-4 text-brand-purple">
                    <Check size={16} />
                  </motion.div>
                )}
              </button>

              <button 
                onClick={() => setIsDark(false)}
                className={`relative p-4 rounded-[24px] border transition-all duration-300 ${!isDark ? 'bg-white/10 border-brand-cyan shadow-lg' : 'bg-white/[0.02] border-white/5'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${!isDark ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-white/5 text-white/20'}`}>
                  <Sun size={20} />
                </div>
                <div className="text-left">
                  <div className={`text-sm font-bold ${!isDark ? 'text-white' : 'text-white/40'}`}>Light Mode</div>
                  <div className="text-[9px] text-white/20 font-medium mt-0.5">Clear & Bright</div>
                </div>
                {!isDark && (
                  <motion.div layoutId="check" className="absolute top-4 right-4 text-brand-cyan">
                    <Check size={16} />
                  </motion.div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-brand-blue" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Language</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((l) => (
              <button 
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-4 py-4 rounded-[24px] border transition-all duration-300 flex items-center justify-between group ${lang === l.code ? 'bg-brand-blue/10 border-brand-blue text-white shadow-lg' : 'bg-white/[0.02] border-white/5 text-white/30'}`}
              >
                <span className="text-xs font-bold">{l.label}</span>
                {lang === l.code && <Check size={14} className="text-brand-blue" />}
              </button>
            ))}
          </div>
        </div>

        {/* Main Settings Sections */}
        <div className="space-y-6">
          {/* Notifications Section */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[36px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                <Bell size={18} />
              </div>
              <span className="text-sm font-black text-white uppercase tracking-widest">Notifications</span>
            </div>
            <div className="divide-y divide-white/5">
              <SettingRow label="Ride Status" desc="Real-time updates on your booking" enabled={settings.rideAlerts} onToggle={() => toggle('rideAlerts')} />
              <SettingRow label="Offers & Coupons" desc="Exclusive student deals & cashback" enabled={settings.promoNotifs} onToggle={() => toggle('promoNotifs')} />
              <SettingRow label="Sound Feedback" desc="Audio cues for arrival & matching" enabled={settings.soundAlerts} onToggle={() => toggle('soundAlerts')} />
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[36px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                <Lock size={18} />
              </div>
              <span className="text-sm font-black text-white uppercase tracking-widest">Privacy</span>
            </div>
            <div className="divide-y divide-white/5">
              <SettingRow label="Always-On GPS" desc="Better tracking and faster matching" enabled={settings.locationAlways} onToggle={() => toggle('locationAlways')} accent="#ec4899" />
              <SettingRow label="Biometric Access" desc="Use Face ID for quick sign-in" enabled={settings.biometric} onToggle={() => toggle('biometric')} accent="#ec4899" />
            </div>
          </div>
        </div>

        {/* Legal & About */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[36px] overflow-hidden">
          {[
            { label: 'Privacy Policy', icon: ShieldCheck },
            { label: 'Terms of Service', icon: Smartphone },
            { label: 'About MileX', icon: Zap },
            { label: 'My Account', icon: User },
          ].map((item, idx, arr) => (
            <button 
              key={idx}
              className={`w-full flex items-center justify-between px-6 py-5 hover:bg-white/5 transition-all group ${idx < arr.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={16} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
                <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{item.label}</span>
              </div>
              <ChevronRight size={14} className="text-white/10 group-hover:text-white/40 transition-all group-hover:translate-x-1" />
            </button>
          ))}
        </div>

        {/* Version Info */}
        <div className="text-center space-y-1">
          <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">MileX Core v1.2.4</div>
          <div className="text-[9px] font-bold text-brand-cyan uppercase tracking-widest opacity-40">System Optimized</div>
        </div>
      </div>
    </div>
  );
}
