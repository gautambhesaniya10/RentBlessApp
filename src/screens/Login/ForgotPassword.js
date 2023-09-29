import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackGroundStyle} from '../../../CommonStyle';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import CustomTextInput from '../../common/CustomTextInput';
import CustomButton from '../../common/CustomButton';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log('dddddddddd', data);
  };

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackIcon}>
        <Icon name="angle-left" color={'black'} size={30} />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.appName}>Rentbless</Text>
          <Text style={styles.forgotText}>Forgot Password</Text>
          <Text style={styles.desOneText}>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </Text>
          <Text style={styles.desOneText}>
            For security reasons, we do NOT store your password. So rest assured
            that we will never send your password via email.
          </Text>
          <View style={{width: '100%', marginVertical: 20}}>
            <CustomTextInput
              control={control}
              label={'Email Address'}
              mode="outlined"
              keyboardType={'email-address'}
              name="email"
              rules={{
                required: 'Email is required *',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              }}
              activeOutlineColor="#151827"
              outlineStyle={{borderRadius: 12}}
            />
            {errors?.email && (
              <Text style={{color: 'red', marginTop: 4}}>
                {errors.email.message}
              </Text>
            )}
          </View>
          <View style={{width: '100%', marginBottom: 15}}>
            <CustomButton
              name="Reset"
              color="#FFFFFF"
              backgroundColor="#151827"
              onPress={handleSubmit(onSubmit)}
              //   loading={loading}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  goBackIcon: {
    padding: 20,
  },
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
  desOneText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 10,
    textAlign: 'center',
  },
});
