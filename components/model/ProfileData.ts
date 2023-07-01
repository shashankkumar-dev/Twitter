import Tweet from "./Tweet";

interface ProfileData {
  bio: string;
  dob: Date;
  location: string;
  tweets: Tweet[];
}

export default ProfileData;
