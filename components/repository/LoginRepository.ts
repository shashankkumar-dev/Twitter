import axios from "axios";
import { LOGIN_URL, SIGNUP_URL } from "../other/url";
import { storeToken } from "./LocalRepository";


export const login = async (username: String, password: String) => {
  console.log("login");
  const data = { username, password };
  await axios.post(LOGIN_URL, data).then((response) => {
    console.log("login response:", response);
    if (response.status === 200) {
      const token = response.data.token;
      console.log("token", token);
      storeToken(token);// Save the token in local storage
      console.log("Login successful");
      return true;
    }
  }).catch((error) => {
    console.log("login error:", error);
  });
  return false;
};

export const signUp = async (username: String, password: String): Promise<string | null> => {
  const data = { username, password };

  await axios.post(SIGNUP_URL, data).then((response) => {
    console.log("signUp response:", response);
    if (response.status === 200) {
      console.log("Sign-up successful");
      return null;
    }
  }).catch((error) => {
    console.log("signUp error:", error);
    return error;
  });
  return "Unknown error";
};
