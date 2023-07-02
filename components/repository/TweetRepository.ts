import Tweet from "../model/Tweet";
import { TWEET_URL } from "../other/url";
import { get, post } from "../other/Interceptor";

export const getTweets = async (): Promise<Tweet[]> => {
  console.log("getTweets");
  try {
    const response = await get(TWEET_URL);
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

export const postTweet = (content: string) => {
  console.log("postTweet");
  const data: Tweet = {
    messageID: Math.random().toString(16).slice(2),
    handle: "test",
    content: content,
    date: new Date()
  };
  post(TWEET_URL, data)
    .then((response) => {
      console.log("postTweet response:", response);
    })
    .catch((error) => {
      console.log("postTweet error:", error);
    });
};
