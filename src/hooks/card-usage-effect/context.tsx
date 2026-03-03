'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';

export interface CardUsageEffectContextType {
  activeCardIds: string[];
  addCardUsage: (cardId: string) => void;
  removeCardUsage: (cardId: string) => void;
  scheduleRemoval: (cardId: string) => void;
}

const CardUsageEffectContext = createContext<CardUsageEffectContextType | undefined>(undefined);

export const CardUsageEffectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCardIds, setActiveCardIds] = useState<string[]>([]);
  const cleanupTimeouts = useRef<Map<string, any>>(new Map());

  const addCardUsage = useCallback((cardId: string) => {
    setActiveCardIds(prev => {
      if (prev.includes(cardId)) return prev;
      return [...prev, cardId];
    });
  }, []);

  const removeCardUsage = useCallback((cardId: string) => {
    setActiveCardIds(prev => prev.filter(id => id !== cardId));
  }, []);

  const scheduleRemoval = useCallback((cardId: string) => {
    if (typeof window === 'undefined') return;
    
    const existing = cleanupTimeouts.current.get(cardId);
    if (existing) clearTimeout(existing);

    const timeout = setTimeout(() => {
      setActiveCardIds(prev => prev.filter(id => id !== cardId));
      cleanupTimeouts.current.delete(cardId);
    }, 1000);
    cleanupTimeouts.current.set(cardId, timeout);
  }, []);

  return (
    <CardUsageEffectContext.Provider
      value={{
        activeCardIds,
        addCardUsage,
        removeCardUsage,
        scheduleRemoval,
      }}
    >
      {children}
    </CardUsageEffectContext.Provider>
  );
};

export const useCardUsageEffect = () => {
  const context = useContext(CardUsageEffectContext);

  // ✅ サーバーサイド（ビルド時）のエラーを防止するガード
  if (typeof window === 'undefined') {
    return {
      activeCardIds: [],
      addCardUsage: () => {},
      removeCardUsage: () => {},
      scheduleRemoval: () => {},
    };
  }

  if (context === undefined) {
    throw new Error('useCardUsageEffect must be used within a CardUsageEffectProvider');
  }
  return context;
};