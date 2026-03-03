'use client';

import Link from 'next/link';

// 1. まず、受け取るデータの型を定義します
interface User {
  id: string;
  discord_id: string;
  discord_username: string;
  display_name: string | null;
  avatar_url: string | null;
  is_admin: boolean | null;
  created_at: string;
}

interface UserTableProps {
  users: User[];
}

// 2. コンポーネントが props (users) を受け取れるように修正します
export const UserTable = ({ users }: UserTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400 text-sm">
            <th className="py-2 px-4">ユーザー</th>
            <th className="py-2 px-4">Discord ID</th>
            <th className="py-2 px-4">権限</th>
            <th className="py-2 px-4">登録日</th>
            <th className="py-2 px-4">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="text-gray-300 hover:bg-gray-700/50">
              <td className="py-3 px-4">
                <div className="font-medium">{user.display_name || user.discord_username}</div>
                <div className="text-xs text-gray-500 font-mono">{user.id}</div>
              </td>
              <td className="py-3 px-4 font-mono text-sm">{user.discord_id}</td>
              <td className="py-3 px-4">
                {user.is_admin ? (
                  <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded border border-purple-800">
                    Admin
                  </span>
                ) : (
                  <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">
                    User
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-sm text-gray-500">
                {new Date(user.created_at).toLocaleDateString('ja-JP')}
              </td>
              <td className="py-3 px-4">
                <Link
                  href={`/admin/users/${user.id}`}
                  className="text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  詳細
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};