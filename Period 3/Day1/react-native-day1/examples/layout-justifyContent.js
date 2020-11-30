import React from "react";
import { View, Text } from "react-native";

JustifyContentBasics = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View style={{ width: 50, height: 50, backgroundColor: "powderblue" }} />
      <View style={{ width: 50, height: 50, backgroundColor: "skyblue" }} />
      <View style={{ width: 50, height: 50, backgroundColor: "steelblue" }} />
    </View>
  );
};

//https://reactnative.dev/docs/flexbox#justify-content
export default function JustifyContentScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Justify Content</Text>
      <JustifyContentBasics />
    </View>
  );
}
