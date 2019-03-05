import React from "react";
import { Text, View } from "react-native";

class PreferredMeters extends React.Component {
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
        <Text>Preferred Meters!</Text>
      </View>
    );
  }
}

export default PreferredMeters;
