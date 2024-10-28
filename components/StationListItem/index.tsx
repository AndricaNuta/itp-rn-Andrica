import React, { useMemo } from 'react';
import { View, Text, Pressable, Alert, AccessibilityInfo } from 'react-native';
import { styles } from './styles';
import { StationListItemProps } from './types';
import * as Clipboard from 'expo-clipboard';


export const StationListItem: React.FC<StationListItemProps> = React.memo(({ bikeStation }) => {
  const totalBikes = useMemo(() => bikeStation.bikes_in_use + bikeStation.bikes_available, [bikeStation.bikes_in_use, bikeStation.bikes_available]);
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(bikeStation.name);
    AccessibilityInfo.announceForAccessibility(`The following text has been copied to the clipboard: ${bikeStation.name}`);
    Alert.alert("The following text has been copied to clipboard: ",bikeStation.name)
    //Alert.alert("The following text has been copied to clipboard: ",await Clipboard.getStringAsync())
    };

  return (
    <Pressable 
      onLongPress={copyToClipboard}
      accessibilityLabel={`Bike station: ${bikeStation.name}. Available bikes: ${bikeStation.bikes_available}. Total capacity: ${totalBikes}.`}
      accessibilityHint="Long press to copy station name to clipboard"
      accessibilityRole="button"
    >
      <View style={styles.card}>
        <Text style={styles.title}>{bikeStation.name}</Text>
        <Text style={styles.bikeInfo}>
          Available Bikes: {bikeStation.bikes_available}
        </Text>
        <Text style={styles.bikeInfo}>
          Total Capacity: {totalBikes} 
        </Text>
      </View>
    </Pressable>
  );
});
