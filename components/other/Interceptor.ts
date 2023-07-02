import { navigate } from "./navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tweet from "../model/Tweet";
import { getToken } from "../repository/LocalRepository";


const attachTokenToHeaders = async () => {
  const headers: HeadersInit = {};
  const token = await getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response: Response) => {
  if (response.ok) {
    return response.json();
  } else if (response.status === 401 || response.status === 403) {
    navigate("Login");
    throw new Error("Unauthorized");
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
};

export const get = async <T>(url: string): Promise<T> => {
  const headers = await attachTokenToHeaders();
  const response = await fetch(url, { headers });
  return handleResponse(response);
};

export const post = async (url: string, data: Tweet): Promise<any> => {
  const tokenHeader = await attachTokenToHeaders();
  const headers = {
    ...tokenHeader,
    "Content-Type": "application/json"
  };
  console.log(headers);
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });
  console.log(response);
  return handleResponse(response);
};



