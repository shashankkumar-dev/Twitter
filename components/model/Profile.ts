interface Profile {
  handle: string;
  bio: string | null;
  dob: Date | null;
  location: string | null;
  followers: number;
  following: number;
  wallpaperUrl: string | null;
  tweets: String[];
}
export default Profile;
