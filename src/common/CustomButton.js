import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontStyle} from '../../CommonStyle';

const CustomButton = ({name, color, backgroundColor, borderColor, onPress}) => {
  const styles = StyleSheet.create({
    main: {
      backgroundColor: backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      borderWidth: 1,
      borderColor: borderColor,
    },
    loginBtn: {
      paddingVertical: 19,
      color: color,
      fontSize: 18,
      fontWeight: '600',
      fontFamily: FontStyle,
    },
  });

  return (
    <TouchableOpacity style={styles.main} onPress={() => onPress()}>
      <Text style={styles.loginBtn}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
