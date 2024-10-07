/* eslint-disable prettier/prettier */
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