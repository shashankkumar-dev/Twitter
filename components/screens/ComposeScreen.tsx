import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { getBackgroundColor } from "../views/BackgroundColor";
import { postTweet } from "../repository/TweetRepository";
import { ButtonView, TextInputView } from "../views/CustomView";


const ComposeScreen: React.FC = () => {
  const [tweetContent, setTweetContent] = useState("");

  const handleTweetSubmit = () => {
    postTweet(tweetContent).then(() => {
      alert("Tweet posted");
      setTweetContent("");
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <TextInputView style={styles.input} placeholder="What's happening?" multiline value={tweetContent}
                     onChangeText={setTweetContent} />
      <ButtonView title="Tweet" onPress={handleTweetSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16
  },
  input: {
    height: 150
  }
});

export default ComposeScreen;
