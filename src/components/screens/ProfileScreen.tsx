"use client";
import React, { useState } from 'react';
import { ArrowLeft, User, CreditCard, Phone, Shield, ChevronRight, Plus, Edit3, Star } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

export function ProfileScreen({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (screen: string) => void }) {
  const [name, setName] = useState('Swastik Mishra');
  const [email, setEmail] = useState('swastik@university.edu');
  const [editing, setEditing] = useState(false);

  const savedPayments = [
    { id: 1, label: 'Google Pay', last: '9878', type: 'UPI' },
    { id: 2, label: 'HDFC Debit', last: '4521', type: 'Card' },
  ];

  const emergencyContacts = [
    { name: 'Priya Mishra', relation: 'Sister', phone: '+91 98765 43210' },
    { name: 'Rajesh Mishra', relation: 'Father', phone: '+91 87654 32109' },
  ];

  return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col overflow-hidden">
      <div className="absolute top-0 right-0 w-60 h-60 bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-display font-bold text-white flex-1">My Profile</h1>
        <button onClick={() => setEditing(!editing)} className="flex items-center gap-1.5 text-sm text-brand-cyan font-medium">
          <Edit3 size={14} /> {editing ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 flex flex-col gap-5 relative z-10">
        {/* Avatar + Info */}
        <div className="flex flex-col items-center text-center py-4">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-3xl font-display font-bold text-white shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              SM
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center border-2 border-brand-dark">
              <Star size={14} className="text-black fill-black" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-cyan font-bold mb-3">
            <Star size={12} className="fill-brand-cyan" /> 4.8 Rider Rating · 47 rides
          </div>

          {editing ? (
            <div className="w-full flex flex-col gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan/50 text-center font-bold text-lg" />
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan/50 text-center text-sm" />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-display font-bold text-white">{name}</h2>
              <p className="text-white/50 text-sm mt-0.5">{email}</p>
              <p className="text-white/30 text-xs mt-0.5">+91 98765 00000</p>
            </>
          )}
        </div>

        {/* Saved Payments */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={14} className="text-brand-cyan" />
            <h3 className="text-sm font-bold text-white">Saved Payment Methods</h3>
          </div>
          <div className="flex flex-col gap-2">
            {savedPayments.map((p) => (
              <div key={p.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">💳</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{p.label}</div>
                  <div className="text-xs text-white/40">{p.type} · ···{p.last}</div>
                </div>
                <ChevronRight size={14} className="text-white/20" />
              </div>
            ))}
            <button className="flex items-center justify-center gap-2 py-2.5 border border-dashed border-white/20 rounded-xl text-xs text-white/40 hover:border-brand-cyan/30 hover:text-brand-cyan transition">
              <Plus size={12} /> Add Payment Method
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={14} className="text-pink-400" />
            <h3 className="text-sm font-bold text-white">Emergency Contacts</h3>
          </div>
          <div className="flex flex-col gap-2">
            {emergencyContacts.map((c, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center">
                  <User size={16} className="text-pink-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{c.name}</div>
                  <div className="text-xs text-white/40">{c.relation} · {c.phone}</div>
                </div>
                <button><Phone size={14} className="text-brand-cyan" /></button>
              </div>
            ))}
            <button className="flex items-center justify-center gap-2 py-2.5 border border-dashed border-white/20 rounded-xl text-xs text-white/40 hover:border-pink-500/30 hover:text-pink-400 transition">
              <Plus size={12} /> Add Contact
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5">
          {[
            { label: 'Notifications', icon: '🔔', screen: 'notifications' },
            { label: 'App Settings', icon: '⚙️', screen: 'settings' },
            { label: 'Help & Support', icon: '💬', screen: 'help' },
            { label: 'Promo & Referral', icon: '🎁', screen: 'promo' },
          ].map((item) => (
            <button key={item.label} onClick={() => onNavigate?.(item.screen)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition text-left">
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-sm font-medium text-white">{item.label}</span>
              <ChevronRight size={14} className="text-white/20" />
            </button>
          ))}
        </div>

        <button className="text-center text-sm text-red-400/70 hover:text-red-400 transition font-medium pb-2">
          Sign Out
        </button>
      </div>
    </div>
  );
}
