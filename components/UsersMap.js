import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const usersMap = props => {
  let userLocationMarker = null;

  if (props.userLocation){
    userLocationMarker = <MapView.Marker coordinate={props.userLocation} />;
  }
  const metersMarkers = props.meters.map(meterPlace => <MapView.Marker coordinate={meterPlace} key={meterPlace.id} />);
  return (
    <View style={styles.mapContainer}>
      <MapView 
        initialRegion={{
            latitude: 44.5638,
            longitude: -123.2794,
            latitudeDelta: 0.0622, //this and longDelta determine how zoomed in it is on the GUI
            longitudeDelta: 0.0421,
          }}
          region={props.userLocation}
        style={styles.map}> 
        {userLocationMarker}
        {metersMarkers}
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 200,
    marginTop: 20
  },
  map: {
    width: '100%',
    height: '100%'
  }
});

export default usersMap;