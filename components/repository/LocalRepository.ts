import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../model/User";
import Profile from "../model/Profile";

export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("token", token);
    console.log("Token stored:", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token retrieved:", token);
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const storeUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    console.log("User stored:", user);
  } catch (error) {
    console.error("Error storing user:", error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const user = await AsyncStorage.getItem("user");
    console.log("User retrieved:", user);
    return JSON.parse(<string>user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return null;
  }
};

export const storeProfile = async (profile: Profile): Promise<void> => {
  try {
    await AsyncStorage.setItem("Profile", JSON.stringify(profile));
    console.log("Profile stored:", profile);
  } catch (error) {
    console.error("Error storing Profile:", error);
  }
};

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const Profile = await AsyncStorage.getItem("Profile");
    console.log("Profile retrieved:", Profile);
    return JSON.parse(<string>Profile);
  } catch (error) {
    console.error("Error retrieving Profile:", error);
    return null;
  }
};
