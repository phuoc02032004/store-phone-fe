import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import NavAction from "./NavAction";
import NavCategory from "./NavCategory";
import SearchBar from "./SearchBar";
import { Menu, X, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import NotificationTable from "@/components/notification/NotificationTable";
import { useNotifications } from "@/context/NotificationContext";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { unreadCount, fetchNotifications,  } = useNotifications();
  const [, setIsDesktopNotificationOpen] = useState(false);

  const handleOpenNotification = () => {
    fetchNotifications();
  };

  useEffect(() => {
  }, [unreadCount]);

  useEffect(() => {
    if( !localStorage.getItem("token") ) {
      console.warn("No token found in localStorage. Notifications will not be fetched.");
      return;
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        fetchNotifications();
      }
    }

    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 20000); 

    return () => clearInterval(intervalId);
  }, [fetchNotifications]);

  return (
    <div className="sticky top-0 z-50 flex flex-col items-center p-3 sm:p-4 md:p-6 md:flex-row md:justify-between md:items-center shadow-2xl border-[1px] border-gray-900 rounded-b-2xl sm:rounded-b-3xl backdrop-blur-3xl">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Logo />
        <div className="md:hidden flex items-center gap-2">
          <Sheet onOpenChange={(open) => { setIsMobileMenuOpen(open); handleOpenNotification(); }}>
            <SheetTrigger asChild>
              <button className="relative text-white focus:outline-none hover:text-gray-300 transition-colors">
                <Bell size={24} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  Your latest notifications.
                </SheetDescription>
              </SheetHeader>
              <NotificationTable />
            </SheetContent>
          </Sheet>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none hover:text-gray-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center w-full mt-4 space-y-4 animate-in slide-in-from-top">
          <NavCategory />
          <SearchBar />
          <NavAction />
        </div>
      )}

      <div className="hidden md:flex md:flex-row md:items-center md:gap-4 lg:gap-6 w-full md:w-auto">
        <NavCategory />
        <SearchBar />
        <NavAction />
        <Popover onOpenChange={(open) => { setIsDesktopNotificationOpen(open); handleOpenNotification(); }}>
          <PopoverTrigger asChild>
            <div className="relative inline-block cursor-pointer">
              <Bell size={24}
                className="w-5 h-5 text-white sm:w-6 sm:h-6 hover:text-gray-300 transition-all hover:scale-110"
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1.5
                     bg-red-500 text-white
                     text-xs font-semibold
                     w-4 h-4 rounded-full
                     flex items-center justify-center
                     pointer-events-none">
                  {unreadCount}
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <NotificationTable />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
