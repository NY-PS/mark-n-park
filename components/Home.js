import React from "react";
import { Text, View } from "react-native";

class Home extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <Text>Home!</Text>
      </View>
    );
  }
}

export default Home;
