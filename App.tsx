import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ParkingsScreen } from './screens/ParkingsScreen';
import { BikesScreen } from './screens/BikesScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { BottomTabParamList } from './types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const getTabIcon = (routeName: string, focused: boolean) => {
  let iconName = 'parking';
  if (routeName === 'BikesScreen') iconName = 'bicycle';
  else if (routeName === 'ParkingsScreen') iconName = 'car';
  return <Icon name={iconName} size={focused ? 35 : 25} color={focused ? '#7766e6' : '#000000'} />;
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
          tabBarLabel : () => null,
          tabBarAccessibilityLabel: route.name === 'BikesScreen' ? 'Bikes Stations in Ghent' : 'Car Parkings in Ghent',
        })}
      >
        <Tab.Screen name="BikesScreen"  component={BikesScreen} />
        <Tab.Screen name="ParkingsScreen" component={ParkingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
