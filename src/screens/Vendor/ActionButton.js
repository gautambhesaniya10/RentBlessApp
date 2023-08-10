import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../../common/CustomButton';
import {useForm} from 'react-hook-form';

const ActionButton = ({handleSubmit, onSubmit, setCurrentPosition}) => {
  return (
    <View style={{marginTop: 40, width: '100%'}}>
      <CustomButton
        name="Next"
        color="#FFFFFF"
        backgroundColor="#29977E"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({});
