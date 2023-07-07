import Tweet from "../model/Tweet";
import { TWEET_URL, TWEETS_URL } from "../other/url";
import { get, post } from "../other/Interceptor";
import { getUser } from "./LocalRepository";

export const getTweets = async (handle: string | undefined): Promise<Tweet[]> => {
  console.log("getTweets");
  try {
    let response
    if(handle === undefined){
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

export const getTweetIds = async (): Promise<String[]> => {
  console.log("getTweets");
  try {
    const user = await getUser();
    if (user?.handle !== null) {
      const response = await get(TWEET_URL + "/" + user?.handle);
      console.log("getTweets response:", response);
      if (Array.isArray(response)) {
        return response as String[];
      }
    }
    console.log("getTweets error: Invalid response format");
    return [];

  } catch (error) {
    console.log("getTweets error:", error);
    return [];
  }
};

export const getTweet = async (messageID: String): Promise<Tweet | null> => {
  console.log("getTweet");
  try {
    const response = await get(TWEET_URL + "/" + messageID);
    console.log("getTweet response:", response);
    return response as Tweet;
  } catch (error) {
    console.log("getTweet error:", error);
    return null;
  }
}

export const postTweet = async (content: string) => {
  console.log("postTweet");
  const user = await getUser();
  const data: Tweet = {
    messageID: Math.random().toString(16).slice(2),
    handle: user?.handle || "user",
    content: content,
    date: new Date()
  };
  post(TWEETS_URL, data)
    .then((response) => {
      console.log("postTweet response:", response);
    })
    .catch((error) => {
      console.log("postTweet error:", error);
    });
};
