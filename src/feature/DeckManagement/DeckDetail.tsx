'use client';

import { useState } from 'react';

// 1. Propsの型定義を追加
interface DeckBuilderProps {
  implementedIds: string[];
  opMap: Record<string, number>;
}

// 2. Propsを受け取るように修正
export const DeckBuilder = ({ implementedIds, opMap }: DeckBuilderProps) => {
  // コンポーネントのロジック
  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">デッキビルダー</h2>
      <p className="text-sm text-gray-400">実装済みカード: {implementedIds.length}種類</p>
      {/* 既存のビルダーUI */}
      <div className="mt-4 border border-gray-700 p-6 rounded text-center">
        デッキ構築エリア
      </div>
    </div>
  );
};