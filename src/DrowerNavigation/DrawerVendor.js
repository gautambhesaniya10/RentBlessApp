import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import VendorTab from '../TabNavigation/VendorTab';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {FontStyle} from '../../CommonStyle';
import {useNavigation} from '@react-navigation/native';

const DrawerVendor = ({vendorShopDetails}) => {
  const navigation = useNavigation();

  const Drawer = createDrawerNavigator();

  const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.drawerHeader}>
          <Image
            source={{uri: vendorShopDetails?.shop_logo}}
            style={styles.logo}
          />
          <Text style={styles.heading}>{vendorShopDetails?.shop_name}</Text>
        </TouchableOpacity>
        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Dashboard"
        component={VendorTab}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerVendor;

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center',
    padding: 16,
    marginTop: 50,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  heading: {
    color: '#151827',
    fontWeight: '700',
    fontSize: 22,
    fontFamily: FontStyle,
    textAlign: 'center',
    paddingTop: 25,
  },
});
