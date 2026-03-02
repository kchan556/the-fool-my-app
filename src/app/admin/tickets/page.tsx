import { getTickets } from '@/actions/admin';
import { TicketCreateForm } from '@/feature/Admin/TicketCreateForm';
import { TicketFilterToggle } from '@/feature/Admin/TicketFilterToggle';
import { TicketList } from '@/component/ui/TicketList';

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ showUsed?: string }>;
}) {
  const params = await searchParams;
  const showUsed = params.showUsed !== 'false';
  const result = await getTickets({ showUsed });

  return (
    <div className="space-y-6">
      <TicketCreateForm />

      {/* チケチE��一覧 */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">チケチE��一覧 ({result.total}件)</h2>
          <TicketFilterToggle showUsed={showUsed} />
        </div>

        <TicketList tickets={result.tickets} />
      </div>
    </div>
  );
}
