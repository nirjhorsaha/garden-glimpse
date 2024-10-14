/* eslint-disable prettier/prettier */
'use client';

import { Skeleton } from '@nextui-org/react';

const SidebarLoadingUI = () => {
  return (
    <div className="rounded-2xl max-w-sm h-screen overflow-hidden">
      <div className="rounded-xl bg-gray-700 p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image Skeleton */}
        <div className="relative w-full h-32 mb-5">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>

        {/* User Info Skeleton */}
        <div className="my-3 text-center flex flex-col items-center">
          <Skeleton className="w-1/2 h-6 mb-1" />
          <Skeleton className="w-1/2 h-4" />
        </div>

        {/* Followers and Followings Skeleton */}
        <div className="flex justify-around my-4 flex-col md:flex-row items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Quick Links Section */}
        <div className="mt-3 p-4 space-y-2 rounded-xl bg-default-100 flex-1">
          <h2 className="text-lg font-semibold text-gray-100">Quick Links</h2>
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
  );
};

export default SidebarLoadingUI;
