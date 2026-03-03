export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ProfilePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">マイプロフィール</h1>
      <p>プロフィール情報を読み込み中...</p>
    </div>
  );
}