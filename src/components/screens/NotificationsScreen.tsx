"use client";
import React, { useState } from 'react';
import { ArrowLeft, Bell, Tag, Car, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const notifications = [
  { id: 1, type: 'ride', icon: <Car size={16} />, title: 'Driver arriving in 2 min', body: 'Ramesh Kumar (HR10 AB 1234) is on his way.', time: '2 min ago', unread: true, color: 'brand-cyan' },
  { id: 2, type: 'ride', icon: <CheckCircle size={16} />, title: 'Ride Completed', body: 'Your ride to Campus North Gate is done. Fare: ₹72.85', time: '25 min ago', unread: true, color: 'green' },
  { id: 3, type: 'offer', icon: <Tag size={16} />, title: '🎉 Weekend Offer!', body: 'Get 20% off on all rides this Saturday. Use code WEEKEND20.', time: '1 hr ago', unread: false, color: 'brand-blue' },
  { id: 4, type: 'ride', icon: <Car size={16} />, title: 'Ride Started', body: 'Your ride to Metro Station has started.', time: '2 hrs ago', unread: false, color: 'brand-purple' },
  { id: 5, type: 'offer', icon: <Tag size={16} />, title: 'Cashback Credited', body: '₹3.64 cashback added to your MileX Wallet.', time: 'Yesterday', unread: false, color: 'green' },
  { id: 6, type: 'ride', icon: <CheckCircle size={16} />, title: 'Booking Confirmed', body: 'Your ride to Bhalgarh Chowk is confirmed.', time: 'May 9', unread: false, color: 'brand-cyan' },
];

export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState(notifications);

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
  const unreadCount = items.filter(n => n.unread).length;

  return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col overflow-hidden">
      <div className="absolute top-0 right-0 w-60 h-60 bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-display font-bold text-white flex-1">Notifications</h1>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-brand-cyan font-medium hover:text-white transition">
            Mark all read
          </button>
        )}
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <div className="px-6 py-3 relative z-10">
          <div className="flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full px-3 py-1.5 w-fit">
            <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-xs font-bold text-brand-cyan">{unreadCount} new notification{unreadCount > 1 ? 's' : ''}</span>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-3 flex flex-col gap-2 relative z-10">
        {items.map((n, i) => (
          <motion.button
            key={n.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setItems(prev => prev.map(item => item.id === n.id ? { ...item, unread: false } : item))}
            className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl transition-all border ${n.unread ? 'bg-white/8 border-white/10' : 'bg-white/3 border-white/5 opacity-70'}`}
          >
            <div className={`w-10 h-10 rounded-full bg-${n.color}/10 border border-${n.color}/20 flex items-center justify-center text-${n.color} shrink-0 mt-0.5`}>
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-bold text-white leading-tight">{n.title}</span>
                {n.unread && <div className="w-2 h-2 rounded-full bg-brand-cyan shrink-0 mt-1" />}
              </div>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{n.body}</p>
              <div className="text-xs text-white/30 mt-1.5 font-medium">{n.time}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
