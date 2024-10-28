import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { openInGoogleMaps } from '../../services/openInGoogleMaps';
import { styles } from './styles';
import { ParkingListItemProps } from './types';

export const ParkingListItem: React.FC<ParkingListItemProps> = React.memo(({ parking }) => {
  return (
    <Pressable 
      onPress={() => openInGoogleMaps(parking.location.lat, parking.location.lon)}
      accessibilityLabel={`Parking location: ${parking.name}, ${parking.description} Total capacity: ${parking.totalcapacity}. Available spaces: ${parking.availablecapacity}. Occupied percentage: ${parking.occupation}%.`}
      accessibilityHint="Tap to open location in Google Maps"
      accessibilityRole="button"
    >
      <View style={styles.card}>
        <Text style={styles.title}> {parking.name} </Text>
        <Text style={styles.description}> {parking.description} </Text>
        <Text> Capacity: {parking.totalcapacity} </Text>
        <Text> Available: {parking.availablecapacity} </Text>
        <Text> Occupation: {parking.occupation}% </Text>
      </View>
    </Pressable>
  );
});
