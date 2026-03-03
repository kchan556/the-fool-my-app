'use client'; // 👈 クライアントコンポーネントであることを明示

import { useEffect, useState } from 'react';

export default function EntrancePage() {
  const [isMounted, setIsMounted] = useState(false);

  // コンポーネントがブラウザに表示（マウント）されたら実行
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // サーバーサイド（またはマウント前）の表示
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading Entrance...
      </div>
    );
  }

  // ここから先は確実にブラウザ（windowが存在する世界）
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter">THE FOOL</h1>
        <p className="text-gray-400">エントランスへようこそ</p>
        
        <div className="p-12 border border-gray-800 rounded-2xl bg-gray-900/50">
          {/* ここにログインボタンや遷移ボタンを配置 */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg font-bold transition-all">
            ゲームを開始する
          </button>
        </div>
      </div>
    </div>
  );
}