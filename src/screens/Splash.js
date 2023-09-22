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
        // navigation.navigate('LandingPage');
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
        backgroundColor: '#151827',
      }}>
      {/* <Image
        source={require('../images/logo.png')}
        style={{width: 191, height: 138}}
      /> */}
      <View style={{padding: 20}}>
        <Image
          source={{
            uri: 'https://s3.us-east-1.wasabisys.com/flyontech-rental-productt/images/rentblessLogo.png',
          }}
          width={231}
          height={86}
        />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
