'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';

// 型定義はそのまま（文字化けを修正）
export interface StatusChange {
  type: any; // 依存関係エラーを避けるため一旦 any
  value: number | string;
}

export interface StatusChangeItem {
  unitId: string;
  changes: StatusChange[];
  id: string; 
}

export interface StatusChangeContextType {
  statusChanges: StatusChangeItem[];
  addStatusChange: (item: Omit<StatusChangeItem, 'id'>) => string;
  removeStatusChange: (id: string) => void;
  getStatusChangesForUnit: (unitId: string) => StatusChangeItem[];
  scheduleRemoval: (id: string) => void;
  cancelScheduledRemoval: (id: string) => void;
}

const StatusChangeContext = createContext<StatusChangeContextType | undefined>(undefined);

export const StatusChangeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [statusChanges, setStatusChanges] = useState<StatusChangeItem[]>([]);
  const cleanupTimeouts = useRef<Map<string, any>>(new Map());

  const addStatusChange = useCallback((item: Omit<StatusChangeItem, 'id'>): string => {
    const id = `status-${item.unitId}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setStatusChanges(prev => [...prev, { ...item, id }]);
    return id;
  }, []);

  const removeStatusChange = useCallback((id: string): void => {
    setStatusChanges(prev => prev.filter(item => item.id !== id));
  }, []);

  const getStatusChangesForUnit = useCallback(
    (unitId: string): StatusChangeItem[] => {
      return statusChanges.filter(item => item.unitId === unitId);
    },
    [statusChanges]
  );

  const scheduleRemoval = useCallback((id: string) => {
    if (typeof window === 'undefined') return; // サーバーガード
    const existing = cleanupTimeouts.current.get(id);
    if (existing) clearTimeout(existing);

    const timeout = setTimeout(() => {
      setStatusChanges(prev => prev.filter(item => item.id !== id));
      cleanupTimeouts.current.delete(id);
    }, 100);
    cleanupTimeouts.current.set(id, timeout);
  }, []);

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

  // ✅ ビルドエラーを殺すためのサーバーサイドガード
  if (typeof window === 'undefined') {
    return {
      statusChanges: [],
      addStatusChange: () => '',
      removeStatusChange: () => {},
      getStatusChangesForUnit: () => [],
      scheduleRemoval: () => {},
      cancelScheduledRemoval: () => {},
    };
  }

  if (context === undefined) {
    throw new Error('useStatusChange must be used within a StatusChangeProvider');
  }
  return context;
};