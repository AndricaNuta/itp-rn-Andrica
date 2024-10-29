import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { ParkingsScreen } from '../index';
import { useFetchParkings } from '../../../hooks/useFetchParkings';

jest.mock('../../../hooks/useFetchParkings');

describe('ParkingsScreen', () => {
  const mockUseFetchParkings= useFetchParkings as jest.Mock;
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(()=>{
    jest.clearAllMocks();
  })

  const defaultMockValues = {
    parkings: [], 
    loading: false, 
    error: null, 
    refresh: jest.fn()
  };
  const renderComponent = (overrides = {}) => {
    mockUseFetchParkings.mockReturnValue({
      ... defaultMockValues,
      ... overrides
    });
    render(<ParkingsScreen />);
  };
  it('shows loading indicator when loading', () => {
    renderComponent({ loading: true });

    expect(screen.getByLabelText('Loading parking stations')).toBeTruthy();
  });

  it('renders parking items when data is available', async () => {
    const mockParkings = [{ id: '1', name: 'Parking A', occupation: 50 }];
    renderComponent({ parkings: mockParkings });

    await waitFor(() => {
      expect(screen.getByText('Parking A')).toBeTruthy();
    });
  });

  it('shows fallback message if no data is available', async () => {
    renderComponent({ parkings: [] });

    await waitFor(() => {
      expect(screen.getByLabelText('No car parkings available')).toBeTruthy();
    });
  });

  it('displays error message when fetch fails', async () => {
    const mockRefresh = jest.fn();
    renderComponent({ error: 'Failed to load data.', refresh: mockRefresh});

    expect(screen.getByText('Oops, something went wrong!')).toBeTruthy();

  });

  it('has accessibility label on activity loader', () => {
    renderComponent({ loading: true });
    expect(screen.getByLabelText('Loading parking stations')).toBeTruthy();
  });

  it('has accessibility label on error message', async () => {
    renderComponent({ error: 'Failed to load data.' });
    await waitFor(() => {
      expect(screen.getByLabelText('Error loading parking stations. Try pulling down to refresh the page.')).toBeTruthy();
    });
  });

  it('has accessibility label on empty list message', async () => {
    renderComponent({ stations: [] });
    await waitFor(() => {
      expect(screen.getByLabelText('No car parkings available')).toBeTruthy();
    });
  });
});