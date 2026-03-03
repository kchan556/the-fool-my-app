'use client';

import React from 'react';
import { Tooltip } from 'react-tooltip';
import keywordsData from '../../submodule/suit/catalog/keywords.json';
// 修正ポイント： "type" を追加。これで verbatimModuleSyntax をパスします。
import type { IDelta } from '@/submodule/suit/types';

interface BattleIconsViewProps {
  delta?: IDelta[];
}

export const BattleIconsView = ({ delta }: BattleIconsViewProps) => {
  if (!delta || delta.length === 0) return null;

  const getKeywordDesc = (type: string) => {
    const data = (keywordsData as any)[type];
    return data ? `${data.name}: ${data.description}` : type;
  };

  return (
    <div className="flex flex-wrap gap-1">
      {delta.map((d: any, i: number) => (
        <div 
          key={i}
          className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-white font-bold cursor-help"
          data-tooltip-id="battle-icon-tooltip"
          data-tooltip-content={getKeywordDesc(d.type)}
        >
          {d.type?.[0]?.toUpperCase() || '?'}
        </div>
      ))}
      <Tooltip id="battle-icon-tooltip" />
    </div>
  );
};