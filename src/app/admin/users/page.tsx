import { getUsers } from '@/actions/admin';
import { UserTable } from '@/feature/Admin/UserTable';
import { Pagination } from '@/component/ui/Pagination';
import { AdminNav } from '@/feature/Admin/AdminNav';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const query = await props.searchParams;
  const page = Math.max(1, Number(query.page) || 1);
  const result = await getUsers({ page });
  const totalPages = Math.ceil(result.total / 50);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">ユーザー管理</h1>
        <AdminNav />

        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">登録ユーザー一覧</h2>
            <span className="text-gray-400 text-sm">合計: {result.total} 名</span>
          </div>

          {result.users.length === 0 ? (
            <div className="text-gray-400 py-10 text-center">ユーザーが見つかりません</div>
          ) : (
            <>
              {/* 💡 もしこれでもエラーが出る場合は、UserTable 側の 
                export const UserTable = ({ users }: { users: any[] }) => ... 
                という定義を確認する必要があります。
              */}
              <UserTable users={result.users} />
              
              <div className="mt-6">
                <Pagination 
                  basePath="/admin/users" 
                  currentPage={page} 
                  totalPages={totalPages} 
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}