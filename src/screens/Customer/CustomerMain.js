import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import DrawerCustomer from '../../DrawerNavigation/DrawerCustomer';
import {loadCategoriesStart} from '../../redux/CategorySlice/CategoryListSlice';
import {useDispatch, useSelector} from 'react-redux';
import {loadAreaListsStart} from '../../redux/AreaSlice/AreaListSlice';
import {loadAllShopsListsStart} from '../../redux/ShopSlice/ShopSlice';
import {checkInternetConnectivity} from '../../config/CheckInternetConnectivity';
import NoInternetScreen from '../NoInternetScreen';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadCityListsStart} from '../../redux/CityListSlice/CityListSlice';
import {changeAppliedCityFilters} from '../../redux/CityFilterSlice/CityFilterSlice';

const CustomerMain = () => {
  const dispatch = useDispatch();

  const route = useRoute();
  const loginToken = route?.params?.data?.key;
  const {appliedCityFilter} = useSelector(state => state.cityFiltersReducer);

  const AreaListApiCall = async () => {
    const storedLocation = await AsyncStorage.getItem('selected_city');
    if (storedLocation) {
      if (storedLocation !== appliedCityFilter?.city?.selectedValue) {
        dispatch(
          changeAppliedCityFilters({
            key: 'city',
            value: {
              selectedValue: storedLocation,
            },
          }),
        );
      }
      dispatch(loadAreaListsStart(storedLocation));
    } else {
      dispatch(loadAreaListsStart());
    }
  };

  useEffect(() => {
    dispatch(
      loadAllShopsListsStart({city: appliedCityFilter?.city?.selectedValue}),
    );
  }, [appliedCityFilter?.city?.selectedValue, dispatch]);

  useEffect(() => {
    AreaListApiCall();
  }, [appliedCityFilter?.city?.selectedValue, dispatch]);

  useEffect(() => {
    dispatch(loadCategoriesStart());
    dispatch(loadCityListsStart());
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
