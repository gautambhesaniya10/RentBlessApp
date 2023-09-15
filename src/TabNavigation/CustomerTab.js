import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePage from '../screens/Customer/HomePage';
import LikeScreen from '../screens/Customer/pages/LikeScreen';
import {useSelector} from 'react-redux';
import CustomCustomerTabBar from './CustomCustomerTabBar';

const CustomerTab = () => {
  const Tab = createBottomTabNavigator();
  const {userProfile} = useSelector(state => state?.user);

  return (
    <Tab.Navigator
      tabBar={props => <CustomCustomerTabBar {...props} />}
      initialRouteName="CustomerHomePage">
      <Tab.Screen
        name="CustomerHomePage"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIconName: 'home',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="LikeScreen"
        component={LikeScreen}
        options={{
          headerShown: false,
          tabBarIconName: 'heart',
          tabBarLabel: 'Like',
          tabBarBadgeLikeCount:
            userProfile?.product_like_list?.length > 0
              ? userProfile?.product_like_list?.length.toString()
              : null,
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerTab;

const styles = StyleSheet.create({});
