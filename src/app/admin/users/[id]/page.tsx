import { getUserById } from '@/actions/admin'; // ユーザー取得用のActionがあると仮定
import { AdminNav } from '@/feature/Admin/AdminNav';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminUserDetailPage({ params }: Props) {
  // サーバーサイドで安全にIDを取得
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
            {/* ここに詳細なプロフィール情報を追加していく */}
          </dl>
          
          <div className="mt-8 text-gray-500 text-sm">
            ※ユーザーの詳細データ取得ロジックをここに実装してください。
          </div>
        </div>
      </div>
    </div>
  );
}