"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapView } from '@/components/ui/MapView';
import { Phone, MessageSquare, ShieldAlert, Navigation, User, Share2, BadgeCheck, Lock, ChevronUp, Bell, MapPin, Zap, Star } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

export function LiveTrackingScreen({ onBack, onComplete }: { onBack: () => void, onComplete: () => void }) {
  const [driverPos, setDriverPos] = useState({ lat: 28.9920, lng: 77.0120 });
  const [isExpanded, setIsExpanded] = useState(false);

  // Simple animation for the driver moving on map
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPos(prev => ({
        lat: prev.lat + 0.0001,
        lng: prev.lng + 0.0001,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#07070a] overflow-hidden">
      {/* Map Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <MapView markers={[driverPos]} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
        
        {/* Pulsing Marker Indicator on Map (Visual Only) */}
        <div className="absolute top-[45%] left-[48%] pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-4 rounded-full bg-brand-cyan/20 border border-brand-cyan/40"
          />
          <div className="relative w-4 h-4 rounded-full bg-brand-cyan shadow-[0_0_15px_rgba(6,182,212,1)] border-2 border-white" />
        </div>

        {/* AI Safe Route Floating HUD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-black/40 backdrop-blur-2xl rounded-full border border-green-500/30 flex items-center gap-3 shadow-[0_0_40px_rgba(34,197,94,0.1)] pointer-events-none"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]" />
          <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">AI Safe Route Monitored</span>
          <BadgeCheck size={14} className="text-green-400" />
        </motion.div>
      </div>

      {/* Top Floating Controls */}
      <div className="relative z-20 px-6 pt-14 flex justify-between items-start pointer-events-none mt-safe pt-safe">
        <div className="flex flex-col gap-2 pointer-events-auto">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="px-5 py-2.5 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse glow-cyan" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Arriving in 3 min</span>
          </motion.div>
          <div className="px-3 py-1.5 bg-brand-blue/20 backdrop-blur-xl rounded-xl border border-brand-blue/30 w-fit">
            <span className="text-[9px] font-bold text-brand-blue uppercase tracking-tighter">Verified Ride #MX492</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 pointer-events-auto">
          <button className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition shadow-2xl">
            <Share2 size={20} className="text-white/70" />
          </button>
          <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-red-500/10 backdrop-blur-xl border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <ShieldAlert size={22} className="text-red-400" />
          </button>
        </div>
      </div>

      {/* Driver Tracking Sheet */}
      <motion.div 
        animate={{ height: isExpanded ? '85vh' : 'auto' }}
        className="relative z-30 mt-auto bg-[#0a0a0f]/98 backdrop-blur-3xl border-t border-white/5 rounded-t-[40px] pt-4 pb-safe px-6 shadow-[0_-30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex flex-col items-center mb-6 py-2"
        >
          <div className="w-12 h-1.5 bg-white/10 rounded-full mb-1" />
          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronUp size={16} className="text-white/20" />
          </div>
        </button>
        
        {/* Secure OTP - Next Gen PIN Display */}
        <motion.div 
          layout
          className="relative w-full bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 rounded-[32px] p-6 mb-8 flex justify-between items-center group overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none" />
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20">
              <Lock size={24} className="text-brand-cyan" />
            </div>
            <div>
              <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Secure PIN</div>
              <div className="text-sm font-bold text-white leading-tight">Provide to start ride</div>
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl font-display font-black text-white tracking-[0.2em] flex items-center gap-1">
              <span>4</span>
              <span>9</span>
              <span className="text-brand-cyan">1</span>
              <span>2</span>
            </div>
          </div>
        </motion.div>

        {/* Driver Core Info */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-[28px] bg-white/5 border border-white/10 p-[1px] overflow-hidden">
                <div className="w-full h-full rounded-[27px] bg-[#0a0a0f] flex items-center justify-center">
                  <User size={36} className="text-white/20" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black border border-white/10 rounded-xl px-2.5 py-1 flex items-center gap-1.5 shadow-2xl">
                <span className="text-xs font-black text-white">4.9</span>
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-2xl font-display font-black text-white tracking-tight">Ramesh</h3>
                <BadgeCheck size={20} className="text-brand-cyan" />
              </div>
              <div className="text-sm font-bold text-white/40">
                White Swift Dzire • <span className="text-brand-cyan">1.2k RIDES</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-[9px] text-white/30 uppercase tracking-widest font-black mb-1.5">PLATE</div>
            <div className="px-4 py-2 bg-white/5 rounded-xl text-sm font-display font-black text-white tracking-widest border border-white/10">
              HR10 AB 1234
            </div>
          </div>
        </div>

        {/* Dynamic Status Grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {[
                { icon: MapPin, label: 'Current Location', value: '0.8 km away', color: 'brand-cyan' },
                { icon: Zap, label: 'Est. Pickup', value: '3 mins', color: 'brand-blue' },
                { icon: Navigation, label: 'Destination', value: 'North Gate', color: 'white' },
                { icon: Bell, label: 'Notifications', value: 'Driver is near', color: 'white' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5">
                    <item.icon size={14} className={item.color !== 'white' ? `text-${item.color}` : 'text-white/40'} />
                  </div>
                  <div>
                    <div className="text-[9px] text-white/20 font-black uppercase tracking-widest">{item.label}</div>
                    <div className="text-sm font-bold text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Contact Actions */}
        <div className="flex gap-4 mb-8">
          <button className="flex-1 bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/20 transition-all py-4.5 rounded-[22px] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest text-brand-cyan">
            <Phone size={18} /> Call Ramesh
          </button>
          <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 transition-all py-4.5 rounded-[22px] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest text-white/60">
            <MessageSquare size={18} /> Chat
          </button>
        </div>

        {/* Interactive Progress Bar */}
        <div className="px-2 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Live Progress</span>
            <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest">On Time</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '45%' }}
              className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            />
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="w-full text-center text-[10px] font-black text-white/10 hover:text-white/30 transition py-2 uppercase tracking-widest"
        >
          [ Simulate Arrival ]
        </button>
      </motion.div>
    </div>
  );
}
