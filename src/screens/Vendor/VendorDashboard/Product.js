import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackGroundStyle, FontStyle} from '../../../../CommonStyle';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../../common/CustomButton';
import {loadCategoriesStart} from '../../../redux/CategorySlice/CategoryListSlice';
import ProductListing from './AddEditProduct/ProductListing';
import {useNavigation} from '@react-navigation/native';

const Product = () => {
  const navigation = useNavigation();
  const {userProfile} = useSelector(state => state?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesStart());
  }, [dispatch, userProfile]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={{width: '90%', marginHorizontal: 22, marginTop: 20}}>
        <CustomButton
          name="Add Product"
          color="#29977E"
          backgroundColor="#FAFCFC"
          borderColor="#29977E"
          onPress={() => navigation.navigate('VendorAddEditProduct')}
          icon={true}
          iconName="plus"
        />
      </View>
      <ProductListing />
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
  },
});
