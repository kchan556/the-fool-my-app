'use client';

import { useContext } from 'react';
import { GameResultContext } from './index';

export const useGameResult = () => {
  const context = useContext(GameResultContext);

  // SSRガード（ビルド時のエラー防止）
  if (typeof window === 'undefined' || !context) {
    return {
      result: null,
      setGameResult: () => {},
      resetGameResult: () => {},
    };
  }

  return context;
};