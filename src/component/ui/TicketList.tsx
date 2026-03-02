import type { Ticket } from '@/type/supabase';

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return <div className="text-gray-400">繝√こ繝・ヨ縺後≠繧翫∪縺帙ｓ</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="text-left py-2">繧ｳ繝ｼ繝・/th>
            <th className="text-left py-2">繧ｯ繝ｬ繧ｸ繝・ヨ</th>
            <th className="text-left py-2">迥ｶ諷・/th>
            <th className="text-left py-2">譛牙柑譛滄剞</th>
            <th className="text-left py-2">菴懈・譌･</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id} className="border-b border-gray-700">
              <td className="py-2">
                <code className="text-green-400 font-mono">{ticket.code}</code>
              </td>
              <td className="py-2 text-white">{ticket.credits}</td>
              <td className="py-2">
                {ticket.owner_id ? (
                  <span className="text-gray-400">菴ｿ逕ｨ貂医∩</span>
                ) : ticket.expires_at && new Date(ticket.expires_at) < new Date() ? (
                  <span className="text-red-400">譛滄剞蛻・ｌ</span>
                ) : (
                  <span className="text-green-400">譛牙柑</span>
                )}
              </td>
              <td className="py-2 text-gray-400">
                {ticket.expires_at
                  ? new Date(ticket.expires_at).toLocaleDateString('ja-JP')
                  : '辟｡譛滄剞'}
              </td>
              <td className="py-2 text-gray-400">
                {new Date(ticket.created_at).toLocaleDateString('ja-JP')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
