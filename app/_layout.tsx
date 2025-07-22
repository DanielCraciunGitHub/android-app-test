import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../global.css";

import Ionicons from "@expo/vector-icons/build/Ionicons";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          drawerPosition: "left",
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? "#000000" : "#FFFFFF",
          },
          headerTintColor: colorScheme === "dark" ? "#FFFFFF" : "#023c69",
          drawerActiveTintColor:
            colorScheme === "dark" ? "#FFFFFF" : "#023c69",
          drawerInactiveTintColor:
            colorScheme === "dark" ? "#9CA3AF" : "#6B7280",
          drawerStyle: {
            backgroundColor:
              colorScheme === "dark" ? "#000000" : "#FFFFFF",
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Timeline",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="my-exercises"
          options={{
            drawerLabel: "My Exercises",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="body-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
