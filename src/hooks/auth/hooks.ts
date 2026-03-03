'use client';

import { useContext } from 'react';
import { AuthContext } from './context';

export const useAuth = () => {
  const context = useContext(AuthContext);

  // ✅ SSRガード：サーバー側では空のデータを返して黙らせる
  if (typeof window === 'undefined') {
    return { user: null, isLoading: true };
  }

  return context;
};