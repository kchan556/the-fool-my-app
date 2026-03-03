'use client';

import React from 'react';

export default function AdminUserDetailPage() {
  // ✅ SSRガード
  if (typeof window === 'undefined') {
    return <div className="p-8">Loading user details...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ユーザー管理画面</h1>
      <div className="bg-white p-6 rounded shadow">
        <p>ユーザー情報の詳細は、ブラウザでのみ閲覧可能です。</p>
      </div>
    </div>
  );
}