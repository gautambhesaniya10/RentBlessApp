import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackGroundStyle, FontStyle} from '../../../../CommonStyle';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import OwnerDetail from './AllTabs/OwnerDetail';

const ShopDetail = () => {
  const {vendorShopDetails} = useSelector(state => state?.shopDetail);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.hederMain}>
        {/* <Icon name="chevron-left" size={20} color="black" /> */}
        <Text style={styles.headerText}>Shop Details</Text>
      </View>
      <View style={styles.shopImageMain}>
        <Image
          source={{uri: vendorShopDetails?.shop_logo}}
          style={styles.shopImg}
        />
        <Text style={styles.shopNameStyle}>GJ5 Fashion</Text>
      </View>
      <View style={styles.sliderMain}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
          }}>
          {[
            'Owner Details',
            'Shop Info',
            'Main Branch',
            'Sub Branch',
            'Shop Layout',
          ]?.map((item, index) => (
            <TouchableOpacity
              onPress={() => setActiveTab(index)}
              style={[
                styles.sliderTabsMain,
                {backgroundColor: activeTab === index ? '#151827' : 'white'},
              ]}
              key={index}>
              <Text
                style={[
                  styles.sliderText,
                  {color: activeTab === index ? 'white' : '#151827'},
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {activeTab === 0 && <OwnerDetail />}
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
  sliderMain: {
    marginLeft: 22,

    alignItems: 'center',
  },
  sliderTabsMain: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
  },
  sliderText: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily: FontStyle,
  },
});
