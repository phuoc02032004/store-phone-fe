import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/index";
import Footer from "./Footer";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[linear-gradient(to_right,#522157,#53A6D8)]">
      <main className="flex flex-col flex-grow w-full min-h-screen">
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;