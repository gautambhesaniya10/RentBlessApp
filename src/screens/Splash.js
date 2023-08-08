import {StyleSheet, Image, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {BackGroundStyle} from '../../CommonStyle';

const Splash = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LoginMainScreen');
    }, 2000);
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
