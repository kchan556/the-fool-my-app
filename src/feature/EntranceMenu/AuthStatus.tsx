'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/auth';

export const AuthStatus = () => {
  const { user, isLoading, isAuthSkipped, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-600 rounded w-1/2"></div>
      </div>
    );
  }

  // 隱崎ｨｼ繧ｹ繧ｭ繝・・繝｢繝ｼ繝・
  if (isAuthSkipped) {
    return (
      <div className="bg-yellow-900 border border-yellow-600 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-medium">髢狗匱繝｢繝ｼ繝・/span>
          <span className="text-yellow-200 text-sm">・郁ｪ崎ｨｼ繧ｹ繧ｭ繝・・・・/span>
        </div>
      </div>
    );
  }

  // 譛ｪ繝ｭ繧ｰ繧､繝ｳ
  if (!user) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">繧ｲ繧ｹ繝医Δ繝ｼ繝・/span>
          <Link
            href="/login"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
          >
            繝ｭ繧ｰ繧､繝ｳ
          </Link>
        </div>
        <p className="text-gray-400 text-sm mt-2">繝ｭ繧ｰ繧､繝ｳ縺吶ｋ縺ｨ繝・ャ繧ｭ繧偵け繝ｩ繧ｦ繝峨↓菫晏ｭ倥〒縺阪∪縺・/p>
      </div>
    );
  }

  // 繝ｭ繧ｰ繧､繝ｳ貂医∩
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.user_metadata?.preferred_username ||
    '繝ｦ繝ｼ繧ｶ繝ｼ';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {avatarUrl && <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />}
          <div>
            <div className="text-white font-medium">{displayName}</div>
            <div className="text-gray-400 text-sm">Discord騾｣謳ｺ貂医∩</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={'/profile'}
            className="px-3 py-1 bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 transition-colors text-sm"
          >
            謌ｦ邵ｾ
          </Link>
          <button
            onClick={() => signOut()}
            className="px-3 py-1 bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 transition-colors text-sm"
          >
            繝ｭ繧ｰ繧｢繧ｦ繝・
          </button>
        </div>
      </div>
    </div>
  );
};
