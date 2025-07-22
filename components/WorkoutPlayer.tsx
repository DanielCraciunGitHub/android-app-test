import { useEffect } from "react";
import {
  currentExerciseIndexAtom,
  currentSetIndexAtom,
  performSetPhaseAtom,
  prepPhaseAtom,
  restPhaseAtom,
} from "@/atoms/play";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ISettings } from "@/config/settings";
import { usePlayBackground } from "@/hooks/play-background";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ExerciseDetails } from "@/components/ExerciseInput";
import ExerciseProgress from "@/components/ExerciseProgress";

export default function WorkoutPlayer({
  exercises,
  settings,
}: {
  exercises: ExerciseDetails[];
  settings: ISettings;
}) {
  const [currentSetIndex, setCurrentSetIndex] = useAtom(
    currentSetIndexAtom
  );
  const [currentExerciseIndex, setCurrentExerciseIndex] = useAtom(
    currentExerciseIndexAtom
  );

  const [prepPhase, setPrepPhase] = useAtom(prepPhaseAtom);
  const [performSetPhase, setPerformSetPhase] = useAtom(
    performSetPhaseAtom
  );
  const [restPhase, setRestPhase] = useAtom(restPhaseAtom);

  const currentExercise = exercises[currentExerciseIndex];

  const backgroundColor = usePlayBackground();

  useEffect(() => {
    setPrepPhase(true);
    setPerformSetPhase(false);
    setRestPhase(false);
    setCurrentSetIndex(0);
    setCurrentExerciseIndex(0);
  }, [
    setPrepPhase,
    setPerformSetPhase,
    setRestPhase,
    setCurrentSetIndex,
    setCurrentExerciseIndex,
  ]);

  console.log(
    prepPhase
      ? "prep"
      : performSetPhase
        ? "perform"
        : restPhase
          ? "rest"
          : "play"
  );

  return (
    currentExercise && (
      <SafeAreaView className={`flex-1 ${backgroundColor}`}>
        <ExerciseProgress
          totalSets={Number(currentExercise.targetSets)}
          exerciseName={currentExercise.name}
        />

        {prepPhase && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-2xl font-bold text-white">
              Phone down. Get ready.
            </Text>
            <CountdownTimer
              durationSeconds={settings.prepTime}
              onComplete={() => {
                setPrepPhase(false);
                setPerformSetPhase(true);
              }}
            />
          </View>
        )}

        {performSetPhase && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-7xl font-bold text-white">
              {currentExercise.targetReps} reps
            </Text>

            <TouchableOpacity
              onPress={() => {
                setPerformSetPhase(false);
                setRestPhase(true);
              }}
            >
              <Ionicons name={"play-forward"} size={100} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {restPhase && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-7xl font-bold text-white">
              Rest.
            </Text>

            <CountdownTimer
              durationSeconds={Number(currentExercise.targetRestTime)}
              onComplete={() => {
                setRestPhase(false);
                setCurrentSetIndex(currentSetIndex + 1);
                if (
                  currentSetIndex <
                  Number(currentExercise.targetSets) - 1
                ) {
                  setPerformSetPhase(true);
                } else {
                  setCurrentExerciseIndex(currentExerciseIndex + 1);
                  setCurrentSetIndex(0);
                  setPrepPhase(true);
                  setRestPhase(false);
                  setPerformSetPhase(false);
                }
              }}
            />
          </View>
        )}
      </SafeAreaView>
    )
  );
}
