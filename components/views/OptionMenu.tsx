import { TouchableOpacity } from "react-native-gesture-handler";
// @ts-ignore
import OptionsMenu from "react-native-option-menu";
import * as React from "react";
import { navigate } from "../other/navigation";
import { getReverseBackgroundColor } from "./BackgroundColor";

const MoreIcon = require("../../assets/more.png");

const handleEditProfile = () => {
  console.log("Edit profile")
  navigate("EditProfile");
};

const handleLogout = () => {
  navigate("Login");
};

const handleFollowers = () => {
  console.log("Followers");
  navigate("Follower");
}

const handleFollowing = () => {
  console.log("Following");
  navigate("Followee");
}


export const renderOptionsMenu = () => (
  <TouchableOpacity>
    <OptionsMenu
      button={MoreIcon}
      buttonStyle={{
        width: 32,
        height: 32,
        margin: 7.5,
        resizeMode: "contain",
        tintColor: getReverseBackgroundColor()
      }}
      destructiveIndex={1}
      options={["Logout", "EditProfile", "Followers", "Following", "Cancel"]}
      actions={[handleLogout, handleEditProfile, handleFollowers, handleFollowing, () => {  }]}
    />
  </TouchableOpacity>
);
