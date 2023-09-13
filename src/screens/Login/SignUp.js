import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackGroundStyle, FontStyle} from '../../../CommonStyle';
import CustomButton from '../../common/CustomButton';
import CustomTextInput from '../../common/CustomTextInput';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm} from 'react-hook-form';
import {signUp} from '../../graphql/mutations/authMutations';
import {loadUserProfileStart} from '../../redux/LoginUserProfileSlice/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useToast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUp = () => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();

  const onError = errors => console.log('Errors Occurred !! :', errors);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loginType, setLoginType] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordHide, setPasswordHide] = useState(true);
  const [confirmPasswordHide, setConfirmPasswordHide] = useState(true);

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
        await AsyncStorage.setItem('token', res.data.signUp.token);
        await AsyncStorage.setItem('userId', res.data.signUp.user);

        //   dispatch(loginUserId(res.data.signUp.user));
        dispatch(loadUserProfileStart());
        //   localStorage.setItem("userId", res.data.signUp.user);
        // alert(res.data.signUp.message);
        toast.show({
          title: res.data.signUp.message,
          placement: 'top',
          backgroundColor: 'green.600',
          variant: 'solid',
        });
        if (loginType === 'vendor') {
          setTimeout(() => {
            navigation.navigate('VendorMain');
          }, 1000);
        } else if (loginType === 'customer') {
          setTimeout(() => {
            navigation.navigate('CustomerMain');
          }, 1000);
        }
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
    <View
      style={{flex: 1, backgroundColor: BackGroundStyle, position: 'relative'}}>
      <View style={styles.headerMain}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.appNameText}>Rentbless</Text>
      </View>

      <View style={{height: '70%'}}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
          {/* <View style={{alignSelf: 'center'}}>
          <Image
            source={require('../../images/logo.png')}
            style={{width: 191, height: 138}}
          />
        </View> */}

          <Text style={styles.joinText}>Create an account</Text>
          <Text style={styles.childText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <View style={{marginBottom: 16, width: '100%'}}>
            <TouchableOpacity style={styles.socialBtnMain}>
              <Image
                source={require('../../images/google.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={styles.socialText}>Continue to Google</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%'}}>
            <TouchableOpacity style={styles.socialBtnMain}>
              <Image
                source={require('../../images/facebook.png')}
                style={{width: 22, height: 22}}
              />
              <Text style={styles.socialText}>Continue to Facebook</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.orText}>OR</Text>

          <View style={{marginTop: 0}}>
            <CustomTextInput
              activeOutlineColor="#151827"
              label="First Name"
              mode="outlined"
              name="first_name"
              control={control}
              rules={{required: 'First Name is required *'}}
              outlineStyle={{borderRadius: 12}}
            />
            {errors?.first_name && (
              <Text style={{color: 'red', marginTop: 4}}>
                {errors.first_name.message}
              </Text>
            )}
          </View>
          <View style={{marginTop: 10}}>
            <CustomTextInput
              outlineStyle={{borderRadius: 12}}
              activeOutlineColor="#151827"
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
          <View style={{marginTop: 10}}>
            <CustomTextInput
              outlineStyle={{borderRadius: 12}}
              activeOutlineColor="#151827"
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
            <View style={{marginTop: 10}}>
              <CustomTextInput
                outlineStyle={{borderRadius: 12}}
                activeOutlineColor="#151827"
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

          <View style={{marginTop: 10, position: 'relative'}}>
            <CustomTextInput
              outlineStyle={{borderRadius: 12}}
              activeOutlineColor="#151827"
              label="Password"
              mode="outlined"
              name="user_password"
              control={control}
              secureTextEntry={passwordHide}
              rules={{required: 'Password is required *'}}
            />
            <TouchableOpacity
              onPress={() => setPasswordHide(!passwordHide)}
              style={{position: 'absolute', right: 18, top: 20, zIndex: 1}}>
              <Icon
                name={passwordHide ? 'eye-slash' : 'eye'}
                size={22}
                color="gray"
              />
            </TouchableOpacity>
            {errors?.user_password && (
              <Text style={{color: 'red', marginTop: 4}}>
                {errors.user_password.message}
              </Text>
            )}
          </View>
          <View style={{marginTop: 10, position: 'relative'}}>
            <CustomTextInput
              outlineStyle={{borderRadius: 12}}
              activeOutlineColor="#151827"
              label="Confirmed Password"
              mode="outlined"
              name="confirm_password"
              control={control}
              secureTextEntry={confirmPasswordHide}
              rules={{
                required: 'Confirmed Password is required *',
                validate: value => {
                  const {user_password} = getValues();
                  return user_password === value || 'Passwords do not match!';
                },
              }}
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordHide(!confirmPasswordHide)}
              style={{position: 'absolute', right: 18, top: 20, zIndex: 1}}>
              <Icon
                name={confirmPasswordHide ? 'eye-slash' : 'eye'}
                size={22}
                color="gray"
              />
            </TouchableOpacity>
            {errors?.confirm_password && (
              <Text style={{color: 'red', marginTop: 4}}>
                {errors.confirm_password.message}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonMainContainer}>
        <View style={{width: '100%'}}>
          <CustomButton
            name="Sign Up"
            color="#FFFFFF"
            backgroundColor="#151827"
            onPress={handleSubmit(onSubmit, onError)}
            loading={loading}
          />
        </View>
        <Text style={styles.bottomText}>
          Already have an account?
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{color: '#151827', fontWeight: '600'}}>
            {' '}
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    // marginTop: 50,
  },
  buttonMainContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FontStyle,
    color: '#31333E',
    marginVertical: 10,
  },
  bottomText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
    fontFamily: FontStyle,
    color: 'rgba(21, 24, 39, 0.56)',
    fontSize: 16,
    fontWeight: '400',
  },
  headerMain: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    margin: 20,
  },
  appNameText: {
    textTransform: 'uppercase',
    color: '#151827',
    fontFamily: FontStyle,
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '700',
  },

  socialBtnMain: {
    backgroundColor: '#FAFCFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#151827',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flexDirection: 'row',
  },
  socialText: {
    paddingVertical: 9,
    color: '#151827',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FontStyle,
  },
});
