'use client';

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useAuth } from '@/hooks/auth';
import { DeckService } from '@/service/deck-service';
import { setDeckPublic as setDeckPublicAction } from '@/actions/deck';
import type { DeckData } from '@/type/deck';

export type DeckContextType = {
  decks: DeckData[];
  mainDeck: DeckData | null;
  isLoading: boolean;
  error: string | null;
  // 謫堺ｽ・
  refreshDecks: () => Promise<void>;
  saveDeck: (
    title: string,
    cards: string[],
    jokers?: string[],
    isMain?: boolean
  ) => Promise<DeckData>;
  deleteDeck: (deckId: string) => Promise<void>;
  setMainDeck: (deckId: string) => Promise<void>;
  setDeckPublic: (deckId: string, isPublic: boolean) => Promise<void>;
  // 繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ
  migrateFromLocalStorage: () => Promise<{ success: number; failed: number }>;
  clearLocalStorage: () => void;
  hasLocalDecks: boolean;
};

export const DeckContext = createContext<DeckContextType | undefined>(undefined);

type DeckProviderProps = {
  children: ReactNode;
};

export const DeckProvider = ({ children }: DeckProviderProps) => {
  const { user, isAuthSkipped, isLoading: isAuthLoading } = useAuth();
  const [decks, setDecks] = useState<DeckData[]>([]);
  const [mainDeck, setMainDeckState] = useState<DeckData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLocalDecks, setHasLocalDecks] = useState(false);

  const userId = !isAuthSkipped ? (user?.id ?? null) : null;

  // 繝・ャ繧ｭ繧定ｪｭ縺ｿ霎ｼ縺ｿ
  const refreshDecks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [allDecks, main] = await Promise.all([
        DeckService.getAllDecks(userId),
        DeckService.getMainDeck(userId),
      ]);

      setDecks(allDecks);
      setMainDeckState(main);

      // 繝ｭ繧ｰ繧､繝ｳ荳ｭ縺九▽LocalStorage縺ｫ繝・ャ繧ｭ縺後≠繧九°繝√ぉ繝・け
      if (userId && !isAuthSkipped) {
        const { LocalStorageHelper } = await import('@/service/local-storage');
        const localDecks = LocalStorageHelper.getAllDecks();
        setHasLocalDecks(localDecks.length > 0);
      } else {
        setHasLocalDecks(false);
      }
    } catch (err) {
      console.error('繝・ャ繧ｭ隱ｭ縺ｿ霎ｼ縺ｿ繧ｨ繝ｩ繝ｼ:', err);
      setError('繝・ャ繧ｭ縺ｮ隱ｭ縺ｿ霎ｼ縺ｿ縺ｫ螟ｱ謨励＠縺ｾ縺励◆');
    } finally {
      setIsLoading(false);
    }
  }, [userId, isAuthSkipped]);

  // 隱崎ｨｼ迥ｶ諷九′遒ｺ螳壹＠縺溘ｉ繝・ャ繧ｭ繧定ｪｭ縺ｿ霎ｼ縺ｿ
  useEffect(() => {
    if (!isAuthLoading) {
      refreshDecks();
    }
  }, [isAuthLoading, refreshDecks]);

  // 繝・ャ繧ｭ繧剃ｿ晏ｭ・
  const saveDeck = useCallback(
    async (
      title: string,
      cards: string[],
      jokers: string[] = [],
      isMain: boolean = false
    ): Promise<DeckData> => {
      const saved = await DeckService.saveDeck(
        isAuthSkipped ? null : userId,
        title,
        cards,
        jokers,
        isMain
      );
      await refreshDecks();
      return saved;
    },
    [userId, isAuthSkipped, refreshDecks]
  );

  // 繝・ャ繧ｭ繧貞炎髯､
  const deleteDeck = useCallback(
    async (deckId: string): Promise<void> => {
      await DeckService.deleteDeck(userId, deckId);
      await refreshDecks();
    },
    [userId, refreshDecks]
  );

  // 繝｡繧､繝ｳ繝・ャ繧ｭ繧定ｨｭ螳・
  const setMainDeck = useCallback(
    async (deckId: string): Promise<void> => {
      await DeckService.setMainDeck(userId, deckId);
      await refreshDecks();
    },
    [userId, refreshDecks]
  );

  // 繝・ャ繧ｭ縺ｮ蜈ｬ髢狗憾諷九ｒ險ｭ螳・
  const setDeckPublicState = useCallback(
    async (deckId: string, isPublic: boolean): Promise<void> => {
      const result = await setDeckPublicAction(deckId, isPublic);
      if (!result) {
        throw new Error('蜈ｬ髢狗憾諷九・蛻・ｊ譖ｿ縺医↓螟ｱ謨励＠縺ｾ縺励◆');
      }
      await refreshDecks();
    },
    [refreshDecks]
  );

  // LocalStorage縺九ｉ遘ｻ陦・
  const migrateFromLocalStorage = useCallback(async (): Promise<{
    success: number;
    failed: number;
  }> => {
    if (!userId) {
      throw new Error('繝ｭ繧ｰ繧､繝ｳ縺悟ｿ・ｦ√〒縺・);
    }

    const result = await DeckService.migrateFromLocalStorage(userId);
    await refreshDecks();
    return result;
  }, [userId, refreshDecks]);

  // LocalStorage繧偵け繝ｪ繧｢
  const clearLocalStorage = useCallback(() => {
    DeckService.clearLocalStorage();
    setHasLocalDecks(false);
  }, []);

  const value = useMemo(
    () => ({
      decks,
      mainDeck,
      isLoading: isLoading || isAuthLoading,
      error,
      refreshDecks,
      saveDeck,
      deleteDeck,
      setMainDeck,
      setDeckPublic: setDeckPublicState,
      migrateFromLocalStorage,
      clearLocalStorage,
      hasLocalDecks,
    }),
    [
      decks,
      mainDeck,
      isLoading,
      isAuthLoading,
      error,
      refreshDecks,
      saveDeck,
      deleteDeck,
      setMainDeck,
      setDeckPublicState,
      migrateFromLocalStorage,
      clearLocalStorage,
      hasLocalDecks,
    ]
  );

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};
