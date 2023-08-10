import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const VendorHeader = () => {
  const navigation = useNavigation();

  const LogOut = async () => {
    AsyncStorage.clear();
    navigation.navigate('LoginMainScreen');
  };

  return (
    <View style={styles.mainDiv}>
      <View style={styles.innerMain}>
        <Text style={styles.leftText}>RENTBLESS</Text>
        <TouchableOpacity>
          <Text onPress={() => LogOut()} style={styles.leftText}>
            Logout
          </Text>
        </TouchableOpacity>
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
});
