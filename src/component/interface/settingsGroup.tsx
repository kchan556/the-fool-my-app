'use client';

// 修正： type を追加して型専用インポートにします
import type { ReactNode } from 'react';

interface SettingsGroupProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const SettingsGroup = ({ title, description, children }: SettingsGroupProps) => {
  return (
    <div className="space-y-4 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        {description && (
          <p className="text-sm text-zinc-500">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};