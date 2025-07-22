import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  DEFAULT_PREP_TIME,
  DEFAULT_WORKOUT_REMINDER_TIME,
  getSettings,
  ISettings,
} from "@/config/settings";
import { getItem, StorageKey } from "@/lib/local-storage";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ExerciseDetails } from "@/components/ExerciseInput";

export default function Play() {
  const [isPaused, setIsPaused] = useState(false);
  const [exercises, setExercises] = useState<ExerciseDetails[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const currentExercise = exercises[currentExerciseIndex];
  const [settings, setSettings] = useState<ISettings>({
    workoutReminderTime: DEFAULT_WORKOUT_REMINDER_TIME,
    prepTime: DEFAULT_PREP_TIME,
  });
  const [prepPhase, setPrepPhase] = useState(false);
  const [performSetPhase, setPerformSetPhase] = useState(false);
  const [restPhase, setRestPhase] = useState(false);

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // TODO: Redirect to end screen
      setCurrentExerciseIndex(0);
    }
  };

  useEffect(() => {
    const loadExercises = async () => {
      const exercises = await getItem<ExerciseDetails[]>(
        StorageKey.EXERCISES
      );
      if (exercises) {
        setExercises(exercises);
      }
    };
    const loadSettings = async () => {
      const settings = await getSettings();
      if (settings) {
        setSettings(settings);
      }
    };

    loadExercises();
    loadSettings();
  }, []);

  console.log(settings);

  return (
    currentExercise && (
      <SafeAreaView className="flex-1 bg-yellow-500">
        <Text className="mt-4 text-center text-5xl font-bold text-white">
          {currentExercise.name}
        </Text>
        {prepPhase && (
          <CountdownTimer
            durationSeconds={settings.prepTime}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
        )}
      </SafeAreaView>
    )
  );
}
