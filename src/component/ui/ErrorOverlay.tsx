'use client';

import React from 'react';

export const ErrorOverlay = ({ message }: { message?: string }) => {
  // ✅ SSRガード
  if (typeof window === 'undefined') return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border-2 border-red-500 p-8 rounded-2xl max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
          <span>⚠️</span> Error Occurred
        </h2>
        <p className="text-slate-300 mb-6 leading-relaxed">
          {message || '予期せぬエラーが発生しました。ページを再読み込みしてください。'}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
        >
          再読み込み
        </button>
      </div>
    </div>
  );
};

export default ErrorOverlay;