import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
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
