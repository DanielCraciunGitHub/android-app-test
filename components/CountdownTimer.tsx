import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface CountdownTimerProps {
  durationSeconds: number;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
}

export const CountdownTimer = ({
  durationSeconds,
  isPaused,
  setIsPaused,
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft, isPaused]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-9xl font-bold text-white">{timeLeft}</Text>
      <TouchableOpacity onPress={() => setIsPaused(!isPaused)}>
        <Ionicons
          name={isPaused ? "play-circle" : "pause-circle"}
          size={100}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};
