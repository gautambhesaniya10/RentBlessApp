import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BackGroundStyle, FontStyle} from '../../../../CommonStyle';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import OwnerDetail from './AllTabs/OwnerDetail';
import {useForm} from 'react-hook-form';
import {shopUpdate} from '../../../graphql/mutations/shops';
import {useToast} from 'native-base';
import ShopInfo from './AllTabs/ShopInfo';
import VendorLogoAndName from '../../../components/VendorLogoAndName';
import MainBranchTab from './AllTabs/MainBranchTab';
import SubBranchTab from './AllTabs/SubBranchTab';

const ShopDetail = () => {
  const toast = useToast();
  const {
    handleSubmit: ownerInfoHandleSubmit,
    formState: {errors: ownerInfoErrors},
    setValue: ownerInfoSetValue,
    getValues: ownerInfoGetValue,
    reset: ownerInfoReset,
    control,
  } = useForm();

  const {
    handleSubmit: shopInfoHandleSubmit,
    formState: {errors: shopInfoErrors},
    setValue: shopInfoSetValue,
    reset: shopInfoReset,
    control: shopInfoControl,
  } = useForm();

  const {
    handleSubmit: mainBranchInfoHandleSubmit,
    formState: {errors: mainBranchInfoErrors},
    setValue: mainBranchInfoSetValue,
    getValues: mainBranchInfoGetValue,
    reset: mainBranchInfoReset,
    control: mainBranchControl,
  } = useForm();

  const {vendorShopDetails} = useSelector(state => state?.shopDetail);
  const useProfileData = useSelector(state => state?.user.userProfile);
  const [activeTab, setActiveTab] = useState(0);
  const [individual, setIndividual] = useState(false);
  const [shopOwnerId, setShopOwnerId] = useState('');
  const [ownerLoading, setOwnerLoading] = useState(false);
  const [shopLoading, setShopLoading] = useState(false);
  const [mainBranchLoading, setMainBranchLoading] = useState(false);
  const [mainBranch, setMainBranch] = useState();
  const [sameAsOwner, setSameAsOwner] = useState('False');

  const [hours, setHours] = useState([
    {key: 'Sunday', value: ['09:00 AM - 08:00 PM']},
    {key: 'Monday', value: ['09:00 AM - 08:00 PM']},
    {key: 'Tuesday', value: ['09:00 AM - 08:00 PM']},
    {key: 'Wednesday', value: ['09:00 AM - 08:00 PM']},
    {key: 'Thursday', value: ['09:00 AM - 08:00 PM']},
    {key: 'Friday', value: ['09:00 AM - 08:00 PM']},
    {key: 'Saturday', value: ['09:00 AM - 08:00 PM']},
  ]);

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

  const shopInfoOnSubmit = data => {
    setShopLoading(true);
    shopUpdate({
      shopInfo: {
        id: useProfileData?.userCreatedShopId,
        form_steps: '3',
        shop_social_link: {
          facebook: individual ? '' : data?.facebook_link,
          instagram: individual ? '' : data?.instagram_link,
          website: individual ? '' : data?.personal_website,
        },
        shop_name: data?.shop_name,
        shop_email: data?.shop_email,
        shop_type: individual ? 'individual' : 'shop',
        shop_time: hours?.map(day => {
          return {
            week: day['key'],
            open_time: individual
              ? '-'
              : day['value'][0] === 'Closed' ||
                day['value'][0] === 'Open 24 hours'
              ? '-'
              : day['value'][0].split(' - ')[0],
            close_time: individual
              ? '-'
              : day['value'][0] === 'Closed' ||
                day['value'][0] === 'Open 24 hours'
              ? '-'
              : day['value'][0].split(' - ')[1],
            is_close: individual
              ? false
              : day['value'][0] === 'Closed'
              ? true
              : false,
            is_24Hours_open: individual
              ? true
              : day['value'][0] === 'Open 24 hours'
              ? true
              : false,
          };
        }),
      },
    }).then(
      res => {
        toast.show({
          title: res.data.updateShop.message,
          placement: 'top',
          backgroundColor: 'green.600',
          variant: 'solid',
        });
        setShopLoading(false);
      },
      error => {
        setShopLoading(false);
        toast.show({
          title: error.message,
          placement: 'top',
          backgroundColor: 'red.600',
          variant: 'solid',
        });
      },
    );
  };

  const mainBranchInfoOnSubmit = data => {
    console.log('data', data);

    setMainBranchLoading(true);
    shopUpdate({
      branchInfo: [
        {
          id: mainBranch.id,
          branch_address: data.address,
          branch_pinCode: data.pin_code,
          branch_city: data.city,
          manager_name: data.manager_first_name + ' ' + data.manager_last_name,
          manager_contact: data.manager_user_contact,
          manager_email: data.manager_user_email,
          branch_type: mainBranch.branch_type,
        },
      ],
    }).then(
      res => {
        toast.show({
          title: res?.data.updateShop.message,
          placement: 'top',
          backgroundColor: 'green.600',
          variant: 'solid',
        });
        setMainBranchLoading(false);
      },
      error => {
        setMainBranchLoading(false);
        toast.show({
          title: error.message,
          placement: 'top',
          backgroundColor: 'red.600',
          variant: 'solid',
        });
      },
    );
  };

  useEffect(() => {
    if (sameAsOwner === 'True') {
      mainBranchInfoSetValue(
        'manager_first_name',
        ownerInfoGetValue('first_name'),
      );
      mainBranchInfoSetValue(
        'manager_last_name',
        ownerInfoGetValue('last_name'),
      );
      mainBranchInfoSetValue(
        'manager_user_email',
        ownerInfoGetValue('user_email'),
      );
      mainBranchInfoSetValue(
        'manager_user_contact',
        ownerInfoGetValue('user_contact'),
      );
    } else {
      const mainBranches = vendorShopDetails?.branch_info?.find(
        itm => itm.branch_type === 'main',
      );
      setMainBranch(mainBranches);

      mainBranchInfoSetValue('address', mainBranches?.branch_address);
      mainBranchInfoSetValue('pin_code', mainBranches?.branch_pinCode);

      mainBranchInfoSetValue(
        'manager_first_name',
        mainBranches?.manager_name.split(' ')[0],
      );
      mainBranchInfoSetValue(
        'manager_last_name',
        mainBranches?.manager_name.split(' ')[1],
      );
      mainBranchInfoSetValue(
        'manager_user_contact',
        mainBranches?.manager_contact,
      );
      mainBranchInfoSetValue('city', mainBranches?.branch_city);
      mainBranchInfoSetValue('manager_user_email', mainBranches?.manager_email);
    }
  }, [sameAsOwner, mainBranchInfoSetValue, ownerInfoGetValue]);

  useEffect(() => {
    if (useProfileData?.userCreatedShopId) {
      vendorShopDetails?.shop_time?.map(time => {
        hours?.map(itm => {
          if (time.is_24Hours_open) {
            if (itm.key === time.week) {
              itm.value = ['Open 24 hours'];
            }
          } else if (time.is_close) {
            if (itm.key === time.week) {
              itm.value = ['Closed'];
            }
          } else {
            if (itm.key === time.week) {
              itm.value = [`${time.open_time} - ${time.close_time}`];
            }
          }

          return itm;
        });
        setHours(hours);
      });
      if (vendorShopDetails?.shop_type === 'shop') {
        setIndividual(false);
      } else {
        setIndividual(true);
      }
    }
  }, [hours, vendorShopDetails, useProfileData]);

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
                {backgroundColor: activeTab === index ? '#151827' : '#FAFCFC'},
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
      {activeTab === 1 && (
        <ShopInfo
          shopInfoHandleSubmit={shopInfoHandleSubmit}
          shopInfoErrors={shopInfoErrors}
          shopInfoSetValue={shopInfoSetValue}
          shopInfoOnSubmit={shopInfoOnSubmit}
          shopLoading={shopLoading}
          shopInfoControl={shopInfoControl}
          useProfileData={useProfileData}
          vendorShopDetails={vendorShopDetails}
          hours={hours}
          setHours={setHours}
        />
      )}
      {activeTab === 2 && (
        <MainBranchTab
          mainBranchLoading={mainBranchLoading}
          mainBranchInfoOnSubmit={mainBranchInfoOnSubmit}
          mainBranchInfoErrors={mainBranchInfoErrors}
          mainBranchInfoHandleSubmit={mainBranchInfoHandleSubmit}
          mainBranchControl={mainBranchControl}
          setSameAsOwner={setSameAsOwner}
          sameAsOwner={sameAsOwner}
        />
      )}
      {activeTab === 3 && (
        <SubBranchTab
          useProfileData={useProfileData}
          vendorShopDetails={vendorShopDetails}
          mainBranchInfoGetValue={mainBranchInfoGetValue}
          ownerInfoGetValue={ownerInfoGetValue}
        />
      )}
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
