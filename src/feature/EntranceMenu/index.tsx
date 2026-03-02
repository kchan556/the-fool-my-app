'use client';

import React from 'react';
import Link from 'next/link';
import { useDeck } from '@/hooks/deck';
import { useOriginalityMap } from '@/hooks/originality';
import { originality } from '@/helper/originality';

export const EntranceMenu = () => {
  const { decks, mainDeck } = useDeck();
  const { opMap, isLoading } = useOriginalityMap();

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-6">
      <Link
        href="/matching"
        className="block w-full py-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
      >
        対戦を開始する
      </Link>
      
      <Link
        href="/builder"
        className="block w-full py-4 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
      >
        デッキを作る
      </Link>

      <Link
        href="/deck"
        className="block w-full py-4 text-center bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
      >
        デッキ管理
      </Link>

      {mainDeck && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm">現在のメインデッキ</p>
          <p className="text-white font-medium">{mainDeck.title}</p>
          <p className="text-blue-400 text-xs mt-1">
            Originality: {isLoading ? '...' : originality([...mainDeck.cards, ...(mainDeck.jokers ?? [])], opMap)}P
          </p>
        </div>
      )}
    </div>
  );
};