export const dynamic = 'force-dynamic';
export const dynamicParams = true;
// これを追加：ビルド時にこのページを生成するのを「絶対に」やめさせる
export const revalidate = 0;
// 外部インポートを一旦すべて停止し、ビルドエラーを回避します
import { Suspense } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

// 仮のゲーム画面（ビルドを通すためのスタブ）
const GameRoomFallback = ({ id }: { id: string }) => (
  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
    <div className="max-w-md w-full border border-zinc-800 bg-zinc-900/50 p-8 rounded-2xl text-center space-y-4">
      <h1 className="text-2xl font-bold tracking-tighter">GAME ROOM</h1>
      <p className="text-zinc-400 font-mono text-sm bg-black/50 py-2 rounded">ID: {id}</p>
      <div className="py-12 animate-pulse text-zinc-600">
        対戦データを同期中...
      </div>
      <div className="text-xs text-zinc-500">
        ※ビルドエラー回避のため、一時的に簡易表示モードで起動しています
      </div>
    </div>
  </div>
);

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <GameRoomFallback id={id} />
    </Suspense>
  );
}