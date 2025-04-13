import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 grid grid-cols-[8fr_2fr] gap-4 p-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          {children}
        </div>
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
