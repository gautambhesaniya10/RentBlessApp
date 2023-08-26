import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../../../common/CustomTextInput';
import CustomButton from '../../../../common/CustomButton';
import {getShopOwnerDetail} from '../../../../graphql/queries/shopQueries';

const OwnerDetail = ({
  vendorShopDetails,
  useProfileData,
  setShopOwnerId,
  control,
  ownerInfoSetValue,
  ownerInfoErrors,
  ownerInfoHandleSubmit,
  ownerInfoOnSubmit,
  ownerLoading,
}) => {
  useEffect(() => {
    if (useProfileData?.userCreatedShopId) {
      getShopOwnerDetail({id: vendorShopDetails?.owner_id}).then(ownerRes => {
        setShopOwnerId(ownerRes?.data?.shopOwner?.id);
        ownerInfoSetValue(
          'first_name',
          ownerRes?.data?.shopOwner?.owner_firstName,
        );
        ownerInfoSetValue(
          'last_name',
          ownerRes?.data?.shopOwner?.owner_lastName,
        );
        ownerInfoSetValue('user_email', ownerRes?.data?.shopOwner?.owner_email);
        ownerInfoSetValue(
          'user_contact',
          ownerRes?.data?.shopOwner?.owner_contact,
        );
      });
    }
  }, [useProfileData, ownerInfoSetValue, vendorShopDetails]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <View style={{marginBottom: 15}}>
          <CustomTextInput
            label="First Name"
            mode="outlined"
            control={control}
            name="first_name"
            rules={{
              required: 'First Name is required *',
            }}
            activeOutlineColor="#29977E"
          />
          {ownerInfoErrors?.first_name && (
            <Text style={{color: 'red'}}>
              {ownerInfoErrors?.first_name?.message}
            </Text>
          )}
        </View>
        <View style={{marginBottom: 15}}>
          <CustomTextInput
            label="Last Name"
            mode="outlined"
            control={control}
            name="last_name"
            rules={{
              required: 'Last Name is required *',
            }}
            activeOutlineColor="#29977E"
          />
          {ownerInfoErrors?.last_name && (
            <Text style={{color: 'red'}}>
              {ownerInfoErrors?.last_name?.message}
            </Text>
          )}
        </View>
        <View style={{marginBottom: 15}}>
          <CustomTextInput
            label="Email Address"
            mode="outlined"
            control={control}
            name="user_email"
            rules={{
              required: 'Email Address is required *',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            }}
            activeOutlineColor="#29977E"
          />
          {ownerInfoErrors?.user_email && (
            <Text style={{color: 'red'}}>
              {ownerInfoErrors?.user_email?.message}
            </Text>
          )}
        </View>
        <View style={{marginBottom: 15}}>
          <CustomTextInput
            label="Phone Number"
            mode="outlined"
            control={control}
            name="user_contact"
            rules={{
              required: 'Phone Number is required *',
              minLength: {
                value: 10,
                message: 'Contact Number must be 10 numbers',
              },
              maxLength: {
                value: 10,
                message: 'Contact Number must be 10 numbers',
              },
            }}
            activeOutlineColor="#29977E"
            keyboardType="number-pad"
          />
          {ownerInfoErrors?.user_contact && (
            <Text style={{color: 'red'}}>
              {ownerInfoErrors?.user_contact?.message}
            </Text>
          )}
        </View>

        <View style={{width: '100%'}}>
          <CustomButton
            name="Update"
            color="#FFFFFF"
            backgroundColor="#151827"
            borderColor="#29977E"
            onPress={ownerInfoHandleSubmit(ownerInfoOnSubmit)}
            loading={ownerLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default OwnerDetail;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
  },
});