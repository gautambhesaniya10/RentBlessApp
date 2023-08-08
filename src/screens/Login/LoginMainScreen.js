import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {BackGroundStyle, FontStyle} from '../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../common/CustomButton';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const LoginMainScreen = () => {
  const [loginType, setLoginType] = useState('customer');
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.main}>
        <Image
          source={require('../../images/logo.png')}
          style={{width: 191, height: 138}}
        />
        <Text style={styles.joinText}>Join Our Rentbless App</Text>
        <Text style={styles.childText}>
          Choose & Create account as a login or sign up
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 15,
          }}>
          <View
            style={[
              styles.customerMain,
              {
                borderColor:
                  loginType === 'customer'
                    ? '#29977E'
                    : 'rgba(21, 24, 39, 0.10)',
              },
            ]}>
            <TouchableOpacity onPress={() => setLoginType('customer')}>
              <View style={styles.icons}>
                <Icon
                  name="users"
                  size={20}
                  color={loginType === 'customer' ? 'green' : 'gray'}
                />
                {loginType === 'customer' && (
                  <Icon name="check-circle" size={25} color="green" />
                )}
              </View>
              <View style={styles.bottomMain}>
                <Text style={styles.customerText}>Customer</Text>
                <Text style={styles.customerTextChild}>
                  Sign up as a customer
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.businessMain,
              {
                borderColor:
                  loginType === 'business'
                    ? '#29977E'
                    : 'rgba(21, 24, 39, 0.10)',
              },
            ]}>
            <TouchableOpacity onPress={() => setLoginType('business')}>
              <View style={styles.icons}>
                <Icon
                  name="male"
                  size={20}
                  color={loginType === 'business' ? 'green' : 'gray'}
                />
                {loginType === 'business' && (
                  <Icon name="check-circle" size={25} color="green" />
                )}
              </View>
              <View style={styles.bottomMain}>
                <Text style={styles.customerText}>Business</Text>
                <Text style={styles.customerTextChild}>
                  Sign up as a business
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 65}}>
          <View style={{width: 340}}>
            <CustomButton
              name="Login"
              color="#FFFFFF"
              backgroundColor="#151827"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
          <View style={{marginTop: 16, width: 340}}>
            <CustomButton
              name="Sign Up"
              color="#151827"
              backgroundColor="#FFFFFF"
              borderColor="#151827"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginMainScreen;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
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
    marginBottom: 40,
  },
  customerMain: {
    width: 160,
    height: 104,
    borderWidth: 1,
    // borderColor: '#29977E',
    borderRadius: 16,
  },
  businessMain: {
    width: 160,
    height: 104,
    borderWidth: 1,
    // borderColor: 'rgba(21, 24, 39, 0.10)',
    borderRadius: 16,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  customerText: {
    color: '#151827',
    fontSize: 14,
    fontFamily: FontStyle,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  customerTextChild: {
    color: 'rgba(21, 24, 39, 0.56)',
    fontSize: 10,
    fontFamily: FontStyle,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  bottomMain: {
    marginLeft: 20,
    marginVertical: 15,
  },
});
