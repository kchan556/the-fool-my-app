'use client';

import { useContext } from 'react';
import { AuthContext } from './context';

export const useAuth = () => {
  const context = useContext(AuthContext);

  // ✅ SSRガード：ビルド時に認証情報を求められても「まだ準備中」と答える
  if (typeof window === 'undefined' || !context) {
    return {
      user: null,
      isLoading: true,
      isAuthSkipped: false,
      login: async () => {},
      logout: async () => {},
      skipAuth: () => {},
    };
  }

  return context;
};