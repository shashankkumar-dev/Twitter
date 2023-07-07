
interface Profile {
  handle: string;
  bio: string  | null;
  dob: Date | null;
  location: string | null;
  followers: number;
  following: number;
  wallpaperUrl: string | null;
  tweets: String[];
}

const profile: Profile = {
  handle: "@john doe",
  bio: "Full-stack Developer | Tech Enthusiast | Coffee Lover",
  location: "New York, USA",
  dob: new Date(1990, 0, 1),
  following: 5900,
  followers: 10500,
  wallpaperUrl: null,
  tweets: []
};

export default Profile;
