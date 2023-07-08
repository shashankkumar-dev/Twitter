// Determine the background color based on the color scheme
import { useColorScheme } from "react-native";

export const getBackgroundColor = () => {
  const colorScheme = useColorScheme();
  if (colorScheme === "dark") {
    return "#000"; // Dark mode background color
  }
  return "#fff"; // Light mode background color
};

export const getReverseBackgroundColor = () => {
  const colorScheme = useColorScheme();
  if (colorScheme === "light") {
    return "#000"; // Dark mode background color
  }
  return "#fff"; // Light mode background color
};

export const getReverseLightBackgroundColor = () => {
  const colorScheme = useColorScheme();
  if (colorScheme === "light") {
    return "#000"; // Dark mode background color
  }
  return "#b4b4b4"; // Light mode background color
};
