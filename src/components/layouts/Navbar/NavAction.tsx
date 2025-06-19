import React, { useState } from "react";
import { ShoppingBag, User, Menu, Bell} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "@/store/cartSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationTable from "@/components/notification/NotificationTable";
import { useNotifications } from "@/context/NotificationContext";
import SearchBar from "./SearchBar";

interface NavActionProps {
  onMenuClick: () => void;
}

const NavAction: React.FC<NavActionProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const itemCount = useSelector(selectCartItemCount);
  const { unreadCount, fetchNotifications } = useNotifications();
  const [, setIsDesktopNotificationOpen] = useState(false);

  const handleOpenNotification = () => {
    if (!localStorage.getItem("token")) {
      return null;
    } else {
      fetchNotifications();
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 sm:gap-4 lg:gap-6 w-full">
      <SearchBar/>

       {!localStorage.getItem("token") ? null : (
          <Popover
            onOpenChange={(open) => {
              setIsDesktopNotificationOpen(open);
              handleOpenNotification();
            }}
          >
            <PopoverTrigger asChild>
              <div className="relative inline-block cursor-pointer">
                <Bell
                  size={24}
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 hover:text-gray-300 transition-all hover:scale-110"
                />
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1.5
                     bg-red-500 text-white
                     text-xs font-semibold
                     w-4 h-4 rounded-full
                     flex items-center justify-center
                     pointer-events-none"
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <NotificationTable />
            </PopoverContent>
          </Popover>
        )}
      
      <div className="relative inline-block">
        <ShoppingBag
          className="w-5 h-5 text-white cursor-pointer sm:w-6 sm:h-6 hover:text-gray-900 transition-all hover:scale-110"
          onClick={() => navigate('/cart')}
        />
        {itemCount > 0 && (
          <div
            className="absolute -top-1 -right-1.5
                       bg-red-500 text-white
                       text-xs font-semibold
                       w-4 h-4 rounded-full
                       flex items-center justify-center
                       pointer-events-none"
          >
            {itemCount > 9 ? '9+' : itemCount}
          </div>
        )}
      </div>

      {localStorage.getItem("token") ? (
        <div>
          <User
            className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-gray-300 transition-all hover:scale-110 cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        </div>
      ) : (
        <div className="flex sm:flex-row gap-2 text-white">
          <Button
            className="text-sm sm:text-base hover:text-gray-300 transition-all hover:scale-105"
            onClick={() => navigate("/login")}
            variant="ghost"
          >
            Login
          </Button>
          <Button
            className="text-sm sm:text-base hover:text-gray-300 transition-all hover:scale-105"
            onClick={() => navigate("/register")}
            variant="ghost"
          >
            Register
          </Button>
        </div>
      )}
      <Menu size={20} className="cursor-pointer hover:text-white transition-colors md:hidden" onClick={onMenuClick} />
    </div>
  );
};

export default NavAction;
