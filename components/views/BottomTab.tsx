import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

import FeedScreen from "../screens/FeedScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { renderOptionsMenu } from "./OptionMenu";

type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Messages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTab = () => {
  const colorScheme = useColorScheme();

  // Determine the colors based on the color scheme
  const getTabBarColors = () => {
    if (colorScheme === "dark") {
      return {
        activeTintColor: "#38CC77", // Active icon color in dark mode
        inactiveTintColor: "gray", // Inactive icon color in dark mode
        tabBarStyle: { backgroundColor: "#000" }, // Background color of the tab bar in dark mode
        headerStyle: { backgroundColor: "#000" }, // Background color of the action bar in dark mode
        headerTintColor: "#fff" // Text color of the action bar in dark mode
      };
    } else {
      return {
        activeTintColor: "blue", // Active icon color in light mode
        inactiveTintColor: "gray", // Inactive icon color in light mode
        tabBarStyle: { backgroundColor: "#fff" }, // Background color of the tab bar in light mode
        headerStyle: { backgroundColor: "#fff" }, // Background color of the action bar in light mode
        headerTintColor: "#000" // Text color of the action bar in light mode
      };
    }
  };

  const tabBarColors = getTabBarColors();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Notifications") {
            iconName = "notifications";
          } else if (route.name === "Messages") {
            iconName = "mail";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else {
            iconName = "";
          }

          // @ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        ...tabBarColors,
        headerRight: renderOptionsMenu,
      })}
    >
      <Tab.Screen name="Home" component={FeedScreen} />
      <Tab.Screen name="Search" component={FeedScreen} />
      <Tab.Screen name="Notifications" component={EditProfileScreen} />
      <Tab.Screen name="Messages" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
