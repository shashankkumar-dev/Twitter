import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { getBackgroundColor } from "../views/BackgroundColor";
import Relationship from "../model/Relationship";
import { getFollowees, getFollowers } from "../repository/RelationshipRepository";
import { getUser } from "../repository/LocalRepository";
import FollowItem from "../views/FollowItem";

export const FollowerScreen = () => (
  <FollowScreen isFollower={true} />
);

export const FollowingScreen = () => (
  <FollowScreen isFollower={false} />
);

const FollowScreen = ({ isFollower }: { isFollower: boolean }) => {

  const [data, setData] = useState<Relationship[]>([]);

  useEffect(() => {
    getUser().then((r) => {
      if (r) {
        if (isFollower) {
          getFollowers(r.handle).then((r) => setData(r));
        } else {
          getFollowees(r.handle).then((r) => setData(r));
        }
      }
    });
  }, []);

  const renderItem = ({ item }: { item: Relationship }) => (
    <FollowItem rel={item} isFollower={isFollower} />
  );

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  username: {
    fontSize: 14,
    color: "gray"
  }
});

