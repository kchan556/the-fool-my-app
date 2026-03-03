'use client';

import { createContext, useContext } from 'react';

// 最小限の型定義（既存のコードに合わせて適宜調整してください）
export const GameContext = createContext<any>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);

  // ✅ SSRガード：ビルド時の爆発を防止
  if (typeof window === 'undefined') {
    return {
      gameState: null,
      dispatch: () => {},
      // 他にuseGameが返している主要なプロパティがあればここに追加
    };
  }

  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};