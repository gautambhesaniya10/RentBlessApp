import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import DrawerCustomer from '../../DrawerNavigation/DrawerCustomer';
import {loadCategoriesStart} from '../../redux/CategorySlice/CategoryListSlice';
import {useDispatch} from 'react-redux';
import {loadAreaListsStart} from '../../redux/AreaSlice/AreaListSlice';
import {loadAllShopsListsStart} from '../../redux/ShopSlice/ShopSlice';
import {checkInternetConnectivity} from '../../config/CheckInternetConnectivity';
import NoInternetScreen from '../NoInternetScreen';

const CustomerMain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesStart());
    dispatch(loadAreaListsStart());
    dispatch(loadAllShopsListsStart());
  }, [dispatch]);

  const checkInternetStatus = checkInternetConnectivity();

  return checkInternetStatus ? (
    <View style={{flex: 1}}>
      <DrawerCustomer />
      {/* <CustomerTab /> */}
    </View>
  ) : (
    <NoInternetScreen />
  );
};

export default CustomerMain;

const styles = StyleSheet.create({});
