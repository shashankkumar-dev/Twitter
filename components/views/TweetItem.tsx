import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Tweet from "../model/Tweet";
import User from "../model/User";
import { getUser } from "../repository/UserRepository";
import { getReverseBackgroundColor } from "./BackgroundColor";

const TweetItem = ({ item }: { item: Tweet }) => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser().then(r => console.log("User fetched", r)).catch(e => console.log(e));
  }, []);

  const fetchUser = async () => {
    const fetchedUser: User | null = await getUser(item.handle); // Call the getUser function to fetch the user data
    setUser(fetchedUser);
  };

  return (
    <View style={styles.tweetContainer}>
      <Image source={require("../../assets/user.png")} style={styles.avatar} />
      <View style={styles.tweetContent}>
        <View style={styles.tweetHeader}>
          <Text style={styles.username}>{user?.name ? user?.name : "User"}</Text>
          <Text style={styles.handle}>@{user?.handle ? user?.handle : "handle"}</Text>
        </View>
        <Text>{item.content}</Text>
        {/*{item.image && <Image source={{ uri: item.image }} style={styles.image} />}*/}
        {/*{item.video && <Video source={{ uri: item.video }} style={styles.video} />}*/}
        <View style={styles.actionsContainer}>
          <Image
            source={require("../../assets/comment.png")}
            style={styles.actionImage}
            tintColor={getReverseBackgroundColor()}
          />
          <Image
            source={require("../../assets/heart.png")}
            style={styles.actionImage}
            tintColor={getReverseBackgroundColor()}
          />
          <Image
            source={require("../../assets/retweet.png")}
            style={styles.actionImage}
            tintColor={getReverseBackgroundColor()}
          />
          <Image
            source={require("../../assets/share.png")}
            style={styles.actionImage}
            tintColor={getReverseBackgroundColor()}
          />
        </View>
      </View>
      <View style={styles.lineBreak} />
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
  username: {
    fontWeight: "bold",
    marginBottom: 5,
    marginRight: 5
  },
  handle: {
    color: "gray",
    marginBottom: 5
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10
  },
  video: {
    width: "100%",
    height: 200,
    marginBottom: 10
  },
  lineBreak: {
    height: 10,
    backgroundColor: "lightgray",
    marginVertical: 10
  },
  actionsContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4
  },
  actionImage: {
    resizeMode: "contain",
    width: 20,
    height: 20,
    marginRight: 10
  },
  tweetHeader: {
    flexDirection: "row"
  }
});

export default TweetItem;
