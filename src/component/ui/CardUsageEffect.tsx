'use client';

import { useCardUsageEffect } from '@/hooks/card-usage-effect';
import './CardUsageEffect.css';

// コンポーネント外で定義することでレンダリングごとの再作成を防止
const positionClasses = {
  left: 'left-35',
  center: 'left-1/2 -translate-x-1/2',
  right: 'right-35',
};

// フェーズごとのカードイメージスタイル
const cardImageStyles = {
  phase1: {
    opacity: 0,
    transform: 'scale(3)',
  },
  phase2: {
    opacity: 1,
    transform: 'scale(2)',
  },
  phase3: {
    opacity: 0,
    transform: 'scale(2) translateY(-50px)',
  },
  hidden: {
    opacity: 0,
    transform: 'scale(2)',
  },
};

// フェーズごとのドライブテキストスタイル
const driveTextStyles = {
  phase1: {
    transform: 'translateX(-100%)',
    opacity: 1,
  },
  phase2: {
    transform: 'translateX(-25%)',
    opacity: 1,
  },
  phase3: {
    transform: 'translateX(100%)',
    opacity: 0,
  },
  hidden: {
    transform: 'translateX(100%)',
    opacity: 0,
  },
};

export const CardUsageEffect = () => {
  const { state } = useCardUsageEffect();
  const { isVisible, imageUrl, type, position, phase } = state;

  if (!isVisible) return null;

  const positionClass = positionClasses[position] || positionClasses.center;

  return (
    <div className={`fixed z-10 top-1/3 ${positionClass} pointer-events-none`}>
      <div className="relative">
        {/* カード画像エフェクト */}
        <div
          className={`w-32 h-44 rounded card-image phase-${phase}`}
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transformOrigin: 'center center', // 常に中心からスケール
            boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.7)', // 輝く白い影
            ...cardImageStyles[phase as keyof typeof cardImageStyles],
          }}
        />

        {/* ドライブテキスト演出 */}
        <div
          className={`absolute bottom-18 drive-text phase-${phase}`}
          style={{
            ...driveTextStyles[phase as keyof typeof driveTextStyles],
          }}
        >
          <div className="flex items-center justify-center gap-2 bg-black/70 py-5 px-10 rounded text-white text-3xl font-bold">
            <span className="text-yellow-400">{type}</span>
            <span>DRIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};