'use client';

import React from 'react';

interface DeckFullPreviewProps {
  deck?: any;
}

// デッキのプレビューを表示するコンポーネント
// 不正な文字コードを物理的に排除し、SSRガードを入れた最小構成です。
export const DeckFullPreview = ({ deck }: DeckFullPreviewProps) => {
  // ✅ SSRガード
  if (typeof window === 'undefined') {
    return <div className="text-xs text-gray-400">Loading deck...</div>;
  }

  if (!deck) {
    return <span className="text-xs text-gray-400">デッキなし</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <div className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] text-gray-600">
        {deck.name || '名称未設定デッキ'}
      </div>
      <span className="text-[10px] text-gray-400">
        ({Array.isArray(deck.cards) ? deck.cards.length : 0}枚)
      </span>
    </div>
  );
};

export default DeckFullPreview;