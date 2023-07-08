import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Tweet from "../model/Tweet";
import User from "../model/User";
import { getUser } from "../repository/UserRepository";
import { GrayTextView, IconView, LineBreak, TextView } from "./CustomView";
import { getIconSource } from "./GetIconSource";

const TweetItem = ({ item }: { item: Tweet }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(item.handle).then(r => setUser(r));
  }, []);

  return (
    <View style={styles.tweetContainer}>
      <Image source={getIconSource("user")} style={styles.avatar} />
      <View style={styles.tweetContent}>

        <View style={styles.tweetHeader}>
          <TextView>{user?.name}</TextView>
          <GrayTextView>@{user?.handle}</GrayTextView>
        </View>

        <TextView>{item.content}</TextView>

        <View style={styles.actionsContainer}>
          <IconView name={"comment"} />
          <IconView name={"heart"} />
          <IconView name={"retweet"} />
          <IconView name={"share"} />
        </View>

      </View>
      <LineBreak />
    </View>
  );
};

const styles = StyleSheet.create({
  tweetContainer: {
    flexDirection: "row",
    padding: 2,
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
    flex: 1
  },
  actionsContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4
  },
  tweetHeader: {
    flexDirection: "row"
  }
});

export default TweetItem;
