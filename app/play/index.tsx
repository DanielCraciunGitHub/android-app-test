import { useState } from "react";
import { View } from "react-native";

import { CountdownTimer } from "@/components/CountdownTimer";

export default function Play() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <View className="flex-1 bg-yellow-500">
      <CountdownTimer
        durationSeconds={10}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
    </View>
  );
}
