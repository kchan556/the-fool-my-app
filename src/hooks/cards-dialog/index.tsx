'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';

export interface CardsDialogContextType {
  isOpen: boolean;
  cards: any[];
  title: string;
  open: (cards: any[], title?: string) => void;
  close: () => void;
}

export const CardsDialogContext = createContext<CardsDialogContextType | undefined>(undefined);

export const CardsDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [title, setTitle] = useState('');

  const open = useCallback((newCards: any[], newTitle: string = '') => {
    setCards(newCards);
    setTitle(newTitle);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <CardsDialogContext.Provider value={{ isOpen, cards, title, open, close }}>
      {children}
    </CardsDialogContext.Provider>
  );
};