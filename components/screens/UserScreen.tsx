import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import UserItem from "../views/UserItem";
import { getBackgroundColor } from "../views/BackgroundColor";
import { getUsers } from "../repository/UserRepository";
import User from "../model/User";


const UserScreen: React.FC = () => {

  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((r) => setData(r));
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <UserItem user={item} isFollower={null} />
  );

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.handle}
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
    backgroundColor: "#fff"
  },
  listContainer: {
    flexGrow: 1
  },
  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
});

export default UserScreen;
