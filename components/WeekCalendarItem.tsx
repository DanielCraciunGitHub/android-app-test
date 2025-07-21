import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import { scheduleNotification } from "@/lib/local-notifications";

export default function WeekCalendarItem({
  day,
  index,
}: {
  day: string;
  index: number;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleTimeChange = async (
    event: DateTimePickerEvent,
    date?: Date
  ) => {
    setShowPicker(Platform.OS === "ios");
    if (event.type === "set" && date) {
      setSelectedTime(date);

      const today = new Date();
      const selectedDay = index;
      const currentDay = today.getDay();
      let daysUntilNext = selectedDay - currentDay;
      if (daysUntilNext <= 0) daysUntilNext += 7;

      const nextOccurrence = new Date(today);
      nextOccurrence.setDate(today.getDate() + daysUntilNext);
      nextOccurrence.setHours(date.getHours());
      nextOccurrence.setMinutes(date.getMinutes());
      nextOccurrence.setSeconds(0);

      await scheduleNotification({
        title: `Gym Time - ${day}`,
        message: `Time for your workout!`,
        date: nextOccurrence,
      });
    }
  };

  const openTimePicker = () => {
    setShowPicker(true);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <View
      key={day}
      className="flex-1 border-b border-gray-200"
      style={index === 6 ? { borderBottomWidth: 0 } : undefined}
    >
      <TouchableOpacity
        onPress={openTimePicker}
        className="flex-row items-center justify-between p-4"
      >
        <Text className="text-sm font-medium text-gray-600">{day}</Text>
        {selectedTime ? (
          <View className="flex-row items-center space-x-2">
            <Ionicons name="time-outline" size={18} color="#3B82F6" />
            <Text className="text-sm font-medium text-blue-500">
              {formatTime(selectedTime)}
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center space-x-2 opacity-50">
            <Ionicons
              name="add-circle-outline"
              size={18}
              color="#6B7280"
            />
            <Text className="text-sm text-gray-500">Set reminder</Text>
          </View>
        )}
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}
