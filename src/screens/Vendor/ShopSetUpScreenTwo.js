import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../common/CustomTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontStyle} from '../../../CommonStyle';
import CustomButton from '../../common/CustomButton';

const ShopSetUpScreenTwo = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  setCurrentPosition,
  currentPosition,
}) => {
  const [ownerDetailShow, setOwnerDetailShow] = useState(true);

  return (
    <View style={{marginHorizontal: 16}}>
      <TouchableOpacity
        onPress={() => setOwnerDetailShow(!ownerDetailShow)}
        style={styles.labelMain}>
        <Icon
          name={ownerDetailShow ? 'angle-up' : 'angle-down'}
          size={32}
          color="black"
        />
        <Text style={styles.labelStyle}>Owner Details</Text>
      </TouchableOpacity>

      {ownerDetailShow && (
        <View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="my Name"
              mode="outlined"
              control={control}
              name="myName"
              rules={{required: 'myName is required *'}}
              activeOutlineColor="#29977E"
            />
            {errors?.myName && (
              <Text style={{color: 'red'}}>{errors?.myName?.message}</Text>
            )}
          </View>
        </View>
      )}

      <View
        style={{
          marginTop: 40,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
          justifyContent: 'space-around',
        }}>
        <View style={{width: '50%'}}>
          <CustomButton
            name="Back"
            color="black"
            backgroundColor="white"
            onPress={() => setCurrentPosition(currentPosition - 1)}
          />
        </View>
        <View style={{width: '50%'}}>
          <CustomButton
            name="Next"
            color="#FFFFFF"
            backgroundColor="#29977E"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
};

export default ShopSetUpScreenTwo;

const styles = StyleSheet.create({
  labelStyle: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: FontStyle,
  },
  labelMain: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 16,
  },
});
