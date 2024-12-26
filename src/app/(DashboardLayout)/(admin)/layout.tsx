import { ReactNode } from 'react';

import Sidebar from '@/src/components/UI/Sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto max-w-7xl pt-8 md:pt-16 md:px-6 flex-grow">
      <div className="my-3 flex flex-col  md:flex-row w-full gap-12">
        <div className="w-full md:w-2/5">
          <Sidebar /> 
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </div>
  );
}
