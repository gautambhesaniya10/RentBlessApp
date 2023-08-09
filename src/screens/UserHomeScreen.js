import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const UserHomeScreen = () => {
  const navigation = useNavigation();

  const LogOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('LoginMainScreen');
  };

  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>UserHomeScreen</Text>
      <Button onPress={() => LogOut()} title="Log Out" />
    </View>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({});
