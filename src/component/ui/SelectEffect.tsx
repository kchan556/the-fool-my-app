'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelectEffect } from '@/hooks/select-effect';

interface SelectEffectProps {
  unitId: string;
  onComplete?: () => void;
}

export const SelectEffect: React.FC<SelectEffectProps> = ({ unitId, onComplete }) => {
  // 選択エフェクトコンチE��ストを使用
  const { removeTargetUnit, scheduleRemoval, cancelScheduledRemoval } = useSelectEffect();
  // フェーズ状態�E管琁E
  const [phase, setPhase] = useState<'initial' | 'appear' | 'expand' | 'pulse' | 'fadeOut'>(
    'initial'
  );
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // アンマウント時のクリーンアチE�E�E�Eeact Strict Mode対応！E
  // ユニットがフィールドを離れた場合など、エフェクト完亁E��にアンマウントされた際に
  // targetUnitIds から確実に削除する
  useEffect(() => {
    cancelScheduledRemoval(unitId);
    return () => {
      scheduleRemoval(unitId);
    };
  }, [unitId, scheduleRemoval, cancelScheduledRemoval]);

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

    if (phase === 'initial') {
      // 初期フェーズからappearへ
      timeout = setTimeout(() => setPhase('appear'), 0);
      timeoutsRef.current.push(timeout);
    } else if (phase === 'appear') {
      // 表示フェーズからexpandへ
      timeout = setTimeout(() => setPhase('expand'), 150);
      timeoutsRef.current.push(timeout);
    } else if (phase === 'expand') {
      // 拡大フェーズからpulseへ
      timeout = setTimeout(() => setPhase('pulse'), 400);
      timeoutsRef.current.push(timeout);
    } else if (phase === 'pulse') {
      // パルスフェーズからfadeOutへ
      timeout = setTimeout(() => setPhase('fadeOut'), 300);
      timeoutsRef.current.push(timeout);
    } else if (phase === 'fadeOut') {
      // フェードアウトフェーズから完亁E
      timeout = setTimeout(() => {
        removeTargetUnit(unitId); // コンチE��ストをリセチE��
        if (onComplete) onComplete();
      }, 200);
      timeoutsRef.current.push(timeout);
    }

    return clearTimeouts;
  }, [phase, onComplete, removeTargetUnit, unitId]);

  // フェーズごとのスタイル
  const style = useMemo(() => {
    switch (phase) {
      case 'appear':
        return { transform: 'scale(0.2)', opacity: 0.7 };
      case 'expand':
        return { transform: 'scale(0.8)', opacity: 0.5 };
      case 'pulse':
        return { transform: 'scale(0.9)', opacity: 0.3 };
      case 'fadeOut':
        return { transform: 'scale(1.1)', opacity: 0 };
      default:
        return { transform: 'scale(0)', opacity: 0 };
    }
  }, [phase]);

  return (
    <div className="absolute inset-0 pointer-events-none" data-unit-id={unitId}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          ...style,
          transition: 'all 0.3s ease-out',
        }}
      />
    </div>
  );
};
