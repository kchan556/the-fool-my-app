'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';

export interface OverclockEffectContextType {
  targetUnitIds: string[]; // 複数ユニットが同時にオーバークロックエフェクト可能
  addOverclockUnit: (unitId: string) => void;
  removeOverclockUnit: (unitId: string) => void;
  scheduleRemoval: (unitId: string) => void;
  cancelScheduledRemoval: (unitId: string) => void;
}

const OverclockEffectContext = createContext<OverclockEffectContextType | undefined>(undefined);

export const OverclockEffectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [targetUnitIds, setTargetUnitIds] = useState<string[]>([]);
  const cleanupTimeouts = useRef<Map<string, any>>(new Map());

  const addOverclockUnit = useCallback((unitId: string) => {
    setTargetUnitIds(prev => {
      if (prev.includes(unitId)) return prev;
      return [...prev, unitId];
    });
  }, []);

  const removeOverclockUnit = useCallback((unitId: string) => {
    setTargetUnitIds(prev => prev.filter(id => id !== unitId));
  }, []);

  // 遅延削除をスケジュール
  const scheduleRemoval = useCallback((unitId: string) => {
    if (typeof window === 'undefined') return;
    
    const existing = cleanupTimeouts.current.get(unitId);
    if (existing) clearTimeout(existing);

    const timeout = setTimeout(() => {
      setTargetUnitIds(prev => prev.filter(id => id !== unitId));
      cleanupTimeouts.current.delete(unitId);
    }, 100);
    cleanupTimeouts.current.set(unitId, timeout);
  }, []);

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
        targetUnitIds,
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

  // ✅ ビルドエラー（SSR環境）を回避するガード
  if (typeof window === 'undefined') {
    return {
      targetUnitIds: [],
      addOverclockUnit: () => {},
      removeOverclockUnit: () => {},
      scheduleRemoval: () => {},
      cancelScheduledRemoval: () => {},
    };
  }

  if (context === undefined) {
    throw new Error('useOverclockEffect must be used within an OverclockEffectProvider');
  }
  return context;
};