import React from 'react';
import { cn } from '@/lib/utils'; // We'll create this utility

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: 'none' | 'blue' | 'cyan' | 'purple' | 'green' | 'red';
  hoverLift?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  glow = 'none',
  hoverLift = false,
  ...props 
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        "glass-card rounded-[20px] p-6 transition-all duration-300",
        glow !== 'none' && `glow-${glow}`,
        hoverLift && "hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
