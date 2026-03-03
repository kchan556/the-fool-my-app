export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ユーザープロフィール</h1>
      <p>ユーザー ID: {params.id} の情報を表示しています。</p>
    </div>
  );
}