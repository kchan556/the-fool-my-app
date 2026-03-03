'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export const TimerContext = createContext<any>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const startTimer = useCallback(() => {}, []);
  const stopTimer = useCallback(() => {}, []);
  const resetTimer = useCallback(() => {}, []);

  return (
    <TimerContext.Provider value={{ timeLeft, startTimer, stopTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);

  // ✅ サーバーサイド（ビルド時）の爆発を防止するガード
  if (typeof window === 'undefined') {
    return {
      timeLeft: 0,
      startTimer: () => {},
      stopTimer: () => {},
      resetTimer: () => {},
    };
  }

  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};