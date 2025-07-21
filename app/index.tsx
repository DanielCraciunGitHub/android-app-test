import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert, Button, Text, View } from "react-native";

import { scheduleNotification } from "@/components/Notifications";

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const combineDateAndTime = (selectedTime: Date) => {
    const newDate = new Date(date);
    newDate.setHours(selectedTime.getHours());
    newDate.setMinutes(selectedTime.getMinutes());
    return newDate;
  };

  return (
    <View className="flex-1 items-center justify-center gap-4 dark:bg-black dark:text-white">
      <Text className="text-xl font-bold text-white">
        Welcome to GymTime!
      </Text>

      <View className="flex-row items-center gap-4">
        <Button title="Set Date" onPress={() => setShowDatePicker(true)} />
        <Button title="Set Time" onPress={() => setShowTimePicker(true)} />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="compact"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="spinner"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setDate(combineDateAndTime(selectedTime));
            }
          }}
        />
      )}

      <Button
        title="Schedule Reminder"
        onPress={() =>
          scheduleNotification({
            title: "Workout Reminder",
            message: `Time to workout! Your scheduled workout is now.`,
            type: "info",
            date: date,
          })
            .then(() => {
              Alert.alert(
                "Reminder Scheduled",
                "Your workout reminder has been scheduled."
              );
            })
            .catch((error) => {
              Alert.alert("Error", "Failed to schedule reminder.");
              console.error(error);
            })
        }
      />
    </View>
  );
}
