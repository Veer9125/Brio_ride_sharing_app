import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDriverStore, useLocationStore } from '../store';
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from '../lib/map';
import { icons } from '../constants';
import { useFetch } from '../lib/fetch';
import MapViewDirections from 'react-native-maps-directions';



export const Map = ({mapType}) => {
  const {data: drivers, loading, error} = useFetch('/(api)/driver')
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  console.log("userLatitude", userLatitude);
    console.log("userLongitude", userLongitude);
    
    const {selectedDriver, setDrivers} = useDriverStore();

    const region = calculateRegion({
      userLatitude,
      userLongitude,
      destinationLatitude,
      destinationLongitude,
    });

  const [markers, setMarkers] = useState([]);
  
  
  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude){
        console.log("nothing find userlatitude and userlongitude");
        return;
      }

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude: userLatitude,
        userLongitude: userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(()=> {
    if(markers.length > 0 && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers);
      }); 
    }
  },[markers, destinationLatitude, destinationLongitude])

  if(loading || !userLatitude || !userLongitude) return (
    <View className='flex items-center justify-center w-full'>
      <ActivityIndicator size="small" color="#000"/>
    </View>
  )

  if(error)(
    <View className='flex items-center justify-center w-full'>
      <Text>Error: {error}</Text>
    </View>
  )

  return (
    <View className="flex-1 bg-gray-200">
      <View className="flex-1 overflow-hidden rounded-2xl">
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          tintColor="black"
          mapType={mapType}
          showsPointsOfInterest={false}
          initialRegion={region}
          showsUserLocation={true}
          userInterfaceStyle="light"
        >
          {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}
      {destinationLatitude && destinationLongitude && (
        <>
        <Marker key="destination" coordinate={{
          latitude: destinationLatitude,
          longitude: destinationLongitude,
        }} title='destination' image={icons.pin}/>
        <MapViewDirections origin={{
          latitude: userLatitude,
          longitude: userLongitude
        }} destination={{
          latitude: destinationLatitude,
          longitude: destinationLongitude,
        }} apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
        strokeColor='#2086ff' strokeWidth={4}/>
        </>
      )}
        </MapView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});


export default Map;