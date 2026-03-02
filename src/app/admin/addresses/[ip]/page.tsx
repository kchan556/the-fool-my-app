import Link from 'next/link';
import { getUsersByIp } from '@/actions/admin';
import { IpUserTable } from '@/feature/Admin/IpUserTable';
import { Pagination } from '@/component/ui/Pagination';

// 'use client'; は消しました（サーバーコンポーネントとして動作させます）

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

  return (
    <div className="space-y-6">
      <Link
        href="/admin/addresses"
        className="text-indigo-400 hover:text-indigo-300 text-sm inline-block"
      >
        &larr; 接続IPログへ戻る
      </Link>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-white mb-1">
          IPアドレス: <span className="font-mono">{ipAddress}</span>
        </h2>
        <p className="text-gray-400 text-sm mb-4">{result.total}人のユーザーが使用</p>

        {result.users.length === 0 ? (
          <div className="text-gray-400">該当するユーザーがいません</div>
        ) : (
          <>
            <IpUserTable users={result.users} />
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