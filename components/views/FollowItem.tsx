import React, { useEffect, useState } from "react";
import User from "../model/User";
import { getUser } from "../repository/UserRepository";
import Relationship from "../model/Relationship";
import UserItem from "./UserItem";

const FollowItem = ({ rel, isFollower }: { rel: Relationship, isFollower: boolean }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isFollower) {
      getUser(rel.follower).then(r => setUser(r));
    } else {
      getUser(rel.followee).then(r => setUser(r));
    }
  }, []);

  return (user && <UserItem user={user} isFollower={isFollower} />);
}

export default FollowItem;
