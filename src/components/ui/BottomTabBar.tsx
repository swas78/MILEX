"use client";
import React from 'react';
import { Home, Clock, Wallet, User } from 'lucide-react';
import { motion } from 'framer-motion';

export type TabType = 'home' | 'rides' | 'wallet' | 'profile';

const tabs: { id: TabType; label: string; Icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'rides', label: 'Rides', Icon: Clock },
  { id: 'wallet', label: 'Wallet', Icon: Wallet },
  { id: 'profile', label: 'Profile', Icon: User },
];

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="bg-[#0a0a0c]/95 backdrop-blur-2xl border-t border-white/8 px-2 pt-3 pb-5">
        <div className="flex items-center justify-around">
          {tabs.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className="flex flex-col items-center gap-1 px-4 py-1.5 relative group"
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-1 w-6 h-0.5 bg-brand-cyan rounded-full"
                  />
                )}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isActive ? 'bg-brand-cyan/15' : 'group-hover:bg-white/5'}`}>
                  <Icon
                    size={20}
                    className={`transition-colors ${isActive ? 'text-brand-cyan' : 'text-white/40 group-hover:text-white/60'}`}
                  />
                </div>
                <span className={`text-[10px] font-bold transition-colors ${isActive ? 'text-brand-cyan' : 'text-white/30 group-hover:text-white/50'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
