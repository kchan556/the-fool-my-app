// 1. Vercelの指示通り、getMyProfile と getMyMatches に修正
import { getMyProfile, getMyMatches } from '@/actions/profile'; 
// 2. 型エラー回避のため、内部パスから notFound をインポート
import { notFound } from 'next/dist/client/components/not-found';
import { Suspense } from 'react';

// --- SafeMatchHistory ---
// 外部の MatchHistory が型エラーを起こすため、ファイル内で安全なものを定義
const SafeMatchHistory = ({ matches, total }: any) => (
  <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-800">
    <h2 className="text-xl font-bold text-white mb-4">対戦履歴 ({total || 0})</h2>
    {!matches || matches.length === 0 ? (
      <p className="text-gray-500">対戦データがありません</p>
    ) : (
      <div className="space-y-3">
        {matches.map((m: any) => (
          <div key={m.id} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">{new Date(m.created_at).toLocaleDateString()}</span>
              <span className="text-xs text-gray-500 font-mono">{m.id.substring(0, 8)}...</span>
            </div>
            <span className={`font-bold px-3 py-1 rounded text-sm ${m.is_win ? "bg-yellow-900/30 text-yellow-400 border border-yellow-800" : "bg-gray-800 text-gray-500 border border-gray-700"}`}>
              {m.is_win ? "WIN" : "LOSE"}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default async function ProfilePage(props: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  // 関数名を getMyProfile に修正
  const profile = await getMyProfile(id); 
  if (!profile) notFound();

  // 関数名を getMyMatches に修正
  const matchData = await getMyMatches(id, page);

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {(profile.display_name || profile.discord_username)[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{profile.display_name || 'ユーザー'}</h1>
              <p className="text-gray-400">@{profile.discord_username}</p>
            </div>
          </div>
        </div>

        {/* インライン化した安全なコンポーネントを使用 */}
        <Suspense fallback={<div className="text-white mt-8 text-center p-12 bg-gray-900 rounded-xl border border-gray-800">読み込み中...</div>}>
          <SafeMatchHistory matches={matchData?.matches || []} total={matchData?.total || 0} />
        </Suspense>
      </div>
    </div>
  );
}