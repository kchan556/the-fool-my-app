'use client';

import { Button } from '@/component/interface/button';
import type { MatchingMode } from '@/submodule/suit/types/message/payload/server';

const MODE_LABELS: Record<MatchingMode, string> = {
  freedom: '繝輔Μ繝ｼ繝繝',
  standard: '繧ｹ繧ｿ繝ｳ繝繝ｼ繝・,
  legacy: '繝ｬ繧ｬ繧ｷ繝ｼ',
  limited: '繝ｪ繝溘ユ繝・ラ',
};

interface Props {
  mode: MatchingMode;
  position: number | null;
  onCancel: () => void;
  isCanceling: boolean;
}

export const WaitingScreen = ({ mode, position, onCancel, isCanceling }: Props) => {
  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">繝槭ャ繝√Φ繧ｰ荳ｭ...</h3>
        <p className="text-sm text-gray-500">
          繝｢繝ｼ繝・ <span className="font-medium text-gray-700">{MODE_LABELS[mode]}</span>
        </p>
        {position !== null && (
          <p className="text-sm text-gray-500 mt-1">
            蠕・ｩ滄・ｽ・ <span className="font-medium text-gray-700">{position}</span>
          </p>
        )}
      </div>

      {/* Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600" />
      </div>

      <p className="text-sm text-gray-400">蟇ｾ謌ｦ逶ｸ謇九ｒ謗｢縺励※縺・∪縺・..</p>

      <Button type="button" variant="secondary" onClick={onCancel} disabled={isCanceling}>
        {isCanceling ? '繧ｭ繝｣繝ｳ繧ｻ繝ｫ荳ｭ...' : '繧ｭ繝｣繝ｳ繧ｻ繝ｫ'}
      </Button>
    </div>
  );
};
