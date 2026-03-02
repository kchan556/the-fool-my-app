'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';
import { StatusChangeType } from '@/component/ui/StatusChangeEffect';

export interface StatusChange {
  type: StatusChangeType;
  value: number | string;
}

export interface StatusChangeItem {
  unitId: string;
  changes: StatusChange[];
  id: string; // 荳諢上・ID・亥酔荳繝ｦ繝九ャ繝医↓隍・焚陦ｨ遉ｺ縺ｧ縺阪ｋ繧医≧縺ｫ・・
}

export interface StatusChangeContextType {
  statusChanges: StatusChangeItem[];
  addStatusChange: (item: Omit<StatusChangeItem, 'id'>) => string; // ID繧堤函謌舌＠縺ｦ霑斐☆
  removeStatusChange: (id: string) => void;
  getStatusChangesForUnit: (unitId: string) => StatusChangeItem[];
  scheduleRemoval: (id: string) => void;
  cancelScheduledRemoval: (id: string) => void;
}

const StatusChangeContext = createContext<StatusChangeContextType | undefined>(undefined);

export const StatusChangeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [statusChanges, setStatusChanges] = useState<StatusChangeItem[]>([]);
  const cleanupTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // 繧ｹ繝・・繧ｿ繧ｹ螟画峩繧定ｿｽ蜉縺励∫函謌舌＆繧後◆ID繧定ｿ斐☆
  const addStatusChange = useCallback((item: Omit<StatusChangeItem, 'id'>): string => {
    const id = `status-${item.unitId}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    setStatusChanges(prev => [...prev, { ...item, id }]);

    return id;
  }, []);

  // 繧ｹ繝・・繧ｿ繧ｹ螟画峩繧貞炎髯､
  const removeStatusChange = useCallback((id: string): void => {
    setStatusChanges(prev => prev.filter(item => item.id !== id));
  }, []);

  // 迚ｹ螳壹Θ繝九ャ繝医・繧ｹ繝・・繧ｿ繧ｹ螟画峩繧貞叙蠕・
  const getStatusChangesForUnit = useCallback(
    (unitId: string): StatusChangeItem[] => {
      return statusChanges.filter(item => item.unitId === unitId);
    },
    [statusChanges]
  );

  // 驕・ｻｶ蜑企勁繧偵せ繧ｱ繧ｸ繝･繝ｼ繝ｫ・・eact Strict Mode蟇ｾ蠢懶ｼ・
  const scheduleRemoval = useCallback((id: string) => {
    const existing = cleanupTimeouts.current.get(id);
    if (existing) clearTimeout(existing);

    const timeout = setTimeout(() => {
      setStatusChanges(prev => prev.filter(item => item.id !== id));
      cleanupTimeouts.current.delete(id);
    }, 100);
    cleanupTimeouts.current.set(id, timeout);
  }, []);

  // 繧ｹ繧ｱ繧ｸ繝･繝ｼ繝ｫ縺輔ｌ縺溷炎髯､繧偵く繝｣繝ｳ繧ｻ繝ｫ
  const cancelScheduledRemoval = useCallback((id: string) => {
    const existing = cleanupTimeouts.current.get(id);
    if (existing) {
      clearTimeout(existing);
      cleanupTimeouts.current.delete(id);
    }
  }, []);

  return (
    <StatusChangeContext.Provider
      value={{
        statusChanges,
        addStatusChange,
        removeStatusChange,
        getStatusChangesForUnit,
        scheduleRemoval,
        cancelScheduledRemoval,
      }}
    >
      {children}
    </StatusChangeContext.Provider>
  );
};

export const useStatusChange = () => {
  const context = useContext(StatusChangeContext);
  if (context === undefined) {
    throw new Error('useStatusChange must be used within a StatusChangeProvider');
  }
  return context;
};
