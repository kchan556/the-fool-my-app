// インポート名を Vercel の指示通り getMyProfile と getMyMatches に修正
import { getMyProfile, getMyMatches } from '@/actions/profile'; 
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// --- SafeMatchHistory ---
const SafeMatchHistory = ({ matches, total }: any) => (
  <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-800">
    <h2 className="text-xl font-bold text-white mb-4">対戦履歴 ({total})</h2>
    {!matches || matches.length === 0 ? (
      <p className="text-gray-500">対戦データがありません</p>
    ) : (
      <div className="space-y-3">
        {matches.map((m: any) => (
          <div key={m.id} className="p-4 bg-gray-800 rounded-lg flex justify-between">
            <span>{new Date(m.created_at).toLocaleDateString()}</span>
            <span className={m.is_win ? "text-yellow-400" : "text-gray-400"}>
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

  // 関数名を修正
  const profile = await getMyProfile(id); 
  if (!profile) notFound();

  // 関数名を修正
  const matchData = await getMyMatches(id, page);

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h1 className="text-3xl font-bold text-white">{profile.display_name || 'ユーザー'}</h1>
          <p className="text-gray-400">@{profile.discord_username}</p>
        </div>

        <Suspense fallback={<div className="text-white mt-8">Loading history...</div>}>
          <SafeMatchHistory matches={matchData?.matches || []} total={matchData?.total || 0} />
        </Suspense>
      </div>
    </div>
  );
}