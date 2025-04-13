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
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4 px-0 lg:px-4 py-4">
        <div className="bg-white p-4 border border-slate-400 lg:rounded-lg">
          {children}
        </div>
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
