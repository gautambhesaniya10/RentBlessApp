import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../common/CustomTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useForm} from 'react-hook-form';
import {FontStyle} from '../../../CommonStyle';
import CustomButton from '../../common/CustomButton';
import ActionButton from './ActionButton';

const ShopSetUpScreenOne = ({control, handleSubmit, errors, onSubmit}) => {
  const [ownerDetailShow, setOwnerDetailShow] = useState(true);
  const [shopInfoShow, setShopInfoShow] = useState(true);

  return (
    <View style={{marginHorizontal: 16}}>
      <TouchableOpacity
        onPress={() => setOwnerDetailShow(!ownerDetailShow)}
        style={styles.labelMain}>
        <Icon
          name={ownerDetailShow ? 'angle-up' : 'angle-down'}
          size={32}
          color="black"
        />
        <Text style={styles.labelStyle}>Owner Details</Text>
      </TouchableOpacity>

      {ownerDetailShow && (
        <View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="First Name"
              mode="outlined"
              control={control}
              name="first_name"
              rules={{required: 'First Name is required *'}}
              activeOutlineColor="#29977E"
            />
            {errors?.first_name && (
              <Text style={{color: 'red'}}>{errors?.first_name?.message}</Text>
            )}
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Last Name"
              mode="outlined"
              control={control}
              name="last_name"
              rules={{required: 'Last Name is required *'}}
              activeOutlineColor="#29977E"
            />
            {errors?.last_name && (
              <Text style={{color: 'red'}}>{errors?.last_name?.message}</Text>
            )}
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Email"
              mode="outlined"
              control={control}
              name="user_email"
              rules={{
                required: 'Email is required *',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              }}
              activeOutlineColor="#29977E"
            />
            {errors?.user_email && (
              <Text style={{color: 'red'}}>{errors?.user_email?.message}</Text>
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
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid mobile number',
                },
              }}
              activeOutlineColor="#29977E"
            />
            {errors?.user_contact && (
              <Text style={{color: 'red'}}>
                {errors?.user_contact?.message}
              </Text>
            )}
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setShopInfoShow(!shopInfoShow)}
        style={styles.labelMain}>
        <Icon
          name={shopInfoShow ? 'angle-up' : 'angle-down'}
          size={32}
          color="black"
        />
        <Text style={styles.labelStyle}>Shop Info</Text>
      </TouchableOpacity>

      {shopInfoShow && (
        <View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Shop Name"
              mode="outlined"
              control={control}
              name="shop_name"
              rules={{required: 'Shop Name is required *'}}
              activeOutlineColor="#29977E"
            />
            {errors?.shop_name && (
              <Text style={{color: 'red'}}>{errors?.shop_name?.message}</Text>
            )}
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Shop Email"
              mode="outlined"
              control={control}
              name="shop_email"
              rules={{
                required: 'Shop Email is required *',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              }}
              activeOutlineColor="#29977E"
            />
            {errors?.shop_email && (
              <Text style={{color: 'red'}}>{errors?.shop_email?.message}</Text>
            )}
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Personal Website Link"
              mode="outlined"
              control={control}
              name="personal_website"
              activeOutlineColor="#29977E"
            />
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Facebook Link"
              mode="outlined"
              control={control}
              name="facebook_link"
              activeOutlineColor="#29977E"
            />
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Instagram Link"
              mode="outlined"
              control={control}
              name="instagram_link"
              activeOutlineColor="#29977E"
            />
          </View>
        </View>
      )}

      <View style={{marginTop: 40, width: '100%'}}>
        <CustomButton
          name="Next"
          color="#FFFFFF"
          backgroundColor="#29977E"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default ShopSetUpScreenOne;

const styles = StyleSheet.create({
  labelStyle: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: FontStyle,
  },
  labelMain: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 16,
  },
});
