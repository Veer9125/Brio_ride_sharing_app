import { View, Text, FlatList } from 'react-native';
import React from 'react';
import RideLayout from '../../components/rideLayout';
import DriverCard from '../../components/driverCard';
import CustomButton from '../../components/customButton';
import { router } from 'expo-router';
import { useDriverStore } from '../../store';

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title={"Choose a Rider"} snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        // keyExtractor={(item, index) => index.toString()}
        renderItem={({ item}) => (
          <DriverCard
            item={item}
            selected={selectedDriver}
            setSelected={() => setSelectedDriver(Number(item.id))}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
