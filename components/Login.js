import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.app}>MARK-N-PARK</Text>
        <Button
          title="Login with Google"
          accessibilityLabel="Login with your Google account"
        />
        <Text> </Text>
        <Button title="Continue as Guest" accessibilityLabel="Login as Guest" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#feffff"
  },
  app: {
    fontSize: 24,
    textAlign: "center",
    margin: 24,
    color: "#17252A"
  }
});
