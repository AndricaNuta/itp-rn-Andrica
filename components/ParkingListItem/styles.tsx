import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});
