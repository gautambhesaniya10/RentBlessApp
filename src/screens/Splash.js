import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoImage} from '../common/AllLiveImageLink';
import DeviceInfo from 'react-native-device-info';
import {getAppVersionLists} from '../graphql/queries/appVersionQueries';
import {useDispatch} from 'react-redux';
import {appVersionAction} from '../redux/AppVersionSlice/AppVersionSlice';
import {checkInternetConnectivity} from '../config/CheckInternetConnectivity';
import NoInternetScreen from './NoInternetScreen';

const Splash = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const currVersion = DeviceInfo.getVersion();
  const [netWarningShow, setNetWarningShow] = useState(false);

  const isConnected = checkInternetConnectivity();

  const retrieveLocalData = async () => {
    if (isConnected) {
      const dataQuery = await getAppVersionLists();
      const data = dataQuery?.data?.appVersionList[0];
      const loginType = await AsyncStorage.getItem('loginType');
      const Token = await AsyncStorage.getItem('token');
      setNetWarningShow(false);
      if (loginType === 'vendor' && Token) {
        setTimeout(() => {
          if (currVersion !== data?.version) {
            dispatch(appVersionAction({...data, versionModelVisible: true}));
            navigation.navigate('VendorMain');
          } else {
            dispatch(appVersionAction({...data, versionModelVisible: false}));
            navigation.navigate('VendorMain');
          }
        }, 1000);
      } else {
        setTimeout(() => {
          if (currVersion !== data?.version) {
            dispatch(appVersionAction({...data, versionModelVisible: true}));
            navigation.navigate('CustomerMain');
          } else {
            dispatch(appVersionAction({...data, versionModelVisible: false}));
            navigation.navigate('CustomerMain');
          }
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setNetWarningShow(true);
      }, 1500);
    }
  };

  useEffect(() => {
    retrieveLocalData();
  }, [isConnected, isFocused]);

  useEffect(() => {
    // updateVersionData(currVersion);
  }, []);

  return netWarningShow ? (
    <NoInternetScreen />
  ) : (
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
