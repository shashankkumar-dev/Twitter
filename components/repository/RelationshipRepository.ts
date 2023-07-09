import Relationship from "../model/Relationship";
import { FOLLOW_URL, FOLLOWEES_URL, FOLLOWERS_URL } from "../other/url";
import { get, post } from "../other/Interceptor";
import { getUser } from "./LocalRepository";


export const getFollowers = async (handle: string): Promise<Relationship[]> => {
  console.log("getFollowers");
  try {
    const response = await get(FOLLOWERS_URL + "/" + handle);
    console.log("getFollowers response:", response);
    return response as Relationship[];
  } catch (error) {
    console.log("getFollowers error:", error);
    return [];
  }
};

export const getFollowees = async (handle: string): Promise<Relationship[]> => {
  console.log("getFollowees");
  try {
    const response = await get(FOLLOWEES_URL + "/" + handle);
    console.log("getFollowees response:", response);
    return response as Relationship[];
  } catch (error) {
    console.log("getFollowees error:", error);
    return [];
  }
};

export const follow = async (followeeHandle: string) => {
  try {
    const follower = await getUser();
    if (!follower) return;
    const data: Relationship = {
      id: Math.random().toString(16).slice(2),
      follower: follower.handle,
      followee: followeeHandle
    };
    console.log("follow data:", data);
    const response = await post(FOLLOW_URL, data);
    console.log("follow response:", response);
  } catch (error) {
    console.log("follow error:", error);
  }
};
