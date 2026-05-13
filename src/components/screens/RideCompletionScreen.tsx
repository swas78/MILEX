"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, BadgeCheck, Download, Flag, ThumbsUp, ChevronDown, ChevronUp, Share2, Wallet, Zap, Sparkles } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

export function RideCompletionScreen({ onComplete }: { onComplete: () => void }) {
  const [rating, setRating] = useState(0);
  const [tip, setTip] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showFare, setShowFare] = useState(false);

  const fareItems = [
    { label: 'Base Fare', amount: '₹30', icon: Zap },
    { label: 'Distance (4.2 km)', amount: '₹42', icon: Star },
    { label: 'Platform Fee', amount: '₹5', icon: Shield },
    { label: 'GST (5%)', amount: '₹3.85', icon: HelpCircle },
    { label: 'Student Discount', amount: '–₹8', icon: Tag, highlight: true },
  ];

  function Shield({ size, className }: { size?: number, className?: string }) {
    return <BadgeCheck size={size} className={className} />
  }
  function Tag({ size, className }: { size?: number, className?: string }) {
    return <Sparkles size={size} className={className} />
  }
  function HelpCircle({ size, className }: { size?: number, className?: string }) {
    return <Sparkles size={size} className={className} />
  }

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(onComplete, 2200);
  };

  if (submitted) return (
    <div className="absolute inset-0 bg-[#07070a] flex flex-col items-center justify-center px-10 text-center overflow-hidden">
      {/* Background celebration glow */}
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-80 h-80 bg-brand-cyan/20 blur-[100px] rounded-full"
      />
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="w-32 h-32 rounded-[40px] bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mb-8 relative z-10 shadow-[0_0_50px_rgba(34,197,94,0.2)]"
      >
        <ThumbsUp size={48} className="text-green-400" />
        <motion.div 
          animate={{ scale: [1, 2], opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 rounded-[40px] border border-green-400/50"
        />
      </motion.div>
      
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-display font-black text-white mb-3"
      >
        Ride Complete!
      </motion.h2>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/40 text-sm leading-relaxed"
      >
        Thank you for riding with MileX. Your feedback has been shared with the community.
      </motion.p>
    </div>
  );

  return (
    <div className="absolute inset-0 bg-[#07070a] flex flex-col overflow-y-auto no-scrollbar pb-10">
      {/* Premium Header */}
      <div className="relative h-64 shrink-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/10 to-transparent pointer-events-none" />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="w-20 h-20 rounded-[30px] bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
        >
          <BadgeCheck size={36} className="text-green-400" />
        </motion.div>
        <motion.h1 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-display font-black text-white mb-1"
        >
          You Arrived!
        </motion.h1>
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10"
        >
          <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Campus North Gate</span>
        </motion.div>
      </div>

      <div className="px-6 space-y-4 -mt-4 relative z-10">
        {/* Fare Summary Premium Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Final Amount</div>
              <div className="text-4xl font-display font-black text-white tracking-tight">₹72.85</div>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-cyan border border-white/5 hover:bg-white/10 transition">
              <Download size={20} />
            </button>
          </div>

          <div className="space-y-3 mb-6">
            <button 
              onClick={() => setShowFare(!showFare)}
              className="w-full flex items-center justify-between text-xs font-bold text-white/40 hover:text-white transition group"
            >
              <span>View Breakdown</span>
              {showFare ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence>
              {showFare && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 pt-2 border-t border-white/5"
                >
                  {fareItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs py-1">
                      <span className="text-white/40 font-medium">{item.label}</span>
                      <span className={`font-bold ${item.highlight ? 'text-green-400' : 'text-white/70'}`}>{item.amount}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
              <Wallet size={18} className="text-brand-cyan" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-0.5">Payment Method</div>
              <div className="text-xs font-bold text-white">Digital Wallet • UPI</div>
            </div>
          </div>
        </motion.div>

        {/* Rating Section Premium */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 text-center"
        >
          <div className="text-xs font-black text-white/30 uppercase tracking-widest mb-4">Rate Ramesh Kumar</div>
          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.button 
                key={s} 
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(s)}
                className="relative"
              >
                <Star 
                  size={36} 
                  className={`transition-all duration-300 ${s <= rating ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'text-white/10'}`} 
                />
                {s <= rating && (
                  <motion.div 
                    layoutId="starGlow"
                    className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full -z-10"
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          <AnimatePresence>
            {rating > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap justify-center gap-2">
                  {['Punctual', 'Polite', 'Clean Vehicle', 'Safe Driving'].map(tag => (
                    <button key={tag} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white/50 hover:bg-white/10 hover:text-white transition-all">
                      {tag}
                    </button>
                  ))}
                </div>
                <textarea 
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Add a comment (optional)..."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-[24px] p-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-cyan/50 resize-none"
                  rows={3}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tip Section Premium */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6"
        >
          <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4 text-center">Add a Tip for Ramesh</div>
          <div className="flex gap-3">
            {[10, 20, 30].map((t) => (
              <button 
                key={t} 
                onClick={() => setTip(tip === t ? null : t)}
                className={`flex-1 py-4 rounded-[20px] text-sm font-black transition-all border ${tip === t ? 'bg-brand-cyan/20 border-brand-cyan/50 text-brand-cyan shadow-lg' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/8 hover:text-white/60'}`}
              >
                ₹{t}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-4 pb-10 space-y-4"
        >
          <NeonButton 
            variant="primary" 
            fullWidth 
            onClick={handleSubmit}
            className="py-5 rounded-[24px] font-black text-lg tracking-widest shadow-[0_20px_40px_rgba(6,182,212,0.2)] active:scale-95 transition-all"
          >
            Submit Feedback
          </NeonButton>
          
          <div className="flex gap-3">
            <button className="flex-1 py-3.5 rounded-[20px] bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white/60 transition flex items-center justify-center gap-2">
              <Share2 size={14} /> Share Ride
            </button>
            <button className="flex-1 py-3.5 rounded-[20px] bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-red-400/40 hover:text-red-400/80 transition flex items-center justify-center gap-2">
              <Flag size={14} /> Report Issue
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
