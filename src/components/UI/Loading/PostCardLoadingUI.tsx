'use client';
import { Skeleton } from "@nextui-org/react";

const PostCardLoadingUI = () => {
  return (
    <section className="py-4">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Skeleton className="rounded-full h-6 w-96 mb-4" />
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-1 lg:grid-cols-1 lg:gap-x-8">
          <div className="group w-full border border-gray-300 dark:border-gray-700 rounded-2xl">
            <Skeleton className="rounded-t-2xl w-full mb-4" />
            <div className="p-4 lg:p-6">
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-6 w-1/4 mb-4" />
              <Skeleton className="h-8 w-full mb-5" />
              <Skeleton className="h-5 w-3/4 mb-10" />
              <Skeleton className="h-6 w-1/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostCardLoadingUI;
