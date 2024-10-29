import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { BikesScreen } from '../screens/BikesScreen';
import { ParkingsScreen } from '../screens/ParkingsScreen';
import { Text, StyleSheet } from 'react-native';
import { BottomTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const getTabIcon = (routeName: string, focused: boolean) => {
  let iconName = 'parking';
  if (routeName === 'BikesScreen') iconName = 'bicycle';
  else if (routeName === 'ParkingsScreen') iconName = 'car';
  return <Icon name={iconName} size={focused ? 35 : 25} color={focused ? '#7766e6' : '#000000'} />;
};

const getTabLabel = (routeName: string, focused: boolean) => {
  let labelName = 'parking';
  if (routeName === 'BikesScreen') labelName = 'Bikes Stations';
  else if (routeName === 'ParkingsScreen') labelName = 'Car Parkings';
  return <Text style={{ color: focused ? '#7766e6' : '#000000', fontSize: 10 }}> {labelName} </Text>;
};

export const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
      tabBarLabel: ({ focused }) => getTabLabel(route.name, focused),
      tabBarAccessibilityLabel: route.name === 'BikesScreen' ? 'Bikes Stations in Ghent' : 'Car Parkings in Ghent',
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarItemStyle: styles.tabBarItem,
      tabBarStyle: styles.tabBar,
    })}
  >
    <Tab.Screen name="BikesScreen" component={BikesScreen} />
    <Tab.Screen name="ParkingsScreen" component={ParkingsScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 15,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  tabBarItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
