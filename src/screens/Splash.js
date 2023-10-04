import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {BackGroundStyle} from '../../CommonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoImage} from '../common/AllLiveImageLink';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import {
  fetchDataFromFirestore,
  updateVersionData,
} from '../common/Appversion/Appversion';
import {getAppVersionLists} from '../graphql/queries/appVersionQueries';
import {useDispatch} from 'react-redux';
import {appVersionAction} from '../redux/AppVersionSlice/AppVersionSlice';

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const currVersion = DeviceInfo.getVersion();

  const retrieveLocalData = async () => {
    const dataQuery = await getAppVersionLists();
    const data = dataQuery?.data?.appVersionList[0];

    const loginType = await AsyncStorage.getItem('loginType');
    const Token = await AsyncStorage.getItem('token');

    if (loginType === 'vendor' && Token) {
      setTimeout(() => {
        if (currVersion !== data?.version) {
          dispatch(appVersionAction({...data, versionModelVisible: true}));
        } else {
          dispatch(appVersionAction({...data, versionModelVisible: false}));
          navigation.navigate('VendorMain');
        }
      }, 2000);
    } else {
      setTimeout(() => {
        if (currVersion !== data?.version) {
          dispatch(appVersionAction({...data, versionModelVisible: true}));
          navigation.navigate('CustomerMain');
        } else {
          dispatch(appVersionAction({...data, versionModelVisible: false}));
          navigation.navigate('CustomerMain');
        }
        // navigation.navigate('LandingPage');
      }, 2000);
    }
  };

  useEffect(() => {
    retrieveLocalData();
  }, [isFocused]);

  useEffect(() => {
    // updateVersionData(currVersion);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#151827',
      }}>
      <View style={{padding: 20}}>
        <Image
          source={{
            uri: logoImage,
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
