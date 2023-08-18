import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import ShopDetail from './ShopDetail';
import Product from './Product';
import Icon from 'react-native-vector-icons/FontAwesome';

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
