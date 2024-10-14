/* eslint-disable prettier/prettier */
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { Edit, Trash2 } from 'lucide-react'; // Import Lucide icons

import { IUser } from '../types';

interface UserTableProps {
  users: IUser[]; 
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  // console.log(users);

  const handleEdit = (userId: string) => {
    // console.log(`Editing user ID: ${userId}`);
    // Implement your edit logic here, for example, open a modal or navigate to an edit page
  };

  const handleDelete = (userId: string) => {
    // console.log(`Deleting user ID: ${userId}`);
    // Implement your delete logic here, e.g., call an API to delete the user
  };

  return (
    <Table isStriped aria-label="Dynamic User Table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>ACTIONS</TableColumn> 
      </TableHeader>
      <TableBody>
        {(
          users?.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {' '}
                  {/* Flex container for buttons */}
                  <button
                    aria-label="Edit User"
                    className="flex items-center text-blue-500 hover:text-blue-600"
                    onClick={() => handleEdit(user?._id)}
                  >
                    <Edit className="mr-1" size={16} />
                  </button>
                  <button
                    aria-label="Delete User"
                    className="flex items-center text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(user?._id)} 
                  >
                    <Trash2 className="mr-1" size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
