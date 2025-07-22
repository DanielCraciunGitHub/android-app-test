import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";

import { getItem, setItem, StorageKey } from "@/lib/local-storage";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ExerciseDetails } from "@/components/ExerciseInput";

export default function MyExercises() {
  const [exercises, setExercises] = useState<ExerciseDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedExercises = exercises.filter((e) => e.selected);

  const loadExercises = async () => {
    try {
      setIsLoading(true);
      const storedExercises = await getItem<ExerciseDetails[]>(
        StorageKey.EXERCISES
      );
      setExercises(storedExercises || []);
    } catch (error) {
      console.error("Error loading exercises:", error);
      Alert.alert("Error", "Failed to load exercises");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadExercises();
    }, [])
  );

  const handleSelectExercise = async (exercise: ExerciseDetails) => {
    const updatedExercises = exercises.map((e) =>
      e.name === exercise.name ? { ...e, selected: !e.selected } : e
    );
    setExercises(updatedExercises);
    await setItem(StorageKey.EXERCISES, updatedExercises);
  };

  const handleDeleteExercise = async (exercise: ExerciseDetails) => {
    try {
      const updatedExercises = exercises.filter(
        (e) => e.name !== exercise.name
      );
      await setItem(StorageKey.EXERCISES, updatedExercises);
      setExercises(updatedExercises);

      Alert.alert("Success", "Exercise deleted successfully");
    } catch (error) {
      console.error("Error deleting exercise:", error);
      Alert.alert("Error", "Failed to delete exercise");
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-lg text-gray-600 dark:text-gray-300">
          Loading exercises...
        </Text>
      </View>
    );
  }

  if (exercises.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-xl font-bold text-gray-800 dark:text-white">
          No Exercises Yet
        </Text>
        <Text className="mt-2 text-center text-gray-600 dark:text-gray-300">
          Create your first exercise to get started!
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className="flex-row items-center justify-between px-4 py-4">
        <Text className="text-2xl font-bold text-gray-800 dark:text-white">
          My Exercises ({exercises.length})
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          {selectedExercises.length} selected
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
            isSelected={exercise.selected}
            onSelect={handleSelectExercise}
            onDelete={handleDeleteExercise}
          />
        ))}
      </ScrollView>
    </View>
  );
}
