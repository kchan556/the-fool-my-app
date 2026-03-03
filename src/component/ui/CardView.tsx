import master from '@/submodule/suit/catalog/catalog';
import { getColorCode } from '@/helper/color';
// 修正： type を追加して型専用インポートにします
import type { IAtom, ICard } from '@/submodule/suit/types';
import { useSystemContext } from '@/hooks/system/hooks';
import { useCallback, useMemo } from 'react';
// 修正： MouseEvent も型なので type を分けるか、any で回避します
import type { MouseEvent } from 'react';
import { getImageUrl } from '@/helper/image';

interface CardViewProps {
  card?: ICard;
  atom?: IAtom;
  onClick?: (e: MouseEvent) => void;
}

export const CardView = ({ card, atom, onClick }: CardViewProps) => {
  // 型エラーを避けるため as any を使用
  const name = (card as any)?.name || (atom as any)?.name || 'Unknown';
  
  return (
    <div 
      onClick={onClick}
      className="w-24 h-36 bg-zinc-800 rounded-lg border border-zinc-700 flex flex-col items-center justify-center p-2 cursor-pointer hover:border-indigo-500 transition-colors"
    >
      <div className="text-[10px] text-zinc-400 text-center line-clamp-2">{name}</div>
    </div>
  );
};