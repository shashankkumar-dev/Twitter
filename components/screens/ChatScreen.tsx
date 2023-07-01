import React from 'react';
import io from 'socket.io-client';
import ChatMessages from '../views/ChatMessages';
import ChatInput from '../views/ChatInput';
import { StyleSheet, View } from 'react-native';
import { API_URL } from "../other/url";
import { getBackgroundColor } from "../views/BackgroundColor";

const socket = io(API_URL);
const userId = Math.random().toString(16).slice(2);

const ChatScreen: React.FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <ChatMessages userId={userId} socket={socket} />
      <ChatInput userId={userId} socket={socket} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default ChatScreen;
