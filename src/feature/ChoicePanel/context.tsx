'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export const ChoicePanelContext = createContext<any>(undefined);

export const ChoicePanelProvider = ({ children }: { children: ReactNode }) => {
  const [choices, setChoices] = useState<any[]>([]);

  const openChoice = useCallback(() => {}, []);
  const closeChoice = useCallback(() => {}, []);

  return (
    <ChoicePanelContext.Provider value={{ choices, openChoice, closeChoice }}>
      {children}
    </ChoicePanelContext.Provider>
  );
};

export const useChoicePanel = () => {
  const context = useContext(ChoicePanelContext);

  // ✅ ビルド時の SSR エラーを物理的に防ぐガード
  if (typeof window === 'undefined') {
    return {
      choices: [],
      openChoice: () => {},
      closeChoice: () => {},
    };
  }

  if (context === undefined) {
    throw new Error('useChoicePanel must be used within a ChoicePanelProvider');
  }
  return context;
};