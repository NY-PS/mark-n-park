import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import UsersMap from './UsersMap';
import MapView, { Marker} from 'react-native-maps'; 

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      userLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0622, //this and longDelta determine how zoomed in it is on the GUI
        longitudeDelta: 0.0421
      },
      destination: "",
      meters: [],
      error: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0622, //this and longDelta determine how zoomed in it is on the GUI
            longitudeDelta: 0.0421
          },
          error: null
        });
      }, 
      error => this.setState({ error: error.message}),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    );
  }

  getMetersHandler = () => {
    fetch('https://firestore.googleapis.com/v1beta1/projects/mark-n-park/databases/(default)/documents/smart_meters')
      .then((response) => response.json())
      .then((responseJson) => {
        const metersArray = [];
        console.log((responseJson));
        for(const key in responseJson){
          let meterLocation = {};
          for(i=0; i< responseJson[key].length; i++){
            meterLocation = responseJson[key][i]["fields"]["location"]["geoPointValue"];
            console.log(meterLocation);
            metersArray.push({
              latitude: meterLocation.latitude,
              longitude: meterLocation.longitude,
              id: i
            });
          }
        }
        this.setState({
          meters: metersArray
        });
      })
      .catch(err => console.log(err));
  };

  onChangeDestination(destination) {
    this.setState({ destination });
  }

  submitSearch() {
    this.setState({userLocation: {latitude: 44.5638, longitude: -123.2794, latitudeDelta: 0.0622, longitudeDelta: 0.0421}});
    this.getMetersHandler();
  }

  render() {
    return (
      <View style={styles.container}>
        <UsersMap userLocation={this.state.userLocation} meters={this.state.meters}/>
        <View style={styles.searchBarContainer}>
          <TextInput style={styles.destinationInput} placeholder="Search for a meter" value={this.state.destination} onSubmitEditing={this.getMetersHandler} onChangeText={destination => this.onChangeDestination(destination)}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: '100%',
    width: '100%'
  },
  searchBarContainer: {
    width: '100%',
    position: "absolute",
    bottom: 500,
    alignItems: "center"
  },
  destinationInput: {
    height: 40,
    width: '90%',
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5
  }
});
