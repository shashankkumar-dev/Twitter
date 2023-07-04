import { TouchableOpacity } from "react-native-gesture-handler";
import OptionsMenu from "react-native-option-menu";
import * as React from "react";
import { navigate } from "../other/navigation";
import { getReverseBackgroundColor } from "./BackgroundColor";

const MoreIcon = require("../../assets/more.png");

const handleEditProfile = () => {
  // Logic for editing a post
};

const handleLogout = () => {
  // Logic for deleting a post
  navigate("Login");
};


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
      options={["Logout", "EditProfile"]}
      actions={[handleLogout, handleEditProfile]}
    />
  </TouchableOpacity>
);