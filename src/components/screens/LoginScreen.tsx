"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton } from '@/components/ui/NeonButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { Phone, Mail, ArrowRight, Apple, Sparkles, ShieldCheck } from 'lucide-react';

export function LoginScreen({ onComplete }: { onComplete: () => void }) {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#07070b] flex flex-col pt-12 pb-8 px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-cyan/5 blur-[120px] rounded-full" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Logo & Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 mt-8 text-center"
        >
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-purple p-[2px] mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <div className="w-full h-full rounded-[22px] bg-[#07070b] flex items-center justify-center">
              <span className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-blue to-brand-cyan">MX</span>
            </div>
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2">Welcome Back</h1>
          <p className="text-white/40 text-sm font-medium">Log in to your student mobility hub</p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-1 shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Tab Switcher */}
            <div className="flex p-1 bg-black/40 rounded-[28px] relative mb-2">
              <motion.div 
                layoutId="loginTab"
                className="absolute inset-y-1 w-[calc(50%-4px)] bg-white shadow-lg rounded-[24px]"
                animate={{ x: method === 'phone' ? 4 : 'calc(100% + 4px)' }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
              
              <button 
                onClick={() => setMethod('phone')}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black uppercase tracking-widest relative z-10 transition-colors duration-300 ${method === 'phone' ? 'text-black' : 'text-white/40'}`}
              >
                <Phone size={14} className={method === 'phone' ? 'fill-current' : ''} /> Phone
              </button>
              <button 
                onClick={() => setMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black uppercase tracking-widest relative z-10 transition-colors duration-300 ${method === 'email' ? 'text-black' : 'text-white/40'}`}
              >
                <Mail size={14} className={method === 'email' ? 'fill-current' : ''} /> Email
              </button>
            </div>
            
            {/* Field Body */}
            <div className="p-6 pt-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                    {method === 'phone' ? 'Mobile Number' : 'University Email'}
                  </span>
                  <div className="flex items-center gap-1 text-brand-cyan">
                    <ShieldCheck size={10} />
                    <span className="text-[9px] font-bold uppercase">Encrypted</span>
                  </div>
                </div>

                <div className={`flex items-center gap-3 transition-all duration-300 border-b-2 ${isFocused ? 'border-brand-cyan' : 'border-white/10'}`}>
                  {method === 'phone' && (
                    <div className="text-white font-display font-black text-xl py-3 border-r border-white/5 pr-3">
                      +91
                    </div>
                  )}
                  <input 
                    type={method === 'phone' ? 'tel' : 'email'}
                    placeholder={method === 'phone' ? '00000 00000' : 'student@edu.in'}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 min-w-0 w-full bg-transparent py-4 text-white font-display font-bold text-xl placeholder:text-white/10 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative sparkles */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-cyan/20 rounded-full blur-xl animate-pulse" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <NeonButton 
            variant="primary" 
            fullWidth 
            onClick={onComplete}
            className="py-5 rounded-[24px] font-black text-lg tracking-widest shadow-[0_20px_40px_rgba(6,182,212,0.2)] mb-4"
          >
            Get OTP <ArrowRight size={20} className="ml-2" />
          </NeonButton>

          <button className="w-full text-center py-2">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white/50 transition">Trouble logging in? Get help</span>
          </button>
        </motion.div>

        {/* Social Auth */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="relative flex items-center justify-center mb-8 px-10">
            <div className="absolute inset-x-10 h-px bg-white/5" />
            <span className="relative bg-[#07070b] px-4 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Quick Access</span>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-3 bg-white/[0.04] hover:bg-white/10 border border-white/5 rounded-2xl py-4 transition-all group">
              <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform group-hover:scale-110">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xs font-bold text-white/70">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-white text-black hover:bg-white/90 rounded-2xl py-4 transition-all group">
              <Apple size={20} className="fill-current transition-transform group-hover:scale-110" />
              <span className="text-xs font-black uppercase tracking-widest">Apple</span>
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="mt-auto text-center text-[10px] text-white/20 leading-relaxed font-medium pb-4">
          By signing in, you agree to our <br/>
          <span className="text-white/40 font-bold border-b border-white/10">Terms of Service</span> and <span className="text-white/40 font-bold border-b border-white/10">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
