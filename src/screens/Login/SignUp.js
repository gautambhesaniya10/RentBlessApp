import {Image, StyleSheet, Text, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackGroundStyle, FontStyle} from '../../../CommonStyle';
import CustomButton from '../../common/CustomButton';
import CustomTextInput from '../../common/CustomTextInput';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm} from 'react-hook-form';
import {signUp} from '../../graphql/mutations/authMutations';

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();

  const onError = errors => console.log('Errors Occurred !! :', errors);

  const navigation = useNavigation();
  const [loginType, setLoginType] = useState('');
  const [loading, setLoading] = useState(false);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('loginType');
      if (value !== null) {
        setLoginType(value);
      } else {
        console.log('Value not found in storage.');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const onSubmit = data => {
    setLoading(true);
    signUp(
      loginType === 'vendor'
        ? {
            first_name: data.first_name,
            last_name: data.last_name,
            user_contact: data.user_contact,
            user_password: data.user_password,
            user_type: 'vendor',
            user_email: data.user_email,
          }
        : {
            first_name: data.first_name,
            last_name: data.last_name,
            user_contact: data.user_contact,
            user_password: data.user_password,
            user_type: 'customer',
          },
    ).then(
      async res => {
        setLoading(false);
        //   dispatch(loginUserId(res.data.signUp.user));
        //   dispatch(loadUserProfileStart({ id: res.data.signUp.user }));
        await AsyncStorage.setItem('token', res.data.signUp.token);
        //   localStorage.setItem("userId", res.data.signUp.user);
        // alert(res.data.signUp.message);
        navigation.navigate('UserHomeScreen');
      },
      error => {
        console.log('eeeee', error);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        <View style={{alignSelf: 'center'}}>
          <Image
            source={require('../../images/logo.png')}
            style={{width: 191, height: 138}}
          />
        </View>

        <Text style={styles.joinText}>
          Sign up as a {loginType === 'customer' ? 'customer' : 'vendor'}
        </Text>
        <Text style={styles.childText}>Create an new account</Text>

        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="First Name"
            mode="outlined"
            name="first_name"
            control={control}
            rules={{required: 'First Name is required *'}}
          />
          {errors?.first_name && (
            <Text style={{color: 'red', marginTop: 4}}>
              {errors.first_name.message}
            </Text>
          )}
        </View>
        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="Last Name"
            mode="outlined"
            name="last_name"
            control={control}
            rules={{required: 'Last Name is required *'}}
          />
          {errors?.last_name && (
            <Text style={{color: 'red', marginTop: 4}}>
              {errors.last_name.message}
            </Text>
          )}
        </View>
        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="Contact Number"
            mode="outlined"
            keyboardType="phone-pad"
            name="user_contact"
            control={control}
            rules={{
              required: 'Contact Number is required *',
              minLength: {
                value: 10,
                message: 'Contact Number must be 10 numbers',
              },
              maxLength: {
                value: 10,
                message: 'Contact Number must be 10 numbers',
              },
            }}
          />
          {errors?.user_contact && (
            <Text style={{color: 'red', marginTop: 4}}>
              {errors.user_contact.message}
            </Text>
          )}
        </View>
        {loginType === 'vendor' && (
          <View style={{marginTop: 26}}>
            <CustomTextInput
              label="Email"
              mode="outlined"
              name="user_email"
              control={control}
              rules={{
                required: 'Email is required *',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              }}
            />
            {errors?.user_email && (
              <Text style={{color: 'red', marginTop: 4}}>
                {errors.user_email.message}
              </Text>
            )}
          </View>
        )}

        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="Password"
            mode="outlined"
            name="user_password"
            control={control}
            secureTextEntry={true}
            rules={{required: 'Password is required *'}}
          />
          {errors?.user_password && (
            <Text style={{color: 'red', marginTop: 4}}>
              {errors.user_password.message}
            </Text>
          )}
        </View>
        <View style={{marginTop: 26}}>
          <CustomTextInput
            label="Confirmed Password"
            mode="outlined"
            name="confirm_password"
            control={control}
            secureTextEntry={true}
            rules={{
              required: 'Confirmed Password is required *',
              validate: value => {
                const {user_password} = getValues();
                return user_password === value || 'Passwords do not match!';
              },
            }}
          />
          {errors?.confirm_password && (
            <Text style={{color: 'red', marginTop: 4}}>
              {errors.confirm_password.message}
            </Text>
          )}
        </View>

        <View style={{marginTop: 40, width: '100%'}}>
          <CustomButton
            name="Sign Up"
            color="#FFFFFF"
            backgroundColor="#151827"
            onPress={handleSubmit(onSubmit, onError)}
            loading={loading}
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
