import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackGroundStyle, FontStyle} from '../../../../CommonStyle';

const ShopDetail = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.hederMain}>
        <Icon name="chevron-left" size={20} color="black" />
        <Text style={styles.headerText}>Shop Details</Text>
      </View>
      <View style={styles.shopImageMain}>
        <Image
          source={require('../../../images/banner.jpg')}
          style={styles.shopImg}
        />
        <Text style={styles.shopNameStyle}>GJ5 Fashion</Text>
      </View>
    </ScrollView>
  );
};

export default ShopDetail;

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
