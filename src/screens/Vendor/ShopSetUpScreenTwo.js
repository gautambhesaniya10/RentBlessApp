import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
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
  return (
    <View style={{marginHorizontal: 16}}>
      <TouchableOpacity style={styles.logoMainDiv}>
        <Icon name="image" size={25} color="black" />
        <Text style={styles.uploadText}>Click to Upload </Text>
        <Text style={styles.uploadTextInner}>Logo </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.coverMainDiv}>
        <Icon name="image" size={25} color="black" />
        <Text style={styles.uploadText}>Click to Upload </Text>
        <Text style={styles.uploadTextInner}>Cover Image </Text>
        {/* <Image
          source={require('../../images/banner.jpg')}
          style={{width: '100%', height: 148}}
        /> */}
      </TouchableOpacity>

      <Text style={styles.shopImgText}>Shop Images</Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 9,
        }}>
        {['One', 'Two', 'Three']?.map((item, index) => {
          return (
            <>
              <TouchableOpacity key={index} style={styles.shopImagesMain}>
                <Icon name="image" size={23} color="black" />
                <Text style={[styles.uploadText, {fontSize: 12}]}>
                  Click to Upload
                </Text>
                <Text style={styles.uploadTextInner}>Shop Image </Text>
              </TouchableOpacity>
            </>
          );
        })}
      </View>
      <Text style={styles.shopImgText}>Shop Video</Text>
      <TouchableOpacity style={[styles.coverMainDiv, {marginTop: 0}]}>
        <Icon name="image" size={25} color="black" />
        <Text style={styles.uploadText}>Click to Upload </Text>
        <Text style={styles.uploadTextInner}>Shop Video </Text>
      </TouchableOpacity>
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
  logoMainDiv: {
    backgroundColor: '#FFF',
    marginTop: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    height: 150,
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 2,
  },
  uploadText: {
    color: '#29977E',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FontStyle,
    paddingTop: 6,
  },
  uploadTextInner: {
    color: 'rgba(21, 24, 39, 0.40)',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FontStyle,
  },
  coverMainDiv: {
    backgroundColor: '#FFF',
    marginTop: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 150,
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 10,
  },
  shopImgText: {
    color: '#151827',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 16,
  },
  shopImagesMain: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    width: 102,
    height: 100,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
  },
});
