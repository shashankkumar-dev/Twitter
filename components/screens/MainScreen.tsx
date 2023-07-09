import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ComposeScreen from "./ComposeScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import { setNavigator } from "../other/navigation";
import BottomTab from "../views/BottomTab";
import EditProfileScreen from "./EditProfileScreen";
import { getBackgroundColor, getReverseBackgroundColor } from "../views/BackgroundColor";
import { StatusBar } from "react-native";
import { FollowerScreen, FollowingScreen }from "./FollowScreen";

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Compose: undefined;
  EditProfile: undefined;
  Tab: undefined;
  Follower: undefined;
  Followee: undefined;
  Logout: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function MainScreen() {
  const backgroundColor = getBackgroundColor(); // Store the background color in a variable
  StatusBar.setBackgroundColor(backgroundColor); // Set the color of the status bar (action bar)
  StatusBar.setBarStyle("light-content");
  return (
    <NavigationContainer ref={setNavigator}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: getBackgroundColor() // Set action bar color
          },
          headerTintColor: getReverseBackgroundColor() // Set text color
        }}
      >
        <Stack.Screen name="Tab" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Compose" component={ComposeScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Follower" component={FollowerScreen} />
        <Stack.Screen name="Followee" component={FollowingScreen} />
        <Stack.Screen name="Logout" component={LoginScreen} options={{ title: "Logout" }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
