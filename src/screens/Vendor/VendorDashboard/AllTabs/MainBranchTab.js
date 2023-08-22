import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../../../common/CustomButton';
import CustomTextInput from '../../../../common/CustomTextInput';
import {FontStyle} from '../../../../../CommonStyle';
import {RadioButton} from 'react-native-paper';

const MainBranchTab = ({
  vendorShopDetails,
  useProfileData,
  mainBranchLoading,
  mainBranchInfoOnSubmit,
  mainBranchInfoSetValue,
  mainBranchInfoErrors,
  mainBranchInfoHandleSubmit,
  setMainBranch,
  mainBranchControl,
  ownerInfoGetValue,
}) => {
  const [sameAsOwner, setSameAsOwner] = useState('False');

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

  return (
    <View style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <View style={{marginBottom: 15}}>
          <CustomTextInput
            label="Address"
            mode="outlined"
            control={mainBranchControl}
            name="address"
            rules={{
              required: 'Address is required *',
            }}
            activeOutlineColor="#29977E"
          />
          {mainBranchInfoErrors?.address && (
            <Text style={{color: 'red'}}>
              {mainBranchInfoErrors?.address?.message}
            </Text>
          )}
        </View>
        <View style={{marginBottom: 15}}>
          <CustomTextInput
            label="City"
            mode="outlined"
            control={mainBranchControl}
            name="city"
            rules={{
              required: 'City is required *',
            }}
            activeOutlineColor="#29977E"
          />
          {mainBranchInfoErrors?.city && (
            <Text style={{color: 'red'}}>
              {mainBranchInfoErrors?.city?.message}
            </Text>
          )}
        </View>
        <View style={{marginBottom: 15}}>
          <CustomTextInput
            label="Pin Code"
            mode="outlined"
            control={mainBranchControl}
            name="pin_code"
            rules={{
              required: 'Pin Code is required *',
            }}
            activeOutlineColor="#29977E"
            keyboardType="number-pad"
          />
          {mainBranchInfoErrors?.pin_code && (
            <Text style={{color: 'red'}}>
              {mainBranchInfoErrors?.pin_code?.message}
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.labelMain}>
          <Text style={styles.labelStyle}>Manager : Save as owner</Text>
        </TouchableOpacity>

        <View>
          <RadioButton.Group
            onValueChange={newValue => {
              if (newValue === 'True') {
                setSameAsOwner('True');
              } else {
                setSameAsOwner('False');
              }
            }}
            value={sameAsOwner}>
            <View style={styles.radioParent}>
              <View style={styles.radioMain}>
                <RadioButton color="#29977E" value="True" />
                <Text
                  style={[
                    styles.radioText,
                    {
                      color:
                        sameAsOwner === 'True'
                          ? '#151827'
                          : 'rgba(21, 24, 39, 0.56)',
                    },
                  ]}>
                  Yes
                </Text>
              </View>
              <View style={styles.radioMain}>
                <RadioButton color="#29977E" value="False" />
                <Text
                  style={[
                    styles.radioText,
                    {
                      color:
                        sameAsOwner === 'False'
                          ? '#151827'
                          : 'rgba(21, 24, 39, 0.56)',
                    },
                  ]}>
                  No
                </Text>
              </View>
            </View>
          </RadioButton.Group>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="First Name"
              mode="outlined"
              disabled={sameAsOwner === 'True'}
              control={mainBranchControl}
              name="manager_first_name"
              rules={{required: 'Manager first name is required *'}}
              activeOutlineColor="#29977E"
            />
            {mainBranchInfoErrors?.manager_first_name && (
              <Text style={{color: 'red'}}>
                {mainBranchInfoErrors?.manager_first_name?.message}
              </Text>
            )}
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Last Name"
              mode="outlined"
              disabled={sameAsOwner === 'True'}
              control={mainBranchControl}
              name="manager_last_name"
              rules={{required: 'Manager last name is required *'}}
              activeOutlineColor="#29977E"
            />
            {mainBranchInfoErrors?.manager_last_name && (
              <Text style={{color: 'red'}}>
                {mainBranchInfoErrors?.manager_last_name?.message}
              </Text>
            )}
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Email"
              mode="outlined"
              disabled={sameAsOwner === 'True'}
              control={mainBranchControl}
              name="manager_user_email"
              rules={{
                required: 'Manager Email is required *',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              }}
              activeOutlineColor="#29977E"
            />
            {mainBranchInfoErrors?.manager_user_email && (
              <Text style={{color: 'red'}}>
                {mainBranchInfoErrors?.manager_user_email?.message}
              </Text>
            )}
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Phone Number"
              mode="outlined"
              disabled={sameAsOwner === 'True'}
              control={mainBranchControl}
              name="manager_user_contact"
              rules={{
                required: 'Phone Number is required *',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid number',
                },
              }}
              activeOutlineColor="#29977E"
              keyboardType="number-pad"
            />
            {mainBranchInfoErrors?.manager_user_contact && (
              <Text style={{color: 'red'}}>
                {mainBranchInfoErrors?.manager_user_contact?.message}
              </Text>
            )}
          </View>
        </View>

        <View style={{width: '100%'}}>
          <CustomButton
            name="Update"
            color="#FFFFFF"
            backgroundColor="#151827"
            borderColor="#29977E"
            onPress={mainBranchInfoHandleSubmit(mainBranchInfoOnSubmit)}
            loading={mainBranchLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default MainBranchTab;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
  },
  labelStyle: {
    color: '#151827',
    fontWeight: '700',
    fontSize: 18,
    fontFamily: FontStyle,
  },
  labelMain: {
    marginBottom: 16,
    paddingLeft: 1,
  },
  radioParent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  radioMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FontStyle,
  },
});
