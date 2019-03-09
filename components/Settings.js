import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        <Button title="Log Out" />
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
  header: {
    fontSize: 48,
    textAlign: "center",
    margin: 24
  }
});

export default Settings;
