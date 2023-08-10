import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShopSetUp from './ShopSetUp';
import VendorDashboard from './VendorDashboard';
import {useIsFocused} from '@react-navigation/native';

const VendorMain = () => {
  const [shop, setShop] = useState(false);
  const isFocus = useIsFocused();

  const getUserHaveAnyShop = async () => {
    const storedValue = await AsyncStorage.getItem('userHaveAnyShop');
    const parsedValue = JSON.parse(storedValue);
    setShop(parsedValue);
    // return parsedValue;
  };

  useEffect(() => {
    getUserHaveAnyShop();
  }, [isFocus]);

  return <>{shop ? <VendorDashboard /> : <ShopSetUp />}</>;
};

export default VendorMain;

const styles = StyleSheet.create({});
