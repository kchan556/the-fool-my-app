'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/component/interface/button';

interface LoadingOverlayProps {
  // 繝｢繝ｼ繝繝ｫ縺ｮ陦ｨ遉ｺ繝ｻ髱櫁｡ｨ遉ｺ
  isOpen: boolean;
  // 陦ｨ遉ｺ縺吶ｋ繝｡繧､繝ｳ繝｡繝・そ繝ｼ繧ｸ
  message?: string;
  // 繧ｵ繝悶Γ繝・そ繝ｼ繧ｸ・医が繝励す繝ｧ繝ｳ・・
  subMessage?: string;
  // 邨ゆｺ・・繧ｿ繝ｳ縺ｮ陦ｨ遉ｺ繝ｻ髱櫁｡ｨ遉ｺ
  showExitButton?: boolean;
  // 邨ゆｺ・・繧ｿ繝ｳ縺ｮ繝・く繧ｹ繝・
  exitButtonText?: string;
  // 繧ｫ繧ｹ繧ｿ繝邨ゆｺ・・逅・ｼ医ョ繝輔か繝ｫ繝医・/entrance縺ｸ繝ｪ繝繧､繝ｬ繧ｯ繝茨ｼ・
  onExit?: () => void;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isOpen,
  message = '隱ｭ縺ｿ霎ｼ縺ｿ荳ｭ...',
  subMessage,
  showExitButton = true,
  exitButtonText = '邨ゆｺ・,
  onExit,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  // 繝｢繝ｼ繝繝ｫ縺ｮ髢矩哩蛻ｶ蠕｡
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      router.push('/entrance');
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="bg-transparent backdrop:bg-black/70 backdrop:backdrop-blur-sm max-w-md w-full p-0 rounded-lg overflow-visible fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0"
    >
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border-2 border-slate-600">
        {/* 繝｡繧､繝ｳ繝｡繝・そ繝ｼ繧ｸ */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{message}</h2>
          {subMessage && <p className="text-slate-300 text-sm">{subMessage}</p>}
        </div>

        {/* 辟｡髯舌・繝ｭ繧ｰ繝ｬ繧ｹ繝舌・ */}
        <div className="mb-8">
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-progress"
              style={{
                width: '40%',
              }}
            />
          </div>
        </div>

        {/* 邨ゆｺ・・繧ｿ繝ｳ */}
        {showExitButton && (
          <div className="flex justify-center">
            <Button onClick={handleExit} variant="secondary" size="md" className="min-w-32">
              {exitButtonText}
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(350%);
          }
        }

        :global(.animate-progress) {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </dialog>
  );
};
