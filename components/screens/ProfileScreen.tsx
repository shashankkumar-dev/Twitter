import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FeedScreen from "./FeedScreen";
import { getBackgroundColor } from "../views/BackgroundColor";
import ProfileData from "../model/ProfileData";
import { getUser } from "../repository/LocalRepository";
import User from "../model/User";


const data: ProfileData = {
  handle: "@john doe",
  bio: "Full-stack Developer | Tech Enthusiast | Coffee Lover",
  location: "New York, USA",
  dob: new Date(1990, 0, 1),
  following: 5900,
  followers: 10500,
  wallpaperUrl: null,
  tweets: []
};


const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser(); // Call the getUser function to fetch the user data
      setUser(fetchedUser);
    };

    fetchUser().then(r => console.log("User fetched", r)).catch(e => console.log(e));
  }, []);


  return (
    <ScrollView style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.wallImageContainer}>
        {data.wallpaperUrl && (
          <Image
            source={{ uri: data.wallpaperUrl }}
            style={styles.wallImage}
          />
        )}
        {!data.wallpaperUrl && (
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
        {data.bio && <Text style={styles.bio}>{data.bio}</Text>}
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={16} color="gray" style={styles.icon} />
          {data.location && <Text style={styles.infoValue}>{data.location}</Text>}
          <Icon name="birthday-cake" size={16} color="gray" style={styles.icon} />
          {data.dob && <Text
            style={styles.infoValue}>{data.dob.getDate()} {data.dob.toLocaleString("default", { month: "long" })} {data.dob.getFullYear()}</Text>}
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={16} color="gray" style={styles.icon} />
          {user?.joined && (
            <>
              <Text style={styles.infoValue}>Joined:</Text>
              <Text style={styles.infoValue}>
                {new Date(user.joined).getDate()}{' '}
                {new Date(user.joined).toLocaleString('default', { month: 'long' })}{' '}
                {new Date(user.joined).getFullYear()}
              </Text>
            </>
          )}

        </View>
        <View style={styles.followContainer}>
          <Text style={styles.followCount}>{data.following}</Text>
          <Text style={styles.followLabel}>Following</Text>
          <Text style={styles.followCount}>{data.followers}</Text>
          <Text style={styles.followLabel}>Followers</Text>
        </View>
      </View>

      <View style={styles.lineBreak} />

      <FeedScreen />

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
    marginBottom: 4
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
  }
});

export default ProfileScreen;
