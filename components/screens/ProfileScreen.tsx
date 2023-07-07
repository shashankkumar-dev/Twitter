import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import FeedScreen from "./FeedScreen";
import { getBackgroundColor, getReverseBackgroundColor } from "../views/BackgroundColor";
import Profile from "../model/Profile";
import { getProfile, getUser } from "../repository/LocalRepository";
import User from "../model/User";

const locationIcon = require("../../assets/location.png");
const cakeIcon = require("../../assets/cake.png");
const calendarIcon = require("../../assets/calendar.png");

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
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={["#3b5998", "#F44336", "#FF9800"]}
                  />
                }
    >
      <View style={styles.wallImageContainer}>
        {profile?.wallpaperUrl && (
          <Image
            source={{ uri: profile.wallpaperUrl }}
            style={styles.wallImage}
          />
        )}
        {(
          <Image
            source={require("../../assets/wall.png")}
            style={styles.wallImage}
          />
        )}
        {user && user.imageUrl && (
          <Image
            source={{ uri: user.imageUrl }}
            style={styles.profilePicture}
          />
        )}
        {!user || !user.imageUrl && (
          <Image
            source={require("../../assets/user.png")}
            style={styles.profilePicture}
          />
        )}
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.handle}>@{user?.handle}</Text>
        {profile?.bio && <Text style={styles.bio}>{profile.bio}</Text>}
        <View style={styles.infoRow}>
          <Image source={locationIcon} style={styles.smallIcon} tintColor={getReverseBackgroundColor()} />
          {profile?.location && <Text style={styles.infoValue}>{profile.location}</Text>}
          <Image source={cakeIcon} style={styles.smallIcon} tintColor={getReverseBackgroundColor()} />
          {profile?.dob && <Text
            style={styles.infoValue}>
            {new Date(profile?.dob).getDate()}{" "}
            {new Date(profile?.dob).toLocaleString("default", { month: "long" })}{" "}
            {new Date(profile?.dob).getFullYear()}
          </Text>}
        </View>
        <View style={styles.infoRow}>
          <Image source={calendarIcon} style={styles.smallIcon} tintColor={getReverseBackgroundColor()} />
          {user?.joined && (
            <>
              <Text style={styles.infoValue}>Joined:</Text>
              <Text style={styles.infoValue}>
                {new Date(user.joined).getDate()}{" "}
                {new Date(user.joined).toLocaleString("default", { month: "long" })}{" "}
                {new Date(user.joined).getFullYear()}
              </Text>
            </>
          )}

        </View>
        <View style={styles.followContainer}>
          <Text style={styles.followCount}>{profile?.following ? profile?.following : 0}</Text>
          <Text style={styles.followLabel}>Following</Text>
          <Text style={styles.followCount}>{profile?.followers ? profile?.followers : 0}</Text>
          <Text style={styles.followLabel}>Followers</Text>
        </View>
      </View>

      <View style={styles.lineBreak} />
      {user?.handle && <FeedScreen handle={user.handle} />}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  wallImageContainer: {
    position: "relative",
    marginBottom: 16
  },
  wallImage: {
    width: "100%",
    height: 200
  },
  icon: {
    padding: -3,
    marginRight: 8
  },
  lineBreak: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 1,
    marginHorizontal: 16
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    marginBottom: 16,
    left: 16,
    bottom: -55,
    borderWidth: 3,
    borderColor: "#fff"
  },
  userInfoContainer: {
    padding: 16
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 16
  },
  handle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8
  },
  bio: {
    fontSize: 16,
    marginBottom: 16
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 1,
    width: 80
  },
  infoValue: {
    fontSize: 14,
    marginRight: 10
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  followItem: {
    alignItems: "center"
  },
  followCount: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 4
  },
  followLabel: {
    marginRight: 8,
    fontSize: 14,
    color: "gray"
  },
  smallIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginRight: 5,
    marginBottom: -2
  }
});

export default ProfileScreen;
