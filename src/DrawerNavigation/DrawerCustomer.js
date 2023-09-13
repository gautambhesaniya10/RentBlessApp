import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import CustomerTab from '../TabNavigation/CustomerTab';
import {FontStyle} from '../../CommonStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SideBarContent from '../common/Customer/SideBarContent';

const DrawerCustomer = () => {
  const navigation = useNavigation();

  const Drawer = createDrawerNavigator();

  const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <SideBarContent />
        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>
    );
  };
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Dashboard"
        component={CustomerTab}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerCustomer;

const styles = StyleSheet.create({});
