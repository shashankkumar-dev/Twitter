import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ComposeScreen from "./ComposeScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import { setNavigator } from "../other/navigation";
import BottomTab from "../views/BottomTab";
import EditProfileScreen from "./EditProfileScreen";

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Compose: undefined;
  EditProfile: undefined;
  Tab: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

export default function MainScreen() {
  return (
    <NavigationContainer ref={setNavigator}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Compose" component={ComposeScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Tab" component={BottomTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
