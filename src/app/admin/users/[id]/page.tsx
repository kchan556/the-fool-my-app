'use client'; // 👈 これを追加してブラウザで動くことを明示します

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function AdminUserDetailPage() {
  const params = useParams();
  const userId = params.id;
  const [mounted, setMounted] = useState(false);

  // マウント（ブラウザでの準備完了）を待つ
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-8 text-white">Loading user details...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">ユーザー詳細</h1>
      <p className="text-gray-400">ユーザーID: {userId}</p>
      {/* ここに詳細コンテンツ */}
    </div>
  );
}