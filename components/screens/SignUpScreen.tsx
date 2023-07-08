import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { navigate } from "../other/navigation";
import { getBackgroundColor } from "../views/BackgroundColor";
import { signUp } from "../repository/LoginRepository";
import { ButtonView, TextInputView, TitleView } from "../views/CustomView";


const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [handle, setHandle] = useState("");


  const handleSignUp = async () => {
    await signUp(username, password, handle).then((message) => {
      if (!message) {
        alert("Sign Up failed" + message);
      } else {
        navigate("Login");
      }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <TitleView>Sign Up</TitleView>
      <TextInputView placeholder="Username" onChangeText={setUsername} value={username} />
      <TextInputView placeholder="User Handle" onChangeText={setHandle} value={handle} />
      <TextInputView placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <ButtonView onPress={handleSignUp} title="Sign up" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  }
});

export default SignUpScreen;
