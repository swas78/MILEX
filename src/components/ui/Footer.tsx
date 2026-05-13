"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Instagram, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="relative bg-[#050508] border-t border-white/10 overflow-hidden pt-20">
      {/* Decorative top dashed border to mimic the checkerboard but in a sleek way */}
      <div className="absolute top-0 w-full h-1 bg-[length:20px_1px] bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_50%,transparent_50%)]" />

      <div className="max-w-[100vw] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Pre-heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/60 font-bold tracking-widest uppercase text-sm md:text-base mb-2"
        >
          Ready to move?
        </motion.div>

        {/* Massive Text & Overlapping Button Container */}
        <div className="relative w-full flex justify-center items-center py-10 mb-10">
          
          {/* Giant Text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-[20vw] md:text-[18vw] font-display font-bold leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 text-center w-full tracking-tighter"
          >
            MILEX
          </motion.div>

          {/* Overlapping Interactive Button */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute z-10"
          >
            <Link href="/app" className="group flex items-center bg-[#050508] rounded-full border border-white/20 p-2 pr-6 hover:border-brand-cyan/50 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-white/10 group-hover:border-brand-cyan/30 bg-white/5 backdrop-blur-md transition-colors">
                <span className="text-xl md:text-3xl font-display font-bold text-white tracking-wide">DOWNLOAD</span>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 ml-4 rounded-full bg-brand-cyan text-black flex items-center justify-center group-hover:scale-105 transition-transform glow-cyan shrink-0">
                <ArrowRight size={32} strokeWidth={3} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Links with Sparkles */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-lg font-bold tracking-wider uppercase mb-20 text-white/80">
          <Link href="#" className="hover:text-brand-cyan transition-colors">Home</Link>
          <Sparkles size={16} className="text-brand-cyan" />
          <Link href="#features" className="hover:text-brand-cyan transition-colors">Safety</Link>
          <Sparkles size={16} className="text-brand-cyan" />
          <Link href="#features" className="hover:text-brand-cyan transition-colors">Campus</Link>
          <Sparkles size={16} className="text-brand-cyan" />
          <Link href="/demo" className="hover:text-brand-cyan transition-colors">Demo</Link>
        </div>
      </div>

      {/* Grid Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/10">
        
        {/* Left Bottom - Text */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex items-center">
          <p className="text-white/60 text-sm md:text-base font-medium max-w-sm leading-relaxed uppercase tracking-wider">
            Got some exciting ideas? Let's connect and create the future of student mobility together!
          </p>
        </div>

        {/* Right Bottom - Infinite Marquee */}
        <div className="p-8 md:p-12 overflow-hidden flex items-center bg-white/5">
          <div className="relative w-full flex whitespace-nowrap overflow-hidden mask-horizontal">
            <motion.div 
              animate={{ x: [0, -1035] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
              className="flex gap-8 items-center text-3xl md:text-5xl font-display font-bold text-white/20"
            >
              <span>hello@milex.in</span>
              <Sparkles size={32} className="text-brand-cyan" />
              <span>hello@milex.in</span>
              <Sparkles size={32} className="text-brand-cyan" />
              <span>hello@milex.in</span>
              <Sparkles size={32} className="text-brand-cyan" />
              <span>hello@milex.in</span>
              <Sparkles size={32} className="text-brand-cyan" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Absolute Bottom Row */}
      <div className="border-t border-white/10 p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <Logo className="w-9 h-9" />
          <span className="font-display font-bold text-xl tracking-wide text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all duration-300">MileX</span>
        </div>

        {/* Social Pills */}
        <div className="flex gap-4">
          <a href="#" className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-bold tracking-wider">
            <Instagram size={16} /> INSTAGRAM
          </a>
          <a href="#" className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-bold tracking-wider">
            <Twitter size={16} /> X
          </a>
          <a href="#" className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-bold tracking-wider">
            <Linkedin size={16} /> LINKEDIN
          </a>
        </div>

        {/* Credit */}
        <div className="text-sm font-medium text-white/40">
          Crafted by <span className="text-brand-cyan font-bold">MILEX TEAM</span>
        </div>
      </div>

      <style jsx>{`
        .mask-horizontal {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </footer>
  );
}
