'use client';

import React, { createContext, useContext, ReactNode } from 'react';

export const DeckContext = createContext<any>(undefined);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DeckContext.Provider value={{ deck: [] }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  const context = useContext(DeckContext);
  // ✅ SSRガード
  if (typeof window === 'undefined') {
    return { deck: [], addCard: () => {} };
  }
  return context;
};