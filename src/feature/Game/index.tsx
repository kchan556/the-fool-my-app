'use client';

import React from 'react';

// ゲーム画面のメインコンポーネント
// 今はビルドを通すために最小構成にしていますが、
// デプロイ成功後に中身を戻していきましょう。
export const Game = () => {
  // ✅ SSRガード
  if (typeof window === 'undefined') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        Loading Game Engine...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden text-white p-4">
      <div className="max-w-6xl mx-auto border border-slate-700 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">The Fool - Battle Field</h1>
        <div className="aspect-video bg-slate-800 rounded flex items-center justify-center border border-dashed border-slate-600">
          <p className="text-slate-400 text-lg">Game Initializing...</p>
        </div>
      </div>
    </div>
  );
};

export default Game;