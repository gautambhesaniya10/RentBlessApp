import {Image, StyleSheet, Text, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {BackGroundStyle, FontStyle} from '../../../CommonStyle';
import CustomButton from '../../common/CustomButton';
import CustomTextInput from '../../common/CustomTextInput';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <ScrollView style={styles.main}>
        <View style={{alignSelf: 'center'}}>
          <Image
            source={require('../../images/logo.png')}
            style={{width: 191, height: 138}}
          />
        </View>

        <Text style={styles.joinText}>Sign up as a Business</Text>
        <Text style={styles.childText}>Create an new account</Text>

        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="Name"
            onChangeText={() => {}}
            mode="outlined"
          />
        </View>
        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="Phone Number"
            onChangeText={() => {}}
            mode="outlined"
            keyboardType="phone-pad"
          />
        </View>
        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="Email"
            onChangeText={() => {}}
            mode="outlined"
          />
        </View>
        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="Password"
            onChangeText={() => {}}
            mode="outlined"
          />
        </View>
        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="Confirmed Password"
            onChangeText={() => {}}
            mode="outlined"
          />
        </View>

        <View style={{marginTop: 40, width: '100%'}}>
          <CustomButton
            name="Sign Up"
            color="#FFFFFF"
            backgroundColor="#151827"
            onPress={() => {}}
          />
        </View>
        <Text style={styles.orText}>Or</Text>
        <View
          style={{
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={require('../../images/google.png')}
            style={{width: 30, height: 30}}
          />
          <Image
            source={require('../../images/facebook.png')}
            style={{width: 50, height: 50}}
          />
        </View>
        <Text style={styles.bottomText}>
          Already have an account?
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{fontWeight: 'bold'}}>
            {' '}
            Login
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  joinText: {
    color: '#151827',
    fontFamily: FontStyle,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    marginTop: 20,
  },
  childText: {
    color: 'rgba(21, 24, 39, 0.56)',
    fontFamily: FontStyle,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: 16,
    marginBottom: 20,
  },
  orText: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FontStyle,
    color: '#31333E',
    marginTop: 20,
  },
  bottomText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
    color: '#151827',
    fontSize: 12,
    fontFamily: FontStyle,
    fontWeight: '600',
  },
});
