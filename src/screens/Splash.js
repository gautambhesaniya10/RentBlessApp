import {StyleSheet, Image, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {BackGroundStyle} from '../../CommonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const retrieveLocalData = async () => {
    const loginType = await AsyncStorage.getItem('loginType');
    const Token = await AsyncStorage.getItem('token');

    if (loginType === 'vendor' && Token) {
      setTimeout(() => {
        navigation.navigate('VendorMain');
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.navigate('CustomerMain');
      }, 2000);
    }
  };

  useEffect(() => {
    retrieveLocalData();
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BackGroundStyle,
      }}>
      <Image
        source={require('../images/logo.png')}
        style={{width: 191, height: 138}}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
