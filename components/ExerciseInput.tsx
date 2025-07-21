import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export interface ExerciseDetails {
  targetSets: string;
  targetReps: string;
  targetRestTime: string;
}

interface ExerciseInputProps {
  onSubmit: (details: ExerciseDetails) => void;
  initialValues?: ExerciseDetails;
}

const defaultValues: ExerciseDetails = {
  targetSets: "",
  targetReps: "",
  targetRestTime: "",
};

export const ExerciseInput: React.FC<ExerciseInputProps> = ({
  onSubmit,
  initialValues = defaultValues,
}) => {
  const [details, setDetails] = useState<ExerciseDetails>(initialValues);

  const handleSubmit = () => {
    onSubmit(details);
    setDetails(defaultValues);
  };

  return (
    <View className="rounded-lg bg-white p-4 shadow-md dark:bg-black dark:text-white">
      <Text className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
        Exercise Details
      </Text>

      {/* Target Sets Input */}
      <View className="mb-4">
        <Text className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Target Sets (adaptable)
        </Text>
        <TextInput
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          value={details.targetSets}
          onChangeText={(text: string) =>
            setDetails({ ...details, targetSets: text })
          }
          placeholder="Enter number of sets"
          keyboardType="numeric"
        />
      </View>

      {/* Target Reps Input */}
      <View className="mb-4">
        <Text className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Target Reps (fixed)
        </Text>
        <TextInput
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          value={details.targetReps}
          onChangeText={(text: string) =>
            setDetails({ ...details, targetReps: text })
          }
          placeholder="Enter number of reps"
          keyboardType="numeric"
        />
      </View>

      {/* Target Rest Time Input */}
      <View className="mb-6">
        <Text className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Target Rest Time (adaptable)
        </Text>
        <TextInput
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          value={details.targetRestTime}
          onChangeText={(text: string) =>
            setDetails({ ...details, targetRestTime: text })
          }
          placeholder="Enter rest time in seconds"
          keyboardType="numeric"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="w-full rounded-md bg-blue-500 py-3 dark:bg-blue-500"
        onPress={handleSubmit}
      >
        <Text className="px-2 text-center font-semibold text-white">
          Save Exercise
        </Text>
      </TouchableOpacity>
    </View>
  );
};
