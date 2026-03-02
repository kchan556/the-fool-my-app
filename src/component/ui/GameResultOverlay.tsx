'use client';

import { useGameResult } from '@/hooks/game-result';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/component/interface/button';
import { useMemo } from 'react';
import { webSocketService } from '@/service/websocket';
import type { Message } from '@/submodule/suit/types';
import type { LeaveRoomRequestPayload } from '@/submodule/suit/types/message/payload/server';

export const GameResultOverlay = () => {
  const { state } = useGameResult();
  const { isVisible, reason, result, showExitButton } = state;
  const router = useRouter();
  const pathname = usePathname();

  // useParams 縺御ｽｿ縺医↑縺・・縺ｧ pathname 繧偵ヱ繝ｼ繧ｹ縺吶ｋ
  const roomId = pathname.split('/')[2];

  // 邨ゆｺ・炊逕ｱ繝・く繧ｹ繝・
  const { reasonText, reasonSubText } = useMemo(() => {
    switch (reason) {
      case 'damage': {
        return {
          reasonText: 'KO',
          reasonSubText: '謌ｦ髣倡憾豕∫ｵゆｺ・,
        };
      }
      case 'limit': {
        return {
          reasonText: 'ROUND LIMIT',
          reasonSubText: '謌ｦ髣倡憾豕∫ｵゆｺ・,
        };
      }
      case 'surrender': {
        return {
          reasonText: 'SURRENDER',
          reasonSubText: '謚穂ｺ・,
        };
      }
      default: {
        return {
          reasonText: 'GAME END',
          reasonSubText: '',
        };
      }
    }
  }, [reason]);

  // 蜍晄風繝・く繧ｹ繝医→繧ｹ繧ｿ繧､繝ｫ
  const resultText = result === 'win' ? 'WIN' : 'LOSE';
  const resultColorClass =
    result === 'win'
      ? 'text-yellow-400 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]'
      : 'text-red-500 drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]';

  // 蜀・ｽ｢繧ｨ繝輔ぉ繧ｯ繝医・濶ｲ
  const circleColorClass = result === 'win' ? 'border-yellow-500' : 'border-red-500';

  const handleExit = () => {
    // LeaveRoomRequest 繧帝∽ｿ｡・・ire-and-forget・・
    if (roomId) {
      webSocketService.send({
        action: {
          handler: 'room',
          type: 'leave',
        },
        payload: {
          type: 'LeaveRoomRequest',
          roomId,
        },
      } satisfies Message<LeaveRoomRequestPayload>);
    }
    router.push('/entrance');
  };

  return isVisible ? (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50"
      style={{ animation: 'fadeIn 0.1s forwards' }}
    >
      {/* 閭梧勹繧ｪ繝ｼ繝舌・繝ｬ繧､ */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Expanding Circle */}
      <div
        className={`absolute rounded-full border-8 opacity-80 h-[30vh] w-[30vh] ${circleColorClass}`}
        style={{ animation: 'expand 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' }}
      />

      {/* Text Container */}
      <div
        className="relative w-full flex flex-col items-center justify-center gap-4"
        style={{ animation: 'textFadeIn 0.3s 0.2s forwards', opacity: 0 }}
      >
        {/* Fading Black Band */}
        <div className="absolute w-full h-64 bg-gradient-to-r from-transparent via-black/90 to-transparent z-0" />

        {/* 邨ゆｺ・炊逕ｱ繝・く繧ｹ繝・*/}
        <div className="relative z-10 text-center text-white font-bold drop-shadow-md">
          <span className="text-5xl tracking-widest">{reasonText}</span>
          {reasonSubText && <span className="block text-xl mt-1">{reasonSubText}</span>}
        </div>

        {/* 蜍晄風繝・く繧ｹ繝・*/}
        <div className="relative z-10 text-center font-bold mt-4">
          <span className={`text-7xl tracking-wider ${resultColorClass}`}>{resultText}</span>
        </div>

        {/* 騾螳､繝懊ち繝ｳ */}
        {showExitButton && (
          <div className="relative z-10 mt-8" style={{ animation: 'textFadeIn 0.3s forwards' }}>
            <Button onClick={handleExit} size="lg" className="px-8 py-3 text-xl">
              騾螳､
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};
