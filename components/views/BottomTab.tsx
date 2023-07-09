import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";

import FeedScreen from "../screens/FeedScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { renderOptionsMenu } from "./OptionMenu";
import { IconView } from "./CustomView";
import UserScreen from "../screens/UserScreen";
import { NotificationScreen } from "../screens/NotificationScreen";

type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Messages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const FeedTab = () => {
  return (
    <FeedScreen handle={undefined} />
  );
};

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
        tabBarIcon: () => {
          return <IconView name={route.name} />;
        },
        //tabBarLabel: "", // Set tabBarLabel to an empty string to remove the label
        ...tabBarColors,
        headerRight: renderOptionsMenu
      })}
    >
      <Tab.Screen name="Home" component={FeedTab} />
      <Tab.Screen name="Search" component={UserScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Messages" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
