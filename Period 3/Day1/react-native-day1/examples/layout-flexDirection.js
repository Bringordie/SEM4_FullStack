import React from "react";
import { View, Text } from "react-native";

FlexDirectionBasics = () => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ width: 50, height: 50, backgroundColor: "powderblue" }} />
      <View style={{ width: 50, height: 50, backgroundColor: "skyblue" }} />
      <View style={{ width: 50, height: 50, backgroundColor: "steelblue" }} />
    </View>
  );
};

//https://reactnative.dev/docs/flexbox#flex-direction
export default function FlexDirectionScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>Flex Direction</Text>
      <FlexDirectionBasics />
    </View>
  );
}
