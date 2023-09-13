import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {FontStyle} from '../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeProductsSearchBarData} from '../../redux/ProductFilter/ProductFilterSlice';
import {useDispatch, useSelector} from 'react-redux';

const SideBarContent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const productsFiltersReducer = useSelector(
    state => state?.productsFiltersReducer,
  );
  const {userProfile} = useSelector(state => state?.user);

  const isFocused = useIsFocused();
  const [AccessToken, setAccessToken] = useState('');

  const retrieveLocalData = async () => {
    const Token = await AsyncStorage.getItem('token');
    if (Token) {
      setAccessToken(Token);
    } else {
      setAccessToken('');
    }
  };

  useEffect(() => {
    retrieveLocalData();
  }, [isFocused]);

  return (
    <View style={styles.sideMainContainer}>
      {AccessToken ? (
        <View style={styles.authUserMain}>
          <Image
            source={require('../../images/profileImg.png')}
            style={{width: 55, height: 55}}
          />
          <Text style={styles.userNameText} numberOfLines={1}>
            {userProfile?.first_name} {userProfile?.last_name}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.loginEventMain}
          onPress={() => navigation.navigate('LoginMainScreen')}>
          <Icon name="user-plus" size={22} color="#151827" />
          <Text style={styles.signInText}>SignIn/SignUp</Text>
        </TouchableOpacity>
      )}
      <Divider bold={true} />
      <View style={styles.searchTextMain}>
        <Icon name="search" size={18} color="black" />
        <TextInput
          value={productsFiltersReducer?.searchBarData}
          onChangeText={value => {
            dispatch(
              changeProductsSearchBarData({
                key: 'searchBarData',
                value: value,
              }),
            );
            //   setCurrentPage(0);
            //   setProductDataLimit(0);
          }}
          style={{width: '100%', color: 'black'}}
          placeholder="Search  Hear.."
          placeholderTextColor="rgba(21, 24, 39, 0.40)"
        />
      </View>
    </View>
  );
};

export default SideBarContent;

const styles = StyleSheet.create({
  sideMainContainer: {
    // paddingHorizontal: 30,
  },
  loginEventMain: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  signInText: {
    color: '#151827',
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'underline',
    paddingVertical: 30,
  },
  authUserMain: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  userNameText: {
    fontSize: 18,
    color: '#151827',
    fontWeight: '600',
    paddingTop: 5,
  },
  searchTextMain: {
    backgroundColor: '#FFF',
    width: '90%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 6,
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    gap: 5,
    // position: 'absolute',
    // top: 60,
    // zIndex: 1,
  },
});
