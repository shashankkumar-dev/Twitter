import axios from "axios";
import { LOGIN_URL, SIGNUP_URL } from "../other/url";
import { storeProfile, storeToken, storeUser } from "./LocalRepository";
import { getUser, postUser } from "./UserRepository";
import { getProfile, postNewProfile } from "./ProfileRepository";


export const login = async (handle: string, password: string) => {
  console.log("login");
  const data = { handle, password };
  try {
    const response = await axios.post(LOGIN_URL, data);
    console.log("login response:", response);
    if (response.status === 200 && response.data.token) {
      const token = response.data.token;
      console.log("token", token);
      const user = await getUser(handle)
      const profile = await getProfile(handle)
      await storeToken(token);// Save the token in local storage
      if (user !== null) {
        await storeUser(user);// Save the username in local storage
      }
      if (profile !== null) {
        await storeProfile(profile);
      }
      console.log("Login successful");
      return true;
    }
  } catch (error) {
    console.log("login error:", error);
    return false;
  }
  return false;
};

export const signUp = async (username: string, password: string, handle: string) => {
  const data = { handle, password };
  console.log("signUp", data)
  try {
    const response = await axios.post(SIGNUP_URL, data);
    console.log(response.data)
    if (response.status === 200 && response.data.success === true) {
      console.log("Sign-up successful");
      await postUser(username, password, handle);
      await postNewProfile(handle);
      return null;
    } else {
      console.log("Sign-up unsuccessful");
      return response.data.error;
    }
  } catch (error) {
    console.log("signUp error:", error);
    return error;
  }
};
