import { useEffect, useState } from 'react';
import { getMessagingToken, onMessageListener } from '@/utils/firebase';
import type { MessagePayload } from 'firebase/messaging';
import { updateFCMToken } from '@/api/user';
import { useNotifications } from '@/context/NotificationContext';
import type { Notify } from '@/types/Notify';

export const useFirebaseMessaging = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const { showInfo, setNotifications, setUnreadCount } = useNotifications();

  useEffect(() => {
    const requestToken = async () => {
      const token = await getMessagingToken();
      if (token) {
        setFcmToken(token);
        try {
          await updateFCMToken(token);
          console.log("FCM token updated successfully.");
        } catch (error) {
          console.error("Failed to update FCM token: ", error);
        }
      }
    };

    requestToken();
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    if (typeof window !== 'undefined') {
      unsubscribe = onMessageListener((payload: MessagePayload) => {
        console.log("Receive foreground: ", payload);
        if (payload.notification && payload.data) {
          // Hiển thị toast notification
          showInfo(payload.notification.title || "New Notification");

          // Tạo notification object từ payload
          const newNotification: Notify = {
            _id: payload.data.notificationId as string,
            title: payload.notification.title || "New Notification",
            body: payload.notification.body || "",
            read: false,
            createdAt: new Date(),
            data: payload.data
          };

          // Cập nhật notifications trong context
          setNotifications((prev: Notify[]) => [newNotification, ...prev]);
          setUnreadCount((prev: number) => prev + 1);
        }
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [showInfo, setNotifications, setUnreadCount]);

  return { fcmToken };
};