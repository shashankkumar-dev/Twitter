import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import FeedScreen from "./FeedScreen";
import { getBackgroundColor } from "../views/BackgroundColor";
import User from "../model/User";
import { GrayTextView, InfoView, LineBreak, TextView, TitleView } from "../views/CustomView";
import { formatDate } from "../other/Utils";
import { getUser as getLocalUser } from "../repository/LocalRepository";
import { getUser } from "../repository/UserRepository";


const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    getLocalUser().then(r => setUser(r));
  }, []);

  const handleRefresh = () => {
    if (user?.handle) {
      setRefreshing(true);
      getUser(user?.handle)
        .then(r => setUser(r))
        .catch(e => console.log(e))
        .finally(() => setRefreshing(false));
    }
  };


  return (
    <ScrollView style={[styles.container, { backgroundColor: getBackgroundColor() }]}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>

      <View style={styles.wallImageContainer}>
        <Image source={require("../../assets/wall.png")} style={styles.wallImage} />
        {!user?.imageUrl && <Image source={require("../../assets/user.png")} style={styles.userPicture} />}
      </View>

      <View style={styles.userInfoContainer}>
        <TitleView>{user?.name}</TitleView>
        <GrayTextView style={styles.handle}>@{user?.handle}</GrayTextView>
        {user?.bio && <GrayTextView>{user.bio}</GrayTextView>}

        <View style={styles.infoContainer}>
          {user?.dob && <InfoView content={formatDate(user.dob)} icon="cake" />}
          {user?.location && <InfoView content={user?.location} icon="location" />}
          {user?.joined && <InfoView content={formatDate(user.joined)} icon="calendar" />}
        </View>

        <View style={styles.followContainer}>
          <TextView>{0}</TextView>
          <GrayTextView>Following</GrayTextView>
          <TextView>{0}</TextView>
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
  userPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    marginBottom: 20,
    left: 16,
    bottom: -55
  },
  userInfoContainer: {
    paddingHorizontal: 10
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  infoContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  handle: {
    marginTop: -15,
    marginBottom: 10
  }
});

export default ProfileScreen;
