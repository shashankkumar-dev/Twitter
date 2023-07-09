import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import TweetItem from "../views/TweetItem";
import { navigate } from "../other/navigation";
import Tweet from "../model/Tweet";
import { getBackgroundColor } from "../views/BackgroundColor";
import { getTweets } from "../repository/TweetRepository";
import { IconButton } from "../views/CustomView";

const FeedScreen = ({ handle }: { handle: string | undefined }) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const loadTweets = () => {
    getTweets(handle, page).then(response => setTweets(prevTweets => [...prevTweets, ...response]));
  };

  useEffect(() => {
    loadTweets();
  }, [handle, page]);

  const renderTweetItem = ({ item }: { item: Tweet }) => <TweetItem item={item} />;

  const onClickPencil = () => {
    navigate("Compose");
  };

  const loadMoreTweets = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setTweets([]);
    loadTweets();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <FlatList
        data={tweets}
        renderItem={renderTweetItem}
        keyExtractor={(item) => item.messageID}
        onEndReached={loadMoreTweets}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <IconButton style={styles.editIconContainer} onPress={onClickPencil} title="pencil" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  editIconContainer: {
    position: "absolute",
    bottom: 15,
    right: 15
  }
});

export default FeedScreen;
