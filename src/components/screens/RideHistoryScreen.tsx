"use client";
import React, { useState } from 'react';
import { ArrowLeft, Navigation, RotateCcw, Star, Download, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const rides = [
  { id: 1, from: 'Hostel Block C', to: 'Campus North Gate', date: 'Today, 10:32 AM', fare: '₹72.85', type: 'Mini', rating: 5, distance: '4.2 km', duration: '18 min', driver: 'Ramesh K.' },
  { id: 2, from: 'Library', to: 'Metro Station', date: 'Yesterday, 6:15 PM', fare: '₹45.00', type: 'Auto', rating: 4, distance: '2.8 km', duration: '12 min', driver: 'Sunil M.' },
  { id: 3, from: 'Campus Gate', to: 'Bhalgarh Chowk', date: 'May 9, 2:00 PM', fare: '₹120.00', type: 'Sedan', rating: 5, distance: '7.1 km', duration: '28 min', driver: 'Ajay V.' },
  { id: 4, from: 'Hostel Block A', to: 'Mall Road', date: 'May 8, 11:00 AM', fare: '₹60.00', type: 'Bike', rating: 4, distance: '3.5 km', duration: '10 min', driver: 'Deepak S.' },
];

export function RideHistoryScreen({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-display font-bold text-white flex-1">Ride History</h1>
        <span className="text-xs text-white/40 font-medium">{rides.length} rides</span>
      </div>

      {/* Rides List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4 flex flex-col gap-3 relative z-10">
        {rides.map((ride) => (
          <div key={ride.id}>
            <button
              onClick={() => setExpanded(expanded === ride.id ? null : ride.id)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/8 transition text-left"
            >
              <div className="w-12 h-12 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center shrink-0">
                <Navigation size={20} className="text-brand-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">{ride.from} → {ride.to}</div>
                <div className="text-xs text-white/40 mt-0.5">{ride.date} · {ride.type}</div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} className={i < ride.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-white">{ride.fare}</div>
                <ChevronRight size={14} className={`text-white/30 mt-1 ml-auto transition-transform ${expanded === ride.id ? 'rotate-90' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expanded === ride.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white/3 border border-white/5 border-t-0 rounded-b-2xl -mt-2 px-4 pt-4 pb-4">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: 'Distance', value: ride.distance },
                        { label: 'Duration', value: ride.duration },
                        { label: 'Driver', value: ride.driver },
                      ].map((info) => (
                        <div key={info.label} className="bg-white/5 rounded-xl p-2.5 text-center">
                          <div className="text-xs text-white/40 mb-0.5">{info.label}</div>
                          <div className="text-xs font-bold text-white">{info.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-xs font-bold text-brand-blue hover:bg-brand-blue/20 transition">
                        <RotateCcw size={12} /> Rebook
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white/60 hover:bg-white/10 transition">
                        <Download size={12} /> Invoice
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
