import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, useColorScheme } from "react-native";

import FeedScreen from "../screens/FeedScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { renderOptionsMenu } from "./OptionMenu";
import { getReverseBackgroundColor } from "./BackgroundColor";

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
          let icon;

          if (route.name === "Home") {
            icon = require("../../assets/home.png");
          } else if (route.name === "Search") {
            icon = require("../../assets/search.png");
          } else if (route.name === "Notifications") {
            icon = require("../../assets/notification.png");
          } else if (route.name === "Messages") {
            icon = require("../../assets/mail.png");
          } else if (route.name === "Profile") {
            icon = require("../../assets/profile.png");
          } else {
            icon = require("../../assets/home.png");
          }

          // @ts-ignore
          return <Image source={icon} style={styles.smallIcon} tintColor={getReverseBackgroundColor()} />;
        },
        tabBarLabel: "", // Set tabBarLabel to an empty string to remove the label
        ...tabBarColors,
        headerRight: renderOptionsMenu
      })}
    >
      <Tab.Screen name="Home" component={FeedTab} />
      <Tab.Screen name="Search" component={ChatScreen} />
      <Tab.Screen name="Notifications" component={EditProfileScreen} />
      <Tab.Screen name="Messages" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  smallIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginTop: 10
  }
});
export default BottomTab;
