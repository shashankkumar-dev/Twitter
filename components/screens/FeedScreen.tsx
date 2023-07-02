import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import TweetItem from "../views/TweetItem";
import Icon from "react-native-vector-icons/FontAwesome";
import { navigate } from "../other/navigation";
import Tweet from "../model/Tweet";
import { getBackgroundColor } from "../views/BackgroundColor";
import { getTweets } from "../repository/TweetRepository";


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

      <TouchableOpacity style={styles.favoriteIconContainer}>
        <Icon name="pencil" size={25} color="white" onPress={onClickPencil.bind(this)} />
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
  }
});

export default FeedScreen;
