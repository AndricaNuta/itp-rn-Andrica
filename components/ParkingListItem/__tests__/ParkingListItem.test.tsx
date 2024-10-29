import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ParkingListItem } from '../index';
import { ParkingData } from '../../../types/parkingData';
import { openInGoogleMaps } from '../../../services/openInGoogleMaps';

jest.mock('../../../services/openInGoogleMaps', () => ({
  openInGoogleMaps: jest.fn(),
}));

describe('ParkingListItem', () => {
  const mockParking: ParkingData = {
    id: '1',
    name: 'Parking Lot',
    description: 'Somewhere over the rainbow',
    totalcapacity: 100,
    availablecapacity: 30,
    occupation: 70,
    location: { lat: 51.051, lon: 3.72 },
  };

  beforeEach(() => {
    render(<ParkingListItem parking={mockParking} />);
  })

    it('renders the parking information correctly', () => {
      expect(screen.getByText('Parking Lot')).toBeTruthy();
      expect(screen.getByText('Somewhere over the rainbow')).toBeTruthy();
      expect(screen.getByText('Capacity:')).toBeTruthy();
      expect(screen.getByText('100')).toBeTruthy();
      expect(screen.getByText('Available:')).toBeTruthy();
      expect(screen.getByText('30')).toBeTruthy();
      expect(screen.getByText('Occupation:')).toBeTruthy();
      expect(screen.getByText('70%')).toBeTruthy();
    });    

  it('calls openInGoogleMaps with the correct coordinates when pressed', () => {
    const pressableElement = screen.getByRole('button');
    fireEvent.press(pressableElement);

    expect(openInGoogleMaps).toHaveBeenCalledWith(mockParking.location.lat, mockParking.location.lon);
  });

  it('has correct accessibility attributes', () => {
    const expectedAccessibilityLabel =`Parking location: ${mockParking.name}, ${mockParking.description} Total capacity: ${mockParking.totalcapacity}. Available spaces: ${mockParking.availablecapacity}. Occupied percentage: ${mockParking.occupation}%.`;

    expect(screen.getByLabelText(expectedAccessibilityLabel)).toBeTruthy();
    expect(screen.getByHintText('Tap to open location in Google Maps')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
