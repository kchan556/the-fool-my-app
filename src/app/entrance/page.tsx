'use client'; // ページ自体をクライアントコンポーネントにします

import { RoomCreator } from '@/feature/RoomCreator';
import { RoomEntrance } from '@/feature/RoomEntrance';
import { Matching } from '@/feature/Matching';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// EntranceMenu は SSR を完全にオフにする
const EntranceMenu = dynamic(
  () => import('@/feature/EntranceMenu').then((mod) => mod.EntranceMenu),
  { ssr: false }
);

export default function Page() {
  // サーバーサイド専用の metadata は 'use client' では使えないので削除しました
  
  return (
    <div className="space-y-4 m-4">
      <Link
        href={'/builder'}
        className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        デッキ編集
      </Link>
      
      <EntranceMenu />

      <Matching />
      
      <div className="space-y-8">
        <RoomCreator />
        <RoomEntrance />
      </div>
    </div>
  );
}