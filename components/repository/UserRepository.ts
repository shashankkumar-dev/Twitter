import { USER_URL } from "../other/url";
import { get, post, put } from "../other/Interceptor";
import User from "../model/User";

export const getUser = async (handle: string): Promise<User | null> => {
  console.log("getUser");
  try {
    const response = await get(USER_URL + "/" + handle);
    console.log("getUser response:", response);
    return response as User;
  } catch (error) {
    console.log("getUser error:", error);
    return null;
  }
};

export const postUser = async (username: string, password: string, handle: string) => {
  try {
    const data: User = {
      _id: Math.random().toString(16).slice(2),
      handle: handle,
      imageUrl: null,
      name: username,
      joined: new Date(),
      bio: null,
      dob: null,
      location: null,
      wallpaperUrl: null,
    };
    console.log("postUser data:", data);
    const response = await post(USER_URL, data);
    console.log("postUser response:", response);
  } catch (error) {
    console.log("postUser error:", error);
  }
};


export const updateUser = async (user: User,
                                 name: string|null,
                                 bio: string|null,
                                 dob: Date|null,
                                 imageUrl: string|null,
                                 wallpaperUrl: string|null,
                                 location: string|null,
) => {
  try {
    const data: User = {
      _id: user._id,
      handle: user.handle,
      imageUrl: imageUrl ? imageUrl: user.imageUrl,
      name: name ? name : user.name,
      joined: user.joined,
      bio: bio ? bio : user.bio,
      dob: dob ? dob : user.dob,
      location: location ? location : user.location,
      wallpaperUrl: wallpaperUrl ? wallpaperUrl : user.wallpaperUrl
    };
    console.log("updateUser data:", data);
    const response = await put(USER_URL, data);
    console.log("updateUser response:", response);
  } catch (error) {
    console.log("updateUser error:", error);
  }
};
