import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackGroundStyle} from '../../../CommonStyle';
import {useNavigation} from '@react-navigation/native';
import EmailScreen from './ForgotPassWordScreens/EmailScreen';
import OtpScreen from './ForgotPassWordScreens/OtpScreen';
import NewPassWordScreen from './ForgotPassWordScreens/NewPassWordScreen';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState(1);

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackIcon}>
        <Icon name="angle-left" color={'black'} size={30} />
      </TouchableOpacity>
      {activeScreen === 1 && <EmailScreen setActiveScreen={setActiveScreen} />}
      {activeScreen === 2 && <OtpScreen setActiveScreen={setActiveScreen} />}
      {activeScreen === 3 && (
        <NewPassWordScreen setActiveScreen={setActiveScreen} />
      )}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  goBackIcon: {
    padding: 20,
  },
});
