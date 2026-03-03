'use client';

import master from '@/submodule/suit/catalog/catalog';
import type { IAtom, ICard, IDelta } from '@/submodule/suit/types';
import Image from 'next/image';
import { useSystemContext } from '@/hooks/system/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import keywordsData from '@/submodule/suit/catalog/keywords.json';
import { Tooltip } from 'react-tooltip';

interface CardDetailWindowProps {
  card?: ICard;
  atom?: IAtom;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CardDetailWindow = ({ card, atom, isOpen, setIsOpen }: CardDetailWindowProps) => {
  if (!isOpen) return null;

  // 型エラー回避のため as any を使用してプロパティにアクセスします
  const displayName = (card as any)?.name || (atom as any)?.name || 'カード詳細';
  const displayDescription = (card as any)?.description || (atom as any)?.description || '説明はありません。';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-white">{displayName}</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="aspect-[3/4] bg-zinc-800 rounded-xl mb-6 flex items-center justify-center border border-zinc-700">
             <span className="text-zinc-600">Image Preview</span>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed">
            {displayDescription}
          </p>
        </div>
        
        <div className="bg-zinc-950 p-4 border-t border-zinc-800 flex justify-end">
          <button 
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};