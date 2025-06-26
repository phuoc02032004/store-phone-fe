import React, { type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/index";
import Footer from "./Footer";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/register', '/cart'];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="relative flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="relative flex flex-col flex-grow w-full min-h-screen">
        <div className=" inset-0 min-h-screen">
          {children || <Outlet />}
        </div>
        {!shouldHideFooter && (
          <div>
            <Footer />
          </div>
        )}
      </main>
    </div>
  );
};

export default MainLayout;