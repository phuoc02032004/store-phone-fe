import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useNotifications } from "@/context/NotificationContext";
// import { useTheme } from "@/context/ThemeContext"; // Removed, relying on Tailwind dark mode
import type { Notify } from "@/types/Notify";
import { Button } from "@/components/ui/button";
import {
  FaBell,
  FaShoppingCart,
  FaTag,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { BellRing, CheckCheck } from "lucide-react"; // Alternative icons from Lucide

const NotificationTable: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useNotifications();
  // const { theme } = useTheme(); // Removed

  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const filteredNotifications =
    activeTab === "all" ? notifications : notifications.filter((n) => !n.read);

  const getNotificationIcon = (title: string) => {
    // Enhanced icon colors for better dark mode compatibility
    if (title.toLowerCase().includes("order")) {
      return <FaShoppingCart className="text-sky-500 dark:text-sky-400 text-lg" />;
    }
    if (title.toLowerCase().includes("promotion")) {
      return <FaTag className="text-emerald-500 dark:text-emerald-400 text-lg" />;
    }
    if (title.toLowerCase().includes("system")) {
      return <FaInfoCircle className="text-amber-500 dark:text-amber-400 text-lg" />;
    }
    if (title.toLowerCase().includes("success")) {
      return <FaCheckCircle className="text-lime-600 dark:text-lime-500 text-lg" />;
    }
    if (title.toLowerCase().includes("error") || title.toLowerCase().includes("warning")) {
      return <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-lg" />;
    }
    return <FaBell className="text-slate-500 dark:text-slate-400 text-lg" />;
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden border border-border bg-card text-card-foreground">
      {/* Header Title */}
      <div className="px-4 sm:px-6 py-4 border-b border-border">
        <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
          <BellRing className="w-6 h-6 mr-2 text-primary" />
          Notifications
        </h2>
      </div>

      {/* Tabs and Actions */}
      <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-border 
                      flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            onClick={() => setActiveTab("all")}
            className="flex-1 sm:flex-none text-sm rounded-md" // rounded-md instead of full for a more common look
          >
            All ({notifications.length})
          </Button>
          <Button
            variant={activeTab === "unread" ? "default" : "outline"}
            onClick={() => setActiveTab("unread")}
            className="flex-1 sm:flex-none text-sm rounded-md"
          >
            Unread ({notifications.filter(n => !n.read).length})
          </Button>
        </div>
        {notifications.some(n => !n.read) && (
          <Button
            variant="ghost" // Changed to ghost for less prominence
            size="sm"
            onClick={markAllNotificationsAsRead}
            className="w-full sm:w-auto text-sm text-muted-foreground hover:text-primary rounded-md"
          >
            <CheckCheck className="w-4 h-4 mr-1.5" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notification List */}
      <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto divide-y divide-border">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 p-4 text-center">
            <FaBell className="w-12 h-12 text-muted-foreground/70 mb-3" />
            <p className="text-lg font-medium text-muted-foreground">
              {activeTab === 'unread' ? "No unread notifications" : "You're all caught up!"}
            </p>
            <p className="text-sm text-muted-foreground/80">
              {activeTab === 'unread' ? "Looks like you've read everything." : "No new notifications at the moment."}
            </p>
          </div>
        ) : (
          <div>
            {filteredNotifications.map((notification: Notify) => (
              <div
                key={notification._id}
                className={`
                  flex items-start gap-x-3 p-3 sm:p-4 cursor-pointer transition-colors duration-150
                  ${
                    !notification.read
                      ? "bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20" // Subtle primary highlight for unread
                      : "hover:bg-muted/50"
                  }
                `}
                onClick={() =>
                  notification._id &&
                  markNotificationAsRead(notification._id.toString())
                }
              >
                {/* Icon Container */}
                <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-muted`}>
                  {getNotificationIcon(notification.title)}
                </div>

                {/* Text Content */}
                <div className="flex-grow pt-0.5 sm:pt-0">
                  <p
                    className={`text-sm leading-snug
                      ${
                        !notification.read
                          ? "font-semibold text-foreground"
                          : "font-medium text-muted-foreground"
                      }`}
                  >
                    {notification.title}
                  </p>
                  <p
                     className={`text-sm mt-0.5 leading-snug
                      ${
                        !notification.read
                          ? "text-foreground/90" // Slightly less prominent than title for unread
                          : "text-muted-foreground/80"
                      }`}
                  >
                    {notification.body}
                  </p>
                  <p
                    className={`text-xs mt-1.5
                      ${
                        !notification.read
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                  >
                    {notification.createdAt
                      ? formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                          locale: vi,
                        })
                      : "N/A"}
                  </p>
                </div>

                {/* Unread Dot Indicator */}
                {!notification.read && (
                  <div className="flex-shrink-0 w-2.5 h-2.5 bg-primary rounded-full ml-auto mt-1 sm:mt-1.5"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationTable;