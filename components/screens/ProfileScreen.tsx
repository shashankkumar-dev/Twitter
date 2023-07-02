import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FeedScreen from "./FeedScreen";
import { getBackgroundColor } from "../views/BackgroundColor";

const ProfileScreen = () => {
  return (
    <ScrollView style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.wallImageContainer}>
        <Image
          source={require("../../assets/wall.png")}
          style={styles.wallImage}
        />
        <Image
          source={require("../../assets/user.png")}
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.handle}>@johndoe</Text>
        <Text style={styles.bio}>Full-stack Developer | Tech Enthusiast | Coffee Lover</Text>
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={16} color="gray" style={styles.icon} />
          <Text style={styles.infoValue}>New York, USA</Text>
          <Icon name="birthday-cake" size={16} color="gray" style={styles.icon} />
          <Text style={styles.infoValue}>January 1, 1990</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={16} color="gray" style={styles.icon} />
          <Text style={styles.infoValue}>Joined:</Text>
          <Text style={styles.infoValue}>June 1, 2010</Text>
        </View>
        <View style={styles.followContainer}>
          <Text style={styles.followCount}>5.9K</Text>
          <Text style={styles.followLabel}>Following</Text>
          <Text style={styles.followCount}>10.5K</Text>
          <Text style={styles.followLabel}>Followers</Text>
        </View>
      </View>

      <View style={styles.lineBreak} />

      <FeedScreen />
      {/* TweetListScreen component goes here */}
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
