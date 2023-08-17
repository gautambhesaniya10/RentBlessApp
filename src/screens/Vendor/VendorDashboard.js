import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import VendorHeader from '../../components/VendorHeader';

const VendorDashboard = () => {
  const useProfileData = useSelector(state => state?.user.userProfile);
  console.log('++userrrrrrrrrrrrr', useProfileData);

  return (
    <View style={{flex: 1}}>
      <VendorHeader />
      <Text>VendorDashboard</Text>
    </View>
  );
};

export default VendorDashboard;

const styles = StyleSheet.create({});
