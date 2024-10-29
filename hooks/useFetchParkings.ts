import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ParkingData } from '../types/parkingData';

const PARKING_URL = 'https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20';

export const useFetchParkings = () => {
  const [parkings, setParkings] = useState<ParkingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchParkingData = useCallback(async (isRefreshing = false) => {
    isRefreshing ? setRefreshing(true) : setLoading(true);

    try {
      const response = await axios.get<{ results: ParkingData[] }>(PARKING_URL);
      const filteredParkings = response.data.results
        .filter((parking) => parking.occupation <= 50)
        .sort((a, b) => a.occupation - b.occupation)
        .map((parking) => ({
          id: parking.id,
          name: parking.name,
          totalcapacity: parking.totalcapacity,
          availablecapacity: parking.availablecapacity,
          occupation: parking.occupation,
          description: parking.description,
          location: parking.location,
        }));

      setParkings((prev) => JSON.stringify(prev) === JSON.stringify(filteredParkings) ? prev : filteredParkings);
    } catch (err) {
      console.error("Error fetching parking data:", err);
      setError("Failed to load data.");
    } finally {
      isRefreshing ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    fetchParkingData(true);
  }, [fetchParkingData]);

  useEffect(() => {
    fetchParkingData();
  }, [fetchParkingData]);

  return { parkings, loading, error, refreshing, onRefresh };
};
