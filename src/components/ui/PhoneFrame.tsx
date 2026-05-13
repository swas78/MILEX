import React from 'react';

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[375px] h-[812px] rounded-[50px] border-[14px] border-black bg-brand-dark overflow-hidden shadow-2xl glow-blue">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-black z-50 rounded-b-[20px] w-[150px] mx-auto flex justify-center items-end pb-1">
        <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
      </div>
      
      {/* Status Bar Fake */}
      <div className="absolute top-0 inset-x-0 h-10 z-40 flex justify-between items-center px-6 pt-2 pointer-events-none text-[12px] font-medium text-white">
        <span>9:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="w-4 h-3 bg-white rounded-sm"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>

      {/* App Content Container */}
      <div className="absolute inset-0 pt-10 pb-6 overflow-y-auto no-scrollbar">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
}
