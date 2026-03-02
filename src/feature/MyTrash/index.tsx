import { CardsCountView } from '@/component/ui/CardsCountView';
import { HighlightBoarder } from '@/component/ui/HighlightBorder';
import { useCardsDialog } from '@/hooks/cards-dialog';
import { useTrash } from '@/hooks/game/hooks';
import { ICard } from '@/submodule/suit/types';
import { useSystemContext } from '@/hooks/system/hooks';
import { useSelfId } from '@/hooks/player-identity';
import { useDroppable } from '@dnd-kit/core';
import { useCallback } from 'react';
import { BsTrash3Fill } from 'react-icons/bs';
import { GiCardDiscard } from 'react-icons/gi';

export const MyTrash = () => {
  const { openCardsDialog } = useCardsDialog();
  const { activeCard } = useSystemContext();
  const playerId = useSelfId();

  const trash = useTrash(playerId) ?? [];

  // メモ化されたイベントハンドラ - Zustandセレクタを使用して捨札を購読
  const handleTrashClick = useCallback(() => {
    openCardsDialog(state => {
      const playerTrash = (state.players?.[playerId]?.trash ?? []) as ICard[];
      const playerDeleted = (state.players?.[playerId]?.delete ?? []) as ICard[];
      return [
        ...[...playerTrash].reverse(),
        ...playerDeleted
          .map(card => {
            return { ...card, deleted: true };
          })
          .reverse(),
      ]; // 最新の捨札カードが上に表示されるよぁE��E��E��
    }, 'あなた�E捨札');
  }, [openCardsDialog, playerId]);

  const { setNodeRef, isOver } = useDroppable({
    id: 'trash',
    data: {
      type: 'trash',
      accepts: ['card'],
    },
  });

  return (
    <div className="relative">
      <CardsCountView count={trash.length}>
        <div
          ref={setNodeRef}
          className={`flex justify-center items-center cursor-pointer w-full h-full dnd-droppable`}
          onClick={handleTrashClick}
        >
          {activeCard ? (
            <GiCardDiscard color="yellowgreen" size={40} />
          ) : (
            <BsTrash3Fill color="yellowgreen" size={32} />
          )}
        </div>
      </CardsCountView>
      {isOver && <HighlightBoarder />}
    </div>
  );
};
