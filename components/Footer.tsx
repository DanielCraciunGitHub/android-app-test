import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

// Placeholder screen components
const PlaceholderScreen = () => <View />;

export default function Footer() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 0,
          borderTopColor: "#000000",
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: "#023c69",
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="index"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="workouts"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
