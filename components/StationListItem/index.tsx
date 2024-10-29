import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Pressable, Alert, AccessibilityInfo, Animated } from 'react-native';
import { styles } from './styles';
import { StationListItemProps } from './types';
import * as Clipboard from 'expo-clipboard';

export const StationListItem: React.FC<StationListItemProps> = React.memo(({ bikeStation }) => {
  const totalBikes = useMemo(() => bikeStation.bikes_in_use + bikeStation.bikes_available, [bikeStation.bikes_in_use, bikeStation.bikes_available]);
  const availabilityPercentage = useMemo(() => (bikeStation.bikes_available / totalBikes) * 100, [totalBikes]);
  const [isPressed, setIsPressed] = useState(false); 
  const progressBarWidth = useRef(new Animated.Value(0)).current;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(bikeStation.name);
    AccessibilityInfo.announceForAccessibility(`The following text has been copied to the clipboard: ${bikeStation.name}`);
    Alert.alert("The following text has been copied to clipboard: ", bikeStation.name);
  };

  const getProgressBarColor = () => {
    if (availabilityPercentage > 60) return '#4CAF5E';
    if (availabilityPercentage >= 30) return '#FF980E';
    return '#D3212C';
  };

  useEffect(() => {
    Animated.timing(progressBarWidth, {
      toValue: availabilityPercentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [availabilityPercentage]);

  return (
    <Pressable 
      onLongPress={copyToClipboard}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[styles.card, {backgroundColor: isPressed ? '#ccc': '#ffffff'}]}
      accessibilityLabel={`Bike station: ${bikeStation.name}. Available bikes: ${bikeStation.bikes_available}. Total capacity: ${totalBikes}.`}
      accessibilityHint="Long press to copy station name to clipboard"
      accessibilityRole="button"
    >
        <Text style={styles.title}>{bikeStation.name}</Text>
        <Text style={styles.bikeInfo}>
          Available Bikes: {bikeStation.bikes_available}
        </Text>
        <Text style={styles.bikeInfo}>
          Total Capacity: {totalBikes} 
        </Text>
        <View style={styles.progressBarBackground}>
          <Animated.View 
            style={
              [styles.progressBar, 
                { width: progressBarWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', `${availabilityPercentage}%`]
                  }), 
                  backgroundColor: getProgressBarColor() 
                }
              ]} />
        </View>
    </Pressable>
  );
});
