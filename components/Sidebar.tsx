import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Animated, Pressable, Text, View } from "react-native";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAVIGATION_ITEMS = [
  { name: "Timeline", icon: "time-outline", path: "/" },
  { name: "Workouts", icon: "barbell-outline", path: "/create-workout" },
  { name: "Reminders", icon: "calendar-outline", path: "/reminders" },
  { name: "Settings", icon: "settings-outline", path: "/settings" },
] as const;

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const translateX = useRef(new Animated.Value(-300)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: isOpen ? 0 : -300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isOpen ? 0.5 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen, translateX, opacity]);

  if (!isOpen) return null;

  const textColor =
    colorScheme === "dark" ? "text-white" : "text-gray-800";
  const iconColor = colorScheme === "dark" ? "#FFFFFF" : "#1F2937";
  const hoverBg =
    colorScheme === "dark" ? "active:bg-gray-800" : "active:bg-gray-100";

  const handleNavigation = (path: Href<any>) => {
    onClose();
    router.push(path);
  };

  return (
    <View className="absolute inset-0 z-50">
      <Animated.View
        style={{ opacity }}
        className="absolute inset-0 bg-black"
      >
        <Pressable onPress={onClose} className="h-full w-full" />
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
        className={`absolute bottom-0 left-0 top-0 w-[300px] ${
          colorScheme === "dark" ? "bg-black" : "bg-white"
        } shadow-xl`}
      >
        <View className="p-4 pt-12">
          {NAVIGATION_ITEMS.map((item) => (
            <Pressable
              key={item.path}
              onPress={() => handleNavigation(item.path)}
              className={`mb-2 flex-row items-center gap-3 rounded-lg p-4 ${hoverBg}`}
            >
              <Ionicons
                name={item.icon as any}
                size={24}
                color={iconColor}
              />
              <Text className={`${textColor} text-base`}>{item.name}</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
