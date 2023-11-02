import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import DrawerCustomer from '../../DrawerNavigation/DrawerCustomer';
import {loadCategoriesStart} from '../../redux/CategorySlice/CategoryListSlice';
import {useDispatch} from 'react-redux';
import {loadAreaListsStart} from '../../redux/AreaSlice/AreaListSlice';
import {loadAllShopsListsStart} from '../../redux/ShopSlice/ShopSlice';
import {checkInternetConnectivity} from '../../config/CheckInternetConnectivity';
import NoInternetScreen from '../NoInternetScreen';
import {useRoute} from '@react-navigation/native';

const CustomerMain = () => {
  const dispatch = useDispatch();

  const route = useRoute();
  const loginToken = route?.params?.data?.key;

  useEffect(() => {
    dispatch(loadCategoriesStart());
    dispatch(loadAreaListsStart());
    dispatch(loadAllShopsListsStart());
  }, [dispatch]);

  const checkInternetStatus = checkInternetConnectivity();

  return checkInternetStatus ? (
    <View style={{flex: 1}}>
      <DrawerCustomer loginToken={loginToken ? true : false} />
      {/* <CustomerTab /> */}
    </View>
  ) : (
    <NoInternetScreen />
  );
};

export default CustomerMain;

const styles = StyleSheet.create({});
