import React from "react";
import { View } from "react-native";
import { getBackgroundColor } from "../views/BackgroundColor";

export const NotificationScreen: React.FC = () => {
  return <View style={{ backgroundColor: getBackgroundColor(), flex:1, flexDirection:"column" }}></View>;
};
