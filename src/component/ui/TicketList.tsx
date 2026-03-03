'use client';

interface Ticket {
  id: string;
  code: string;
  isUsed: boolean;
  createdAt: string;
}

interface TicketListProps {
  tickets: Ticket[];
}

export const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        表示できるチケットがありません。
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400 text-sm">
            <th className="py-2 px-4">コード</th>
            <th className="py-2 px-4">ステータス</th>
            <th className="py-2 px-4">作成日</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="text-gray-300">
              <td className="py-3 px-4 font-mono text-indigo-400">{ticket.code}</td>
              <td className="py-3 px-4">
                {ticket.isUsed ? (
                  <span className="px-2 py-1 bg-red-900/30 text-red-400 text-xs rounded border border-red-800">
                    使用済み
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded border border-green-800">
                    未使用
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-sm text-gray-500">
                {new Date(ticket.createdAt).toLocaleDateString('ja-JP')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};