import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import FeedScreen from "./FeedScreen";
import { getBackgroundColor } from "../views/BackgroundColor";
import Profile from "../model/Profile";
import { getProfile, getUser } from "../repository/LocalRepository";
import User from "../model/User";
import { GrayTextView, InfoView, LineBreak, TextView, TitleView } from "../views/CustomView";
import { formatDate } from "../other/Utils";


const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    fetchData().then(r => console.log("User fetched", r)).catch(e => console.log(e));
  }, []);

  const fetchData = async () => {
    const fetchedUser = await getUser(); // Call the getUser function to fetch the user data
    const fetchedProfile = await getProfile();
    setProfile(fetchedProfile);
    setUser(fetchedUser);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false)).catch(e => console.log(e));
    setRefreshing(false);
  };


  return (
    <ScrollView style={[styles.container, { backgroundColor: getBackgroundColor() }]}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>

      <View style={styles.wallImageContainer}>
        <Image source={require("../../assets/wall.png")} style={styles.wallImage} />
        {!user?.imageUrl && <Image source={require("../../assets/user.png")} style={styles.profilePicture} />}
      </View>

      <View style={styles.userInfoContainer}>
        <TitleView>{user?.name}</TitleView>
        <GrayTextView style={styles.handle}>@{user?.handle}</GrayTextView>
        {profile?.bio && <GrayTextView>{profile.bio}</GrayTextView>}

        <View style={styles.infoContainer}>
          {profile?.dob && <InfoView content={formatDate(profile.dob)} icon="cake" />}
          {profile?.location && <InfoView content={profile?.location} icon="location" />}
          {user?.joined && <InfoView content={formatDate(user.joined)} icon="calendar" />}
        </View>

        <View style={styles.followContainer}>
          <TextView>{profile?.following ? profile?.following : 0}</TextView>
          <GrayTextView>Following</GrayTextView>
          <TextView>{profile?.followers ? profile?.followers : 0}</TextView>
          <GrayTextView>Followers</GrayTextView>
        </View>

      </View>
      <LineBreak />
      {user?.handle && <FeedScreen handle={user.handle} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  wallImageContainer: {
    position: "relative",
    marginBottom: 28
  },
  wallImage: {
    width: "105%",
    height: 200
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    marginBottom: 20,
    left: 16,
    bottom: -55,
  },
  userInfoContainer: {
    paddingHorizontal: 10,
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  infoContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  handle: {
    marginTop: -15,
    marginBottom: 10,
  }
});

export default ProfileScreen;
