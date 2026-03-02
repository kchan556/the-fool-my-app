import Link from 'next/link';
import { Pagination } from '@/component/ui/Pagination';
import { DeckFullPreview } from '@/feature/Profile/DeckFullPreview';
import type { MatchWithOpponent } from '@/actions/profile';

function ResultBadge({ result }: { result: 'win' | 'lose' | 'unknown' }) {
  const styles = {
    win: 'bg-blue-100 text-blue-800',
    lose: 'bg-red-100 text-red-800',
    unknown: 'bg-gray-100 text-gray-800',
  };
  const labels = {
    win: '蜍晏茜',
    lose: '謨怜圏',
    unknown: '荳肴・',
  };

  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${styles[result]}`}>
      {labels[result]}
    </span>
  );
}

function MatchingModeBadge({ mode }: { mode: string | null }) {
  if (!mode) return <span className="text-gray-400 text-xs">-</span>;
  return <span className="text-xs text-gray-600">{mode}</span>;
}

export function MatchHistory({
  matches,
  total,
  currentPage,
  basePath,
}: {
  matches: MatchWithOpponent[];
  total: number;
  currentPage: number;
  basePath: string;
}) {
  const totalPages = Math.ceil(total / 20);
  const profileLinkPrefix = basePath.startsWith('/admin/') ? '/admin/users/' : '/profile/';

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">蟇ｾ謌ｦ螻･豁ｴ ({total}莉ｶ)</h3>
      </div>

      {matches.length === 0 ? (
        <div className="p-8 text-center text-gray-500">蟇ｾ謌ｦ螻･豁ｴ縺後≠繧翫∪縺帙ｓ</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    譌･譎・
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    邨先棡
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                    遞ｮ蛻･
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                    R謨ｰ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                    蜈・蠕・
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    蟇ｾ謌ｦ逶ｸ謇・
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                    閾ｪ蛻・・繝・ャ繧ｭ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                    逶ｸ謇九・繝・ャ繧ｭ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {matches.map(match => (
                  <tr key={match.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {match.started_at || match.ended_at
                        ? new Date(match.started_at ?? match.ended_at ?? '').toLocaleString(
                            'ja-JP',
                            {
                              month: 'numeric',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )
                        : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <ResultBadge result={match.result} />
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <MatchingModeBadge mode={match.matching_mode} />
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-sm text-gray-600">{match.total_rounds ?? '-'}</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className={`text-xs font-medium ${match.me.is_first_player ? 'text-blue-600' : 'text-red-600'}`}
                      >
                        {match.me.is_first_player ? '蜈域判' : '蠕梧判'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {match.opponent.id ? (
                        <Link
                          href={`${profileLinkPrefix}${match.opponent.id}`}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {match.opponent.name || '荳肴・'}
                        </Link>
                      ) : (
                        <span className="text-sm text-gray-900">
                          {match.opponent.name || '荳肴・'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <DeckFullPreview deck={match.me.deck} isOwns={true} />
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <DeckFullPreview deck={match.opponent.deck} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <Pagination basePath={basePath} currentPage={currentPage} totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}
