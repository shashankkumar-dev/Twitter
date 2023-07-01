import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { LOGIN_URL } from "../other/url";
import { navigate } from "../other/navigation";
import { storeToken } from "../other/Interceptor";
import { getBackgroundColor } from "../views/BackgroundColor";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Send credentials to the backend for verification
            const response = await axios.post(LOGIN_URL, {
                username,
                password,
            });

            // Handle the response from the backend
            console.log(response);
            if (response.status === 200) {
                const token = response.data.token;
                console.log('token', token);
                await storeToken(token)// Save the token in local storage
                console.log('Login successful');
                navigate('Tab'); // Navigate to the tab navigator (home screen)
            } else {
                // Invalid credentials
                console.log('Invalid credentials');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleSignUp = () => {
        navigate('SignUp'); // Navigate to the sign-up screen
    };

    return (
      <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#1DA1F2',
        width: '100%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpButton: {
        marginTop: 20,
    },
    signUpButtonText: {
        color: '#010634',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
