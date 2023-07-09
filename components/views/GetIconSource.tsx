export const getIconSource = (name: String) => {
  if (name === "comment") {
    return require("../../assets/comment.png");
  } else if (name === "heart") {
    return require("../../assets/heart.png");
  } else if (name === "retweet") {
    return require("../../assets/retweet.png");
  } else if (name === "share") {
    return require("../../assets/share.png");
  } else if (name === "Home") {
    return require("../../assets/home.png");
  } else if (name === "Search") {
    return require("../../assets/search.png");
  } else if (name === "Notifications") {
    return require("../../assets/notification.png");
  } else if (name === "Messages") {
    return require("../../assets/mail.png");
  } else if (name === "Profile") {
    return require("../../assets/profile.png");
  } else if (name === "pencil") {
    return require("../../assets/pencil.png");
  } else if (name === "calendar") {
    return require("../../assets/calendar.png");
  } else if (name === "wall") {
    return require("../../assets/wall.png");
  } else if (name === "user") {
    return require("../../assets/user.png");
  } else if (name === "cake") {
    return require("../../assets/cake.png");
  } else if (name === "location") {
    return require("../../assets/location.png");
  } else if (name === "pencil") {
    return require("../../assets/pencil.png");
  } else {
    return require("../../assets/home.png");
  }
};
