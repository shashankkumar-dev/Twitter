import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { navigate } from "../other/navigation";
import { getBackgroundColor } from "../views/BackgroundColor";
import { login } from "../repository/LoginRepository";
import { ButtonView, TextInputView, TitleView } from "../views/CustomView";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(username, password)
      .then((isSuccess) => {
        if (isSuccess) {
          navigate("Tab");
        } else {
          alert("Login failed");
        }
      })
      .catch(() => {
        alert("Login failed");
      });
  };

  const handleSignUp = () => {
    navigate("SignUp"); // Navigate to the sign-up screen
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <TitleView>Login</TitleView>
      <TextInputView placeholder="Username" onChangeText={setUsername} value={username} />
      <TextInputView placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <ButtonView onPress={handleLogin} title="Log in" />
      <ButtonView onPress={handleSignUp} title="Sign up" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#1DA1F2",
    width: "100%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  signUpButton: {
    marginTop: 20
  },
  signUpButtonText: {
    color: "#010634",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default LoginScreen;
