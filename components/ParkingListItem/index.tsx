import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
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
        <View style={styles.header}>
          <Text style={styles.title}> {parking.name} </Text>
          <Text style={styles.description}> {parking.description} </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Capacity:</Text>
          <Text style={styles.value}> {parking.totalcapacity} </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Available:</Text>
          <Text style={styles.value}> {parking.availablecapacity}  </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Occupation:</Text>
          <Text style={styles.value}> {parking.occupation}% </Text>
        </View>
      </View>
    </Pressable>
  );
});
