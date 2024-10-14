/* eslint-disable prettier/prettier */
import React from 'react';

import { getAllUsers } from '@/src/services/PostService';
import UserTable from '@/src/components/AllUserTable';

export default async function AllUserpPage() {
  const { data: users } = await getAllUsers();

  return <div>
    {<UserTable key={users.userId} users={users} />}
  </div>;
}
