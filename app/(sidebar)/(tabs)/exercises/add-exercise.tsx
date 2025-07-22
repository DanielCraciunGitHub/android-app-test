import { router } from "expo-router";
import { View } from "react-native";

import { getItem, setItem, StorageKey } from "@/lib/local-storage";
import {
  ExerciseDetails,
  ExerciseInput,
} from "@/components/ExerciseInput";

export default function Workouts() {
  const handleSubmit = async (details: ExerciseDetails) => {
    const exercises = await getItem<ExerciseDetails[]>(
      StorageKey.EXERCISES
    );

    if (exercises) {
      exercises.push(details);
      setItem(StorageKey.EXERCISES, exercises);
    } else {
      setItem(StorageKey.EXERCISES, [details]);
    }

    router.back();
  };

  return (
    <View className="flex-1 items-center justify-center dark:bg-black dark:text-white">
      <ExerciseInput onSubmit={handleSubmit} />
    </View>
  );
}
