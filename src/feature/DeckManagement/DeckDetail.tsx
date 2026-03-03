'use client';

import React from 'react';

// デッキ詳細コンポーネント
// 不正な文字コードを排除し、SSRガードを入れた最小構成です。
export const DeckDetail = () => {
  // ✅ SSRガード
  if (typeof window === 'undefined') {
    return <div className="p-8">Loading Deck Details...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">デッキ詳細</h2>
      <div className="border-t pt-4">
        <p className="text-gray-600">デッキの内容を表示中...</p>
      </div>
    </div>
  );
};

export default DeckDetail;