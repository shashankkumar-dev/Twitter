import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonView, TextInputView } from "./CustomView";

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
      <TextInputView style={{ flex: 1 }} value={message} onChangeText={setMessage} placeholder="Type a message"
                     autoCapitalize="none" />
      <ButtonView style={{ width: "20%" }} onPress={sendMessage} title="Send" />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: 8
  }
});

export default ChatInput;
