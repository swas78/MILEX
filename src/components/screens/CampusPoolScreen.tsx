"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, GraduationCap, MapPin, Plus, UserCheck, Wallet, Share2, ChevronRight, BadgeCheck, Star } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

type Tab = 'pool' | 'batchmates';

const nearbyBatchmates = [
  { id: 1, name: 'Priya S.', dept: 'CSE, 3rd Year', distance: '0.3 km', route: 'Hostel → North Gate', avatar: 'PS', rating: 4.8, verified: true },
  { id: 2, name: 'Ananya R.', dept: 'ECE, 2nd Year', distance: '0.5 km', route: 'Library → Metro', avatar: 'AR', rating: 4.9, verified: true },
  { id: 3, name: 'Rohit M.', dept: 'MBA, 1st Year', distance: '0.8 km', route: 'Hostel → South Gate', avatar: 'RM', rating: 4.7, verified: true },
];

const activePool = [
  { id: 1, from: 'Hostel Block C', to: 'North Gate', seats: 3, filled: 1, time: 'Leaving in 5 min', fare: '₹15', driver: 'Sunita K.' },
  { id: 2, from: 'Library', to: 'Metro Station', seats: 4, filled: 2, time: 'Leaving in 12 min', fare: '₹18', driver: 'Ramesh V.' },
];

export function CampusPoolScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [tab, setTab] = useState<Tab>('pool');
  const [joining, setJoining] = useState<number | null>(null);
  const [joined, setJoined] = useState<number | null>(null);
  const [inviting, setInviting] = useState<number | null>(null);

  const handleJoin = (id: number) => {
    setJoining(id);
    setTimeout(() => { setJoining(null); setJoined(id); }, 1500);
  };

  return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-brand-blue/15 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-14 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div>
            <h1 className="text-lg font-display font-bold text-white">Campus Ride Pool</h1>
            <p className="text-xs text-white/40">Save money · Travel safer · Together</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/5 border border-white/8 rounded-xl p-1">
          {[
            { id: 'pool' as Tab, label: '🚖 Active Pools', },
            { id: 'batchmates' as Tab, label: '🎓 Batchmates', },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === t.id ? 'bg-brand-blue text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'text-white/40 hover:text-white/60'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 flex flex-col gap-3 relative z-10">
        <AnimatePresence mode="wait">
          {/* ── ACTIVE POOLS TAB ── */}
          {tab === 'pool' && (
            <motion.div key="pool" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Active Pools', val: '2' },
                  { label: 'Avg Saving', val: '62%' },
                  { label: 'Students', val: '14' },
                ].map(s => (
                  <div key={s.label} className="bg-white/5 border border-white/8 rounded-2xl p-3 text-center">
                    <div className="text-xl font-display font-bold text-brand-cyan">{s.val}</div>
                    <div className="text-[9px] text-white/40 mt-0.5 font-medium uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>

              {activePool.map((pool) => (
                <div key={pool.id} className={`bg-white/5 border rounded-2xl p-4 transition-all ${joined === pool.id ? 'border-green-500/40 bg-green-500/5' : 'border-white/8'}`}>
                  {/* Route */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="w-2 h-2 rounded-full bg-brand-blue" />
                      <div className="w-0.5 h-5 bg-white/10" />
                      <div className="w-2 h-2 rounded-sm bg-brand-cyan" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white">{pool.from}</div>
                      <div className="text-xs font-bold text-brand-cyan mt-2">{pool.to}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-display font-bold text-white">{pool.fare}</div>
                      <div className="text-[9px] text-green-400 font-bold">per person</div>
                    </div>
                  </div>

                  {/* Details row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <UserCheck size={12} className="text-brand-cyan" />
                      {pool.driver}
                    </div>
                    <div className="w-px h-3 bg-white/10" />
                    <div className="text-xs text-brand-purple font-medium">{pool.time}</div>
                  </div>

                  {/* Seats */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: pool.seats }).map((_, i) => (
                        <div key={i} className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${i < pool.filled ? 'bg-brand-blue/20 border-brand-blue/50 text-brand-blue' : 'bg-white/5 border-dashed border-white/20 text-white/20'}`}>
                          {i < pool.filled ? '●' : '+'}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-white/40">{pool.seats - pool.filled} seat{pool.seats - pool.filled !== 1 ? 's' : ''} left</span>
                  </div>

                  {joined === pool.id ? (
                    <div className="flex items-center justify-center gap-2 py-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <BadgeCheck size={16} className="text-green-400" />
                      <span className="text-sm font-bold text-green-400">Joined! Fare split confirmed.</span>
                    </div>
                  ) : (
                    <button onClick={() => handleJoin(pool.id)} disabled={joining === pool.id}
                      className="w-full py-3 bg-gradient-to-r from-brand-blue to-brand-cyan rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all disabled:opacity-70">
                      {joining === pool.id ? (
                        <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Joining...</>
                      ) : (
                        <><Plus size={14} /> Join Pool · Pay {pool.fare}</>
                      )}
                    </button>
                  )}
                </div>
              ))}

              {/* Create your own */}
              <button onClick={onComplete}
                className="w-full py-3.5 border border-dashed border-brand-cyan/30 rounded-2xl text-sm font-bold text-brand-cyan/70 hover:border-brand-cyan/60 hover:text-brand-cyan hover:bg-brand-cyan/5 transition flex items-center justify-center gap-2">
                <Plus size={14} /> Create New Pool Ride
              </button>
            </motion.div>
          )}

          {/* ── BATCHMATES TAB ── */}
          {tab === 'batchmates' && (
            <motion.div key="batchmates" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/15 rounded-xl px-4 py-3">
                <GraduationCap size={14} className="text-brand-blue shrink-0" />
                <p className="text-xs text-white/50 leading-relaxed">Students from your campus heading the same way. Verify identity via college ID before pooling.</p>
              </div>

              {nearbyBatchmates.map((b, i) => (
                <motion.div key={b.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-white/5 border border-white/8 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center font-bold text-white shrink-0">
                      {b.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{b.name}</span>
                        {b.verified && <BadgeCheck size={13} className="text-brand-cyan" />}
                      </div>
                      <div className="text-xs text-white/40">{b.dept}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[10px] text-yellow-400">{b.rating}</span>
                        <span className="text-[10px] text-white/20 mx-1">·</span>
                        <MapPin size={9} className="text-white/30" />
                        <span className="text-[10px] text-white/30">{b.distance}</span>
                      </div>
                    </div>
                    <button onClick={() => setInviting(inviting === b.id ? null : b.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${inviting === b.id ? 'bg-brand-cyan/20 border-brand-cyan/50 text-brand-cyan' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
                      {inviting === b.id ? 'Invited ✓' : 'Invite'}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/30">
                    <MapPin size={10} className="text-brand-blue" />
                    <span>{b.route}</span>
                  </div>
                </motion.div>
              ))}

              <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={14} className="text-green-400" />
                  <span className="text-sm font-bold text-white">Auto Fare Split</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/50">Full Ride Fare</span>
                  <span className="text-white">₹80</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/50">Passengers</span>
                  <span className="text-white">3 students</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">Each pays</span>
                  <span className="text-xl font-display font-bold text-green-400">₹26.67</span>
                </div>
                <div className="text-xs text-green-400/70 text-right mt-1">Split via UPI instantly</div>
              </div>

              <NeonButton variant="primary" fullWidth onClick={onComplete}>
                <Share2 size={14} /> Start Shared Ride with Batchmates
              </NeonButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
