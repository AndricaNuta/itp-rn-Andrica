import { act, renderHook, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { useFetchStations, urls } from '../useFetchBikeStations';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetchStations', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  }); 
  
  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('refreshes data when onRefresh is called', async () => {
    const mockResponses = urls.map((_, index) => ({
      data: { results: [{ id: index + 1, name: `Station ${index + 1}`, bikes_available: 70 + index, bikes_in_use: 13 + index }] },
    }));
  
    mockResponses.forEach((response) => {
      mockedAxios.get.mockResolvedValueOnce(response);
    });
  
    const { result } = renderHook(() => useFetchStations());
  
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.stations).toHaveLength(urls.length); 
  
    mockResponses.forEach((response) => {
      mockedAxios.get.mockResolvedValueOnce(response);
    });
  
    act(() => {
      result.current.onRefresh();
    });
  
    await waitFor(() => expect(result.current.refreshing).toBe(false));
    expect(result.current.stations).toHaveLength(urls.length); 
  
    mockResponses.forEach((response, index) => {
      expect(result.current.stations[index].name).toBe(`Station ${index + 1}`);
    });
  });
  
  
  it('replaces old data with new data on refresh', async () => {
    const initialData = urls.map((_, index) => ({
      data: { results: [{ id: index + 1, name: `Old Station ${index + 1}`, bikes_available: 5 + index, bikes_in_use: 2 + index }] },
    }));
  
    initialData.forEach((response) => mockedAxios.get.mockResolvedValueOnce(response));
  
    const { result } = renderHook(() => useFetchStations());
  
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.stations).toHaveLength(urls.length);
    expect(result.current.stations[0].name).toBe('Old Station 1');
  
    const newData = urls.map((_, index) => ({
      data: { results: [{ id: index + 1, name: `New Station ${index + 1}`, bikes_available: 10 + index, bikes_in_use: 3 + index }] },
    }));
  
    newData.forEach((response) => mockedAxios.get.mockResolvedValueOnce(response));
  
    act(() => {
      result.current.onRefresh();
    });
  
    await waitFor(() => expect(result.current.refreshing).toBe(false));
    expect(result.current.stations).toHaveLength(urls.length); 
    expect(result.current.stations[0].name).toBe('New Station 1'); 
  });
  
  
  it('handles partial data response when some URLs fail', async () => {
    const successfulResponse = { data: { results: [{ id: 1, name: 'Station 1', bikes_available: 5, bikes_in_use: 2 }] } };
  
    urls.forEach((_, index) => {
      if (index % 2 === 0) {
        mockedAxios.get.mockResolvedValueOnce(successfulResponse); 
      } else {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error')); 
      }
    });
  
    const { result } = renderHook(() => useFetchStations());
  
    await waitFor(() => expect(result.current.loading).toBe(false));
  
    const successfulCount = urls.filter((_, index) => index % 2 === 0).length;
  
    expect(result.current.stations).toHaveLength(successfulCount); 
    expect(result.current.error).toBeNull(); 
  });

  it('handles error data response when all URLs fail', async () => {
    urls.forEach(() => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
    });
  
    const { result } = renderHook(() => useFetchStations());
  
    await waitFor(() => expect(result.current.loading).toBe(false)); 
  
    expect(result.current.stations).toHaveLength(0); 
    expect(result.current.error).toBe("Failed to load data"); 
  });
  

  it('fetches data from all URLs at regular intervals', async () => {
    jest.useFakeTimers(); 
  
    const mockData = { data: { results: [{ id: 1, name: 'Station', bikes_available: 10, bikes_in_use: 2 }] }};
    mockedAxios.get.mockResolvedValue(mockData);
  
    const { result } = renderHook(() => useFetchStations());
    await waitFor(() => expect(result.current.loading).toBe(false)); 
  
    jest.advanceTimersByTime(5000); 
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(mockedAxios.get).toHaveBeenCalledTimes(urls.length * 2); 
  
    jest.advanceTimersByTime(5000);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(mockedAxios.get).toHaveBeenCalledTimes(urls.length * 3); 
  
    jest.useRealTimers(); 
  });
  
  
});
