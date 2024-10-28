import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 3 },
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 14,
      color: '#666',
      paddingVertical:5
    },
  });
  