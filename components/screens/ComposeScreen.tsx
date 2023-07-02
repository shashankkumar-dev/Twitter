import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { getBackgroundColor } from "../views/BackgroundColor";
import { postTweet } from "../repository/TweetRepository";


const ComposeScreen: React.FC = () => {
  const [tweetContent, setTweetContent] = useState("");

  const handleTweetSubmit = () => {
    postTweet(tweetContent);
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <TextInput
        style={styles.input}
        placeholder="What's happening?"
        multiline
        value={tweetContent}
        onChangeText={setTweetContent}
      />
      <Button title="Tweet" onPress={handleTweetSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  input: {
    height: 150,
    marginBottom: 16,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8
  }
});

export default ComposeScreen;
