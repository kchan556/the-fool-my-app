'use client'; // これが必須です

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// ここで ssr: false を使います
const DynamicGlobalProvider = dynamic(
  () => import('./GlobalContextProvider').then((mod) => mod.GlobalContextProvider),
  { ssr: false }
);

export function ClientProvider({ children }: { children: ReactNode }) {
  return <DynamicGlobalProvider>{children}</DynamicGlobalProvider>;
}