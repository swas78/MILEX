"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Navigation, Battery, CarFront, Bike, ShieldAlert, ChevronDown, ChevronUp, Users, Zap, Star, Clock } from 'lucide-react';
import { MapView } from '@/components/ui/MapView';
import { NeonButton } from '@/components/ui/NeonButton';

export function VehicleSelectionScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('auto');
  const [womenOnly, setWomenOnly] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showFare, setShowFare] = useState(false);

  const defaultCategories = [
    { id: 'bike', name: 'Bike', icon: <Bike size={24} />, price: '₹30', time: '2 min', color: '#06b6d4', badge: 'Fastest', base: 15, perKm: 4, dist: 4.2, platform: 3, tax: 1.08 },
    { id: 'ebike', name: 'E-Bike', icon: <Battery size={24} />, price: '₹20', time: '1 min', color: '#22c55e', badge: 'Eco', base: 10, perKm: 3, dist: 4.2, platform: 2, tax: 0.78 },
    { id: 'auto', name: 'Auto', icon: <Navigation size={24} />, price: '₹40', time: '3 min', color: '#3b82f6', badge: 'Popular', base: 20, perKm: 5, dist: 4.2, platform: 4, tax: 1.4 },
    { id: 'mini', name: 'Mini', icon: <CarFront size={24} />, price: '₹80', time: '5 min', color: '#8b5cf6', base: 40, perKm: 8, dist: 4.2, platform: 5, tax: 2.66 },
    { id: 'shared', name: 'Shared', icon: <Users size={24} />, price: '₹15', time: '5 min', color: '#10b981', badge: '60% Off', base: 8, perKm: 2, dist: 4.2, platform: 2, tax: 0.58 },
  ];

  const womenCategories = [
    { id: 'pink-auto', name: 'Pink Auto', icon: <Navigation size={24} />, price: '₹45', time: '4 min', color: '#ec4899', badge: 'Female Driver', base: 22, perKm: 5.5, dist: 4.2, platform: 4, tax: 1.54 },
    { id: 'pink-cab', name: 'Women Cab', icon: <CarFront size={24} />, price: '₹90', time: '6 min', color: '#ec4899', badge: 'SOS Guard', base: 45, perKm: 9, dist: 4.2, platform: 6, tax: 2.88 },
  ];

  const categories = womenOnly ? womenCategories : defaultCategories;
  const selected = categories.find(c => c.id === selectedCategory) || categories[0];

  useEffect(() => {
    if (!categories.find(c => c.id === selectedCategory)) {
      setSelectedCategory(categories[0].id);
    }
  }, [womenOnly, categories, selectedCategory]);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => { onComplete(); }, 2200);
  };

  return (
    <div className="absolute inset-0 bg-[#07070a] flex flex-col overflow-hidden">
      {/* Map Background with Darker Overlay */}
      <div className="absolute inset-0 z-0 opacity-80 scale-110">
        <MapView markers={[{ lat: 28.9920, lng: 77.0120 }, { lat: 28.9950, lng: 77.0180 }]} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-0 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 px-5 pt-14 pb-4 flex items-center justify-between pointer-events-none mt-safe pt-safe">
        <button onClick={onBack} className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center pointer-events-auto hover:bg-black/70 transition shadow-2xl">
          <ArrowLeft size={22} className="text-white" />
        </button>
        <div className="px-4 py-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-2 pointer-events-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">Select Vehicle</span>
        </div>
        <div className="w-11 h-11" /> {/* Spacer */}
      </div>

      {/* Booking Overlay */}
      <AnimatePresence>
        {isConfirming && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#07070a]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center">
            
            {/* Pulsing Vehicle Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.1, 1], opacity: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="w-32 h-32 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative shadow-[0_0_60px_rgba(255,255,255,0.05)]"
            >
              <div className="absolute inset-0 bg-brand-cyan/20 blur-[40px] rounded-full" />
              <div className="relative z-10 text-white transform scale-150">
                {selected.icon}
              </div>
              {/* Radar rings */}
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  className="absolute inset-0 rounded-full border border-brand-cyan/30"
                />
              ))}
            </motion.div>

            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-display font-black text-white mb-2"
            >
              Confirming {selected.name}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-sm max-w-[240px] leading-relaxed"
            >
              Connecting to the nearest verified {selected.name} driver for you...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isConfirming && (
        <motion.div
          initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
          className="relative z-30 mt-auto bg-[#0a0a0f]/98 backdrop-blur-3xl border-t border-white/5 rounded-t-[40px] pt-4 pb-safe px-5 shadow-[0_-40px_80px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]"
        >
          {/* Handle */}
          <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6 shrink-0" />

          {/* Title & Mode Toggle */}
          <div className="flex items-center justify-between mb-6 shrink-0 px-1">
            <div>
              <h2 className="text-2xl font-display font-black text-white">Choose Ride</h2>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mt-0.5">Recommended for you</p>
            </div>
            <button
              onClick={() => setWomenOnly(!womenOnly)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all duration-300 ${womenOnly ? 'bg-pink-500/20 border-pink-500/40 text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.2)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/8 hover:text-white/60'}`}
            >
              <ShieldAlert size={14} className={womenOnly ? 'animate-pulse' : ''} />
              <span className="text-xs font-bold uppercase tracking-wider">Women Safety</span>
            </button>
          </div>

          {/* Vehicle List */}
          <div className="flex-1 overflow-y-auto no-scrollbar -mx-5 px-5 space-y-3 pb-6">
            <AnimatePresence mode="popLayout">
              {categories.map((cat, idx) => {
                const isSel = selectedCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative w-full rounded-3xl p-4 flex items-center justify-between transition-all duration-300 border group ${isSel ? 'bg-white/[0.07] border-white/20 shadow-2xl' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'}`}
                  >
                    {/* Selected Glow Effect */}
                    {isSel && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="absolute inset-0 rounded-3xl blur-2xl z-0"
                        style={{ background: `${cat.color}15` }}
                      />
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                      {/* Icon Container */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isSel ? 'scale-110 shadow-lg' : 'scale-100'}`}
                        style={{ background: isSel ? `${cat.color}20` : 'rgba(255,255,255,0.05)', color: isSel ? cat.color : 'rgba(255,255,255,0.3)' }}>
                        {cat.icon}
                      </div>
                      
                      <div className="text-left">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`font-bold text-lg tracking-tight ${isSel ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>{cat.name}</span>
                          {cat.badge && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest"
                              style={{ background: `${cat.color}20`, color: cat.color }}>
                              {cat.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <span className={`${isSel ? 'text-white/60' : 'text-white/20'}`}>{cat.time} away</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <div className="flex items-center gap-1 text-yellow-400/60">
                            <Star size={10} className="fill-yellow-400/40" />
                            <span className="text-[10px]">4.9</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right relative z-10 pr-1">
                      <div className={`text-xl font-display font-black ${isSel ? 'text-white' : 'text-white/40'}`}>{cat.price}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isSel ? 'text-brand-cyan' : 'text-white/20'}`}>Select</div>
                    </div>

                    {/* Left Selection Bar */}
                    {isSel && (
                      <motion.div 
                        layoutId="selectionBar"
                        className="absolute left-0 top-4 bottom-4 w-1 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Bottom Action Area */}
          <div className="pt-4 pb-2 bg-[#0a0a0f] relative z-40 shrink-0">
            {/* Fare Summary Mini */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Estimated Arrival</div>
                  <div className="text-sm font-bold text-white">{selected.time} <span className="text-white/30 font-normal">Matching...</span></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Total Price</div>
                <div className="text-lg font-display font-black text-white">{selected.price}</div>
              </div>
            </div>

            <NeonButton 
              variant="primary" 
              fullWidth 
              onClick={handleConfirm} 
              className="py-4.5 rounded-[22px] font-black text-lg tracking-wide shadow-[0_20px_40px_rgba(6,182,212,0.2)] active:scale-95 transition-all"
            >
              Confirm {selected.name} Ride
            </NeonButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}
