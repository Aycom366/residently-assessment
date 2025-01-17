import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

const CustomButtonA = (props: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.children}</Text>
    </Pressable>
  );
};

export default CustomButtonA;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    height: 56,
    backgroundColor: Colors.appOrange,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontFamily: "Satoshi-700",
    fontSize: 16,
    color: "white",
  },
});
