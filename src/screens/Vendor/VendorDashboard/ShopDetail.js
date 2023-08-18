import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BackGroundStyle, FontStyle} from '../../../../CommonStyle';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import OwnerDetail from './AllTabs/OwnerDetail';
import {useForm} from 'react-hook-form';
import {shopUpdate} from '../../../graphql/mutations/shops';
import {useToast} from 'native-base';
import ShopInfo from './AllTabs/ShopInfo';
import VendorLogoAndName from '../../../components/VendorLogoAndName';

const ShopDetail = () => {
  const toast = useToast();
  const {vendorShopDetails} = useSelector(state => state?.shopDetail);
  const useProfileData = useSelector(state => state?.user.userProfile);
  const [activeTab, setActiveTab] = useState(0);

  const [shopOwnerId, setShopOwnerId] = useState('');
  const [ownerLoading, setOwnerLoading] = useState(false);

  const {
    handleSubmit: ownerInfoHandleSubmit,
    formState: {errors: ownerInfoErrors},
    setValue: ownerInfoSetValue,
    getValues: ownerInfoGetValue,
    reset: ownerInfoReset,
    control,
  } = useForm();

  const ownerInfoOnSubmit = data => {
    setOwnerLoading(true);
    shopUpdate({
      ownerInfo: {
        id: shopOwnerId,
        owner_firstName: data.first_name,
        owner_lastName: data.last_name,
        owner_email: data.user_email,
        owner_contact: data.user_contact,
      },
    }).then(
      res => {
        toast.show({
          title: res.data.updateShop.message,
          placement: 'top',
          backgroundColor: 'green.600',
          variant: 'solid',
        });
        setOwnerLoading(false);
      },
      error => {
        setOwnerLoading(false);
        toast.show({
          title: error.message,
          placement: 'top',
          backgroundColor: 'red.600',
          variant: 'solid',
        });
      },
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.hederMain}>
        {/* <Icon name="chevron-left" size={20} color="black" /> */}
        <Text style={styles.headerText}>Shop Details</Text>
      </View>

      <VendorLogoAndName vendorShopDetails={vendorShopDetails} />

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
      {activeTab === 0 && (
        <OwnerDetail
          vendorShopDetails={vendorShopDetails}
          useProfileData={useProfileData}
          control={control}
          ownerInfoSetValue={ownerInfoSetValue}
          ownerInfoErrors={ownerInfoErrors}
          ownerInfoHandleSubmit={ownerInfoHandleSubmit}
          ownerInfoOnSubmit={ownerInfoOnSubmit}
          setShopOwnerId={setShopOwnerId}
          ownerLoading={ownerLoading}
        />
      )}
      {activeTab === 1 && <ShopInfo />}
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
