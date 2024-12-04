"use client";

import { useUserStore } from "@/src/lib/zustand/userStore";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="text-center md:text-left">
      <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Guest'}!</h1>
      <p className="mt-2 text-lg">
        This is your profile page. Here you can manage your account and view your information.
      </p>
    </div>
  );
};

export default ProfilePage;