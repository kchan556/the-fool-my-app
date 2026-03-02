'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/admin/tickets', label: '繝√こ繝・ヨ邂｡逅・ },
  { href: '/admin/users', label: '繝ｦ繝ｼ繧ｶ繝ｼ邂｡逅・ },
  { href: '/admin/addresses', label: '謗･邯唔P邂｡逅・ },
  { href: '/admin/matches', label: '蟇ｾ謌ｦ螻･豁ｴ' },
  { href: '/admin/config', label: '繧ｷ繧ｹ繝・Β險ｭ螳・ },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 mb-6">
      {tabs.map(tab => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 rounded-md transition-colors ${
            pathname.startsWith(tab.href)
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
