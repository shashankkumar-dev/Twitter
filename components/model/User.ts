interface User {
  _id: string;
  handle: string;
  imageUrl: string | null;
  name: string;
  joined: Date;
  bio: string | null;
  dob: Date | null;
  location: string | null;
  wallpaperUrl: string | null;
}

export default User;
