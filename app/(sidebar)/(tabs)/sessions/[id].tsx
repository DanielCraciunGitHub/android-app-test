import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function SessionDetails() {
  const { id } = useLocalSearchParams();
  console.log(id);
  return <View></View>;
}
