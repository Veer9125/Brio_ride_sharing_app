import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { formatTime } from "../lib/utils";

const DriverCard = ({ item, selected, setSelected }) => {
    // console.log(item);
    // console.log(item.first_name);
    // console.log(item.profile_image_url);
    // console.log("Keys:", Object.keys(item));
    
  return (
    <TouchableOpacity
      onPress={setSelected}
      className={`${
        selected === item.id ? "bg-general-600" : "bg-white"
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
    >
      {/* Driver Profile Image */}
      <Image
        source={{ uri: item.profile_image_url }}
        className="w-14 h-14 rounded-full"
      />

      {/* Driver Details */}
      <View className="flex-1 flex flex-col items-start justify-center mx-3">
        {/* Title and Rating */}
        <View className="flex flex-row items-center justify-start mb-1">
          <Text className="text-lg font-Jakarta">{item.title}</Text>

          <View className="flex flex-row items-center space-x-1 ml-2">
            <Image source={icons.star} className="w-3.5 h-3.5" />
            <Text className="text-sm font-Jakarta">4</Text>
          </View>
        </View>

        {/* Price, Time, and Seats */}
        <View className="flex flex-row items-center justify-start">
          <View className="flex flex-row items-center">
            <Image source={icons.dollar} className="w-4 h-4" />
            <Text className="text-sm font-Jakarta ml-1">
              ${item.price}
            </Text>
          </View>

          <Text className="text-sm font-Jakarta text-general-800 mx-1">
            |
          </Text>

          <Text className="text-sm font-Jakarta text-general-800">
          {formatTime(parseInt(`${item.time}`))}
          </Text>

          <Text className="text-sm font-Jakarta text-general-800 mx-1">
            |
          </Text>

          <Text className="text-sm font-Jakarta text-general-800">
            {item.car_seats} seats
          </Text>
        </View>
      </View>

      {/* Car Image */}
      <Image
        source={{ uri: item.car_image_url }}
        className="h-14 w-14"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default DriverCard;
