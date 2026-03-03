'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';

export default function LoginPage() {
  const { user, isLoading, isAuthSkipped, signInWithDiscord } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 既にログイン済みの場合、エントランスへリダイレクト
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/entrance');
    }
  }, [user, isLoading, router]);

  const handleDiscordLogin = async () => {
    setIsSigningIn(true);
    setError(null);

    try {
      await signInWithDiscord();
      // OAuthリダイレクトが発生するため、通常ここには到達しません
    } catch {
      setError('ログインに失敗しました。もう一度お試しください。');
    } finally {
      setIsSigningIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // 認証スキップモード（開発環境など）の場合
  if (isAuthSkipped) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">開発モード</h1>
          <p className="text-gray-400 mb-6">
            認証スキップモードが有効です。
            <br />
            自動的に模擬ユーザーとしてログインされます。
          </p>
          <Link
            href="/entrance"
            className="block w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            エントランスへ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-white text-center mb-2">ログイン</h1>
        <p className="text-gray-400 text-center mb-6">Discordアカウントでログインしてください</p>

        {error && (
          <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <button
          onClick={handleDiscordLogin}
          disabled={isSigningIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2