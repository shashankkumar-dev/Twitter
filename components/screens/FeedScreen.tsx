import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import TweetItem from "../views/TweetItem";
import { navigate } from "../other/navigation";
import Tweet from "../model/Tweet";
import { getBackgroundColor, getReverseBackgroundColor } from "../views/BackgroundColor";
import { getTweets } from "../repository/TweetRepository";

const pencilIcon = require("../../assets/pencil.png");


const FeedScreen: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    handleFetchTweets();
  }, []);

  const handleFetchTweets = async () => {
    const data = await getTweets();
    setTweets(data);
  };
  const renderTweetItem = ({ item }: { item: Tweet }) => <TweetItem item={item} />;

  const onClickPencil = () => {
    navigate("Compose");
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <FlatList
        data={tweets}
        renderItem={renderTweetItem}
        keyExtractor={(item) => item.messageID}
      />

      <TouchableOpacity style={styles.editIconContainer} onPress={onClickPencil}>
        <Image source={pencilIcon} style={styles.editIcon} tintColor={getReverseBackgroundColor()}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  favoriteIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1DA1F2",
    borderRadius: 20,
    padding: 10
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default FeedScreen;
