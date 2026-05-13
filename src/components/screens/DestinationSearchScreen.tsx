"use client";
import React from 'react';
import { ArrowLeft, Search, Clock, MapPin, Navigation } from 'lucide-react';
import { MapView } from '@/components/ui/MapView';

export function DestinationSearchScreen({ onBack, onSelect }: { onBack: () => void, onSelect: () => void }) {
  const recentPlaces = [
    { name: "Jahangirpuri Metro Station", distance: "2.4 km", icon: <MapPin size={18} /> },
    { name: "University Campus, North Gate", distance: "0.8 km", icon: <MapPin size={18} /> },
    { name: "Bhalgarh Chowk", distance: "4.1 km", icon: <MapPin size={18} /> },
  ];

  return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col">
      {/* Map Background with blur */}
      <div className="absolute inset-0 z-0 opacity-40">
        <MapView markers={[]} />
      </div>
      <div className="absolute inset-0 z-0 bg-brand-dark/80 backdrop-blur-md" />

      {/* Header */}
      <div className="pt-12 pb-4 px-6 relative z-20 mt-safe pt-safe">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h2 className="text-xl font-bold text-white">Where to?</h2>
        </div>

        {/* Inputs */}
        <div className="relative">
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/10 flex flex-col items-center justify-between">
            <div className="w-2 h-2 rounded-full bg-brand-blue -translate-y-1 glow-blue" />
            <div className="w-2 h-2 rounded-sm bg-brand-cyan translate-y-1 glow-cyan" />
          </div>
          
          <div className="flex flex-col gap-3 pl-12">
            <div className="bg-white/5 rounded-xl p-3 text-white/80 text-sm">
              Current Location
            </div>
            <div className="bg-brand-cyan/10 border border-brand-cyan/30 rounded-xl p-3 flex items-center gap-3 glow-cyan">
              <input 
                autoFocus
                type="text" 
                placeholder="Search destination..." 
                className="bg-transparent border-none text-white focus:outline-none flex-1 font-medium placeholder:text-brand-cyan/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-4 pb-8 relative z-20">
        <div className="flex items-center gap-3 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm font-medium hover:bg-white/10">
            <Navigation size={14} className="text-brand-blue" /> Choose on map
          </button>
        </div>

        <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Recent Places</h3>
        
        <div className="flex flex-col gap-1">
          {recentPlaces.map((place, idx) => (
            <button 
              key={idx}
              onClick={onSelect}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition group text-left"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition">
                {idx === 0 ? <Clock size={18} /> : place.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white mb-1">{place.name}</div>
                <div className="text-xs text-white/50">{place.distance}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
