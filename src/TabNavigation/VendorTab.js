import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Vendor/VendorDashboard/Home';
import ShopDetail from '../screens/Vendor/VendorDashboard/ShopDetail';
import Product from '../screens/Vendor/VendorDashboard/Product';

const VendorTab = () => {
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
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={22} />
          ),
        }}
      />

      <Tab.Screen
        name="ShopDetail"
        component={ShopDetail}
        options={{
          headerShown: false,
          tabBarLabel: 'Shop',
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-cart" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={Product}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="list-alt" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default VendorTab;

const styles = StyleSheet.create({});
