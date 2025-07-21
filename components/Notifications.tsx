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

export type NotificationType = "success" | "error" | "info";

export interface NotificationProps {
  title?: string;
  message: string;
  type?: NotificationType;
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

export async function showNotification({
  title,
  message,
  type = "info",
}: NotificationProps) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.warn("Notification permission not granted");
    return;
  }

  const notificationContent: Notifications.NotificationContentInput = {
    title: title || getDefaultTitle(type),
    body: message,
    sound: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
    vibrate: [250, 250],
  };

  await Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: null,
  });
}

export async function scheduleNotification({
  title,
  message,
  type = "info",
  date,
}: NotificationProps) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.warn("Notification permission not granted");
    return;
  }

  const notificationContent: Notifications.NotificationContentInput = {
    title: title || getDefaultTitle(type),
    body: message,
    sound: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
    vibrate: [250, 250],
    data: {
      type,
    },
  };

  await Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: {
      date: date || new Date(),
      type: Notifications.SchedulableTriggerInputTypes.DATE,
    },
  });
}

function getDefaultTitle(type: NotificationType): string {
  switch (type) {
    case "success":
      return "Success";
    case "error":
      return "Error";
    case "info":
    default:
      return "Information";
  }
}
