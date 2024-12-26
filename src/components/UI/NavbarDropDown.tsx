"use client"

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import { User, LogOut, LayoutDashboard } from 'lucide-react';

import { logout } from "@/src/services/AuthServices";
import { useUser } from "@/src/context/user.provider";
import { protectedRoutes } from "@/src/constant";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { user: userData, setIsLoading: userLoading } = useUser()

  const user = (userData as any)?.data

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          className="cursor-pointer"
          size="sm"
          src={user?.profileImage || 'https://i.pravatar.cc/150?u=a042581f4e29026024d'}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {user?.role === "admin" ? (
          <DropdownItem
            key={1}
            startContent={<LayoutDashboard size={16} />}
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            Dashboard
          </DropdownItem>
        ) : (
            <DropdownItem
              key={1}
            startContent={<User size={16} />}
            onClick={() => handleNavigation("/profile")}
          >
            Profile
          </DropdownItem>
        )}
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<LogOut size={16} />}
          onClick={handleLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
