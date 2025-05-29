import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { getmyNotifications, markNotificationAsRead as apiMarkNotificationAsRead } from '@/api/notify';
import type { Notify } from '@/types/Notify';
import { io, Socket } from 'socket.io-client';
import { SOCKET_IO_URL } from '@/constants';

interface NotificationContextType {
  notifications: Notify[];
  unreadCount: number;
  setNotifications: React.Dispatch<React.SetStateAction<Notify[]>>;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
  fetchNotifications: () => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notify[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getmyNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      toast.error("Failed to load notifications.");
    }
  }, []);

  const markNotificationAsRead = useCallback(async (id: string) => {
    try {
      await apiMarkNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
      toast.success("Notification marked as read.");
    } catch (error) {
      console.error(`Failed to mark notification ${id} as read:`, error);
      toast.error("Failed to mark notification as read.");
    }
  }, []);

  const markAllNotificationsAsRead = useCallback(async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      for (const notification of unreadNotifications) {
        if (notification._id) {
          await apiMarkNotificationAsRead(notification._id);
        }
      }
      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
      toast.success("All notifications marked as read.");
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      toast.error("Failed to mark all notifications as read.");
    }
  }, [notifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const newSocket = io(SOCKET_IO_URL, {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });    newSocket.on('newNotification', (newNotification: Notify) => {
      console.log('New notification received:', newNotification);
      const notificationWithReadStatus = { ...newNotification, read: false };
      setNotifications(prev => [notificationWithReadStatus, ...prev]);
      setUnreadCount(prev => prev + 1);
      toast.info(newNotification.title, {
        description: newNotification.body,
        duration: 5000,
      });
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    newSocket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  const showInfo = (message: string) => {
    toast.info(message);
  };
  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      setNotifications,
      setUnreadCount,
      fetchNotifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      showSuccess,
      showError,
      showInfo
    }}>
      {children}
    </NotificationContext.Provider>
  );
};