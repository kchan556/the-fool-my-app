'use client';

import { useContext } from 'react';
import { CardsDialogContext } from './index';

export const useCardsDialog = () => {
  const context = useContext(CardsDialogContext);

  // SSRガード（ビルド時のエラー防止）
  if (typeof window === 'undefined' || !context) {
    return {
      isOpen: false,
      cards: [],
      title: '',
      open: () => {},
      close: () => {},
    };
  }

  return context;
};