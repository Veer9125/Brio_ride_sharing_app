import PropTypes from 'prop-types';

// Driver type definition
export const Driver = PropTypes.shape({
  id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  profile_image_url: PropTypes.string.isRequired,
  car_image_url: PropTypes.string.isRequired,
  car_seats: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
});

// MarkerData type definition
export const MarkerData = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  profile_image_url: PropTypes.string.isRequired,
  car_image_url: PropTypes.string.isRequired,
  car_seats: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  time: PropTypes.number,
  price: PropTypes.string,
});

// MapProps type definition
export const MapProps = PropTypes.shape({
  destinationLatitude: PropTypes.number,
  destinationLongitude: PropTypes.number,
  onDriverTimesCalculated: PropTypes.func,
  selectedDriver: PropTypes.number,
  onMapReady: PropTypes.func,
});

// Ride type definition
export const Ride = PropTypes.shape({
  origin_address: PropTypes.string.isRequired,
  destination_address: PropTypes.string.isRequired,
  origin_latitude: PropTypes.number.isRequired,
  origin_longitude: PropTypes.number.isRequired,
  destination_latitude: PropTypes.number.isRequired,
  destination_longitude: PropTypes.number.isRequired,
  ride_time: PropTypes.number.isRequired,
  fare_price: PropTypes.number.isRequired,
  payment_status: PropTypes.string.isRequired,
  driver_id: PropTypes.number.isRequired,
  user_id: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  driver: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    car_seats: PropTypes.number.isRequired,
  }).isRequired,
});

// ButtonProps type definition
export const ButtonProps = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  bgVariant: PropTypes.oneOf(["primary", "secondary", "danger", "outline", "success"]),
  textVariant: PropTypes.oneOf(["primary", "default", "secondary", "danger", "success"]),
  IconLeft: PropTypes.elementType,
  IconRight: PropTypes.elementType,
  className: PropTypes.string,
};

// GoogleInputProps type definition
export const GoogleInputProps = PropTypes.shape({
  icon: PropTypes.string,
  initialLocation: PropTypes.string,
  containerStyle: PropTypes.string,
  textInputBackgroundColor: PropTypes.string,
  handlePress: PropTypes.func.isRequired,
});

// InputFieldProps type definition
export const InputFieldProps = PropTypes.shape({
  label: PropTypes.string.isRequired,
  icon: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  labelStyle: PropTypes.string,
  containerStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  iconStyle: PropTypes.string,
  className: PropTypes.string,
});

// PaymentProps type definition
export const PaymentProps = PropTypes.shape({
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  driverId: PropTypes.number.isRequired,
  rideTime: PropTypes.number.isRequired,
});

// LocationStore type definition
export const LocationStore = PropTypes.shape({
  userLatitude: PropTypes.number,
  userLongitude: PropTypes.number,
  userAddress: PropTypes.string,
  destinationLatitude: PropTypes.number,
  destinationLongitude: PropTypes.number,
  destinationAddress: PropTypes.string,
  setUserLocation: PropTypes.func.isRequired,
  setDestinationLocation: PropTypes.func.isRequired,
});

// DriverStore type definition
export const DriverStore = PropTypes.shape({
  drivers: PropTypes.arrayOf(MarkerData).isRequired,
  selectedDriver: PropTypes.number,
  setSelectedDriver: PropTypes.func.isRequired,
  setDrivers: PropTypes.func.isRequired,
  clearSelectedDriver: PropTypes.func.isRequired,
});

// DriverCardProps type definition
export const DriverCardProps = PropTypes.shape({
  item: MarkerData.isRequired,
  selected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
});

// You can create more of these type validations for other interfaces like MarkerData, Ride, etc.
