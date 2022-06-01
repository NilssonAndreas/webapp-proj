import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from "react-native-maps";
import { useEffect, useState } from 'react';
import badModel from "../models/badplats"


export default function BadplatsMarkers() {

const [locationMarker, setLocationMarker] = useState(null);
const [locationMarkerBadplatser, setLocationMarkerBadplatser] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);

useEffect(() => {
  (async () => {
    console.log("CALL TO API IN BADMARKERS")
    const tokenName = 'badplatser'
    let badplatser = await badModel.getBadPlatser(tokenName)
    const listOfBadplatser = badplatser
    .map((item, index) => {
        return <Marker
        key={index}
        coordinate={{ latitude: item.geometryArea['y'], longitude: item.geometryArea['x'] }}
        title= {`Badplats: ${ item.nameArea }`}
    />
    });
      setLocationMarkerBadplatser(listOfBadplatser)
  })();
}, []);
  
  //Get user location on accept
  useEffect(() => {
    (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});

        setLocationMarker(<Marker
            coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            }}
            title="Min plats"
            pinColor="blue"
        />);
    })();
}, []);
  return (
      <MapView
        style={styles.map}
        initialRegion={{
            latitude: 56.1612,
            longitude: 15.5869,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}
        >
        {locationMarkerBadplatser}
        {locationMarker}
       
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
