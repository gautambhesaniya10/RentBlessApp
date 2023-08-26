import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import VendorHeader from '../../../components/VendorHeader';
import {useDispatch, useSelector} from 'react-redux';
import {loadVendorShopDetailsStart} from '../../../redux/vendorShopDetailsSlice/ShopDetailSlice';
import VendorTab from '../../../TabNavigation/VendorTab';
import DrawerVendor from '../../../DrawerNavigation/DrawerVendor';

const MainDashboard = () => {
  const dispatch = useDispatch();
  const useProfileData = useSelector(state => state?.user.userProfile);
  const {vendorShopDetails} = useSelector(state => state?.shopDetail);

  useEffect(() => {
    if (useProfileData?.userCreatedShopId) {
      dispatch(loadVendorShopDetailsStart(useProfileData?.userCreatedShopId));
    }
  }, [useProfileData]);

  return (
    <View style={{flex: 1}}>
      <DrawerVendor vendorShopDetails={vendorShopDetails} />
    </View>
  );
};

export default MainDashboard;

const styles = StyleSheet.create({});
