import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { getBackgroundColor, getReverseBackgroundColor } from "../views/BackgroundColor";
import ImagePicker, { ImageLibraryOptions } from "react-native-image-picker";
import { postProfile } from "../repository/ProfileRepository";
import Profile from "../model/Profile";
import { getProfile, getUser } from "../repository/LocalRepository";
import User from "../model/User";


const calendarIcon = require("../../assets/calendar.png");
const defaultImage = require("../../assets/wall.png");
const pencilIcon = require("../../assets/pencil.png");

const EditProfileScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(defaultImage);
  const [showPicker, setShowPicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchData().then(r => console.log("Data fetched", r)).catch(e => console.log(e));
  }, []);

  const fetchData = async () => {
    const fetchedUser = await getUser(); // Call the getUser function to fetch the user data
    setUser(fetchedUser);
    const fetchedProfile = await getProfile(); // Call the getProfile function to fetch the profile data
    setProfile(fetchedProfile);
    if (fetchedUser != null) {
      setName(fetchedUser.name);
      setHandle(fetchedUser.handle);
    }
    if (fetchedProfile != null) {
      if (fetchedProfile.bio != null) {
        setBio(fetchedProfile.bio);
      }
      if (fetchedProfile.location != null) {
        setLocation(fetchedProfile.location);
      }
      if (fetchedProfile.dob != null) {
        setBirthDate(new Date(fetchedProfile.dob));
      }
    }
  };

  const handleSaveProfile = () => {
    if (profile) {
      postProfile(profile, bio, birthDate, location).then(r => console.log("Profile saved", r)).catch(e => console.log(e));
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const formatDate = (_date: Date): string => {
    const date = new Date(_date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const handleImageSelect = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 1
    };

    ImagePicker.launchImageLibrary(options, (response) => {
    }).then(r => console.log("Image selected", r)).catch(e => console.log(e));
  };

  const handleImageUpload = () => {
    setImage(require("../../assets/wall.png"));
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.imageContainer}>
        <Image source={imageUri ? { uri: imageUri } : defaultImage} style={styles.uploadedImage} />
        <TouchableOpacity style={styles.editIconContainer} activeOpacity={0} onPress={handleImageUpload}>
          <Image source={pencilIcon} style={styles.editIcon} tintColor={getReverseBackgroundColor()} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name} />
      <TextInput style={styles.input} placeholder="Handle" onChangeText={setHandle} value={handle} />
      <TextInput style={styles.input} placeholder="Bio" onChangeText={setBio} value={bio} multiline />
      <View style={styles.calendar}>
        <Text style={styles.birthDate}>{formatDate(birthDate)}</Text>
        <TouchableOpacity activeOpacity={0} onPress={() => setShowPicker(true)}>
          <Image source={calendarIcon} style={styles.calendarContainer} tintColor={getReverseBackgroundColor()} />
        </TouchableOpacity>
        {showPicker && (<DateTimePicker value={birthDate} mode="date" onChange={handleDateChange} />)}
      </View>
      <TextInput style={styles.input} placeholder="Location" onChangeText={setLocation} value={location} />

      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#1DA1F2",
    width: "100%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  calendarContainer: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 10,
    marginRight: 10
  },
  birthDate: {
    flex: 1,
    color: "white",
    fontSize: 16,
    marginLeft: 10
  },
  calendar: {
    flexDirection: "row",
    height: 40,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20
  },
  uploadedImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 100 // Make the image circular
  },
  editIconContainer: {
    backgroundColor: "#1DA1F2",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});

export default EditProfileScreen;
