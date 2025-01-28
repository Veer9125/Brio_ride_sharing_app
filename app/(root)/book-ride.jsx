import { useUser } from "@clerk/clerk-expo";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Image, Text, View } from "react-native";

import Payment from "../../components/payment";
import RideLayout from "../../components/rideLayout";
import { icons, images } from "../../constants";
import { formatTime } from "../../lib/utils";
import { useDriverStore, useLocationStore } from "../../store";
import CustomButton from "../../components/customButton";
import ReactNativeModal from "react-native-modal";
import { useState } from "react";
import { router } from "expo-router";

const BookRide = () => {
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver,
  )[0];

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.com.brio"
      urlScheme="brio"
    >
      <RideLayout title="Book Ride">
        <>
          <Text className="text-xl font-JakartaSemiBold mb-3">
            Ride Information
          </Text>

          <View className="flex flex-col w-full items-center justify-center mt-10">
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              className="w-28 h-28 rounded-full"
            />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Text className="text-lg font-JakartaSemiBold">
                {driverDetails?.title}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">
                <Image
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-JakartaRegular">
                  {driverDetails?.rating}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Ride Price</Text>
              <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                ${driverDetails?.price}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
              <Text className="text-lg font-JakartaRegular">
                {formatTime(driverDetails?.time)}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full py-3">
              <Text className="text-lg font-JakartaRegular">Car Seats</Text>
              <Text className="text-lg font-JakartaRegular">
                {driverDetails?.car_seats}
              </Text>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center mt-5">
            <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
              <Image source={icons.to} className="w-6 h-6" />
              <Text className="text-lg font-JakartaRegular ml-2">
                {userAddress}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
              <Image source={icons.point} className="w-6 h-6" />
              <Text className="text-lg font-JakartaRegular ml-2">
                {destinationAddress}
              </Text>
            </View>
          </View>

          <CustomButton
                  title="Confirm Ride"
                  className="my-10"
                  onPress={() => setSuccess(true)}
                />
          
                <ReactNativeModal
                  isVisible={success}
                  onBackdropPress={() => setSuccess(false)}
                >
                  <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
                    <Image source={images.check} className="w-28 h-28 mt-5" />
          
                    <Text className="text-2xl text-center font-JakartaBold mt-5">
                      Booking placed successfully
                    </Text>
          
                    <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
                      Thank you for your booking. Your reservation has been successfully
                      placed. Please proceed with your trip.
                    </Text>
          
                    <CustomButton
                      title="Back Home"
                      onPress={() => {
                        setSuccess(false);
                        router.push('/(root)/(tabs)/home');
                      }}
                      className="mt-5"
                    />
                  </View>
                </ReactNativeModal>
        </>
      </RideLayout>
    </StripeProvider>
  );
};

export default BookRide;