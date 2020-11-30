import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import GetLoginData from "./GetLoginData";

export default function App() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const loginDataReady = (loginData) => {
    const msg = `Here's your loginData: 
    ${JSON.stringify(loginData, null, 2)}
    
    Now get the location and go to the server to find nearby players
    When received, plot in those players on the map
    `;
    Alert.alert("message", msg);
    setShowLoginDialog(false);
  };

  const cancelLoginDataDialog = () => {
    setShowLoginDialog(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Team Finder App</Text>
      <View style={styles.mapStyle}>
        <Text>Add your map here</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowLoginDialog(true)}
        onLongPress={() => Alert.alert("Looooooooooong press")}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <Button title="login" onPress={() => setShowLoginDialog(true)} />
      <GetLoginData
        onLoginDataReady={loginDataReady}
        visible={showLoginDialog}
        onCancel={cancelLoginDataDialog}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "darkgray",
    padding: 10,
    margin: 4,
  },
  headerText: {
    fontSize: 26,
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    flex: 10,
  },
});
