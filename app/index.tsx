import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center gap-4 dark:bg-black">
      <Text className="text-xl font-bold text-white">
        Welcome to GymTime!
      </Text>
    </View>
  );
}
