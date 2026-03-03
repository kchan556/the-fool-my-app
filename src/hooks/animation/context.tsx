'use client';

import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';

export const AnimationContext = createContext<any>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [animations, setAnimations] = useState<any[]>([]);

  const addAnimation = useCallback(() => {}, []);
  const removeAnimation = useCallback(() => {}, []);

  return (
    <AnimationContext.Provider value={{ animations, addAnimation, removeAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);

  // ✅ ビルド時の SSR エラーを物理的に防ぐ最強のガード
  if (typeof window === 'undefined') {
    return {
      animations: [],
      addAnimation: () => {},
      removeAnimation: () => {},
    };
  }

  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};