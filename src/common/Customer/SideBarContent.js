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
import {Avatar} from 'react-native-paper';

const SideBarContent = ({AccessToken}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const productsFiltersReducer = useSelector(
    state => state?.productsFiltersReducer,
  );
  const {userProfile} = useSelector(state => state?.user);
  const logoName = `${userProfile?.first_name
    ?.charAt(0)
    .toUpperCase()}${userProfile?.last_name?.charAt(0).toUpperCase()}`;

  return (
    <View style={styles.sideMainContainer}>
      {AccessToken ? (
        <View style={styles.authUserMain}>
          <Avatar.Text size={55} label={logoName} backgroundColor="#29977E" />
          <View>
            <Text style={styles.userNameText} numberOfLines={1}>
              {userProfile?.first_name} {userProfile?.last_name}
            </Text>
            <Text style={styles.userEmailText} numberOfLines={1}>
              {userProfile?.user_email || 'Undefined..'}
            </Text>
          </View>
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
          }}
          style={{width: '100%', color: 'black'}}
          placeholder="Search  Hear.."
          placeholderTextColor="rgba(21, 24, 39, 0.40)"
        />
      </View>
      <Divider bold={true} />
      <TouchableOpacity
        onPress={() => navigation.navigate('LikeScreen')}
        style={styles.wishMain}>
        <Icon name="heart-o" size={20} color="#151827" />
        <Text style={styles.wishText}>Wishlist (0)</Text>
      </TouchableOpacity>
      <Divider bold={true} />
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
    // paddingTop: 5,
  },
  searchTextMain: {
    backgroundColor: '#FFF',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    gap: 5,
    borderWidth: 0.5,
    marginHorizontal: 30,
    marginVertical: 30,
  },
  wishMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 30,
    marginVertical: 30,
  },
  logoutMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 30,
    marginVertical: 30,
    bottom: 0,
    position: 'absolute',
    // height: '100%',
  },
  wishText: {
    color: '#151827',
    fontWeight: '400',
    fontSize: 18,
  },
  userEmailText: {
    fontSize: 16,
    color: '#151827',
    fontWeight: '400',
  },
});
