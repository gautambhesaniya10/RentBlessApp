import {StyleSheet} from 'react-native';
import React from 'react';
import {DefaultTheme, TextInput} from 'react-native-paper';
import {Controller} from 'react-hook-form';

const CustomTextInput = ({
  label,
  mode,
  keyboardType,
  secureTextEntry,
  name,
  rules,
  control,
  activeOutlineColor,
  disabled,
}) => {
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

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
            outlineColor="rgba(21, 24, 39, 0.10)"
            activeOutlineColor={activeOutlineColor}
            theme={customTheme}
            disabled={disabled}
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
