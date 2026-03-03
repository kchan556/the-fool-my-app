'use client';

import React from 'react';
import RoomCreator from '@/feature/RoomCreator';

export default function EntrancePage() {
  // ✅ SSRガード
  if (typeof window === 'undefined') {
    return <div className="min-h-screen flex items-center justify-center">Loading Entrance...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">The Fool Online</h1>
        <RoomCreator />
        <div className="mt-8 text-center text-sm text-gray-500">
          対戦相手を待つか、新しい部屋を作成してください。
        </div>
      </div>
    </main>
  );
}