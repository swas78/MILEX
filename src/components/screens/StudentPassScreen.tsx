"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Ticket, Leaf, Zap, CheckCircle2, QrCode, Sparkles, ShieldCheck, Globe, Star, ArrowUpRight } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

export function StudentPassScreen({ onBack }: { onBack: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
  };

  return (
    <div className="absolute inset-0 bg-[#07070a] flex flex-col overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-60 h-60 bg-brand-cyan/5 blur-[80px] rounded-full pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-20 px-6 pt-14 pb-4 flex items-center gap-5">
        <button onClick={onBack} className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition shadow-2xl">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-black text-white">Student Pass</h1>
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Infinite Campus Mobility</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto no-scrollbar px-6 pb-12 relative z-10"
      >
        {/* Holographic Active Pass Card */}
        <motion.div 
          variants={itemVariants}
          className="relative mt-4 mb-10 group"
        >
          {/* Card Container with Perspective */}
          <motion.div
            whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
            className="relative p-7 rounded-[36px] overflow-hidden border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer bg-gradient-to-br from-brand-blue via-brand-purple to-brand-blue bg-[length:200%_200%]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Animated Gradient Background */}
            <motion.div 
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0 opacity-80"
            />
            
            {/* Holographic Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            
            {/* Grain Texture */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />

            <div className="relative z-10 flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full w-fit mb-4">
                  <Sparkles size={10} className="text-white animate-pulse" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">Active Sub</span>
                </div>
                <h3 className="text-4xl font-display font-black text-white tracking-tight">Campus Elite</h3>
                <p className="text-white/60 text-xs font-bold mt-1">Tier 3 • Gold Member</p>
              </div>
              <div className="w-14 h-14 bg-black/30 backdrop-blur-xl rounded-[20px] flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                <QrCode size={28} className="text-white" />
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-end">
              <div>
                <div className="flex items-end gap-1">
                  <span className="text-6xl font-display font-black text-white tracking-tighter">14</span>
                  <span className="text-white/60 text-sm font-bold pb-2">/ 30</span>
                </div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Rides Remaining</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-white/40 uppercase tracking-widest font-black mb-1">Valid Until</div>
                <div className="text-sm font-black text-white">28 MAY '26</div>
              </div>
            </div>
            
            {/* Magnetic Stripe visual */}
            <div className="absolute bottom-20 left-0 right-0 h-4 bg-black/10 backdrop-blur-sm" />
          </motion.div>
          
          {/* Shadow behind card */}
          <div className="absolute -bottom-4 left-6 right-6 h-8 bg-brand-blue/30 blur-2xl -z-10 rounded-full" />
        </motion.div>

        {/* Benefits Grid */}
        <motion.div variants={itemVariants} className="space-y-4 mb-8">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Membership Perks</span>
            <button className="text-[10px] font-bold text-brand-cyan uppercase">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Zap, label: 'Zero Surge', sub: 'Fixed fares 24/7', color: 'brand-cyan' },
              { icon: ShieldCheck, label: 'Priority SOS', sub: 'Elite security response', color: 'brand-blue' },
              { icon: CheckCircle2, label: 'Fast Pass', sub: '3 min matching max', color: 'brand-purple' },
              { icon: Globe, label: 'Campus Wide', sub: 'All university gates', color: 'brand-cyan' },
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/[0.03] border border-white/10 rounded-[28px] p-5 flex flex-col gap-4 group hover:bg-white/[0.06] transition-all"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-${benefit.color}/10 text-${benefit.color} border border-${benefit.color}/20 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.2)]`}>
                  <benefit.icon size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{benefit.label}</div>
                  <div className="text-[10px] text-white/40 font-medium leading-tight">{benefit.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Tracker */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-brand-green/20 to-transparent border border-brand-green/20 rounded-[32px] p-7 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-green/10 blur-[60px] rounded-full" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -right-10 -bottom-10 opacity-[0.03]"
          >
            <Globe size={240} className="text-brand-green" />
          </motion.div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green/20 flex items-center justify-center text-brand-green border border-brand-green/30">
                <Leaf size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">Impact Score</h4>
                <p className="text-[10px] text-brand-green font-bold">Climate Hero Status</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-display font-black text-brand-green glow-green">2.4k</div>
              <div className="text-[9px] text-white/30 font-black uppercase tracking-widest">Points</div>
            </div>
          </div>

          <div className="relative z-10 mb-6">
            <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">
              <span>Monthly CO₂ Offset</span>
              <span className="text-brand-green">12.4 kg</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                className="h-full bg-gradient-to-r from-brand-green to-emerald-400 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              />
            </div>
          </div>

          <button className="w-full py-4 bg-brand-green text-black font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-green/80 transition-all active:scale-95 shadow-[0_15px_30px_rgba(34,197,94,0.3)] relative z-10">
            Redeem Rewards <ArrowUpRight size={14} />
          </button>
        </motion.div>
      </motion.div>
      
      {/* Footer CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#07070a] via-[#07070a]/90 to-transparent pt-12 z-20">
        <NeonButton variant="primary" fullWidth className="py-4.5 rounded-[22px] font-black text-base tracking-widest shadow-[0_20px_40px_rgba(6,182,212,0.2)]">
          Manage Subscription
        </NeonButton>
      </div>
    </div>
  );
}
