import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackGroundStyle, FontStyle} from '../../../../CommonStyle';
import VendorLogoAndName from '../../../components/VendorLogoAndName';
import {useSelector} from 'react-redux';

const Product = () => {
  const {vendorShopDetails} = useSelector(state => state?.shopDetail);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.hederMain}>
        <Icon name="chevron-left" size={20} color="black" />
        <Text style={styles.headerText}>Add Product</Text>
      </View>
      <VendorLogoAndName vendorShopDetails={vendorShopDetails} />
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  hederMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
    marginLeft: 26,
    gap: 15,
  },
  headerText: {
    color: '#151827',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: FontStyle,
  },
});
