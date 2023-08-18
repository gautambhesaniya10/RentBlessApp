import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VendorHeader from '../../../components/VendorHeader';
import {useSelector} from 'react-redux';
import VendorTab from './VendorTab';

const MainDashboard = () => {
  const useProfileData = useSelector(state => state?.user.userProfile);
  console.log('++userrrrrrrrrrrrr', useProfileData);

  return (
    <View style={{flex: 1}}>
      <VendorHeader />
      <VendorTab />
    </View>
  );
};

export default MainDashboard;

const styles = StyleSheet.create({});
