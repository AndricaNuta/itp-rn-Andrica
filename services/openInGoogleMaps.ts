import { Alert, Linking } from 'react-native';

export const openInGoogleMaps = (latitude: number, longitude: number) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open Google Maps");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};
