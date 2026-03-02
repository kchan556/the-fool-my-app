'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';

export interface OverclockEffectContextType {
  activeUnits: string[]; // 隍・焚繝ｦ繝九ャ繝医′蜷梧凾縺ｫ繧ｪ繝ｼ繝舌・繧ｯ繝ｭ繝・け蜿ｯ閭ｽ
  addOverclockUnit: (unitId: string) => void;
  removeOverclockUnit: (unitId: string) => void;
  scheduleRemoval: (unitId: string) => void;
  cancelScheduledRemoval: (unitId: string) => void;
}

const OverclockEffectContext = createContext<OverclockEffectContextType | undefined>(undefined);

export const OverclockEffectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeUnits, setActiveUnits] = useState<string[]>([]);
  const cleanupTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addOverclockUnit = useCallback((unitId: string) => {
    setActiveUnits(prev => {
      if (prev.includes(unitId)) return prev;
      return [...prev, unitId];
    });
  }, []);

  const removeOverclockUnit = useCallback((unitId: string) => {
    setActiveUnits(prev => prev.filter(id => id !== unitId));
  }, []);

  // 驕・ｻｶ蜑企勁繧偵せ繧ｱ繧ｸ繝･繝ｼ繝ｫ・・eact Strict Mode蟇ｾ蠢懶ｼ・
  const scheduleRemoval = useCallback((unitId: string) => {
    const existing = cleanupTimeouts.current.get(unitId);
    if (existing) clearTimeout(existing);

    const timeout = setTimeout(() => {
      setActiveUnits(prev => prev.filter(id => id !== unitId));
      cleanupTimeouts.current.delete(unitId);
    }, 100);
    cleanupTimeouts.current.set(unitId, timeout);
  }, []);

  // 繧ｹ繧ｱ繧ｸ繝･繝ｼ繝ｫ縺輔ｌ縺溷炎髯､繧偵く繝｣繝ｳ繧ｻ繝ｫ
  const cancelScheduledRemoval = useCallback((unitId: string) => {
    const existing = cleanupTimeouts.current.get(unitId);
    if (existing) {
      clearTimeout(existing);
      cleanupTimeouts.current.delete(unitId);
    }
  }, []);

  return (
    <OverclockEffectContext.Provider
      value={{
        activeUnits,
        addOverclockUnit,
        removeOverclockUnit,
        scheduleRemoval,
        cancelScheduledRemoval,
      }}
    >
      {children}
    </OverclockEffectContext.Provider>
  );
};

export const useOverclockEffect = () => {
  const context = useContext(OverclockEffectContext);
  if (context === undefined) {
    throw new Error('useOverclockEffect must be used within a OverclockEffectProvider');
  }
  return context;
};
