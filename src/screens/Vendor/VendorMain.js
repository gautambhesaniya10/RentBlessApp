import {StyleSheet} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShopSetUp from './shopSetup/ShopSetUp';
import MainDashboard from './VendorDashboard/MainDashboard';
import {checkInternetConnectivity} from '../../config/CheckInternetConnectivity';
import NoInternetScreen from '../NoInternetScreen';

const VendorMain = () => {
  const storedValue = AsyncStorage.getItem('userHaveAnyShop');
  const checkInternetStatus = checkInternetConnectivity();

  return checkInternetStatus ? (
    storedValue ? (
      <MainDashboard />
    ) : (
      <ShopSetUp />
    )
  ) : (
    <NoInternetScreen />
  );
};

export default VendorMain;

const styles = StyleSheet.create({});
