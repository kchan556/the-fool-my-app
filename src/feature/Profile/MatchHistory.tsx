'use client';

import React from 'react';

export const MatchHistory = () => {
  // ✅ SSRガード：ビルド時はローディング表示で逃げる
  if (typeof window === 'undefined') {
    return <div className="p-4 text-gray-500">Loading match history...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">対戦履歴</h3>
      <p className="text-sm text-gray-600">対戦データはありません。</p>
    </div>
  );
};

export default MatchHistory;