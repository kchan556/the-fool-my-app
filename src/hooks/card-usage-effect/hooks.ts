'use client';

import { useContext } from 'react';
import { CardUsageEffectContext } from './index';

export const useCardUsageEffect = () => {
  const context = useContext(CardUsageEffectContext);

  // ✅ 徹底的なSSRガード
  if (typeof window === 'undefined' || context === undefined) {
    return {
      activeCardIds: [],
      addCardUsage: () => {},
      removeCardUsage: () => {},
      scheduleRemoval: () => {},
    };
  }

  return context;
};