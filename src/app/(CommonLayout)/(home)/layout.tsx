// This layout component is designed to accept two ReactNode props:
// 'children' for the main content and 'scrollablePost' for rendering posts in a scrollable section.

import { ReactNode } from "react";

export default function layout({
  children,
  scrollablePost,
}: {
  children: ReactNode;
  scrollablePost: ReactNode;
}) {
  return (
    <>
      {children}
      {scrollablePost}
    </>
  );
}