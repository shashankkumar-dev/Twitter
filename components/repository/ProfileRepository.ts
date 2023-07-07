import { PROFILE_URL } from "../other/url";
import { get, post } from "../other/Interceptor";
import Profile from "../model/Profile";
import { storeProfile } from "./LocalRepository";

export const getProfile = async (handle: string): Promise<Profile | null> => {
  console.log("getProfile");
  try {
    const response = await get(PROFILE_URL + "/" + handle);
    console.log("getProfile response:", response);
    return response as Profile;
  } catch (error) {
    console.log("getProfile error:", error);
    return null;
  }
};

export const postProfile = async (old: Profile, bio: string, dob: Date, location: string) => {
  try {
    const data: Profile = {
      handle: old.handle,
      bio: bio,
      dob: dob,
      location: location,
      followers: old.followers,
      following: old.following,
      wallpaperUrl: old.wallpaperUrl,
      tweets: old.tweets
    };
    console.log("postProfile data:", data);
    await post(PROFILE_URL, data)
    await storeProfile(data);
  } catch (error) {
    console.log("postProfile error:", error);
  }
};


export const postNewProfile = async (handle: string) => {
  console.log("postNewProfile");
  try {
    const data: Profile = {
      handle: handle,
      bio: null,
      dob: new Date(),
      location: null,
      followers: 0,
      following: 0,
      wallpaperUrl: null,
      tweets: []
    };
    console.log("postNewProfile data:", data);
    await post(PROFILE_URL, data);
  } catch (error) {
    console.log("postNewProfile error:", error);
  }
};
