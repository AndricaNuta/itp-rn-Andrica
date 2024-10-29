import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15, 
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2, 
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
  },
  bikeInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
});
