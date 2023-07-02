import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

interface ChatInputProps {
  userId: string;
  socket: any;
}

const ChatInput: React.FC<ChatInputProps> = ({ userId, socket }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log("Sending message:", message);
      const msgId = Math.random().toString(16).slice(2);
      socket.emit("sendMessage", { msgId: msgId, userId: userId, text: message });
      setMessage("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        autoCapitalize="none"
      />
      <Button onPress={sendMessage} title="Send" />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: 8
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4
  }
});

export default ChatInput;
