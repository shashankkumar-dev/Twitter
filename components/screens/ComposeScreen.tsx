import React, { useState } from 'react';
import { TWEET_URL } from '../other/url';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { post } from "../other/Interceptor";
import { getBackgroundColor } from "../views/BackgroundColor";

const userID = '5f9f7b7b1c9d440000b0b9a0';

const ComposeScreen: React.FC = () => {
    const [tweetContent, setTweetContent] = useState('');

    const handleTweetSubmit = async () => {
        try {
            await post(TWEET_URL, {
                messageID: Math.random().toString(16).slice(2),
                handle: userID,
                content: tweetContent,
                date: (new Date()),
            });
            console.log('Tweet submitted!');
            setTweetContent('');
        } catch (error) {
            console.error('Error submitting tweet:', error);
        }
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
        padding: 16,
    },
    input: {
        height: 150,
        marginBottom: 16,
        padding: 8,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },
});

export default ComposeScreen;
