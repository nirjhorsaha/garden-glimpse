/* eslint-disable prettier/prettier */
import "@/src/styles/globals.css";

import Footer from "@/src/components/UI/Global/Footer";
import { Navbar } from "@/src/components/UI/Global/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
