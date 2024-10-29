import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { StationListItem } from '../index';
import { BikeStation } from '../../../types/bikeStation';
import { AccessibilityInfo, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

jest.mock('expo-clipboard', () => ({
    setStringAsync: jest.fn(),
    getStringAsync: jest.fn(),
}));
jest.spyOn(Alert, 'alert');
jest.spyOn(AccessibilityInfo, 'announceForAccessibility');

describe('StationListItem', () => {
  const mockStation: BikeStation = {
    id: 1,
    name: 'Station 1',
    bikes_available: 22,
    bikes_in_use: 6,
  };

  beforeAll(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  }); 
  
  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    render(<StationListItem bikeStation={mockStation} />);
  });

  it('renders the bike station name', () => {
    expect(screen.getByText('Station 1')).toBeTruthy();
  });

  it('displays the number of available bikes', () => {
    expect(screen.getByText('Available Bikes: 22')).toBeTruthy();
  });

  it('displays total capacity of the bike station', () => {
    expect(screen.getByText('Total Capacity: 28')).toBeTruthy();
  });

  it('copies the station name to clipboard on long press and triggers alert and accessibility announcement', async () => {
    fireEvent(screen.getByText('Station 1'), 'longPress');

    await waitFor(() => {
      expect(Clipboard.setStringAsync).toHaveBeenCalledWith(mockStation.name);
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "The following text has been copied to clipboard: ",
        mockStation.name
      );
    });

    expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith(
      `The following text has been copied to the clipboard: ${mockStation.name}`
    );
  });

  it('has correct accessibility attributes', () => {
    const expectedAccessibilityLabel = `Bike station: ${mockStation.name}. Available bikes: ${mockStation.bikes_available}. Total capacity: ${mockStation.bikes_available + mockStation.bikes_in_use}.`;

    expect(screen.getByLabelText(expectedAccessibilityLabel)).toBeTruthy();
    expect(screen.getByHintText('Long press to copy station name to clipboard')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
