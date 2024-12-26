
import { getAllUsers } from '@/src/services/PostService';
import UserTable from '@/src/components/Table/AllUserTable';

export default async function AllUserpPage() {
  const { data: users } = await getAllUsers();

  return <div className=''>
    {<UserTable key={users.userId} users={users} />}
  </div>;
}
