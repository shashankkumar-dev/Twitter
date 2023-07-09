import React, { ReactNode } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { getReverseBackgroundColor } from "./BackgroundColor";
import { getIconSource } from "./GetIconSource";

interface CustomTextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

interface InfoProps {
  content: string;
  icon: string;
  style?: StyleProp<TextStyle>;
}

interface CustomImageViewProps {
  name: String;
  style?: StyleProp<ViewStyle>;
}

interface CustomTextInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
}

interface ButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const CustomView: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => {
  return <View style={[style]}>{}</View>;
};

export const TextView: React.FC<CustomTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style, { color: getReverseBackgroundColor() }]}>{children}</Text>;
};

export const GrayTextView: React.FC<CustomTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export const IconView: React.FC<CustomImageViewProps> = ({ name }) => {
  return <Image source={getIconSource(name)} style={[styles.image, { tintColor: getReverseBackgroundColor() }]} />;
};

export const IconButton: React.FC<ButtonProps> = ({ onPress, title, style }) => (
  <TouchableOpacity style={style} activeOpacity={0} onPress={onPress}>
    <Image source={getIconSource(title)} style={[styles.image, { tintColor: getReverseBackgroundColor() }]} />
  </TouchableOpacity>
);

export const TextInputView: React.FC<CustomTextInputProps> = ({ style, ...props }) => {
  return <TextInput style={[styles.input, style]} placeholderTextColor={getReverseBackgroundColor()} {...props} />;
};

export const TitleView: React.FC<CustomTextInputProps> = ({ style, ...props }) => {
  return <TextInput style={[styles.title, style]} placeholderTextColor={getReverseBackgroundColor()} {...props} />;
};

export const ButtonView: React.FC<ButtonProps> = ({ onPress, title, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export const InfoView: React.FC<InfoProps> = ({ content, icon }) => (
  <View style={styles.infoRow}>
    <IconView name={icon} />
    <GrayTextView>{content}</GrayTextView>
  </View>
);

export const LineBreak: React.FC = () => (
  <View style={styles.lineBreak} />
);

const styles = StyleSheet.create({
  text: {
    margin: 2,
    fontSize: 16
  },
  textGray: {
    margin: 5,
    color: "gray"
  },
  image: {
    resizeMode: "contain",
    width: 20,
    height: 20,
    marginHorizontal: 3
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#1DA1F2",
    width: "100%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  lineBreak: {
    height: 1,
    backgroundColor: "#b9b8b8",
    marginTop: 10
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
    marginRight: 8
  }
});


