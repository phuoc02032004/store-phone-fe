import React from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useNotifications } from "@/context/NotificationContext";
import type { Notify } from "@/types/Notify";
import { Button } from "@/components/ui/button";

const NotificationTable: React.FC = () => {
  const { notifications } = useNotifications();

  const [activeTab, setActiveTab] = React.useState<"all" | "unread">("all");

  const filteredNotifications =
    activeTab === "all" ? notifications : notifications.filter((n) => !n.read);

  return (
    <div className="w-full max-w-md mx-auto bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-2xl font-bold">Thông báo</h2>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === "all" ? "default" : "ghost"}
            onClick={() => setActiveTab("all")}
            className="rounded-full px-4 py-2 text-sm text-white"
          >
            Tất cả
          </Button>
          <Button
            variant={activeTab === "unread" ? "default" : "ghost"}
            onClick={() => setActiveTab("unread")}
            className="rounded-full px-4 py-2 text-sm text-white"
          >
            Chưa đọc
          </Button>
        </div>
        {/* <a href="#" className="text-sm text-primary hover:underline">Xem tất cả</a> */}
      </div>

      <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
        {filteredNotifications.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-center text-muted-foreground py-4">
              You're all caught up! No new notifications.
            </p>
          </div>
        ) : (
          <div>
            <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
              Trước đó
            </div>
            {filteredNotifications.map((notification: Notify) => (
              <div
                key={notification._id}
                className={`
                  flex items-start p-3 cursor-pointer
                  transition-colors duration-200
                  ${
                    !notification.read
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-muted/50"
                  }
                `}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 mr-3 flex items-center justify-center text-gray-600 dark:text-gray-400 text-sm">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-start">
                  <p
                    className={`text-sm ${
                      !notification.read
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`} 
                  >
                    {notification.title}: 
                    <span className="font-normal"> {notification.body}</span>
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
                  {/* Action Buttons Placeholder (e.g., Join, Delete) */}
                  {/* {notification.actions && (
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm">Tham gia</Button>
                      <Button size="sm" variant="outline">Xóa</Button>
                    </div>
                  )} */}
                </div>

                {!notification.read && (
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full ml-3 mt-1"></div>
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
