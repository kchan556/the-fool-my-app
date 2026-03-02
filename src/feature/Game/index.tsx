'use client';

import { CardDetailWindow } from '@/component/ui/CardDetailWindow';
import { CardEffectDialog } from '@/component/ui/CardEffectDialog';
import { CardUsageEffect } from '@/component/ui/CardUsageEffect';
import { CPView } from '@/component/ui/CPView';
import { DebugDialog } from '@/component/ui/DebugDialog';
import { InterceptSelectionOverlay } from '@/component/ui/InterceptSelectionOverlay';
import { LifeView } from '@/component/ui/LifeView';
import { colorTable } from '@/helper/color';
import { useRule, usePlayers, usePlayer, useSelfTheme, useOpponentTheme } from '@/hooks/game/hooks';
import { MyArea } from '../MyArea';
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  CollisionDetection,
  rectIntersection,
  ClientRect,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useGameComponentHook } from './hook';
import { CardsDialog } from '../CardsDialog';
import { CardsCountView } from '@/component/ui/CardsCountView';
import { GiCardDraw } from 'react-icons/gi';
import { BsTrash3Fill } from 'react-icons/bs';
import { useCardsDialog } from '@/hooks/cards-dialog';
import { useSystemContext } from '@/hooks/system/hooks';
import { Field } from '../Field';
import { MyFieldWrapper } from '../MyFieldWrapper';
import { ICard } from '@/submodule/suit/types';
import { Timer } from '../Timer';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { UnitSelectionOverlay } from '@/component/ui/UnitSelectionOverlay';
import { webSocketService } from '@/service/websocket';
import { ChoicePanel } from '@/feature/ChoicePanel';
import { PurpleGaugeView } from '@/component/ui/purpleGaugeView';
import { CardView } from '@/component/ui/CardView';
import { JokerGauge } from '@/component/ui/JokerGauge';
import { Button } from '@/component/interface/button';
import { LoadingOverlay } from '@/component/ui/LoadingOverlay';
import { TurnChangeEffect } from '@/component/ui/TurnChangeEffect';
import { GameResultOverlay } from '@/component/ui/GameResultOverlay';
import { useSelfId } from '@/hooks/player-identity';

interface RoomProps {
  id: string;
}

export const Game = ({ id }: RoomProps) => {
  useGameComponentHook({ id });
  const { openCardsDialog } = useCardsDialog();
  const { cursorCollisionSize } = useSystemContext();
  const selfTheme = useSelfTheme();
  const opponentTheme = useOpponentTheme();

  // 逶ｸ謇九・蛻・妙迥ｶ諷九ｒ邂｡逅・
  const [isWaitingReconnect, setIsWaitingReconnect] = useState(false);

  // Get current player ID
  const currentPlayerId = useSelfId();

  const rule = useRule();
  const playerIds = Object.keys(usePlayers() ?? {});
  const opponentId =
    useMemo(
      () => playerIds.find((id: string) => id !== currentPlayerId),
      [playerIds, currentPlayerId]
    ) ?? '';
  const opponent = usePlayer(opponentId);

  const sensors = useSensors(
    // Primary sensor for desktop and touch devices
    useSensor(PointerSensor),
    // Fallback sensor specifically for touch devices
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // Longer delay for touch to prevent conflicts
        tolerance: 5,
      },
    })
  );

  // Custom collision detection that uses mouse cursor position instead of entire draggable area
  const cursorCollisionDetection: CollisionDetection = ({
    active,
    droppableContainers,
    droppableRects,
    pointerCoordinates,
  }) => {
    if (!pointerCoordinates) {
      return [];
    }

    // Create a small rectangle around the cursor using the configurable size
    const cursorRect: ClientRect = {
      width: cursorCollisionSize * 2,
      height: cursorCollisionSize * 2,
      top: pointerCoordinates.y - cursorCollisionSize,
      left: pointerCoordinates.x - cursorCollisionSize,
      bottom: pointerCoordinates.y + cursorCollisionSize,
      right: pointerCoordinates.x + cursorCollisionSize,
    };

    // Use the rectIntersection algorithm with our custom cursor rectangle
    return rectIntersection({
      active,
      droppableContainers,
      droppableRects,
      collisionRect: cursorRect,
      pointerCoordinates,
    });
  };

  const screenRef = useRef<HTMLDivElement>(null);
  const handleFullScreen = useCallback(() => {
    screenRef.current?.requestFullscreen();
  }, []);

  const isMatching = useMemo(() => {
    return opponentId == '';
  }, [opponentId]);

  // 蛻・妙繝上Φ繝峨Λ繝ｼ繧定ｨｭ螳・
  useEffect(() => {
    webSocketService.setDisconnectHandler(isWaitingReconnect => {
      setIsWaitingReconnect(isWaitingReconnect);
    });
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={cursorCollisionDetection}
      modifiers={[restrictToWindowEdges]}
    >
      <div
        className={`flex h-screen ${selfTheme.ui.background} ${selfTheme.text.primary} relative overflow-hidden select-none dnd-game-container`}
        ref={screenRef}
      >
        {/* 繧ｫ繝ｼ繝芽ｩｳ邏ｰ繧ｦ繧｣繝ｳ繝峨え */}
        <CardDetailWindow x={30} y={530} />

        {/* 繝・ヰ繝・げ繝繧､繧｢繝ｭ繧ｰ */}
        {rule.debug?.enable && <DebugDialog />}

        {/* 繧ｫ繝ｼ繝牙柑譫懆｡ｨ遉ｺ繝繧､繧｢繝ｭ繧ｰ */}
        <CardEffectDialog />

        {/* 繧ｫ繝ｼ繝我ｽｿ逕ｨ繧ｨ繝輔ぉ繧ｯ繝・*/}
        <CardUsageEffect />
        <TurnChangeEffect />
        <GameResultOverlay />

        {/* 驕ｸ謚槭が繝ｼ繝舌・繝ｬ繧､ */}
        <InterceptSelectionOverlay />
        <UnitSelectionOverlay />
        <ChoicePanel />

        {/* 繝ｭ繝ｼ繝・*/}
        <LoadingOverlay
          isOpen={isMatching || isWaitingReconnect}
          message={isMatching ? '蜈･螳､繧貞ｾ・ｩ滉ｸｭ窶ｦ' : '蠕ｩ蟶ｰ繧貞ｾ・ｩ滉ｸｭ窶ｦ'}
          subMessage={
            isMatching ? `RoomID: ${id} | 蟇ｾ謌ｦ逶ｸ謇九・蜈･螳､繧貞ｾ・▲縺ｦ縺・∪縺兪 : '蟇ｾ謌ｦ逶ｸ謇九′蛻・妙縺励∪縺励◆'
          }
        />

        {/* 繝｡繧､繝ｳ繧ｲ繝ｼ繝繧ｳ繝ｳ繝・リ */}
        <div className="flex flex-col w-full h-full xl:p-4">
          {/* 蟇ｾ謌ｦ逶ｸ謇九お繝ｪ繧｢ */}
          <div
            className={`flex-col xl:p-4 border-b ${opponentTheme.ui.border} ${opponentTheme.ui.playerInfoBackground}`}
          >
            {/* 蟇ｾ謌ｦ逶ｸ謇区ュ蝣ｱ */}
            <div className={`flex items-center justify-between gap-3 xl:p-2 p-1 rounded-lg mb-4`}>
              <div className="player-identity">
                <Button onClick={handleFullScreen} size="sm" className="py-2 my-1">
                  蜈ｨ逕ｻ髱｢縺ｫ縺吶ｋ
                </Button>
                <div className="font-bold text-lg whitespace-nowrap text-ellipsis">
                  {opponent?.name ?? '蟇ｾ謌ｦ逶ｸ謇・讀懃ｴ｢荳ｭ窶ｦ'}
                </div>
                {opponent?.life !== undefined && (
                  <LifeView current={opponent.life.current} max={opponent.life.max} />
                )}
              </div>
              {/* 蟇ｾ謌ｦ逶ｸ謇九・謇区惆繧ｨ繝ｪ繧｢ */}
              <div className="flex justify-center gap-1">
                {[...Array(rule.player.max.hand)].map((_, index) => {
                  const card = opponent?.hand?.[index];
                  return card ? (
                    'catalogId' in card ? (
                      <CardView card={card} key={card.id} isTiny />
                    ) : (
                      <div
                        key={`opponent-card-${card.id}`}
                        className={`w-11 h-14 ${opponentTheme.ui.cardBackground} rounded flex justify-center items-center shadow-md ${colorTable.symbols.mana} text-2xl`}
                      />
                    )
                  ) : (
                    <div
                      key={`opponent-card-spacer-${index}`}
                      className="w-11 h-14 rounded-sm bg-gray-800 opacity-50"
                    />
                  );
                })}
              </div>
              <div className="flex flex-col gap-1 justify-end">
                <div className="flex gap-1">
                  {[...Array(rule.player.max.trigger)].map((_, index) => {
                    const card = opponent?.trigger[index];
                    return card ? (
                      'catalogId' in card ? (
                        <CardView card={card} key={card.id} isTiny />
                      ) : (
                        <div
                          className="w-11 h-14 border-1 border-white rounded-sm bg-gray-800"
                          style={{
                            backgroundImage: `url('/image/card/back/${
                              'color' in card ? card.color : 'none'
                            }.png')`,
                            backgroundSize: 'cover',
                          }}
                          key={index}
                        />
                      )
                    ) : (
                      <div
                        className="w-11 h-14 border-1 border-white rounded-sm bg-gray-800"
                        key={index}
                      />
                    );
                  })}
                  <div className="flex gap-1 mx-2">
                    {opponent?.joker.card.map(joker => (
                      <div key={joker.id} className="relative pointer-events-none">
                        {joker.isAvailable ? (
                          <CardView card={joker} isTiny />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-black opacity-50 z-10" />
                            <CardView card={joker} isTiny />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <JokerGauge percentage={opponent?.joker.gauge || 0} jokers={opponent?.joker.card} />
              </div>
              <div className="flex gap-4">
                {opponent?.deck && (
                  <CardsCountView count={opponent.deck.length}>
                    <div
                      className="flex justify-center items-center cursor-pointer w-full h-full"
                      onClick={() => {
                        openCardsDialog(opponent.deck as ICard[], '蟇ｾ謌ｦ逶ｸ謇九・繝・ャ繧ｭ');
                      }}
                    >
                      {<GiCardDraw color="cyan" size={40} />}
                    </div>
                  </CardsCountView>
                )}
                {opponent?.trash && (
                  <CardsCountView count={opponent.trash.length}>
                    <div
                      className="flex justify-center items-center cursor-pointer w-full h-full"
                      onClick={() => {
                        openCardsDialog(state => {
                          const trash = (state.players?.[opponentId]?.trash ?? []) as ICard[];
                          const deleted = (state.players?.[opponentId]?.delete ?? []) as ICard[];
                          return [
                            ...[...trash].reverse(),
                            ...deleted.map(card => ({ ...card, deleted: true })),
                          ]; // 譛譁ｰ縺ｮ謐ｨ譛ｭ繧ｫ繝ｼ繝峨′荳翫↓陦ｨ遉ｺ縺輔ｌ繧九ｈ縺・・・↓
                        }, '蟇ｾ謌ｦ逶ｸ謇九・謐ｨ譛ｭ');
                      }}
                    >
                      {<BsTrash3Fill color="yellowgreen" size={32} />}
                    </div>
                  </CardsCountView>
                )}
              </div>
              <div className="flex flex-col gap-4">
                {opponent?.cp !== undefined && (
                  <CPView current={opponent.cp.current} max={opponent.cp.max} />
                )}
                <PurpleGaugeView max={5} current={opponent?.purple} />
              </div>
            </div>
          </div>

          {/* 繝輔ぅ繝ｼ繝ｫ繝峨お繝ｪ繧｢ */}
          <div className={`relative flex flex-col p-x-6 bg-gray-700 rounded-lg my-4`}>
            {/* 蟇ｾ謌ｦ逶ｸ謇九・繝輔ぅ繝ｼ繝ｫ繝・*/}
            <Field playerId={opponentId} isOwnField={false} />
            <div className={`border-b border-dashed border-gray-500 h-1`} />
            {/* 閾ｪ蛻・・繝輔ぅ繝ｼ繝ｫ繝・*/}
            <MyFieldWrapper>
              <Field playerId={currentPlayerId} isOwnField={true} />
            </MyFieldWrapper>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <Timer />
            </div>
          </div>

          {/* 閾ｪ蛻・・繧ｨ繝ｪ繧｢ */}
          <MyArea />

          {/* 繧ｫ繝ｼ繝我ｸ隕ｧ */}
          <CardsDialog />
        </div>
      </div>
    </DndContext>
  );
};
