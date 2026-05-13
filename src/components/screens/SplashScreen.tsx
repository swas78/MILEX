"use client";
import { BikerIntroAnimation } from '@/components/ui/BikerIntroAnimation';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return <BikerIntroAnimation onComplete={onComplete} />;
}
