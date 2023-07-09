import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import User from "../model/User";
import { ButtonView, GrayTextView, TextView } from "./CustomView";
import { getIconSource } from "./GetIconSource";
import { follow } from "../repository/RelationshipRepository";
import { navigate } from "../other/navigation";

const UserItem = ({ user, isFollower }: { user: User, isFollower: boolean | null }) => {

  const [title, setTitle] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);


  useEffect(() => {
    if (isFollower === null) {
      setTitle("Follow");
    } else if (isFollower) {
      setTitle("Unfollow");
    } else {
      setTitle("Remove");
    }
    setShow(true);
  }, []);

  const handleClick = () => {
    console.log("Follow");
    if (isFollower === null) {
      follow(user.handle).then(r => console.log(r));
    } else if (isFollower) {
      setShow(false);
    } else {
      setShow(false);
    }
  };

  const handleUserPress = () => {
    console.log("User pressed");
    navigate("UserProfile", { handle: user })
  }

  return show ? (
    <View style={styles.tweetContainer}>
      <Image source={getIconSource("user")} style={styles.avatar} />
      <View style={styles.tweetHeader}>
        <TouchableOpacity onPress={handleUserPress}>
          <View style={styles.tweetContent}>
            <TextView>{user.name}</TextView>
            <GrayTextView>@{user.handle}</GrayTextView>
            <TextView>{user?.bio}</TextView>
          </View>
        </TouchableOpacity>
        <ButtonView style={{ width: "25%" }} onPress={handleClick} title={title} />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  tweetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  tweetContent: {
    flexDirection: "column"
  },
  tweetHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default UserItem;
