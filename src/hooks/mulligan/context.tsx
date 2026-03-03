'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

export interface MulliganContextType {
  isMulliganPhase: boolean;
  selectedIndices: number[];
  toggleSelect: (index: number) => void;
  startMulligan: () => void;
  endMulligan: () => void;
  resetMulligan: () => void;
}

const MulliganContext = createContext<MulliganContextType | undefined>(undefined);

export const MulliganProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMulliganPhase, setIsMulliganPhase] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const startMulligan = useCallback(() => {
    setIsMulliganPhase(true);
    setSelectedIndices([]);
  }, []);

  const endMulligan = useCallback(() => {
    setIsMulliganPhase(false);
  }, []);

  const toggleSelect = useCallback((index: number) => {
    setSelectedIndices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  }, []);

  const resetMulligan = useCallback(() => {
    setIsMulliganPhase(false);
    setSelectedIndices([]);
  }, []);

  return (
    <MulliganContext.Provider
      value={{
        isMulliganPhase,
        selectedIndices,
        toggleSelect,
        startMulligan,
        endMulligan,
        resetMulligan,
      }}
    >
      {children}
    </MulliganContext.Provider>
  );
};

export const useMulligan = () => {
  const context = useContext(MulliganContext);

  // ✅ サーバーサイド（ビルド時）で呼ばれた場合にエラーにならないようガードを入れる
  if (typeof window === 'undefined') {
    return {
      isMulliganPhase: false,
      selectedIndices: [],
      toggleSelect: () => {},
      startMulligan: () => {},
      endMulligan: () => {},
      resetMulligan: () => {},
    };
  }

  if (context === undefined) {
    throw new Error('useMulligan must be used within a MulliganProvider');
  }
  return context;
};