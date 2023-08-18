import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FontStyle} from '../../CommonStyle';

const VendorLogoAndName = ({vendorShopDetails}) => {
  return (
    <View style={styles.shopImageMain}>
      <Image
        source={{uri: vendorShopDetails?.shop_logo}}
        style={styles.shopImg}
      />
      <Text style={styles.shopNameStyle}>{vendorShopDetails?.shop_name}</Text>
    </View>
  );
};

export default VendorLogoAndName;

const styles = StyleSheet.create({
  shopImageMain: {
    alignSelf: 'center',
    gap: 15,
    marginBottom: 20,
  },
  shopImg: {
    height: 140,
    width: 140,
    borderRadius: 70,
    objectFit: 'fill',
  },
  shopNameStyle: {
    color: '#151827',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: FontStyle,
    textAlign: 'center',
  },
});
