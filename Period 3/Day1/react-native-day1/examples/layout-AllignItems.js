import React from "react";
import { View, Text } from "react-native";

AlignItemsBasics = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "flex-end",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <View style={{ width: 50, height: 50, backgroundColor: "powderblue" }} />
      <View style={{ height: 50, backgroundColor: "skyblue" }} />
      <View style={{ height: 50, backgroundColor: "steelblue" }} />
    </View>
  );
};

//https://reactnative.dev/docs/flexbox#flex-direction
export default function AlignItemsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>Aligh Items</Text>
      <AlignItemsBasics />
    </View>
  );
}
