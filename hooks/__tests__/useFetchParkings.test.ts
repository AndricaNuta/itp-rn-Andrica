import { renderHook, waitFor } from '@testing-library/react-native';
import { useFetchParkings } from '../useFetchParkings';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetchParkings', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockData = {
    results: [
      { id: 1, name: 'Parking 1', totalcapacity: 100, availablecapacity: 40, occupation: 40 },
      { id: 2, name: 'Parking 2', totalcapacity: 150, availablecapacity: 80, occupation: 20 },
      { id: 3, name: 'Parking 3', totalcapacity: 120, availablecapacity: 10, occupation: 60 },
    ],
  };

  it('fetches and sets parking data successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useFetchParkings());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.parkings).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch errors', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetchParkings());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Failed to load data.');
    expect(result.current.parkings).toHaveLength(0);
  });

  it('filters parkings with occupation <= 50', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useFetchParkings());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.parkings).toHaveLength(2);
  });
  it('sorts parkings from highest to lowest capacity', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useFetchParkings());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.parkings[0].occupation).toBe(20); 
  });
});
