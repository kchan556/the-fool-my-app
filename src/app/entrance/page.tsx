import { RoomCreator } from '@/feature/RoomCreator';
import { RoomEntrance } from '@/feature/RoomEntrance';
// ❌ 普通のインポートをやめる
// import { EntranceMenu } from '@/feature/EntranceMenu';
import { Matching } from '@/feature/Matching';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getMyProfile } from '@/actions/profile';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic'; // ← これを追加

// ✅ EntranceMenu を「ブラウザ専用」として読み込む
const EntranceMenu = dynamic(
  () => import('@/feature/EntranceMenu').then((mod) => mod.EntranceMenu),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Entrance',
};

export default async function Page() {
  const profileData = process.env.DISABLE_AUTH === 'true' ? 'SKIP' : await getMyProfile();

  if (!profileData) {
    redirect('/login');
  }

  return (
    <>
      <div className="space-y-4 m-4">
        <Link
          href={'/builder'}
          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          デッキ編集
        </Link>
        
        {/* ブラウザでしか動かない EntranceMenu */}
        <EntranceMenu />

        {process.env.DISABLE_AUTH !== 'true' && <Matching />}
        {process.env.DISABLE_ROOM_CREATION === 'true' ? (
          <div className="max-w-lg mx-auto text-center p-3 my-3 bg-red-900 border border-red-600 rounded-md">
            <p className="text-red-200 text-sm">
              現在公式サーバ上ではルーム作成機能を提供しておりません
              <br />
              ランダムマッチングをお楽しみください
            </p>
          </div>
        ) : (
          <>
            <RoomCreator />
            <RoomEntrance />
          </>
        )}
      </div>
    </>
  );
}