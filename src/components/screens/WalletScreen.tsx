"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Tag, RefreshCw, ArrowDownLeft, Wallet, ShieldCheck, ChevronRight, Zap, ArrowUpRight, History } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

const transactions = [
  { id: 1, label: 'Ride to North Gate', amount: -72.85, date: 'Today, 2:30 PM', type: 'debit', icon: Zap },
  { id: 2, label: 'Cashback — 5%', amount: 3.64, date: 'Today, 2:30 PM', type: 'credit', icon: Tag },
  { id: 3, label: 'Added via UPI', amount: 200, date: 'Yesterday, 10:15 AM', type: 'credit', icon: ArrowDownLeft },
  { id: 4, label: 'Ride to Metro', amount: -45, date: 'May 9, 8:00 AM', type: 'debit', icon: Zap },
  { id: 5, label: 'Referral Bonus', amount: 50, date: 'May 8, 4:20 PM', type: 'credit', icon: Tag },
];

const addAmounts = [100, 200, 500, 1000];

export function WalletScreen({ onBack }: { onBack: () => void }) {
  const [balance] = useState(245.00);
  const [addAmt, setAddAmt] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="absolute inset-0 bg-[#07070a] flex flex-col overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-cyan/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-5">
        <button onClick={onBack} className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition shadow-2xl">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-black text-white">MileX Wallet</h1>
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Fast & Secure Payments</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 relative z-10 flex flex-col gap-6"
      >
        {/* Balance Card - Next Gen Glass Look */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="relative bg-gradient-to-br from-brand-blue via-brand-cyan/40 to-brand-blue/20 border border-white/20 rounded-[36px] p-8 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/20 blur-2xl rounded-full" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                <Wallet size={24} className="text-white" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/10">
                <ShieldCheck size={12} className="text-brand-cyan" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">SafeVault™</span>
              </div>
            </div>
            
            <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-black mb-2">Available Balance</div>
            <div className="text-5xl font-display font-black text-white mb-2 tracking-tight">₹{balance.toFixed(2)}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-lg border border-green-400/20">
                +₹3.64 today
              </span>
              <span className="text-[10px] text-white/30 font-medium">Auto-renew active</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          <button className="bg-white/[0.03] border border-white/10 rounded-[28px] p-5 flex flex-col gap-3 group hover:bg-white/[0.06] transition-all">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan border border-brand-cyan/20 group-hover:scale-110 transition-transform">
              <ArrowUpRight size={20} />
            </div>
            <div className="text-sm font-bold text-white">Withdraw</div>
          </button>
          <button className="bg-white/[0.03] border border-white/10 rounded-[28px] p-5 flex flex-col gap-3 group hover:bg-white/[0.06] transition-all">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple border border-brand-purple/20 group-hover:scale-110 transition-transform">
              <RefreshCw size={18} />
            </div>
            <div className="text-sm font-bold text-white">Autopay</div>
          </button>
        </motion.div>

        {/* Add Money Section */}
        <motion.div variants={itemVariants} className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6">
          <div className="flex items-center justify-between mb-5 px-1">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Add Funds</span>
            <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest">Instant UPI</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-6">
            {addAmounts.map((amt) => (
              <button 
                key={amt} 
                onClick={() => setAddAmt(addAmt === amt ? null : amt)}
                className={`py-3 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all border ${addAmt === amt ? 'bg-brand-cyan/20 border-brand-cyan/40 text-white' : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10'}`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          
          <NeonButton 
            variant="primary" 
            fullWidth 
            className="py-4.5 rounded-[22px] font-black text-sm tracking-widest shadow-[0_15px_30px_rgba(6,182,212,0.2)]"
          >
            <Plus size={18} className="mr-2" /> Top Up Wallet
          </NeonButton>
        </motion.div>

        {/* Coupons & Rewards Card */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-brand-purple/10 to-transparent border border-brand-purple/20 rounded-[32px] p-6 flex items-center justify-between group cursor-pointer hover:bg-brand-purple/15 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-purple border border-brand-purple/30 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.1)]">
              <Tag size={22} />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">2 Promo Codes</h4>
              <p className="text-[10px] text-white/30 font-medium">Available for next ride</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20">
            <ChevronRight size={18} />
          </div>
        </motion.div>

        {/* Recent Transactions List */}
        <motion.div variants={itemVariants} className="space-y-4 mb-10">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <History size={14} className="text-white/30" />
              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Transaction History</span>
            </div>
            <button className="text-[10px] font-bold text-white/20 uppercase">View PDF</button>
          </div>
          
          <div className="space-y-2">
            {transactions.map((tx, idx) => (
              <div key={tx.id} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-[24px] p-4 group hover:bg-white/[0.04] transition-all">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${tx.type === 'credit' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-white/40 border-white/5'}`}>
                  <tx.icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white mb-0.5">{tx.label}</div>
                  <div className="text-[10px] text-white/30 font-medium">{tx.date}</div>
                </div>
                <div className={`text-base font-display font-black ${tx.type === 'credit' ? 'text-green-400' : 'text-white'}`}>
                  {tx.type === 'credit' ? '+' : '–'}₹{Math.abs(tx.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
