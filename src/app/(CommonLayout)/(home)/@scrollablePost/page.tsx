/* eslint-disable prettier/prettier */
"use client"
import { ScrollShadow } from "@nextui-org/react";

import Post from "@/src/components/Module/Home/post";

/* eslint-disable prettier/prettier */
export default function page() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      {/* Scrollable Post Component */}
      <ScrollShadow hideScrollBar className=" lg:max-h-[600px]">
        <Post />
      </ScrollShadow>
    </div>
  );
};

// export default page;