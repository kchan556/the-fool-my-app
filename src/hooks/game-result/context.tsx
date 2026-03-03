'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

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

const GameResultContext = createContext<GameResultContextType | undefined>(undefined);

export const GameResultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [result, setResult] = useState<GameResult | null>(null);

  const setGameResult = useCallback((newResult: GameResult) => {
    setResult(newResult);
  }, []);

  const resetGameResult = useCallback(() => {
    setResult(null);
  }, []);

  return (
    <GameResultContext.Provider
      value={{
        result,
        setGameResult,
        resetGameResult,
      }}
    >
      {children}
    </GameResultContext.Provider>
  );
};

export const useGameResult = () => {
  const context = useContext(GameResultContext);

  // ✅ サーバーサイド（ビルド時）のエラーを防止するガード
  if (typeof window === 'undefined') {
    return {
      result: null,
      setGameResult: () => {},
      resetGameResult: () => {},
    };
  }

  if (context === undefined) {
    throw new Error('useGameResult must be used within a GameResultProvider');
  }
  return context;
};