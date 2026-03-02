'use client';

import { ICard } from '@/submodule/suit/types';
import { Active } from '@dnd-kit/core/dist/store';

import { createContext, ReactNode, useState } from 'react';

export type SystemContextType = {
  selectedCard: ICard | undefined;
  setSelectedCard: React.Dispatch<React.SetStateAction<ICard | undefined>>;
  activeCard: Active | undefined;
  setActiveCard: React.Dispatch<React.SetStateAction<Active | undefined>>;
  operable: boolean;
  setOperable: React.Dispatch<React.SetStateAction<boolean>>;
  // Cursor collision detection configuration
  cursorCollisionSize: number;
  setCursorCollisionSize: React.Dispatch<React.SetStateAction<number>>;
  // Removed openDeck, setOpenDeck, openTrash, setOpenTrash
  // These are now handled by the CardsDialog context

  // Card detail window
  detailCard: ICard | undefined;
  setDetailCard: React.Dispatch<React.SetStateAction<ICard | undefined>>;
  detailPosition: { x: number; y: number };
  setDetailPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};

export const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemContextProvider = ({ children }: { children: ReactNode }) => {
  // 隧ｳ邏ｰ逕ｨ
  const [selectedCard, setSelectedCard] = useState<ICard | undefined>(undefined);
  // 繝峨Λ繝・げ荳ｭ縺ｮ繧ｫ繝ｼ繝・
  const [activeCard, setActiveCard] = useState<Active | undefined>(undefined);
  const [operable, setOperable] = useState(false);
  // 繧ｫ繝ｼ繧ｽ繝ｫ蜻ｨ霎ｺ縺ｮ繝偵ャ繝医お繝ｪ繧｢繧ｵ繧､繧ｺ・医ヴ繧ｯ繧ｻ繝ｫ・・
  const [cursorCollisionSize, setCursorCollisionSize] = useState(15);

  // 繧ｫ繝ｼ繝芽ｩｳ邏ｰ繧ｦ繧｣繝ｳ繝峨え逕ｨ縺ｮ迥ｶ諷・
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
