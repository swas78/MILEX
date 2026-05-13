"use client";
import React, { useState } from 'react';
import { ArrowLeft, Copy, Share2, Users, Tag, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const promos = [
  { code: 'MILEX10', title: '10% off any ride', desc: 'Valid on all rides above ₹50', expires: 'May 20, 2026', color: 'brand-cyan' },
  { code: 'CAMPUS20', title: '₹20 off campus rides', desc: 'Only for Campus Zone rides', expires: 'May 25, 2026', color: 'brand-blue' },
  { code: 'WEEKEND30', title: '30% off weekends', desc: 'Sat & Sun rides only', expires: 'May 31, 2026', color: 'brand-purple' },
];

const referralCode = 'SWAS2026';

export function PromoReferralScreen({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-brand-purple/20 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-display font-bold text-white">Promos & Referrals</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 flex flex-col gap-5 relative z-10">
        {/* Referral Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-brand-purple/30 to-brand-blue/20 border border-brand-purple/30 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-purple/20 blur-[60px] rounded-full" />
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className="text-brand-purple" />
            <div className="text-xs text-brand-purple font-bold uppercase tracking-wider">Refer & Earn</div>
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-1">Get ₹50 per referral</h2>
          <p className="text-sm text-white/50 mb-4">Your friend gets ₹30 off their first ride too!</p>

          <div className="bg-black/30 border border-white/10 rounded-2xl p-3 flex items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-xs text-white/40 mb-0.5">Your Referral Code</div>
              <div className="text-2xl font-display font-bold text-white tracking-widest">{referralCode}</div>
            </div>
            <button onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}>
              {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-sm font-bold text-white transition">
            <Share2 size={16} /> Share with Friends
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Referrals', value: '3' },
            { label: 'Earned', value: '₹150' },
            { label: 'Pending', value: '₹50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <div className="text-xl font-display font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Active Promos */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag size={14} className="text-brand-cyan" />
            <h3 className="text-sm font-bold text-white">Active Promo Codes</h3>
          </div>
          <div className="flex flex-col gap-3">
            {promos.map((promo, i) => (
              <motion.div key={promo.code}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className={`bg-white/5 border border-${promo.color}/20 rounded-2xl p-4 flex items-center gap-4`}>
                <div className={`w-12 h-12 rounded-2xl bg-${promo.color}/10 border border-${promo.color}/20 flex items-center justify-center shrink-0`}>
                  <Tag size={18} className={`text-${promo.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold text-${promo.color}`}>{promo.code}</div>
                  <div className="text-xs font-medium text-white truncate">{promo.title}</div>
                  <div className="text-xs text-white/40">{promo.desc}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-white/30">Expires</div>
                  <div className="text-xs text-white/50 font-medium">{promo.expires.split(',')[0]}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
