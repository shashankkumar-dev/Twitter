import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import User from "../model/User";
import { getUser } from "../repository/UserRepository";
import { ButtonView, GrayTextView, TextView } from "./CustomView";
import { getIconSource } from "./GetIconSource";

const UserItem = ({ handle }: { handle: string }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(handle).then(r => setUser(r));
  }, []);

  const handleFollow = () => {

  };

  return (
    <View style={styles.tweetContainer}>
      <Image source={getIconSource("user")} style={styles.avatar} />
      <View style={styles.tweetHeader}>
      <View style={styles.tweetContent}>
        <TextView>{user?.name}</TextView>
        <GrayTextView>@{user?.handle}</GrayTextView>
        <TextView>{user?.bio}</TextView>
      </View>
        <ButtonView style={{ width: "20%" }} onPress={handleFollow} title="Follow" />
      </View>
    </View>
  );
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
    flexDirection: "column",
  },
  tweetHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export default UserItem;
