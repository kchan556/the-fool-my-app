'use client';

import { useCallback, useMemo } from 'react';
import { Button } from '@/component/interface/button';
import { useDeck } from '@/hooks/deck';
import type { MatchingMode } from '@/submodule/suit/types/message/payload/server';
import master from '@/submodule/suit/catalog/catalog';
import { useOriginalityMap } from '@/hooks/originality';
import { Tooltip } from 'react-tooltip';

interface ModeInfo {
  mode: MatchingMode;
  label: string;
  description: string;
}

const MODES: ModeInfo[] = [
  {
    mode: 'freedom',
    label: 'FREEDOM',
    description: '蛻ｶ髯舌↑縺励ょ・繧ｫ繝ｼ繝我ｽｿ逕ｨ蜿ｯ閭ｽ縲・,
  },
  {
    mode: 'standard',
    label: 'STANDARD',
    description: 'Ver.1.2莉･髯阪・繧ｫ繝ｼ繝峨・縺ｿ縲ょ酔蜷阪き繝ｼ繝・譫壹∪縺ｧ縲・,
  },
  {
    mode: 'legacy',
    label: 'LEGACY',
    description: 'Ver.1.4EX3莉･蜑阪・繝ｫ繝ｼ繝ｫ・上き繝ｼ繝峨・繝ｼ繝ｫ縺ｫ貅匁侠縲・,
  },
  {
    mode: 'limited',
    label: 'LIMITED',
    description: '繝・ャ繧ｭ蜷郁ｨ医が繝ｪ繧ｸ繝翫Μ繝・ぅ100莉･荳雁ｿ・医・,
  },
];

interface Props {
  onSelectMode: (mode: MatchingMode) => void;
  onCancel: () => void;
  isLoading: boolean;
  queueCounts: Record<MatchingMode, number>;
  activeGames: number;
}

// 繧､繝ｳ繧ｸ繧ｱ繝ｼ繧ｿ縺ｮ濶ｲ繧呈ｱｺ螳・
const getIndicatorColor = (isValid: boolean, queueCount: number): string => {
  if (queueCount > 0) {
    return isValid ? 'bg-green-500' : 'bg-orange-500';
  }
  return isValid ? 'bg-gray-400' : 'bg-red-500';
};

// 繧､繝ｳ繧ｸ繧ｱ繝ｼ繧ｿ縺ｮ繝・・繝ｫ繝√ャ繝励ｒ豎ｺ螳・
const getIndicatorTooltip = (isValid: boolean, queueCount: number): string => {
  if (!isValid) return '繝・ャ繧ｭ譚｡莉ｶ荳埼←蜷・;
  if (queueCount > 0) return `蠕・ｩ滉ｸｭ: ${queueCount}莠ｺ`;
  return '蠕・ｩ滉ｸｭ: 0莠ｺ';
};

export const ModeSelector = ({
  onSelectMode,
  onCancel,
  isLoading,
  queueCounts,
  activeGames,
}: Props) => {
  const { mainDeck, isLoading: isDeckLoading } = useDeck();
  const { opMap } = useOriginalityMap();

  const deckValidation = useMemo<Record<MatchingMode, boolean>>(() => {
    if (!mainDeck) {
      return {
        freedom: false,
        standard: false,
        legacy: false,
        limited: false,
      };
    }
    return {
      freedom: true,
      standard: !mainDeck.cards.some(cardId => (master.get(cardId)?.info.version ?? 0) < 6),
      legacy: !mainDeck.cards.some(cardId => (master.get(cardId)?.info.version ?? 0) > 14),
      limited:
        [...(mainDeck.jokers ?? []), ...mainDeck.cards].reduce(
          (sum, cardId) => (opMap[cardId] ?? 0) + sum,
          0
        ) >= 100,
    };
  }, [mainDeck, opMap]);

  const handleSelectMode = useCallback(
    (mode: MatchingMode) => {
      if (!mainDeck) return;
      if (!deckValidation[mode]) return;
      onSelectMode(mode);
    },
    [mainDeck, deckValidation, onSelectMode]
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 text-center">繝槭ャ繝√Φ繧ｰ繝｢繝ｼ繝蛾∈謚・/h3>

      {!mainDeck && !isDeckLoading && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700 text-sm">
            繝｡繧､繝ｳ繝・ャ繧ｭ縺瑚ｨｭ螳壹＆繧後※縺・∪縺帙ｓ縲ゅョ繝・く邱ｨ髮・判髱｢縺ｧ繝｡繧､繝ｳ繝・ャ繧ｭ繧定ｨｭ螳壹＠縺ｦ縺上□縺輔＞縲・
          </p>
        </div>
      )}

      <div className="text-center text-gray-400">迴ｾ蝨ｨ{activeGames}邨・′蟇ｾ謌ｦ荳ｭ縺ｧ縺・/div>

      <div className="grid grid-cols-1 gap-3">
        {MODES.map(({ mode, label, description }) => {
          const isValid = deckValidation[mode];
          const isDisabled = !mainDeck || !isValid || isLoading || isDeckLoading;
          const isDeckInvalid = !!mainDeck && !isValid;

          return (
            <button
              key={mode}
              onClick={() => handleSelectMode(mode)}
              disabled={isDisabled}
              className={`
                relative p-4 rounded-lg border-2 text-left transition-all
                ${
                  isDisabled
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : 'bg-white border-gray-300 hover:border-indigo-500 hover:shadow-md cursor-pointer'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-800">{label}</span>
                  <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
                <div
                  className={`
                    w-5 h-5 rounded-full flex-shrink-0 ml-3
                    ${getIndicatorColor(isValid, queueCounts[mode])}
                  `}
                  title={getIndicatorTooltip(isValid, queueCounts[mode])}
                  data-tooltip-id={mode}
                />
                <Tooltip id={mode}>
                  {isDeckInvalid && (
                    <>
                      繝・ャ繧ｭ縺梧擅莉ｶ繧呈ｺ縺溘＠縺ｦ縺・∪縺帙ｓ
                      <br />
                    </>
                  )}
                  {queueCounts[mode] > 0
                    ? '繝槭ャ繝√Φ繧ｰ蠕・■縺ｮ繝励Ξ繧､繝､繝ｼ縺後＞縺ｾ縺呻ｼ・
                    : '繝槭ャ繝√Φ繧ｰ蠕・■縺ｮ繝励Ξ繧､繝､繝ｼ縺ｯ縺・∪縺帙ｓ'}
                </Tooltip>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          繧ｭ繝｣繝ｳ繧ｻ繝ｫ
        </Button>
      </div>
    </div>
  );
};
