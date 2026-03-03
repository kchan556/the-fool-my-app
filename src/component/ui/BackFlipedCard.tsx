import master from "@/submodule/suit/catalog/catalog";
// 修正：型インポートであることを明示するために "type" を追加します
import type { IAtom, ICard } from "@/submodule/suit/types";

export const BackFlipedCard = ({
  card,
  atom,
}: {
  card?: ICard;
  atom?: IAtom;
}) => {
  // 共通のスタイル
  const baseStyle = "w-24 h-36 rounded-lg border-2 border-white shadow-lg flex items-center justify-center bg-indigo-900";

  return (
    <div className={baseStyle}>
      <div className="w-20 h-32 border border-white/20 rounded flex items-center justify-center">
        <span className="text-4xl text-white/10 font-bold">?</span>
      </div>
    </div>
  );
};