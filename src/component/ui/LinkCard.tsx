import Link from 'next/link';

interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  icon: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({ href, title, description, icon }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
    >
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <h2 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="text-gray-300 group-hover:text-gray-400 transition-colors">
        {/* > 記号を安全にレンダリング */}
        &gt;
      </div>
    </Link>
  );
};