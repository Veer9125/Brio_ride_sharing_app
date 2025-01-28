import { View, Text } from 'react-native';
import React from 'react';
import { useLocationStore } from '../../store';
import RideLayout from '../../components/rideLayout';
import GoogleTextInput from '../../components/googleTextInput';
import { icons } from '../../constants';
import CustomButton from '../../components/customButton';
import { router } from 'expo-router';

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();
  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-2">From</Text>
        <GoogleTextInput icon={icons.target} initialLocation={userAddress} containerStyle="bg-neutral-100" textInputBackgroundColor="transparent" handlePress={(location) => setUserLocation(location)}/>
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-2">To</Text>
        <GoogleTextInput icon={icons.map} initialLocation={destinationAddress} containerStyle="bg-neutral-100" textInputBackgroundColor="transparent" handlePress={(location) => setDestinationLocation(location)}/>
      </View>
      <CustomButton title="Find Ride" onPress={() => router.push("/(root)/confirm-ride")} className='mt-5'/>
    </RideLayout>
  );
};

export default FindRide;
