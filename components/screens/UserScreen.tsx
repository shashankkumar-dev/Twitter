import React from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import UserItem from "../views/UserItem";

interface Relationship {
  id: string;
  follower: string;
  followee: string;
}

const data: Relationship[] = [
  {
    id: "1",
    follower: "user",
    followee: "shash",
  },
  {
    id: "1",
    follower: "user",
    followee: "shash",
  },
  // Add more followers here...
];

const UserScreen: React.FC = () => {
  const renderItem = ({ item }: { item: Relationship }) => (
    <UserItem handle={item.follower} />
  );

  return (
    <View style={styles.container}>
    <FlatList
      data={data}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
  contentContainerStyle={styles.listContainer}
  />
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  listContainer: {
    flexGrow: 1,
  },
  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "gray",
  },
});

export default UserScreen;
