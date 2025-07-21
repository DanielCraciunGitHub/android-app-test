import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { requestNotificationPermissions, showNotification } from "../components/Notifications";

export default function Index() {
  useEffect(() => {
    // Request permissions when the component mounts
    requestNotificationPermissions();
  }, []);

  const showSuccessNotification = () => {
    showNotification({
      title: "Success",
      message: "Operation completed successfully!",
      type: "success",
    });
  };

  const showErrorNotification = () => {
    showNotification({
      title: "Error",
      message: "Something went wrong!",
      type: "error",
    });
  };

  const showInfoNotification = () => {
    showNotification({
      title: "Information",
      message: "Here's some useful information.",
      type: "info",
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text style={{ marginBottom: 20 }}>Test different types of notifications:</Text>
      
      <Button
        title="Show Success Notification"
        onPress={showSuccessNotification}
      />
      
      <Button
        title="Show Error Notification"
        onPress={showErrorNotification}
      />
      
      <Button
        title="Show Info Notification"
        onPress={showInfoNotification}
      />
    </View>
  );
}
