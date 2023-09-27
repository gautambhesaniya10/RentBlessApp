import {StyleSheet, Text, View, Image, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  loadUserProfileStart,
  userLogout,
} from '../redux/LoginUserProfileSlice/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useToast} from 'native-base';
import {Dropdown} from 'react-native-element-dropdown';
import {Divider} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native';
import {Avatar} from 'react-native-paper';
import {logoImage} from '../common/AllLiveImageLink';
import WebView from 'react-native-webview';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

const CustomerHeader = ({homeScreen}) => {
  const toast = useToast();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {areaLists} = useSelector(state => state.areaLists);
  const {userProfile} = useSelector(state => state?.user);

  const [isLogoutTooltipVisible, setLogoutTooltipVisible] = useState(false);
  const [AccessToken, setAccessToken] = useState('');

  const logoName = `${userProfile?.first_name
    ?.charAt(0)
    .toUpperCase()}${userProfile?.last_name?.charAt(0).toUpperCase()}`;

  const clearGoogleSignInCaches = async () => {
    await GoogleSignin.signOut();
  };

  const LogOut = async () => {
    clearGoogleSignInCaches();
    AsyncStorage.clear();
    setLogoutTooltipVisible(false);
    dispatch(userLogout());
    setAccessToken('');
    toast.show({
      title: 'Logout Successfully ! ',
      placement: 'top',
      backgroundColor: 'green.600',
      variant: 'solid',
    });
    setTimeout(() => {
      navigation.navigate('Splash');
    }, 1000);
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

  const [selectedLocation, setSelectedLocation] = useState(null);

  const renderLocationLabel = () => {
    return (
      <Text style={[styles.label]}>
        <Image
          source={require('../images/locationIcon.png')}
          style={{width: 12, height: 12, tintColor: 'white'}}
        />{' '}
        Location
      </Text>
    );
  };

  return (
    <View style={homeScreen ? styles.mainDiv : styles.mainDivOther}>
      <View style={styles.innerMain}>
        <View style={styles.leftMainDiv}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="bars" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
            {/* <Text style={styles.leftText}>RENTBLESS</Text> */}
            <Image
              source={{
                uri: logoImage,
              }}
              width={100}
              height={37}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {renderLocationLabel()}
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            labelField="area"
            valueField="pin"
            data={areaLists}
            search
            placeholder={'Select item'}
            searchPlaceholder="Search..."
            value={selectedLocation}
            onChange={item => {
              setSelectedLocation(item.pin);
            }}
          />
        </View>
        {AccessToken ? (
          // <TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => setLogoutTooltipVisible(!isLogoutTooltipVisible)}>
              {/* <Image
                source={require('../images/profileImg.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              /> */}
              <Avatar.Text
                size={35}
                label={logoName}
                backgroundColor="#29977E"
              />
            </TouchableOpacity>

            <Modal
              transparent={true}
              visible={isLogoutTooltipVisible}
              animationType="fade"
              onRequestClose={() => setLogoutTooltipVisible(false)}>
              <TouchableWithoutFeedback
                onPress={() => setLogoutTooltipVisible(false)}>
                <View style={{flex: 1, position: 'relative'}}>
                  <View style={styles.modelLogoutMain}>
                    <View
                      style={{
                        marginTop: 15,
                      }}>
                      <Avatar.Text
                        size={35}
                        label={logoName}
                        backgroundColor="#29977E"
                      />
                    </View>
                    <Text style={[styles.logoutText]}>
                      {userProfile?.first_name} {userProfile?.last_name}
                    </Text>
                    <Divider bold={true} />
                    <Text onPress={() => LogOut()} style={styles.logoutText}>
                      <Icon name="power-off" size={14} color="#151827" /> {''}
                      Logout
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        ) : (
          // </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginMainScreen')}>
            <Icon name="user-plus" size={22} color="white" />
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
    // height: 96,
    // paddingTop: 20,
    paddingVertical: 10,
    position: 'relative',
  },
  mainDivOther: {
    backgroundColor: '#151827',
    width: '100%',
    paddingVertical: 10,
    position: 'relative',
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
    alignItems: 'center',
    marginHorizontal: 10,
  },
  leftText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  modelLogoutMain: {
    width: '35%',
    position: 'absolute',
    top: 52,
    right: 5,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 6,
    alignItems: 'center',
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },

  container: {
    position: 'relative',
  },
  dropdown: {
    height: 45,
    width: 150,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    top: 0,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
    paddingTop: 15,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
    paddingTop: 15,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
