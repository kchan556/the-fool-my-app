'use client';

import { useContext } from 'react';
import { CardUsageEffectContext } from './index';

export const useCardUsageEffect = () => {
  const context = useContext(CardUsageEffectContext);

  // SSRガード（ビルド時の爆発防止）
  if (typeof window === 'undefined' || !context) {
    return {
      activeCardIds: [],
      addCardUsage: () => {},
      removeCardUsage: () => {},
      scheduleRemoval: () => {},
    };
  }

  return context;
};