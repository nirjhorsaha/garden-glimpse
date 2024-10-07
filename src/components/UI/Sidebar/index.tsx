/* eslint-disable prettier/prettier */
"use client";

import { useState } from "react";
import { Image } from "@nextui-org/react";
import { Edit } from "lucide-react";

import PostCreateModal from "../PostCreateModal";
import EditNameModal from "../EditProfileModal";

import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

import { useUser } from "@/src/context/user.provider";

const Sidebar = () => {
  const { user } = useUser();
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="rounded-2xl max-w-sm lg:fixed">
      <div className="rounded-xl bg-gray-700 p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full rounded-xl overflow-hidden mb-5">
          <Image
            alt="profile"
            className="w-full object-cover"
            src={user?.profileImage as string}
          />
        </div>
        <div className="my-3 text-center">
          <h1 className="text-2xl font-semibold flex items-center justify-center">
            {user?.name}
            <Edit
              className="ml-2 cursor-pointer text-gray-300 hover:text-gray-100 transition-colors duration-200"
              onClick={handleOpenModal} // Open the modal on click
            />
          </h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>

        <div className="flex justify-around my-4 flex-col md:flex-row items-center">
          <div className="flex items-center">
            <span className="text-gray-100">
              {user?.followers || 0} Followers
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-100">
              {user?.followings || 0} Followings
            </span>
          </div>
        </div>
        <PostCreateModal />
      </div>
      <div className="mt-3 p-4 space-y-2 rounded-xl bg-default-100">
        <h2 className="text-lg font-semibold text-gray-100">Quick Links</h2>
        <SidebarOptions
          links={user?.role === "user" ? userLinks : adminLinks}
        />
      </div>

      {/* Include the Edit Name Modal */}
      <EditNameModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Sidebar;
