import { Alert, Linking, Platform } from 'react-native';

export const openInGoogleMaps = (latitude: number, longitude: number) => {
  const iosURL = `comgooglemaps://?q=${latitude},${longitude}`;
  const androidURL = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
  const googleMapsURL = Platform.OS === 'ios' ? iosURL : androidURL;
  const browserURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  Linking.canOpenURL(googleMapsURL)
    .then((supported) => {
      if (supported) {
        Linking.openURL(googleMapsURL);
      } else {
        Linking.openURL(browserURL).catch(() =>
          Alert.alert("Error", "Unable to open Google Maps in the browser.")
        );
      }
    })
    .catch((err) => console.error("An error occurred", err));
};