export type ParkingData = {
  id: string;
  name: string;
  totalcapacity: number;
  availablecapacity: number;
  occupation: number;
  description: string;
  location: { lat: number; lon: number };
}