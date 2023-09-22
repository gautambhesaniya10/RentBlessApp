import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  loadUserProfileStart,
  userLogout,
} from '../redux/LoginUserProfileSlice/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useToast} from 'native-base';
import {Divider} from 'react-native-paper';
import {Avatar} from 'react-native-paper';

const VendorHeader = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const useProfileData = useSelector(state => state?.user.userProfile);
  const [isLogoutTooltipVisible, setLogoutTooltipVisible] = useState(false);

  const logoName = `${useProfileData?.first_name?.charAt(
    0,
  )}${useProfileData?.last_name?.charAt(0)}`;

  const LogOut = async () => {
    AsyncStorage.clear();
    setLogoutTooltipVisible(false);
    dispatch(userLogout());

    toast.show({
      title: 'Logout Successfully ! ',
      placement: 'top',
      backgroundColor: 'green.600',
      variant: 'solid',
    });

    setTimeout(() => {
      // navigation.navigate('CustomerHomePage');
      navigation.navigate('Splash');
    }, 1000);
  };

  useEffect(() => {
    const getAccessToken = AsyncStorage.getItem('token');
    // setAccessToken(getAccessToken);
    AsyncStorage.getItem('userId') && dispatch(loadUserProfileStart());
  }, []);

  return (
    <View style={styles.mainDiv}>
      <View style={styles.innerMain}>
        <View style={styles.leftMainDiv}>
          {useProfileData?.userCreatedShopId &&
            useProfileData?.user_type === 'vendor' && (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={22} color="white" />
              </TouchableOpacity>
            )}
          <Text style={styles.leftText}>RENTBLESS</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setLogoutTooltipVisible(!isLogoutTooltipVisible)}>
            <Avatar.Text size={35} label={logoName} backgroundColor="#29977E" />
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
                    {useProfileData?.first_name} {useProfileData?.last_name}
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
      </View>
    </View>
  );
};

export default VendorHeader;

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: '#151827',
    width: '100%',
    height: 60,
    justifyContent: 'center',
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
});
