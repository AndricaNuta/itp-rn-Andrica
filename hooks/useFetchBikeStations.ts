import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BikeStation } from '../types/bikeStation';
import isEqual from 'lodash/isEqual';

const STATION_URLS = [
  'https://data.stad.gent/api/explore/v2.1/catalog/datasets/blue-bike-deelfietsen-gent-dampoort/records?limit=20',
  'https://data.stad.gent/api/explore/v2.1/catalog/datasets/blue-bike-deelfietsen-gent-sint-pieters-m-hendrikaplein/records?limit=20',
  'https://data.stad.gent/api/explore/v2.1/catalog/datasets/blue-bike-deelfietsen-gent-sint-pieters-st-denijslaan/records?limit=20',
];

export const useFetchStations = () => {
  const [stations, setStations] = useState<BikeStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStations = useCallback(async (isInitialLoad = false) => {
    if (isInitialLoad) setLoading(true);

    try {
      const responses = await Promise.all(
        STATION_URLS.map(async (url) => {
          try {
            const response = await axios.get(url, { timeout: 4000 });
            return response.data.results || [];
          } catch (err) {
            console.error(`Failed to fetch data from ${url}:`, err);
            return null;
          }
        })
      );

      const successfulResponses = responses.filter((response) => response !== null);

      if (successfulResponses.length === 0) {
        setError('Failed to load data');
        setStations([]);
      } else {
        const combinedData: BikeStation[] = successfulResponses
          .flat()
          .map((station: any) => ({
            id: station.id,
            name: station.name,
            bikes_available: station.bikes_available,
            bikes_in_use: station.bikes_in_use,
          }));

        setStations((prevStations) =>
          isEqual(prevStations, combinedData) ? prevStations : combinedData
        );
        if (error) setError(null);
      }
    }catch{

    setError("Failed to load data.")
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      } else {
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchStations(true); 
    const interval = setInterval(() => fetchStations(false), 5000); 
    return () => clearInterval(interval);
  }, [fetchStations]);

  const onRefresh = useCallback(() => {
    fetchStations(false); 
  }, [fetchStations]);

  return { stations, loading, error, refreshing, onRefresh };
};
