'use client';

import { ICard } from '@/submodule/suit/types';
import { createContext, ReactNode, useState } from 'react';

export type SystemContextType = {
  selectedCard: ICard | undefined;
  setSelectedCard: React.Dispatch<React.SetStateAction<ICard | undefined>>;
  activeCard: any | undefined;
  setActiveCard: React.Dispatch<React.SetStateAction<any | undefined>>;
  operable: boolean;
  setOperable: React.Dispatch<React.SetStateAction<boolean>>;
  cursorCollisionSize: number;
  setCursorCollisionSize: React.Dispatch<React.SetStateAction<number>>;
  detailCard: ICard | undefined;
  setDetailCard: React.Dispatch<React.SetStateAction<ICard | undefined>>;
  detailPosition: { x: number; y: number };
  setDetailPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};

export const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCard, setSelectedCard] = useState<ICard | undefined>(undefined);
  const [activeCard, setActiveCard] = useState<any | undefined>(undefined);
  const [operable, setOperable] = useState(false);
  const [cursorCollisionSize, setCursorCollisionSize] = useState(15);
  const [detailCard, setDetailCard] = useState<ICard | undefined>(undefined);
  const [detailPosition, setDetailPosition] = useState<{ x: number; y: number }>({
    x: 100,
    y: 100,
  });

  return (
    <SystemContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        operable,
        setOperable,
        activeCard,
        setActiveCard,
        cursorCollisionSize,
        setCursorCollisionSize,
        detailCard,
        setDetailCard,
        detailPosition,
        setDetailPosition,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};