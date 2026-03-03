'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StatusChange, useStatusChange } from '@/hooks/status-change';
import { useGameStore } from '@/hooks/game';

export type StatusChangeType = 'block' | 'bp' | 'base-bp' | 'damage' | 'level' | 'overclock';

interface StatusChangeEffectProps {
  unitId: string;
  type: StatusChangeType;
  value: number | string;
  position?: { x: number; y: number }; // 位置をカスタマイズするための座樁E
  onComplete?: () => void;
}

// DisplayContent コンポ�Eネントを外部に定義
interface DisplayContentProps {
  type: string;
  value: number | string;
  unit?: {import React, { useCallback } from 'react';
import { useWebSocketGame } from '@/hooks/game/websocket';
import { useSoundV2 } from '@/hooks/soundV2';
import { Message, createMessage } from '@/submodule/suit/types';
import { useSelfId } from '@/hooks/player-identity';
import { useSystemContext } from '@/hooks/system/hooks';

interface SurrenderDialogProps {
  onClose: () => void;
}

export const SurrenderDialog: React.FC<SurrenderDialogProps> = ({ onClose }) => {
  const { send } = useWebSocketGame();
  const { play } = useSoundV2();
  const { operable } = useSystemContext();
  const selfId = useSelfId();

  const handleYes = useCallback(() => {
    const message: Message = createMessage({
      action: {
        type: 'game',
        handler: 'core',
      },
      payload: {
        type: 'Surrender',
        player: selfId,
      },
    });
    send(message);
    play('decide');
    onClose();
  }, [send, play, selfId, onClose]);

  const handleNo = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!operable) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg z-50">
      <div className="flex flex-col items-center p-4">
        <div className="text-white text-lg mb-4">サレンダーしますか？</div>
        <div className="flex gap-5">
          <button
            className="bg-red-600 text-white py-2 px-5 border-0 rounded cursor-pointer hover:bg-red-700"
            onClick={handleYes}
          >
            はい
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-5 border-0 rounded cursor-pointer hover:bg-blue-700"
            onClick={handleNo}
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
  );
}import React, { useCallback } from 'react';
import { useWebSocketGame } from '@/hooks/game/websocket';
import { useSoundV2 } from '@/hooks/soundV2';
import { Message, createMessage } from '@/submodule/suit/types';
import { useSelfId } from '@/hooks/player-identity';
import { useSystemContext } from '@/hooks/system/hooks';

interface SurrenderDialogProps {
  onClose: () => void;
}

export const SurrenderDialog: React.FC<SurrenderDialogProps> = ({ onClose }) => {
  const { send } = useWebSocketGame();
  const { play } = useSoundV2();
  const { operable } = useSystemContext();
  const selfId = useSelfId();

  const handleYes = useCallback(() => {
    const message: Message = createMessage({
      action: {
        type: 'game',
        handler: 'core',
      },
      payload: {
        type: 'Surrender',
        player: selfId,
      },
    });
    send(message);
    play('decide');
    onClose();
  }, [send, play, selfId, onClose]);

  const handleNo = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!operable) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg z-50">
      <div className="flex flex-col items-center p-4">
        <div className="text-white text-lg mb-4">サレンダーしますか？</div>
        <div className="flex gap-5">
          <button
            className="bg-red-600 text-white py-2 px-5 border-0 rounded cursor-pointer hover:bg-red-700"
            onClick={handleYes}
          >
            はい
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-5 border-0 rounded cursor-pointer hover:bg-blue-700"
            onClick={handleNo}
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
  );
}

const DisplayContent = ({ type, value, unit }: DisplayContentProps) => {
  // Determine label text based on type and value
  let labelText = '';
  let valueText = '';

  switch (type) {
    case 'bp':
      labelText = typeof value === 'number' && value > 0 ? 'BPアチE�E' : 'BPダウン';
      valueText = value.toString();
      break;
    case 'base-bp':
      labelText = typeof value === 'number' && value > 0 ? '基本BPアチE�E' : '基本BPダウン';
      valueText = value.toString();
      break;
    case 'damage':
      labelText = 'BPダメージ';
      valueText = value.toString();
      break;
    case 'level':
      labelText = typeof value === 'number' && value > 0 ? 'クロチE��アチE�E' : 'クロチE��ダウン';
      valueText = unit ? `レベル${unit.lv}` : '';
      break;
    case 'block':
      labelText = 'BLOCK';
      break;
    case 'overclock':
      labelText = 'オーバ�EクロチE��';
      valueText = unit ? `レベル${unit.lv}` : '';
      break;
    default:
      return null;
  }

  // Define text shadow styles based on value
  // Label color is based on type and value
  const labelShadowColor =
    type === 'block'
      ? 'rgba(59, 130, 246, 0.9)' // blue-500 for block
      : typeof value === 'number' && value > 0
        ? 'rgba(6, 182, 212, 0.9)' // cyan-500 for positive
        : 'rgba(239, 68, 68, 0.9)'; // red-500 for negative
  // Value shadow is always red
  const valueShadowColor = 'rgba(239, 68, 68, 0.9)'; // red-500

  const labelStyle = {
    textShadow: `0 0 10px ${labelShadowColor}, 0 0 8px ${labelShadowColor}`,
    fontWeight: 'bold',
    color: 'white',
  };

  const valueStyle = {
    textShadow: `0 0 10px ${valueShadowColor}, 0 0 8px ${valueShadowColor}`,
    fontWeight: 'bold',
    color: 'white',
  };

  return (
    <>
      <div className="text-md text-center w-full" style={labelStyle}>
        {labelText}
      </div>
      {valueText && (
        <div className="text-lg border-t" style={valueStyle}>
          {valueText}
        </div>
      )}
    </>
  );
};

export const StatusChangeEffect: React.FC<StatusChangeEffectProps> = ({
  unitId,
  type,
  value,
  position,
  onComplete,
}) => {
  // フェーズ状態�E管琁E- 'initial'から'hold'に直接遷移するため、�E期値めEhold'に設宁E
  const [phase, setPhase] = useState<'appear' | 'hold' | 'fadeOut'>('hold');
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const onCompleteRef = useRef(onComplete);
  const { players } = useGameStore();
  const unit = useMemo(
    () =>
      Object.values(players ?? {})
        .flatMap(player => player.field)
        .find(unit => unit.id === unitId),
    [players, unitId]
  );

  // onCompleteが変更されたらrefを更新
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // 省略されてぁE��ぁE��合�Eランダムな位置を生戁E
  const effectPosition = useMemo(() => {
    if (position) return position;

    // ±15pxの篁E��でランダムな位置を生戁E
    return {
      x: 0, // Math.floor(Math.random() * 30) - 15,
      y: 0, // Math.floor(Math.random() * 30) - 15,
    };
  }, [position]);

  // フェーズ管琁E�E実裁E
  useEffect(() => {
    // タイムアウトをクリア
    const clearTimeouts = () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };

    clearTimeouts(); // 既存�Eタイムアウトをクリア

    // フェーズに応じたタイムアウト設宁E
    let timeout: NodeJS.Timeout;

    if (phase === 'hold') {
      // 保持フェーズからfadeOutへ
      timeout = setTimeout(() => setPhase('fadeOut'), 1000);
      timeoutsRef.current.push(timeout);
    } else if (phase === 'fadeOut') {
      // フェードアウトフェーズから完亁E
      timeout = setTimeout(() => {
        if (onCompleteRef.current) onCompleteRef.current();
      }, 300);
      timeoutsRef.current.push(timeout);
    }

    return clearTimeouts;
  }, [phase]);

  // フェーズごとのスタイル
  const style = useMemo(() => {
    switch (phase) {
      case 'appear':
        return {
          opacity: 0,
          transform: `translate(${effectPosition.x}px, ${effectPosition.y - 10}px) scale(0.8)`,
        };
      case 'hold':
        return {
          opacity: 0.75,
          transform: `translate(${effectPosition.x}px, ${effectPosition.y}px) scale(1)`,
        };
      case 'fadeOut':
        return {
          opacity: 0,
          transform: `translate(${effectPosition.x}px, ${effectPosition.y - 20}px) scale(0.9)`,
        };
      default:
        return {
          opacity: 0,
          transform: `translate(${effectPosition.x}px, ${effectPosition.y}px) scale(0.5)`,
        };
    }
  }, [phase, effectPosition]);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-32"
      data-unit-id={unitId}
    >
      <div
        className="flex flex-col items-center px-1 py-1 bg-gray-500 opacity-10 rounded-sm border-2 border-gray-700"
        style={{
          fontWeight: 'bold',
          fontSize: '0.9rem',
          ...style,
          transition: 'all 0.3s ease-out',
        }}
      >
        <DisplayContent type={type} value={value} unit={unit} />
      </div>
    </div>
  );
};

// 褁E��のスチE�Eタス変更を同時に表示するコンポ�EネンチE
interface MultipleStatusChangeProps {
  unitId: string;
  changes: StatusChange[];
  statusChangeId?: string; // コンチE��ストから渡されるID
  onComplete?: () => void;
}

export const MultipleStatusChange: React.FC<MultipleStatusChangeProps> = ({
  unitId,
  changes,
  statusChangeId,
  onComplete,
}) => {
  const [completedCount, setCompletedCount] = useState(0);
  const { removeStatusChange, scheduleRemoval, cancelScheduledRemoval } = useStatusChange();

  // アンマウント時のクリーンアチE�E�E�Eeact Strict Mode対応！E
  // ユニットがフィールドを離れた場合など、エフェクト完亁E��にアンマウントされた際に
  // statusChanges から確実に削除する
  useEffect(() => {
    if (statusChangeId) {
      cancelScheduledRemoval(statusChangeId);
    }
    return () => {
      if (statusChangeId) {
        scheduleRemoval(statusChangeId);
      }
    };
  }, [statusChangeId, scheduleRemoval, cancelScheduledRemoval]);

  // すべてのエフェクトが完亁E��たら onComplete を呼び出ぁE
  useEffect(() => {
    if (completedCount === changes.length) {
      // コンチE��スト�EスチE�Eタス変更を削除
      if (statusChangeId) {
        removeStatusChange(statusChangeId);
      }

      if (onComplete) {
        onComplete();
      }
    }
  }, [completedCount, changes.length, onComplete, removeStatusChange, statusChangeId]);

  return (
    <>
      {changes.map((change, index) => (
        <StatusChangeEffect
          key={`${unitId}-${change.type}-${index}`}
          unitId={unitId}
          type={change.type}
          value={change.value}
          onComplete={() => setCompletedCount(prev => prev + 1)}
        />
      ))}
    </>
  );
};
