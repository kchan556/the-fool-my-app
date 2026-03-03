'use client';

import { ReactNode } from 'react';
import { WebSocketProvider } from './websocket/index'; // index.tsx を直接指定
import { SystemContextProvider } from './system/index'; // ここが重要
import { ErrorOverlayProvider } from './error-overlay/index';
import { PlayerIdentityProvider } from './player-identity/index';
import { MatchingProvider } from './matching/index';

interface Props {
  children: ReactNode;
}

export const GlobalContextProvider = ({ children }: Props) => {
  return (
    <ErrorOverlayProvider>
      <WebSocketProvider>
        <PlayerIdentityProvider>
          <SystemContextProvider>
            <MatchingProvider>{children}</MatchingProvider>
          </SystemContextProvider>
        </PlayerIdentityProvider>
      </WebSocketProvider>
    </ErrorOverlayProvider>
  );
};