/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
// eslint-disable-next-line prettier/prettier
"use client"

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import { User, Settings, LogOut } from "lucide-react";
import { logout } from "@/src/services/AuthServices";
import { useUser } from "@/src/context/user.provider";
import { protectedRoutes } from "@/src/constant";
// import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser()
  console.log(user)

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


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
        <DropdownItem startContent={<User size={16} />} onClick={() => handleNavigation("/profile")}>
          Profile
        </DropdownItem>
        <DropdownItem startContent={<Settings size={16} />} onClick={() => handleNavigation("/settings")}>
          Settings
        </DropdownItem>

        {/* <DropdownItem startContent={<Plus size={16} />} onClick={() => handleNavigation("/create-post")}>
          Create Post
        </DropdownItem> */}

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
