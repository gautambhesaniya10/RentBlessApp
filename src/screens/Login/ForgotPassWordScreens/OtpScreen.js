import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../../common/CustomButton';
import CustomTextInput from '../../../common/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';

const OtpScreen = ({setActiveScreen}) => {
  const navigation = useNavigation();
  const {
    control: otpControl,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();

  const onSubmit = data => {
    console.log('pppppppp', data);
    if (data) {
      setActiveScreen(3);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardContainer}>
        <Text style={styles.appName}>Rentbless</Text>
        <Text style={styles.forgotText}>Enter Otp</Text>
        <View style={{width: '100%', marginBottom: 16, position: 'relative'}}>
          <CustomTextInput
            control={otpControl}
            label={'OTP'}
            mode="outlined"
            name="otp"
            rules={{
              required: 'OTP is required *',
            }}
            activeOutlineColor="#151827"
            outlineStyle={{borderRadius: 12}}
            keyboardType="numeric"
          />
          {errors?.otp && (
            <Text style={{color: 'red', marginTop: 4}}>
              {errors.otp.message}
            </Text>
          )}
        </View>

        <View style={{width: '100%', marginBottom: 15}}>
          <CustomButton
            name="Send Otp"
            color="#FFFFFF"
            backgroundColor="#151827"
            onPress={handleSubmit(onSubmit)}
            //   loading={loading}
          />
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    elevation: 5,
    borderRadius: 10,
  },
  appName: {
    color: 'black',
    fontSize: 28,
    fontWeight: '400',
    paddingBottom: 10,
  },
  forgotText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '600',
    paddingBottom: 10,
  },
});
