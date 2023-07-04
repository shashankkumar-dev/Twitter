import { USER_URL } from "../other/url";
import { get, post } from "../other/Interceptor";
import User from "../model/User";

export const getUser = async (handle: string): Promise<User | null> => {
  console.log("getUser");
  try {
    const response = await get(USER_URL+"/"+handle);
    console.log("getUser response:", response);
    return response as User;
  } catch (error) {
    console.log("getUser error:", error);
    return null;
  }
};

export const postUser = async (username: string, password: string, handle: string) => {
  console.log("postUser");
  const data: User = {
    _id: Math.random().toString(16).slice(2),
    handle: handle,
    imageUrl: null,
    name: username,
    joined: new Date(),
    data: null,
  };
  console.log("postUser data:", data)
  post(USER_URL, data)
    .then((response) => {
      console.log("postUser response:", response);
    })
    .catch((error) => {
      console.log("postUser error:", error);
    });
};

