import Tweet from "../model/Tweet";
import { TWEETS_URL } from "../other/url";
import { get, post } from "../other/Interceptor";
import { getUser } from "./LocalRepository";

export const getTweets = async (handle: string | undefined): Promise<Tweet[]> => {
  console.log("getTweets " + handle);
  try {
    let response;
    if (handle === undefined) {
      response = await get(TWEETS_URL);
    } else {
      response = await get(TWEETS_URL + "/" + handle);
    }
    console.log("getTweets response:", response);
    if (Array.isArray(response)) {
      return response as Tweet[];
    } else {
      console.log("getTweets error: Invalid response format");
      return [];
    }
  } catch (error) {
    console.log("getTweets error:", error);
    return [];
  }
};

export const postTweet = async (content: string) => {
  console.log("postTweet");
  try {
    const user = await getUser();
    const data: Tweet = {
      messageID: Math.random().toString(16).slice(2),
      handle: user?.handle || "user",
      content: content,
      date: new Date()
    };
    console.log("postTweet data:", data);
    await post(TWEETS_URL, data);
  } catch (error) {
    console.log("postTweet error:", error);
  }
};
