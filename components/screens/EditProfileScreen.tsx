import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { getBackgroundColor } from "../views/BackgroundColor";
import ImagePicker, { ImageLibraryOptions } from "react-native-image-picker";
import { postProfile } from "../repository/ProfileRepository";
import Profile from "../model/Profile";
import { getProfile, getUser } from "../repository/LocalRepository";
import User from "../model/User";
import { ButtonView, IconButton, TextInputView, TitleView } from "../views/CustomView";
import { formatDate } from "../other/Utils";

const defaultImage = require("../../assets/wall.png");

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


  const handleImageUpload = () => {
    setImage(require("../../assets/wall.png"));
  };

  const handleCalendarClick = () => {
    setShowPicker(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.imageContainer}>
        <Image source={imageUri ? { uri: imageUri } : defaultImage} style={styles.uploadedImage} />
        <IconButton style={styles.editIconContainer} onPress={handleImageUpload} title="pencil" />
      </View>
      <TitleView>Edit Profile</TitleView>
      <TextInputView placeholder="Name" onChangeText={setName} value={name} />
      <TextInputView placeholder="Handle" onChangeText={setHandle} value={handle} />
      <TextInputView placeholder="Bio" onChangeText={setBio} value={bio} multiline />

      <View style={styles.calendar}>
        <Text style={styles.birthDate}>{formatDate(birthDate)}</Text>
        <IconButton onPress={handleCalendarClick} title="calendar" />
        {showPicker && (<DateTimePicker value={birthDate} mode="date" onChange={handleDateChange} />)}
      </View>

      <TextInputView placeholder="Location" onChangeText={setLocation} value={location} />
      <ButtonView onPress={handleSaveProfile} title="Save profile" />
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
    position: "absolute",
    bottom: 0,
    right: 0
  },
});

export default EditProfileScreen;
