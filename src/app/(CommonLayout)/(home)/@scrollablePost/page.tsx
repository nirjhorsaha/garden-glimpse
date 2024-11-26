"use client"

import { ScrollShadow } from "@nextui-org/react";

import Post from "@/src/components/Module/Home/post";

export default function page() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      {/* Scrollable Post Component */}
      <ScrollShadow hideScrollBar className=" lg:max-h-[650px]">
        <Post />
      </ScrollShadow>
    </div>
  );
};

// export default page;