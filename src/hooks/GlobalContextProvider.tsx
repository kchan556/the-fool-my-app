'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic'; // 追加
import { WebSocketProvider } from './websocket/index';
import { ErrorOverlayProvider } from './error-overlay/index';
import { PlayerIdentityProvider } from './player-identity/index';
import { MatchingProvider } from './matching/index';

// SystemContextProvider だけを「ブラウザ専用」として読み込む
const SystemContextProvider = dynamic(
  () => import('./system/index').then((mod) => mod.SystemContextProvider),
  { ssr: false }
);

interface Props {
  children: ReactNode;
}

export const GlobalContextProvider = ({ children }: Props) => {
  return (
    <ErrorOverlayProvider>
      <WebSocketProvider>
        <PlayerIdentityProvider>
          {/* ここが dynamic になるので、dnd-kit のエラーを回避できます */}
          <SystemContextProvider>
            <MatchingProvider>{children}</MatchingProvider>
          </SystemContextProvider>
        </PlayerIdentityProvider>
      </WebSocketProvider>
    </ErrorOverlayProvider>
  );
};