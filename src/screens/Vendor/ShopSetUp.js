import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VendorHeader from '../../components/VendorHeader';
import {FontStyle} from '../../../CommonStyle';
import CustomButton from '../../common/CustomButton';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../common/CustomTextInput';
import {useForm} from 'react-hook-form';
import ShopSetUpScreenOne from './ShopSetUpScreenOne';
import ShopSetUpScreenTwo from './ShopSetUpScreenTwo';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,

  stepStrokeCurrentColor: '#29977E', // green
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#29977E', // green
  stepStrokeUnFinishedColor: '#1518271a', //gray
  separatorFinishedColor: '#29977E', // green
  separatorUnFinishedColor: '#1518271a', //gray

  stepIndicatorFinishedColor: '#29977E', // green
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: 'black',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#1518271a', //gray
  labelColor: 'black',
  labelSize: 13,
  currentStepLabelColor: 'black',
};

const ShopSetUp = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  const [currentPosition, setCurrentPosition] = useState(1);
  const [individual, setIndividual] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Shop');

  const handleClickIndividual = (option, active) => {
    setSelectedOption(option);
    setIndividual(active);
  };

  const onSubmit = data => {
    // console.log('data++++++', data);
    if (currentPosition !== 2) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <VendorHeader />
      <ScrollView>
        <View style={{position: 'relative'}}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../images/banner.jpg')}
              style={[styles.imageDark, {width: '100%', height: 250}]}
            />
            <View style={styles.overlay}></View>
            <View style={styles.imgOverTextMain}>
              <Text style={styles.imgOverText}>
                Selling{' '}
                <Text style={[styles.imgOverText, styles.imgOverTextInner]}>
                  Only The Best Things
                </Text>{' '}
                Online
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  gap: 20,
                  marginTop: 24,
                }}>
                <View style={{width: '50%'}}>
                  <CustomButton
                    name="Shop"
                    color="white"
                    backgroundColor={
                      selectedOption === 'Shop'
                        ? '#29977E'
                        : 'rgba(255, 255, 255, 0.00)'
                    }
                    borderColor={selectedOption === 'Shop' ? '#29977E' : 'gray'}
                    onPress={() => handleClickIndividual('Shop', false)}
                  />
                </View>
                <View style={{width: '50%'}}>
                  <CustomButton
                    name="Individual"
                    color="white"
                    backgroundColor={
                      selectedOption === 'Individual'
                        ? '#29977E'
                        : 'rgba(255, 255, 255, 0.00)'
                    }
                    borderColor={
                      selectedOption === 'Individual' ? '#29977E' : 'gray'
                    }
                    onPress={() => handleClickIndividual('Individual', true)}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.mainBottomContainer,
              {
                backgroundColor: 'white',
                marginHorizontal: 20,
                paddingBottom: 30,
              },
            ]}>
            <View style={styles.labelContainer}>
              <Text
                style={[
                  styles.labelText,
                  0 === currentPosition && styles.currentLabel,
                ]}>
                Details
              </Text>
              <Text
                style={[
                  styles.labelText,
                  1 === currentPosition && styles.currentLabel,
                ]}>
                Photos
              </Text>
              <Text
                style={[
                  styles.labelText,
                  2 === currentPosition && styles.currentLabel,
                  {
                    paddingRight: 2,
                  },
                ]}>
                Branches
              </Text>
            </View>
            <View style={{paddingRight: 10}}>
              <StepIndicator
                stepCount={3}
                customStyles={customStyles}
                currentPosition={currentPosition}
                // labels={labels}
              />
            </View>
            {currentPosition === 0 && (
              <ShopSetUpScreenOne
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                setCurrentPosition={setCurrentPosition}
                individual={individual}
              />
            )}
            {currentPosition === 1 && (
              <ShopSetUpScreenTwo
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopSetUp;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  imgOverTextMain: {
    position: 'absolute',
    top: 30,
    alignSelf: 'center',
    width: 220,
  },
  imgOverText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
    fontFamily: FontStyle,
  },
  imgOverTextInner: {
    fontSize: 24,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.56)',
    fontFamily: FontStyle,
  },

  mainBottomContainer: {
    position: 'relative',
    bottom: 60,
    borderRadius: 4,
  },

  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // You can adjust this width as needed
    marginTop: 20, // Adjust the margin as needed
    paddingHorizontal: 39,
  },
  labelText: {
    textAlign: 'center',
    fontSize: 13,
    color: 'black', // Set the label color as needed
    marginBottom: 10,
  },
  currentLabel: {
    fontWeight: 'bold', // Highlight the current label if needed
  },
});
