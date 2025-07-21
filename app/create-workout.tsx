import { View } from "react-native";

import {
  ExerciseDetails,
  ExerciseInput,
} from "@/components/ExerciseInput";

export default function Workouts() {
  const handleSubmit = (details: ExerciseDetails) => {
    console.log(details);
  };

  return (
    <View className="flex-1 items-center justify-center dark:bg-black dark:text-white">
      <ExerciseInput onSubmit={handleSubmit} />
    </View>
  );
}
