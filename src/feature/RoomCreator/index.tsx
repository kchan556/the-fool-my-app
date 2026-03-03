'use client';

import React, { useState } from 'react';

export const RoomCreator = () => {
  const [roomName, setRoomName] = useState('');

  // ✅ SSRガード
  if (typeof window === 'undefined') {
    return <div className="p-4 border rounded">Loading Room Creator...</div>;
  }

  const handleCreate = () => {
    // ここに作成ロジック
    console.log('Creating room:', roomName);
  };

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4">部屋を作成する</h2>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        placeholder="部屋名を入力..."
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        作成
      </button>
    </div>
  );
};

export default RoomCreator;