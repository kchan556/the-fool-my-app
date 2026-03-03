import { getTickets } from '@/actions/admin';
import { TicketList } from '@/component/ui/TicketList';
import { AdminNav } from '@/feature/Admin/AdminNav';

export const dynamic = 'force-dynamic';

export default async function AdminTicketsPage() {
  const result = await getTickets();

  // TicketList が期待する型 (isUsed, createdAt) にデータを整形
  const formattedTickets = result.tickets.map(t => ({
    id: t.id,
    code: t.code,
    // redeemed_at が存在すれば「使用済み」と判定
    isUsed: !!t.redeemed_at,
    // 表示用の日付文字列に変換
    createdAt: t.created_at,
  }));

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">チケット管理</h1>
        <AdminNav />

        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">発行済みチケット一覧</h2>
            <span className="text-gray-400 text-sm">{result.total} 件</span>
          </div>

          {/* 整形したデータを渡す */}
          <TicketList tickets={formattedTickets} />
        </div>
      </div>
    </div>
  );
}