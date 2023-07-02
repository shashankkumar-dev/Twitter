import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface ChatMessage {
  msgId: string;
  userId: string;
  text: string;
}

interface ChatMessagesProps {
  userId: string;
  socket: any;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ userId, socket }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    socket.on("receiveMessage", (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });
  }, []);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      ref={scrollViewRef}
      onContentSizeChange={scrollToBottom}
    >
      {messages.map((item) => {
        const isCurrentUser = item.userId === userId;
        const containerStyle = isCurrentUser
          ? [styles.messageContainer, styles.alignRight]
          : [styles.messageContainer, styles.alignLeft];
        const textStyle = styles.messageText;

        return (
          <View style={containerStyle} key={item.msgId}>
            <Text style={textStyle}>
              {isCurrentUser ? "You" : item.userId}: {item.text}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 8,
    margin: 8
  },
  alignRight: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff"
  },
  alignLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#007bff"
  },
  messageText: {
    fontSize: 16,
    color: "#fff"
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-end"
  }
});

export default ChatMessages;
