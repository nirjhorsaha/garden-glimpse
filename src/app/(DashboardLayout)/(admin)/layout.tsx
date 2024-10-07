/* eslint-disable prettier/prettier */
// import { Navbar } from "@/src/components/UI/navbar";
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col ">
            <h1>Admin sidebar</h1>
        <main>{children}</main>
      </div>
    );
  }
  