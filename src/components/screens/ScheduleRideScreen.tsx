"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, Navigation, MapPin } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

const times = ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '05:00 PM', '08:00 PM', '10:00 PM'];

export function ScheduleRideScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [selectedDate, setSelectedDate] = useState(0); 
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [recurring, setRecurring] = useState(false);
  const [recurDays, setRecurDays] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      full: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(onComplete, 2200);
  };

  if (confirmed) return (
    <div className="absolute inset-0 bg-[#07070a] flex flex-col items-center justify-center px-10 text-center overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-80 h-80 bg-brand-blue/20 blur-[100px] rounded-full"
      />
      <motion.div 
        initial={{ scale: 0, rotate: -20 }} 
        animate={{ scale: 1, rotate: 0 }} 
        transition={{ type: 'spring', bounce: 0.5 }}
        className="w-24 h-24 rounded-[36px] bg-brand-blue/15 border-2 border-brand-blue/30 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
      >
        <Calendar size={40} className="text-brand-blue" />
      </motion.div>
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-display font-black text-white mb-2"
      >
        Ride Scheduled!
      </motion.h2>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-white/40 text-sm mb-1"
      >
        {days[selectedDate].full} at {selectedTime}
      </motion.p>
      {recurring && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-3 py-1 bg-brand-cyan/10 rounded-full border border-brand-cyan/20 text-brand-cyan text-[10px] font-black uppercase mt-4 tracking-widest"
        >
          Recurring: {recurDays.join(', ')}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="absolute inset-0 bg-[#07070a] flex flex-col overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-5">
        <button onClick={onBack} className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition shadow-2xl">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-black text-white">Schedule Ride</h1>
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Plan your commute</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4 flex flex-col gap-6 relative z-10">
        {/* Date Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-brand-cyan" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Select Date</span>
            </div>
            <span className="text-[10px] font-bold text-brand-cyan">Next 7 Days</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1">
            {days.map((d, i) => (
              <motion.button 
                key={i} 
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedDate(i)}
                className={`relative flex flex-col items-center shrink-0 w-16 py-4 rounded-[24px] border transition-all duration-300 ${selectedDate === i ? 'bg-brand-cyan/15 border-brand-cyan/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'bg-white/[0.03] border-white/5 text-white/30 hover:bg-white/5'}`}
              >
                <span className="text-[9px] font-black uppercase mb-1">{d.day}</span>
                <span className={`text-xl font-display font-black ${selectedDate === i ? 'text-white' : 'text-white/40'}`}>{d.date}</span>
                {selectedDate === i && (
                  <motion.div layoutId="dateUnderline" className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand-cyan" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Clock size={14} className="text-brand-purple" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Select Time</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {times.map((t) => (
              <motion.button 
                key={t} 
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedTime(t)}
                className={`px-3 py-3.5 rounded-2xl text-[10px] font-black tracking-widest uppercase border transition-all duration-300 ${selectedTime === t ? 'bg-brand-purple/20 border-brand-purple/40 text-white shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 'bg-white/[0.02] border-white/5 text-white/30 hover:bg-white/5'}`}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Route Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-2xl rounded-full" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-cyan">
              <Navigation size={18} />
            </div>
            <div>
              <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Active Route</div>
              <div className="text-sm font-bold text-white">College Commute</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-brand-blue" />
              <span className="text-xs font-bold text-white/60">Hostel Block C</span>
            </div>
            <div className="ml-1 w-px h-6 bg-gradient-to-b from-brand-blue to-brand-cyan" />
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-sm bg-brand-cyan" />
              <span className="text-xs font-bold text-white">Campus North Gate</span>
            </div>
          </div>
        </div>

        {/* Recurring Options */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <RotateCcw size={18} />
              </div>
              <div>
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Auto Schedule</div>
                <div className="text-sm font-bold text-white">Recurring Ride</div>
              </div>
            </div>
            <button onClick={() => setRecurring(!recurring)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${recurring ? 'bg-brand-blue' : 'bg-white/10'}`}>
              <motion.div 
                layout
                className="absolute top-1 bottom-1 aspect-square rounded-full bg-white shadow-xl"
                style={{ left: recurring ? 'calc(100% - 24px)' : 4 }}
              />
            </button>
          </div>
          
          <AnimatePresence>
            {recurring && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-2"
              >
                <div className="flex gap-2 flex-wrap">
                  {weekDays.map((wd) => (
                    <button 
                      key={wd} 
                      onClick={() => setRecurDays(prev => prev.includes(wd) ? prev.filter(d => d !== wd) : [...prev, wd])}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${recurDays.includes(wd) ? 'bg-brand-blue/20 border-brand-blue/40 text-white' : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10'}`}
                    >
                      {wd}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action */}
        <div className="pt-4 pb-10">
          <NeonButton variant="primary" fullWidth onClick={handleConfirm} className="py-5 rounded-[24px] font-black text-lg tracking-widest shadow-[0_20px_40px_rgba(59,130,246,0.2)]">
            Schedule Ride
          </NeonButton>
          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
            <CheckCircle2 size={12} /> Priority Booking Guaranteed
          </div>
        </div>
      </div>
    </div>
  );
}
