/* eslint-disable prettier/prettier */
"use client";

import { useUser } from "@/src/context/user.provider"; // Adjust the path as necessary

const ProfilePage = () => {
  const { user } = useUser(); // Get user information from context

  return (
    <>
      <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Guest'}!</h1>
      <p className="mt-2 text-lg">
        This is your profile page. Here you can manage your account and view
        your information.
      </p>
    </>
  );
};

export default ProfilePage;
