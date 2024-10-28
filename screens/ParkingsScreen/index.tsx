import React from 'react';
import { FlatList, Text, ActivityIndicator, SafeAreaView, Pressable, View } from 'react-native';
import { ParkingListItem } from '../../components/ParkingListItem';
import { useFetchParkings } from '../../hooks/useFetchParkings';
import { ParkingData } from '../../types/parkingData';
import { styles } from './styles';

export const ParkingsScreen: React.FC = () => {
    const { parkings, loading, error, refresh } = useFetchParkings();
      return (
        <SafeAreaView style={styles.container}>
          {loading && 
              <ActivityIndicator 
              style={styles.errorText}
              size="large" 
              color="#ffffff" 
              accessibilityLabel="Loading parking stations"
              accessibilityRole="progressbar"
            />
          }
          {error &&
           <View>
            <Text 
            style={styles.errorText}
            accessibilityRole="alert" 
            accessibilityLabel="Error loading parking stations. Try pulling down to refresh the page."
            >
              Oops, something went wrong!
            </Text>
            <Pressable style={styles.retryButton} onPress={refresh}>
              <Text>
                Retry 
              </Text>
            </Pressable>
         </View>
          }
          {!loading && !error && parkings.length === 0 && (
            <Text 
              style={styles.emptyList}
              accessibilityLabel="No car parkings available"
            >
              No stations available
            </Text>
          )}
          <FlatList
            data={parkings}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: ParkingData }) => (
              <ParkingListItem
                  parking={item}
              />
          )}
          />
        </SafeAreaView>
      );
    };


