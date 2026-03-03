'use client';

import React, { useState } from 'react';

// デッキビルダー（編集画面）
// 不正な文字コードを物理的に排除した、ガード済みの最小構成です。
export const DeckBuilder = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  // ✅ SSRガード
  if (typeof window === 'undefined') {
    return <div className="min-h-screen p-8 bg-gray-100">Loading Deck Builder...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deck Builder</h1>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
            保存する
          </button>
        </header>
        
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
            <p className="text-gray-500 italic">カード一覧を読み込み中...</p>
          </div>
          <div className="col-span-4 bg-gray-800 text-white p-6 rounded-xl shadow-lg min-h-[600px]">
            <h2 className="text-xl font-bold mb-4">現在のデッキ</h2>
            <p className="text-gray-400">0 / 40 Cards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckBuilder;