import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ParkingData } from '../types/parkingData';

export const useFetchParkings = () => {
  const [parkings, setParkings] = useState<ParkingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const url = 'https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20';

  const fetchParkingData = useCallback(async(isInitialLoad = false) => {
    if (isInitialLoad) setLoading(true);

    try {
      const response = await axios.get(url);

      const filteredParkings = response.data.results
        .filter((parking: ParkingData) => parking.occupation <= 50)
        .sort((a: ParkingData, b: ParkingData) => a.occupation - b.occupation)
        .map((parking: ParkingData) => ({
          id: parking.id,
          name: parking.name,
          totalcapacity: parking.totalcapacity,
          availablecapacity: parking.availablecapacity,
          occupation: parking.occupation,
          description: parking.description,
          location: parking.location,
        }));

      setParkings((prevParkings) =>
        JSON.stringify(prevParkings) === JSON.stringify(filteredParkings) ? prevParkings : filteredParkings
      );
      setError(null); // Clear error on success
    } catch (err) {
      console.error("Error fetching parking data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [url, refreshing]); 

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchParkingData();
  }, [fetchParkingData]); 


  useEffect(() => {
    fetchParkingData();
  }, []); 

  return { parkings, loading, error, refreshing, onRefresh };
};  