import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { getBackgroundColor } from "../views/BackgroundColor";

const EditProfileScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [handle, setHandle] = useState('');
    const [bio, setBio] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleSaveProfile = () => {
        // Handle saving profile logic here
        console.log('Profile saved');
    };

    return (
      <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
          <Text style={styles.title}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Handle"
            onChangeText={setHandle}
            value={handle}
          />
          <TextInput
            style={styles.input}
            placeholder="Bio"
            onChangeText={setBio}
            value={bio}
            multiline
          />
          <DatePicker
            style={styles.datePicker}
            date={birthDate}
            mode="date"
            placeholder="Select Birth Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={setBirthDate}
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
              <Text style={styles.buttonText}>Save Profile</Text>
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
    datePicker: {
        width: '100%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1DA1F2',
        width: '100%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;
