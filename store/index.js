import { create } from "zustand";

export const useLocationStore = create((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
    

    // If driver is selected and new location is set, clear the selected driver
    // const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    // if (selectedDriver) clearSelectedDriver();
  },
  
  setDestinationLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
    // If driver is selected and new location is set, clear the selected driver
    // const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    // if (selectedDriver) clearSelectedDriver();
  },
}));

export const useDriverStore = create((set) => ({
  drivers: [],
  selectedDriver: null,
  setSelectedDriver: (driverId) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers) =>
    set(() => ({ drivers })),
  clearSelectedDriver: () =>
    set(() => ({ selectedDriver: null })),
}));
