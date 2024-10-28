import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ParkingData } from '../types/parkingData';

export const useFetchParkings = () => {
  const [parkings, setParkings] = useState<ParkingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParkingData = useCallback(async () => {
    if (!loading) setLoading(false);

    try {
      const url = 'https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20';
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
    } catch (err) {
      console.error("Error fetching parking data:", err);
      if (!error) setError("Failed to load data.");
    } finally {
      if (loading) setLoading(false);
    }
  }, []); 

  const refresh = useCallback(() => {
    fetchParkingData();
  }, []); 

  useEffect(() => {
    fetchParkingData();
  }, []); 

  return { parkings, loading, error, refresh };
};
