import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-9 h-9" }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
        {/* Outer Hexagon with gradient stroke */}
        <path d="M16 2L2 9.5V22.5L16 30L30 22.5V9.5L16 2Z" stroke="url(#hexGradient)" strokeWidth="2.5" className="group-hover:scale-105 group-hover:rotate-180 origin-center transition-all duration-700 ease-in-out"/>
        
        {/* Inner abstract 'M' structure */}
        <path d="M9 20.5V11.5L16 16.5L23 11.5V20.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-brand-cyan transition-colors duration-300"/>
        
        {/* Center vertical line */}
        <path d="M16 16.5V28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-brand-cyan transition-colors duration-300"/>
        
        <defs>
          <linearGradient id="hexGradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
