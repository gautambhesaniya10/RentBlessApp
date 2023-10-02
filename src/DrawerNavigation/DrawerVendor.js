import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import VendorTab from '../TabNavigation/VendorTab';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {useToast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import VendorSideBarContent from '../components/VendorSideBarContent';
import {userLogout} from '../redux/LoginUserProfileSlice/userSlice';

const DrawerVendor = ({vendorShopDetails}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const Drawer = createDrawerNavigator();

  const LogOut = async () => {
    AsyncStorage.clear();
    dispatch(userLogout());
    toast.show({
      title: 'Logout Successfully ! ',
      placement: 'top',
      backgroundColor: 'green.600',
      variant: 'solid',
    });
    setTimeout(() => {
      navigation.navigate('Splash');
    }, 500);
  };

  const CustomDrawerContent = props => {
    return (
      <View style={{height: '100%', position: 'relative'}}>
        <DrawerContentScrollView {...props}>
          <VendorSideBarContent vendorShopDetails={vendorShopDetails} />
          {/* <DrawerItemList {...props} /> */}
        </DrawerContentScrollView>
        <TouchableOpacity onPress={() => LogOut()} style={styles.logoutMain}>
          <Icon name="power-off" size={20} color="#151827" />
          <Text style={styles.wishText}>logout</Text>
        </TouchableOpacity>
      </View>
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
  logoutMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    bottom: 0,
    position: 'absolute',
    borderTopWidth: 1,
    width: '100%',
  },
  wishText: {
    color: '#151827',
    fontWeight: '400',
    fontSize: 18,
  },
});
