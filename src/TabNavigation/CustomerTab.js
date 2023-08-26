import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePage from '../screens/Customer/HomePage';
import LikeScreen from '../screens/Customer/pages/LikeScreen';

const CustomerTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'green',
        labelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        name="CustomerHomePage"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="LikeScreen"
        component={LikeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Like',
          tabBarIcon: ({color, size}) => (
            <Icon name="heart" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerTab;

const styles = StyleSheet.create({});
