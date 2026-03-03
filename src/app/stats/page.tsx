export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';

export default function StatsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">統計</h1>
      <Link href="/" className="text-blue-500 hover:underline">ホームに戻る</Link>
      <p className="mt-4">統計データは現在準備中です。</p>
    </div>
  );
}