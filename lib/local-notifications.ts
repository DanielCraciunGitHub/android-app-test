import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationProps {
  title?: string;
  message: string;
  date?: Date;
}
export async function requestNotificationPermissions() {
  if (Platform.OS === "ios") {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  } else if (Platform.OS === "android") {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  }
  return true;
}

export async function scheduleNotification({
  title,
  message,
  date,
}: NotificationProps) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.warn("Notification permission not granted");
    return;
  }

  const notificationContent: Notifications.NotificationContentInput = {
    title: title,
    body: message,
    priority: Notifications.AndroidNotificationPriority.MAX,
    vibrate: [250, 250],
    sound: true,
  };

  await Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: {
      date: date || new Date(),
      type: Notifications.SchedulableTriggerInputTypes.DATE,
    },
  });
}
