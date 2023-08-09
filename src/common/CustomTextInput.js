import {StyleSheet} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {Controller} from 'react-hook-form';

const CustomTextInput = ({
  label,
  mode,
  keyboardType,
  secureTextEntry,
  name,
  rules,
  control,
}) => {
  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            label={label}
            mode={mode}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        )}
        name={name}
        rules={rules}
      />
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
