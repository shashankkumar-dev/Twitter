interface User {
  _id: string;
  handle: string;
  imageUrl: string | null;
  name: string;
  joined: Date;
  data: string | null;
}

export default User;
