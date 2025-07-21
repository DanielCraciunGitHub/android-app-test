import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationProps {
  title?: string;
  message: string;
  type?: NotificationType;
}

// Request permissions (required for iOS)
export async function requestNotificationPermissions() {
  if (Platform.OS === 'ios') {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } else if (Platform.OS === 'android') {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }
  return true;
}

// Show a notification
export async function showNotification({ title, message, type = 'info' }: NotificationProps) {
  // Ensure we have permissions first
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.warn('Notification permission not granted');
    return;
  }

  // Configure the notification based on type
  const notificationContent: Notifications.NotificationContentInput = {
    title: title || getDefaultTitle(type),
    body: message,
    // You can customize these based on the type
    sound: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
    vibrate: [250, 250],
  };

  // Show the notification
  await Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: null, // null means show immediately
  });
}

// Helper function to get default titles based on type
function getDefaultTitle(type: NotificationType): string {
  switch (type) {
    case 'success':
      return 'Success';
    case 'error':
      return 'Error';
    case 'info':
    default:
      return 'Information';
  }
} 