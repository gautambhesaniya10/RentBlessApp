import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import DrawerCustomer from '../../DrawerNavigation/DrawerCustomer';
import {loadCategoriesStart} from '../../redux/CategorySlice/CategoryListSlice';
import {useDispatch, useSelector} from 'react-redux';
import {loadAreaListsStart} from '../../redux/AreaSlice/AreaListSlice';
import {loadAllShopsListsStart} from '../../redux/ShopSlice/ShopSlice';
import CustomerTab from '../../TabNavigation/CustomerTab';

const CustomerMain = () => {
  const dispatch = useDispatch();
  // const {areaLists} = useSelector(state => state.areaLists);

  useEffect(() => {
    dispatch(loadCategoriesStart());
    dispatch(loadAreaListsStart());
    dispatch(loadAllShopsListsStart());
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <DrawerCustomer />
      {/* <CustomerTab /> */}
    </View>
  );
};

export default CustomerMain;

const styles = StyleSheet.create({});
