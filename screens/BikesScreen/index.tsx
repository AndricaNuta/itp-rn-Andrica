import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, RefreshControl, ActivityIndicator, Text, Pressable, View } from 'react-native';
import { styles } from './styles';
import { StationListItem } from '../../components/StationListItem';
import { useFetchStations } from '../../hooks/useFetchBikeStations';
import { BikeStation } from '../../types/bikeStation';

export const BikesScreen: React.FC = () => {
  const { stations, loading, error, refreshing, onRefresh } = useFetchStations();

  return (
    <SafeAreaView style={styles.container}>
      {loading && 
        <ActivityIndicator 
          size="large" 
          color="#0000ff" 
          accessibilityLabel="Loading bike stations"
          accessibilityRole="progressbar"
        />
      }
      {error && (
          <Text 
          style={styles.errorText}
          accessibilityRole="alert" 
          accessibilityLabel="Error loading bike stations. Try pulling down to refresh the page."
          >
            Oops, something went wrong!
          </Text>
      )}
      {!loading && !error && stations.length === 0 && (
        <Text 
          style={styles.emptyList}
          accessibilityLabel="No bike stations available"
        >
          No bike stations available
        </Text>
      )}
      {!loading && !error && (
        <FlatList
          data={stations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: BikeStation })=> (
            <StationListItem
                bikeStation={item}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};
