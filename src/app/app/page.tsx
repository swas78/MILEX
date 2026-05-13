"use client";

import React from 'react';
import { AppPrototype } from '@/components/ui/AppPrototype';

export default function MobileAppEntry() {
  // Force route registration
  return (
    <div className="w-full min-h-[100dvh] bg-black">
      <AppPrototype isFullScreen={true} />
    </div>
  );
}
