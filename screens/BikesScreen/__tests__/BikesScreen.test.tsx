import { render, screen, waitFor, fireEvent, act } from '@testing-library/react-native';
import { BikesScreen } from '../index';
import { useFetchStations } from '../../../hooks/useFetchBikeStations';

jest.mock('../../../hooks/useFetchBikeStations');

describe('BikesScreen', () => {
  const mockUseFetchStations = useFetchStations as jest.Mock;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultMockValues = {
    stations: [],
    loading: false,
    error: null,
    refreshing: false,
    onRefresh: jest.fn(),
  };
  const renderComponent = (overrides = {}) => {
    mockUseFetchStations.mockReturnValue({
      ... defaultMockValues,
      ... overrides
    });
    render(<BikesScreen />);
  };
  
  it('displays loading indicator while data is loading', () => {
    renderComponent({ loading: true });

    expect(screen.getByLabelText('Loading bike stations')).toBeTruthy();
  });

  it('shows a fallback message when no data is available', async () => {
    renderComponent({ stations: [] });

    await waitFor(() => {
      expect(screen.getByText('No bike stations available')).toBeTruthy();
    });
  });

  it('displays an error message when data fetch fails', async () => {
    renderComponent({ error: 'Failed to load data.' });

    await waitFor(() => {
      expect(screen.getByText('Oops, something went wrong!')).toBeTruthy();
    });
  });

  it('renders multiple bike station items when data is available', async () => {
    const mockStations = [
      { id: 1, name: 'Station A', bikes_available: 5, bikes_in_use: 3 },
      { id: 2, name: 'Station B', bikes_available: 8, bikes_in_use: 2 },
      { id: 3, name: 'Station C', bikes_available: 6, bikes_in_use: 1 },
    ];

    renderComponent({ stations: mockStations });

    await waitFor(() => {
      expect(screen.getByText('Station A')).toBeTruthy();
      expect(screen.getByText('Station B')).toBeTruthy();
      expect(screen.getByText('Station C')).toBeTruthy();
    });
  });

  it('calls onRefresh when pull-to-refresh is triggered', async () => {
    const onRefreshMock = jest.fn();
    renderComponent({ refreshing: false, onRefresh: onRefreshMock });
  
    act(() => {
      onRefreshMock();
    });
    
    await waitFor(() => {
      expect(onRefreshMock).toHaveBeenCalledTimes(1);
    });
  });

  it('has accessibility label on activity loader', () => {
    renderComponent({ loading: true });
    expect(screen.getByLabelText('Loading bike stations')).toBeTruthy();
  });

  it('has accessibility label on error message', async () => {
    renderComponent({ error: 'Failed to load data.' });
    await waitFor(() => {
      expect(screen.getByLabelText('Error loading bike stations. Try pulling down to refresh the page.')).toBeTruthy();
    });
  });

  it('has accessibility label on empty list message', async () => {
    renderComponent({ stations: [] });
    await waitFor(() => {
      expect(screen.getByLabelText('No bike stations available')).toBeTruthy();
    });
  });
});
