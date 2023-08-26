import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {loadUserProfileStart} from '../redux/LoginUserProfileSlice/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Popover} from 'native-base';

const CustomerHeader = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const useProfileData = useSelector(state => state?.user.userProfile);
  const [AccessToken, setAccessToken] = useState('');

  const LogOut = async () => {
    AsyncStorage.clear();
    navigation.navigate('Splash');
  };

  const retrieveLocalData = async () => {
    // const loginType = await AsyncStorage.getItem('loginType');
    const Token = await AsyncStorage.getItem('token');
    setAccessToken(Token);
  };

  useEffect(() => {
    retrieveLocalData();
  }, [isFocused]);

  useEffect(() => {
    AsyncStorage.getItem('userId') && dispatch(loadUserProfileStart());
  }, [isFocused]);

  return (
    <View style={styles.mainDiv}>
      <View style={styles.innerMain}>
        <View style={styles.leftMainDiv}>
          {/* {useProfileData?.userCreatedShopId &&
            useProfileData?.user_type === 'vendor' && (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={22} color="white" />
              </TouchableOpacity>
            )} */}
          <Text style={styles.leftText}>RENTBLESS</Text>
        </View>
        {AccessToken ? (
          <TouchableOpacity>
            <Popover
              trigger={triggerProps => {
                return (
                  <Button
                    style={{backgroundColor: 'transparent'}}
                    {...triggerProps}>
                    <Icon name="power-off" size={20} color="white" />
                  </Button>
                );
              }}>
              <Popover.Content>
                <Popover.Arrow />
                <Text onPress={() => LogOut()} style={styles.logoutText}>
                  Logout
                </Text>
              </Popover.Content>
            </Popover>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginMainScreen')}>
            <Text style={styles.signInText}>SignIn/SignUp</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomerHeader;

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: '#151827',
    width: '100%',
    height: 96,
    // justifyContent: 'center',
  },
  leftMainDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  innerMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 26,
    paddingTop: 20,
  },
  leftText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signInText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  logoutText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'white',
    padding: 10,
    elevation: 5,
    borderRadius: 6,
  },
});