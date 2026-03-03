'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';

export interface GameResult {
  winnerId: string | null;
  reason: string;
  isDraw: boolean;
}

export interface GameResultContextType {
  result: GameResult | null;
  setGameResult: (result: GameResult) => void;
  resetGameResult: () => void;
}

export const GameResultContext = createContext<GameResultContextType | undefined>(undefined);

export const GameResultProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<GameResult | null>(null);

  const setGameResult = useCallback((newResult: GameResult) => {
    setResult(newResult);
  }, []);

  const resetGameResult = useCallback(() => {
    setResult(null);
  }, []);

  return (
    <GameResultContext.Provider value={{ result, setGameResult, resetGameResult }}>
      {children}
    </GameResultContext.Provider>
  );
};