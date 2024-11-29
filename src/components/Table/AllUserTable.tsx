'use client';

import React from 'react';
import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from '@nextui-org/react';
import { Edit, Trash2, Eye } from 'lucide-react'; 

import { ColumnKey, IUser } from '../../types';
import { columns } from '../../constant';

interface UserTableProps {
  users: IUser[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const renderCell = React.useCallback((user: IUser, columnKey: ColumnKey) => {
    const cellValue =  user[columnKey as keyof IUser];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user?.profileImage }}
            description={user?.email}
            name={cellValue}
          >
            {cellValue}
          </User>
        );
      case 'role':
        return user.role === 'admin' ? (
          <Chip className="capitalize" color="primary" size="sm" variant="flat">
            {cellValue}
          </Chip>
        ) : (
          <p className="capitalize text-sm">{cellValue}</p>
        );
      case 'email':
        return (
          <p className="text-sm">{cellValue}</p>
        );
      case 'status':
        return (
          <Chip className="capitalize" color={user?.isDeleted ? 'danger' : 'success'} size="sm" variant="flat">
            {user?.isDeleted ? 'Deleted' : 'Active'}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Details">
              <button
                aria-label="Details User"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleDetails(user?._id)}
              >
                <Eye size={20} />
              </button>
            </Tooltip>
            <Tooltip content="Edit user">
              <button
                aria-label="Edit User"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleEdit(user?._id)}
              >
                <Edit size={16} />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <button
                aria-label="Delete User"
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDelete(user?._id)}
              >
                <Trash2 size={16} />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleDetails = (userId: string) => {
    console.log(`Details user ID: ${userId}`);
  };

  const handleEdit = (userId: string) => {
    console.log(`Editing user ID: ${userId}`);
  };

  const handleDelete = (userId: string) => {
    console.log(`Deleting user ID: ${userId}`);
  };

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);


  return (
    <Table isStriped aria-label="All User Table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="warning"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey as ColumnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
