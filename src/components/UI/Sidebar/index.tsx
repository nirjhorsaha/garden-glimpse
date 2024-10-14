/* eslint-disable prettier/prettier */
"use client";

import { useState } from "react";
import { Button, Image } from "@nextui-org/react";
import { Edit, ShieldCheck } from 'lucide-react';

import { useUser } from "@/src/context/user.provider";

import PostCreateModal from "../PostCreateModal";
import EditNameModal from "../EditProfileModal";

import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";


const Sidebar = () => {
  const { user } = useUser();
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  // Helper function to render followers or followings
  const renderCount = (count: number, label: string) => {
    return (
      <div className="flex items-center">
        <span className="text-gray-100">
          {count > 0 ? count : 0} {label}
          {count !== 1 ? 's' : ''}
        </span>
      </div>
    );
  };

  
  return (
    <div className="rounded-2xl max-w-sm ">
      <div className="rounded-xl bg-gray-700 p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative rounded-xl overflow-hidden mb-5">
          <Image
            alt="profile"
            className="w-full object-cover"
            src={user?.profileImage as string}
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold flex items-center justify-center">
            {user?.name}
            {user?.profileVerified ? (
              <ShieldCheck className="ml-1 text-white" size={20} />
            ) : null}
          </h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
        <div className="flex justify-around my-4 flex-col md:flex-row items-center">
          {renderCount(Number(user?.followers) || 0, 'Follower')}
          {renderCount(Number(user?.followings) || 0, 'Following')}
        </div>

        {user?.role === 'user' && <PostCreateModal />}

        {/* Open the modal on click */}
        <Button
          className="mt-2 w-full rounded-m"
          color="success"
          onClick={handleOpenModal}
        >
          <Edit
            className=" cursor-pointer text-black transition-colors duration-200"
            size={16}
          />
          Edit Profile
        </Button>
        {!user?.profileVerified && (
          <Button className="mt-2 w-full rounded-m" color="warning">
            Verify Profile
          </Button>
        )}
      </div>
      <div className="mt-3 p-4 space-y-2 rounded-xl bg-default-100">
        <h2 className="text-lg font-semibold text-gray-100">Quick Links</h2>
        <SidebarOptions
          links={user?.role === 'user' ? userLinks : adminLinks}
        />
      </div>

      {/* Include the Edit Name Modal */}
      <EditNameModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Sidebar;
