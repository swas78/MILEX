"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: '⚡', desc: 'Pay with any UPI app' },
  { id: 'wallet', label: 'MileX Wallet', icon: '👜', desc: 'Balance: ₹245.00' },
  { id: 'card', label: 'Debit/Credit Card', icon: '💳', desc: 'Visa, Mastercard & more' },
  { id: 'cash', label: 'Cash', icon: '💵', desc: 'Pay driver directly' },
];

export function PaymentScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [selected, setSelected] = useState('upi');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'MILEX10') setCouponApplied(true);
  };

  const handlePay = () => {
    setPaid(true);
    setTimeout(onComplete, 1800);
  };

  if (paid) return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center px-6">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
        className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center mb-6">
        <CheckCircle size={44} className="text-green-400" />
      </motion.div>
      <h2 className="text-2xl font-display font-bold text-white mb-2">Payment Successful!</h2>
      <p className="text-white/50">₹{couponApplied ? '65.57' : '72.85'} paid via {paymentMethods.find(p => p.id === selected)?.label}</p>
    </div>
  );

  return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col overflow-y-auto no-scrollbar">
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-display font-bold text-white">Payment</h1>
      </div>

      <div className="flex-1 px-6 pb-10 relative z-10 flex flex-col gap-4">
        {/* Fare summary toggle */}
        <button onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full flex items-center justify-between bg-brand-blue/10 border border-brand-blue/20 rounded-2xl p-4">
          <div className="text-left">
            <div className="text-xs text-white/40 uppercase tracking-wider font-bold mb-0.5">Total Fare</div>
            <div className="text-2xl font-display font-bold text-white">{couponApplied ? '₹65.57' : '₹72.85'}</div>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            Breakdown {showBreakdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {showBreakdown && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 -mt-2 flex flex-col gap-2">
            {[
              { label: 'Base Fare', amount: '₹30' },
              { label: 'Distance (4.2 km)', amount: '₹42' },
              { label: 'Platform Fee', amount: '₹5' },
              { label: 'GST (5%)', amount: '₹3.85' },
              ...(couponApplied ? [{ label: 'Coupon (MILEX10)', amount: '–₹7.28' }] : []),
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className={item.amount.startsWith('–') ? 'text-green-400' : 'text-white/60'}>{item.label}</span>
                <span className={item.amount.startsWith('–') ? 'text-green-400' : 'text-white/80'}>{item.amount}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Coupon */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={14} className="text-brand-cyan" />
            <span className="text-sm font-bold text-white">Apply Coupon</span>
          </div>
          {couponApplied ? (
            <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
              <div>
                <div className="text-sm font-bold text-green-400">MILEX10 Applied!</div>
                <div className="text-xs text-white/50">10% off — ₹7.28 saved</div>
              </div>
              <button onClick={() => setCouponApplied(false)} className="text-xs text-white/30 hover:text-white/60">Remove</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter code (try MILEX10)"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-cyan/50" />
              <button onClick={handleApplyCoupon}
                className="px-4 py-2.5 bg-brand-cyan/20 border border-brand-cyan/30 rounded-xl text-sm font-bold text-brand-cyan hover:bg-brand-cyan/30 transition">
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-white mb-3">Payment Method</h3>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((method) => (
              <button key={method.id} onClick={() => setSelected(method.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${selected === method.id ? 'bg-brand-blue/10 border-brand-blue/40' : 'bg-white/0 border-white/5 hover:bg-white/5'}`}>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0">{method.icon}</div>
                <div className="flex-1 text-left">
                  <div className={`text-sm font-bold ${selected === method.id ? 'text-white' : 'text-white/70'}`}>{method.label}</div>
                  <div className="text-xs text-white/40">{method.desc}</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected === method.id ? 'border-brand-cyan bg-brand-cyan' : 'border-white/20'}`}>
                  {selected === method.id && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <NeonButton variant="primary" fullWidth onClick={handlePay} className="mt-2">
          Pay {couponApplied ? '₹65.57' : '₹72.85'} →
        </NeonButton>
      </div>
    </div>
  );
}
