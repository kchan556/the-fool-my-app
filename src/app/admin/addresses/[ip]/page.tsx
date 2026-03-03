import Link from 'next/link';
import { getUsersByIp } from '@/actions/admin';
import { IpUserTable } from '@/feature/Admin/IpUserTable';
import { Pagination } from '@/component/ui/Pagination';

// サーバーコンポーネントとして動作
export const dynamic = 'force-dynamic';

export default async function IpDetailPage(props: {
  params: Promise<{ ip: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { ip } = await props.params;
  const query = await props.searchParams;
  const page = Math.max(1, Number(query.page) || 1);
  const ipAddress = decodeURIComponent(ip);

  const result = await getUsersByIp(ipAddress, { page });
  const totalPages = Math.ceil(result.total / 50);

  // 1. 型エラーを解消するために、ネストされた profile を取り出して配列を整形
  const usersForTable = result.users
    .map((u) => u.profile)
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/addresses"
        className="text-indigo-400 hover:text-indigo-300 text-sm inline-block"
      >
        &larr; 接続IPログへ戻る
      </Link>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            IPアドレス: <span className="font-mono">{ipAddress}</span>
          </h2>
          <p className="text-gray-400 text-sm">{result.total}件のログが見つかりました</p>
        </div>

        {usersForTable.length === 0 ? (
          <div className="text-gray-400 py-8 text-center bg-gray-900/50 rounded border border-gray-700">
            該当するユーザープロフィールが見つかりません
          </div>
        ) : (
          <>
            {/* 2. 整形済みのデータを渡す */}
            <IpUserTable users={usersForTable} />
            <Pagination
              basePath={`/admin/addresses/${encodeURIComponent(ipAddress)}`}
              currentPage={page}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
}