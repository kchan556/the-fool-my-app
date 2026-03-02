import Link from 'next/link';
import type { Profile } from '@/type/supabase';

// サーバーコンポーネントとして動作させるため 'use client' は不要です
export function IpUserTable({ users }: { users: Profile[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2 px-3">ユーザー</th>
            <th className="py-2 px-3">Discord名</th>
            <th className="py-2 px-3">登録日</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
              <td className="py-2 px-3">
                <Link
                  href={`/admin/users/${user.id}`}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  {user.display_name || '名称未設定'}
                </Link>
              </td>
              <td className="py-2 px-3 text-gray-300">
                {user.discord_username || '-'}
              </td>
              <td className="py-2 px-3 text-gray-400">
                {user.created_at ? new Date(user.created_at).toLocaleDateString('ja-JP') : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}