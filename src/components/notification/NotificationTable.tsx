import React from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useNotifications } from "@/context/NotificationContext";
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

const NotificationTable: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useNotifications();

  const [activeTab, setActiveTab] = React.useState<"all" | "unread">("all");

  const filteredNotifications =
    activeTab === "all" ? notifications : notifications.filter((n) => !n.read);

  return (
    <div className="w-full max-w-md mx-auto bg-card text-card-foreground shadow-xl rounded-lg overflow-hidden border border-border">
      <div className="text-3xl font-bold text-left pl-4 pt-3 pb-2 border-b border-border">
        Notifications
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            onClick={() => setActiveTab("all")}
            className="rounded-full px-4 py-2 text-sm text-white"
          >
            All
          </Button>
          <Button
            variant={activeTab === "unread" ? "default" : "outline"}
            onClick={() => setActiveTab("unread")}
            className="rounded-full px-4 py-2 text-sm text-white"
          >
            Unread
          </Button>
        </div>
        <Button
          variant="ghost"
          onClick={markAllNotificationsAsRead}
          className="rounded-full px-4 py-2 text-sm hover:bg-primary/10 text-white"
        >
          Mark All as Read
        </Button>
      </div>

      <div className="max-h-[500px] overflow-y-auto custom-scrollbar divide-y divide-border">
        {filteredNotifications.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-center text-muted-foreground py-4 text-lg">
              You're all caught up! No new notifications.
            </p>
          </div>
        ) : (
          <div>
            {filteredNotifications.map((notification: Notify) => {
              const getNotificationIcon = (title: string) => {
                if (title.includes("Order")) {
                  return <FaShoppingCart className="text-blue-500 text-xl" />;
                }
                if (title.includes("Promotion")) {
                  return <FaTag className="text-green-500 text-xl" />;
                }
                if (title.includes("System")) {
                  return <FaInfoCircle className="text-yellow-500 text-xl" />;
                }
                if (title.includes("Success")) {
                  return <FaCheckCircle className="text-green-500 text-xl" />;
                }
                if (title.includes("Error")) {
                  return <FaExclamationTriangle className="text-red-500 text-xl" />;
                }
                return <FaBell className="text-gray-500 text-xl" />; // Default icon
              };

              return (
                <div
                  key={notification._id}
                  className={`
                    flex items-start p-4 cursor-pointer
                    transition-colors duration-200
                    ${
                      !notification.read
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "hover:bg-muted/50"
                    }
                  `}
                  onClick={() =>
                    notification._id &&
                    markNotificationAsRead(notification._id.toString())
                  }
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted mr-3 flex items-center justify-center">
                    {getNotificationIcon(notification.title)}
                  </div>

                <div className="flex flex-col text-left flex-grow">
                  <p
                    className={`text-base ${
                      !notification.read
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {notification.title}:{" "}
                    <span className="font-normal text-sm">
                      {notification.body}
                    </span>
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      !notification.read
                        ? "text-blue-600 dark:text-blue-400"
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

                {!notification.read && (
                  <div className="flex-shrink-0 w-2.5 h-2.5 bg-blue-500 rounded-full ml-3 mt-1.5"></div>
                )}
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationTable;
