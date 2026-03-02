'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTickets, type CreateTicketRequest } from '@/actions/admin';

export function TicketCreateForm() {
  const router = useRouter();
  const [newTicketCredits, setNewTicketCredits] = useState(10);
  const [newTicketCount, setNewTicketCount] = useState(1);
  const [newTicketExpiry, setNewTicketExpiry] = useState<'30days' | '90days' | 'never'>('30days');
  const [createdTickets, setCreatedTickets] = useState<{ id: string; code: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateTickets = async () => {
    setError(null);
    setSuccessMessage(null);
    setCreatedTickets([]);

    const expiresAt =
      newTicketExpiry === 'never'
        ? null
        : newTicketExpiry === '90days'
          ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const request: CreateTicketRequest = {
      credits: newTicketCredits,
      count: newTicketCount,
      expiresAt,
    };

    const result = await createTickets(request);
    if (result.success) {
      setCreatedTickets(result.tickets);
      setSuccessMessage(`${result.tickets.length}莉ｶ縺ｮ繝√こ繝・ヨ繧堤匱陦後＠縺ｾ縺励◆`);
      router.refresh();
    } else {
      setError(result.message ?? '繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccessMessage('繧ｳ繝斐・縺励∪縺励◆');
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch {
      setError('繧ｳ繝斐・縺ｫ螟ｱ謨励＠縺ｾ縺励◆');
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-600 text-red-200 rounded-md">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-900 border border-green-600 text-green-200 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-white mb-4">繝√こ繝・ヨ逋ｺ陦・/h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">繧ｯ繝ｬ繧ｸ繝・ヨ謨ｰ</label>
            <input
              type="number"
              min="1"
              max="1000"
              value={newTicketCredits}
              onChange={e => setNewTicketCredits(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">逋ｺ陦梧椢謨ｰ</label>
            <input
              type="number"
              min="1"
              max="100"
              value={newTicketCount}
              onChange={e => setNewTicketCount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">譛牙柑譛滄剞</label>
            <select
              value={newTicketExpiry}
              onChange={e => setNewTicketExpiry(e.target.value as '30days' | '90days' | 'never')}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            >
              <option value="30days">30譌･髢・/option>
              <option value="90days">90譌･髢・/option>
              <option value="never">辟｡譛滄剞</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCreateTickets}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              逋ｺ陦・
            </button>
          </div>
        </div>

        {/* 逋ｺ陦後＆繧後◆繝√こ繝・ヨ */}
        {createdTickets.length > 0 && (
          <div className="mt-4 p-4 bg-gray-700 rounded-md">
            <h3 className="text-white font-medium mb-2">逋ｺ陦後＆繧後◆繝√こ繝・ヨ繧ｳ繝ｼ繝・</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {createdTickets.map(ticket => (
                <div key={ticket.id} className="flex items-center gap-2">
                  <code className="flex-1 px-2 py-1 bg-gray-800 text-green-400 rounded font-mono">
                    {ticket.code}
                  </code>
                  <button
                    onClick={() => copyToClipboard(ticket.code)}
                    className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
                  >
                    繧ｳ繝斐・
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => copyToClipboard(createdTickets.map(t => t.code).join('\n'))}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              蜈ｨ縺ｦ繧ｳ繝斐・
            </button>
          </div>
        )}
      </div>
    </>
  );
}
