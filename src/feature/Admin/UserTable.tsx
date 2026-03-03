'use client';

import React from 'react';

// 管理画面用ユーザーテーブル
// 不正な文字コードを物理的に排除した、ガード済みの最小構成です。
export const UserTable = () => {
  // ✅ SSRガード
  if (typeof window === 'undefined') {
    return (
      <div className="p-4 border border-gray-200 rounded-lg">
        Loading User Table...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 text-sm text-gray-500" colSpan={3}>
              ユーザーデータはブラウザでのみ表示可能です。
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;