import Tweet from "./Tweet";

interface ProfileData {
  handle: string;
  bio: string  | null;
  dob: Date | null;
  location: string | null;
  followers: number;
  following: number;
  wallpaperUrl: string | null;
  tweets: Tweet[];
}

export default ProfileData;
