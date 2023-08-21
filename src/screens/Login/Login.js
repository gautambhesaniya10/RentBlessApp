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
import {signIn} from '../../graphql/mutations/authMutations';
import {useSelector, useDispatch} from 'react-redux';
import {loadUserProfileStart} from '../../redux/LoginUserProfileSlice/userSlice';
import {useToast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [loginType, setLoginType] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordHide, setPasswordHide] = useState(true);

  const onError = errors => console.log('Errors Occurred !! :', errors);

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
    signIn({
      username: data.username,
      password: data.password,
      type: loginType === 'vendor' ? 'vendor' : 'customer',
    })
      .then(
        async res => {
          setLoading(false);
          await AsyncStorage.setItem('token', res.data.signIn.token);
          await AsyncStorage.setItem('userId', res.data.signIn.user);
          dispatch(loadUserProfileStart());
          toast.show({
            title: res.data.signIn.message,
            placement: 'top',
            backgroundColor: 'green.600',
            variant: 'solid',
          });
          setTimeout(() => {
            navigation.navigate('VendorMain');
          }, 1000);
        },
        error => {
          setLoading(false);
          console.log('login____Error', error.message);
        },
      )
      .catch(error => {
        setLoading(false);
        console.log('login____Error', error.message);
      });
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
          Login as a {loginType === 'customer' ? 'customer' : 'vendor'}
        </Text>
        <Text style={styles.childText}>
          Please login or sign up to continue our app
        </Text>

        <View>
          <CustomTextInput
            label={
              loginType === 'customer'
                ? 'Contact Number'
                : 'Email/Contact Number'
            }
            mode="outlined"
            keyboardType={
              loginType === 'customer' ? 'phone-pad' : 'email-address'
            }
            name="username"
            control={control}
            rules={{required: 'Username is required *'}}
            activeOutlineColor="#151827"
          />
          {errors?.username && (
            <Text style={{color: 'red', marginTop: 4}}>
              {errors.username.message}
            </Text>
          )}
        </View>
        <View style={{marginTop: 26, position: 'relative'}}>
          <CustomTextInput
            label="Password"
            mode="outlined"
            name="password"
            secureTextEntry={passwordHide}
            control={control}
            rules={{required: 'Password is required *'}}
            activeOutlineColor="#151827"
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
          {errors?.password && (
            <Text style={{color: 'red', marginTop: 4}}>
              {errors.password.message}
            </Text>
          )}
        </View>

        <Text style={styles.fpText}>Forgot Password?</Text>

        <View style={{marginTop: 40, width: '100%'}}>
          <CustomButton
            name="Login"
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
          Don’t have an account?
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={{fontWeight: 'bold'}}>
            {' '}
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default Login;

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
  fpText: {
    alignSelf: 'center',
    fontSize: 11,
    fontWeight: '300',
    fontFamily: FontStyle,
    color: 'rgba(21, 24, 39, 0.56)',
    marginTop: 20,
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
