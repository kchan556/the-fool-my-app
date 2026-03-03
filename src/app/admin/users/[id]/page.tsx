// 存在しない getUserById のインポートを削除しました
import { AdminNav } from '@/feature/Admin/AdminNav';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminUserDetailPage({ params }: Props) {
  // params を await して ID を取得
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">ユーザー詳細</h1>
        <AdminNav />
        
        <div className="mt-6 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">基本情報</h2>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-gray-400 text-sm">ユーザーID</dt>
              <dd className="font-mono bg-gray-900 p-2 rounded mt-1">{id}</dd>
            </div>
          </dl>
          
          <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded text-blue-200 text-sm">
            💡 現在、詳細データの取得ロジックを調整中です。
          </div>
        </div>
      </div>
    </div>
  );
}