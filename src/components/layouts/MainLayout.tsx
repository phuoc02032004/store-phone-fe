import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/index";
import Footer from "./Footer";

const MainLayout: React.FC = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-[linear-gradient(to_right,#522157,#53A6D8)]">
      <Navbar />
      <main className="relative flex flex-col flex-grow w-full min-h-screen">
        <div className=" inset-0 min-h-screen">
          <Outlet />
        </div>

        <div>
          <Footer />
        </div>
        
      </main>
      
    </div>
  );
};

export default MainLayout;