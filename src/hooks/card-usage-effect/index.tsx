'use client';

import React, { createContext, useState, useCallback, ReactNode, useRef } from 'react';

export interface CardUsageEffectContextType {
  activeCardIds: string[];
  addCardUsage: (cardId: string) => void;
  removeCardUsage: (cardId: string) => void;
  scheduleRemoval: (cardId: string) => void;
}

export const CardUsageEffectContext = createContext<CardUsageEffectContextType | undefined>(undefined);

export const CardUsageEffectProvider = ({ children }: { children: ReactNode }) => {
  const [activeCardIds, setActiveCardIds] = useState<string[]>([]);
  const cleanupTimeouts = useRef<Map<string, any>>(new Map());

  const addCardUsage = useCallback((cardId: string) => {
    setActiveCardIds(prev => prev.includes(cardId) ? prev : [...prev, cardId]);
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
    <CardUsageEffectContext.Provider value={{ activeCardIds, addCardUsage, removeCardUsage, scheduleRemoval }}>
      {children}
    </CardUsageEffectContext.Provider>
  );
};