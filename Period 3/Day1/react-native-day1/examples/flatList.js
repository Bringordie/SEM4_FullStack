import React from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: "Devin" },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },
          { key: "James" },
          { key: "Joel" },
          { key: "John" },
          { key: "Jillian" },
          { key: "Jimmy" },
          { key: "Julie" },
          { key: "Fred" },
          { key: "Dani" },
          { key: "Tony" },
          { key: "Peter" },
          { key: "Casper" },
          { key: "Noel" },
          { key: "Ida" },
          { key: "Adam" },
          { key: "Christine" },
          { key: "Martin" },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

//https://reactnative.dev/docs/using-a-listview
export default function FlatlistScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24 }}>Flatlist Basics</Text>
        <FlatListBasics />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
});
