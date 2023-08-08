import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

const CustomTextInput = ({label, value, onChangeText, mode, keyboardType}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={text => onChangeText(text)}
      mode={mode}
      keyboardType={keyboardType}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
