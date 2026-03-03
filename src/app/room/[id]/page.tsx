export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ルーム</h1>
      <p>ルーム ID: {params.id} に入室しました。</p>
    </div>
  );
}