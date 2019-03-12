import React from "react";
import { Text, View, Modal, TouchableHighlight, Alert, FlatList, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  
    this.toggleModal = (visible) => {
      this.setState({
        modalVisible: visible
      });
    };

    this.smartMeters = [];
  }

  async componentDidMount() {
    try {
      const response = await axios.get("https://firestore.googleapis.com/v1beta1/projects/mark-n-park/databases/(default)/documents/smart_meters");
      const data = response.data;
      for (let i = 0; i < data.documents.length; i++) {
        this.smartMeters.push({
          id: data.documents[i].name.split("/").pop(),
          cost: data.documents[i].fields.cost.doubleValue,
          isActive: data.documents[i].fields.active.booleanValue,
          isAvailable: data.documents[i].fields.available.booleanValue,
          location: `(${data.documents[i].fields.location.geoPointValue.latitude}, ${data.documents[i].fields.location.geoPointValue.longitude})`
        });
      }
      this.smartMeters.sort((a, b) => {
        if (parseInt(a.id) < parseInt(b.id)) {
          return -1;
        } else if (parseInt(a.id) > parseInt(b.id)) {
          return 1;
        }
        return 0;
      });
    } catch (error) {
      Alert.alert('Oops!', error.toString());
    }
  }

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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View 
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff"
            }}
          >
            <Text
              style={{
                fontSize: 36
              }}
            >Smart Meters</Text>
            <FlatList
              data={this.smartMeters}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => 
                <View
                  style={{
                    marginVertical: 12
                  }}
                >
                  <Text
                    onPress={() => {
                      this.toggleModal(false);
                      Alert.alert(
                        `Meter ${item.id} Details`,
                        "Cost: " + (item.cost ? item.cost : "N/A") +
                        "\nAvailable: " + (item.isAvailable ? "Yes" : "No") +
                        "\nActive: " + (item.isActive ? "Yes" : "No") +
                        "\nLocation: " + item.location
                      );
                    }}
                  >
                    Meter {item.id}
                  </Text>
                </View>}
              keyExtractor={(item) => item.id}
            />
            <TouchableHighlight onPress={() => {this.toggleModal(false)}}>
              <Icon name="close" size={24} />
            </TouchableHighlight>
          </View>
        </Modal>

        <Text>Home!</Text>
        <TouchableHighlight onPress={() => {this.toggleModal(true)}}>
          <Icon name="list" size={24} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default Home;
