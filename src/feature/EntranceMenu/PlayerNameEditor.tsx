'use client';

import { useState, useEffect } from 'react';
import { LocalStorageHelper } from '@/service/local-storage';
import { useAuth } from '@/hooks/auth/hooks';

export const PlayerNameEditor = () => {
  const { user } = useAuth();
  const [playerName, setPlayerName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const name = LocalStorageHelper.playerName();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Mount-time initialization from localStorage
    setPlayerName(name);
    setTempName(name);
  }, []);

  // Discordログイン中かどぁE��
  const isDiscordLoggedIn = !!user;
  const discordName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.user_metadata?.preferred_username;

  const handleStartEdit = () => {
    setIsEditing(true);
    setTempName(playerName);
  };

  const handleSave = () => {
    if (tempName.trim() === '') {
      alert('プレイヤー名を入力してください、E);
      return;
    }

    LocalStorageHelper.setPlayerName(tempName.trim());
    setPlayerName(tempName.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(playerName);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Discordログイン中は編雁E��可で表示のみ
  if (isDiscordLoggedIn && discordName) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">プレイヤー吁E/h3>
        <div className="text-white text-lg">{discordName}</div>
        <div className="text-sm text-gray-400 mt-1">Discordアカウントから取征E/div>
      </div>
    );
  }

  // 未ログイン時�E従来の編雁E��能UI
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-3">プレイヤー吁E/h3>
      {isEditing ? (
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={tempName}
            onChange={e => setTempName(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="プレイヤー名を入劁E
            autoFocus
            maxLength={20}
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            保孁E
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            キャンセル
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-white text-lg">{playerName || 'エージェント候補生'}</span>
          <button
            onClick={handleStartEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            編雁E
          </button>
        </div>
      )}
    </div>
  );
};
