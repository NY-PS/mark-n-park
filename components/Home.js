import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
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

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: -100}}>
          <Button title="Get Smart Meters" onPress={this.getMetersHandler} />
        </View>
        <UsersMap userLocation={this.state.userLocation} meters={this.state.meters}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
