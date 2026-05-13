"use client";
import React, { useState } from 'react';
import { ArrowLeft, Home, Briefcase, GraduationCap, Building2, Plus, Edit3, MapPin, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { NeonButton } from '@/components/ui/NeonButton';

const defaultLocations = [
  { id: 'home', label: 'Home', icon: Home, address: 'Hostel Block C, University Campus', color: 'brand-cyan', pinColor: 'cyan' },
  { id: 'work', label: 'Work / College', icon: GraduationCap, address: 'Main Academic Block, North Campus', color: 'brand-blue', pinColor: 'blue' },
  { id: 'hostel', label: 'Hostel', icon: Building2, address: 'Hostel A, South Wing, Gate 2', color: 'brand-purple', pinColor: 'purple' },
];

export function SavedLocationsScreen({ onBack }: { onBack: () => void }) {
  const [locations, setLocations] = useState(defaultLocations);
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newAddr, setNewAddr] = useState('');

  const handleAdd = () => {
    if (!newLabel || !newAddr) return;
    setLocations(prev => [...prev, {
      id: `custom-${Date.now()}`,
      label: newLabel,
      icon: MapPin,
      address: newAddr,
      color: 'brand-green',
      pinColor: 'green',
    }]);
    setNewLabel('');
    setNewAddr('');
    setAdding(false);
  };

  const handleDelete = (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col overflow-hidden">
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-cyan/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-display font-bold text-white flex-1">Saved Locations</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 flex flex-col gap-4 relative z-10">
        {locations.map((loc, i) => {
          const Icon = loc.icon;
          return (
            <motion.div key={loc.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`bg-white/5 border border-${loc.color}/20 rounded-2xl p-4 flex items-center gap-4`}>
              <div className={`w-12 h-12 rounded-2xl bg-${loc.color}/10 border border-${loc.color}/20 flex items-center justify-center shrink-0`}>
                <Icon size={20} className={`text-${loc.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white">{loc.label}</div>
                <div className="text-xs text-white/40 mt-0.5 truncate">{loc.address}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                  <Edit3 size={13} className="text-white/40" />
                </button>
                {!['home', 'work'].includes(loc.id) && (
                  <button onClick={() => handleDelete(loc.id)}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 transition">
                    <Trash2 size={13} className="text-white/40 hover:text-red-400" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Add New */}
        {adding ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white">New Saved Place</h3>
            <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Label (e.g. Gym, Mall...)"
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-cyan/50" />
            <input value={newAddr} onChange={(e) => setNewAddr(e.target.value)} placeholder="Address or place name"
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-cyan/50" />
            <div className="flex gap-2">
              <button onClick={() => setAdding(false)}
                className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-white/50 hover:bg-white/5 transition">
                Cancel
              </button>
              <button onClick={handleAdd}
                className="flex-1 py-2.5 bg-brand-cyan/20 border border-brand-cyan/30 rounded-xl text-sm font-bold text-brand-cyan hover:bg-brand-cyan/30 transition">
                Save Place
              </button>
            </div>
          </motion.div>
        ) : (
          <button onClick={() => setAdding(true)}
            className="flex items-center justify-center gap-2 py-3.5 border border-dashed border-white/20 rounded-2xl text-sm text-white/40 hover:border-brand-cyan/30 hover:text-brand-cyan transition font-medium">
            <Plus size={16} /> Add a New Place
          </button>
        )}
      </div>
    </div>
  );
}
