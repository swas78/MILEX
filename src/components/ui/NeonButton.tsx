"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function NeonButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}: NeonButtonProps) {
  const baseStyles = "relative font-medium transition-all duration-300 rounded-[12px] flex items-center justify-center gap-2 overflow-hidden";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-blue-400 glow-blue",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10",
    outline: "bg-transparent border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 glow-cyan",
    danger: "bg-brand-red text-white hover:bg-red-400 glow-red",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {/* Shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      <span className="relative z-10 flex items-center gap-2">{children as React.ReactNode}</span>
    </motion.button>
  );
}
