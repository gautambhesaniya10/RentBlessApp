import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import VendorHeader from '../../../components/VendorHeader';
import {FontStyle} from '../../../../CommonStyle';
import CustomButton from '../../../common/CustomButton';
import StepIndicator from 'react-native-step-indicator';
import {useForm} from 'react-hook-form';
import ShopSetUpScreenOne from './ShopSetUpScreenOne';
import ShopSetUpScreenTwo from './ShopSetUpScreenTwo';
import ShopSetUpScreenThree from './ShopSetUpScreenThree';
import {SingleImageUploadFile} from '../../../services/SingleImageUploadFile';
import {MultipleImageUploadFile} from '../../../services/MultipleImageUploadFile';
import {VideoUploadFile} from '../../../services/VideoUploadFile';
import {shopRegistration} from '../../../graphql/mutations/shops';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setShopRegisterId} from '../../../redux/LoginUserProfileSlice/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'native-base';
import {homeCoverImage} from '../../../common/AllLiveImageLink';
import VersionAppModel from '../../AppVersionModel/VersionApp';

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
  const toast = useToast();
  const navigation = useNavigation();
  const userProfile = useSelector(state => state?.user.userProfile);
  const dispatch = useDispatch();
  const {versionData} = useSelector(state => state?.appVersion);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm();

  const [currentPosition, setCurrentPosition] = useState(1);
  const [individual, setIndividual] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Shop');

  const [uploadShopLogo, setUploadShopLogo] = useState('');
  const [uploadShopBackground, setUploadShopBackground] = useState('');
  const [uploadShopImages, setUploadShopImages] = useState([]);
  const [uploadShopVideo, setUploadShopVideo] = useState('');
  const [loading, setLoading] = useState(false);
  const [subBranch, setSubBranch] = useState([
    {
      id: 1,
      subManagerAddress: 'godhanidenis@gmail.com',
      subManagerCity: 'surat',
      subManagerPinCode: '520147',
      subManagerFirstName: 'Denis',
      subManagerLastName: 'Godhani',
      subManagerEmail: 'godhanidenis@gmail.com',
      subManagerPhone: '9537256159',
    },
    {
      id: 2,
      subManagerAddress: 'godhanidenis@gmail.com',
      subManagerCity: 'surat',
      subManagerPinCode: '520147',
      subManagerFirstName: 'Denis',
      subManagerLastName: 'Godhani',
      subManagerEmail: 'godhanidenis@gmail.com',
      subManagerPhone: '9537256159',
    },
    {
      id: 3,
      subManagerAddress: 'godhanidenis@gmail.com',
      subManagerCity: 'surat',
      subManagerPinCode: '520147',
      subManagerFirstName: 'Denis',
      subManagerLastName: 'Godhani',
      subManagerEmail: 'godhanidenis@gmail.com',
      subManagerPhone: '9537256159',
    },
  ]);

  const [hours, setHours] = useState([
    {key: 'Sunday', value: ['09:00 AM - 10:00 PM']},
    {key: 'Monday', value: ['09:00 AM - 10:00 PM']},
    {key: 'Tuesday', value: ['07:00 AM - 08:00 PM']},
    {key: 'Wednesday', value: ['09:00 AM - 08:00 PM']},
    {key: 'Thursday', value: ['09:00 AM - 08:00 PM']},
    {key: 'Friday', value: ['09:00 AM - 08:00 PM']},
    {key: 'Saturday', value: ['09:00 AM - 08:00 PM']},
  ]);

  useEffect(() => {
    const handleBackButton = () => {
      // BackHandler.exitApp();
      navigation.navigate('Splash');
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleClickIndividual = (option, active) => {
    setSelectedOption(option);
    setIndividual(active);
  };
  const returnSubBranchData = val => {
    return {
      branch_address: val.subManagerAddress,
      branch_pinCode: val.subManagerPinCode,
      branch_city: val.city,
      manager_name: val.subManagerFirstName + ' ' + val.subManagerLastName,
      manager_contact: val.subManagerPhone,
      manager_email: val.manager_user_email,
      branch_type: 'sub',
    };
  };
  const onSubmit = data => {
    if (currentPosition !== 2) {
      setCurrentPosition(currentPosition + 1);
    } else {
      setLoading(true);
      if (data) {
        SingleImageUploadFile(uploadShopLogo).then(
          logoResponse => {
            SingleImageUploadFile(uploadShopBackground).then(
              backgroundResponse => {
                MultipleImageUploadFile(uploadShopImages).then(
                  imagesResponse => {
                    uploadShopVideo !== ''
                      ? VideoUploadFile(uploadShopVideo).then(videoResponse => {
                          shopRegistration({
                            userId: userProfile?.id,
                            ownerInfo: {
                              owner_firstName: data.first_name,
                              owner_lastName: data.last_name,
                              owner_email: data.user_email,
                              owner_contact: data.user_contact,
                            },
                            shopInfo: {
                              shop_logo: logoResponse.data.data.singleUpload,
                              shop_cover_image:
                                backgroundResponse.data.data.singleUpload,
                              shop_images:
                                imagesResponse.data.data.multipleUpload?.map(
                                  itm => {
                                    return {links: itm};
                                  },
                                ),
                              shop_video: videoResponse.data.data.singleUpload,
                              form_steps: '3',
                              shop_social_link: {
                                facebook: individual ? '' : data.facebook_link,
                                instagram: individual
                                  ? ''
                                  : data.instagram_link,
                                website: individual
                                  ? ''
                                  : data.personal_website,
                              },
                              shop_name: data.shop_name,
                              shop_email: data.shop_email,
                              shop_type: individual ? 'individual' : 'shop',
                              shop_time: hours?.map(day => {
                                return {
                                  week: day['key'],
                                  open_time:
                                    day['value'][0] === 'Closed' ||
                                    day['value'][0] === 'Open 24 hours'
                                      ? '-'
                                      : day['value'][0].split(' - ')[0],
                                  close_time:
                                    day['value'][0] === 'Closed' ||
                                    day['value'][0] === 'Open 24 hours'
                                      ? '-'
                                      : day['value'][0].split(' - ')[1],
                                  is_close:
                                    day['value'][0] === 'Closed' ? true : false,
                                  is_24Hours_open:
                                    day['value'][0] === 'Open 24 hours'
                                      ? true
                                      : false,
                                };
                              }),
                            },
                            branchInfo: [
                              {
                                branch_address: data.address,
                                branch_city: data.city,
                                branch_pinCode: data.pin_code,
                                manager_name:
                                  data.manager_first_name +
                                  ' ' +
                                  data.manager_last_name,
                                manager_contact: data.manager_user_contact,
                                manager_email: data.manager_user_email,
                                branch_type: 'main',
                              },
                              ...(subBranch.length > 0
                                ? subBranch?.map(returnSubBranchData)
                                : []),
                            ],
                          }).then(
                            res => {
                              AsyncStorage.setItem(
                                'userHaveAnyShop',
                                JSON.stringify('true'),
                              );
                              dispatch(
                                setShopRegisterId(
                                  res.data.createShop.shopInfo.id,
                                ),
                              );
                              setLoading(false);
                              toast.show({
                                title: res.data.createShop.message,
                                placement: 'top',
                                backgroundColor: 'green.600',
                                variant: 'solid',
                              });
                              setTimeout(() => {
                                navigation.navigate('MainDashboard');
                              }, 1000);
                              // router.push('/vendor/dashboard');
                            },
                            error => {
                              setLoading(false);
                              toast.show({
                                title: error.message,
                                placement: 'top',
                                backgroundColor: 'red.600',
                                variant: 'solid',
                              });
                            },
                          );
                        })
                      : shopRegistration({
                          userId: userProfile.id,
                          ownerInfo: {
                            owner_firstName: data.first_name,
                            owner_lastName: data.last_name,
                            owner_email: data.user_email,
                            owner_contact: data.user_contact,
                          },
                          shopInfo: {
                            shop_logo: logoResponse.data.data.singleUpload,
                            shop_cover_image:
                              backgroundResponse.data.data.singleUpload,
                            shop_images:
                              imagesResponse.data.data.multipleUpload?.map(
                                itm => {
                                  return {links: itm};
                                },
                              ),
                            form_steps: '3',
                            shop_social_link: {
                              facebook: individual ? '' : data.facebook_link,
                              instagram: individual ? '' : data.instagram_link,
                              website: individual ? '' : data.personal_website,
                            },
                            shop_name: data.shop_name,
                            shop_email: data.shop_email,
                            shop_type: individual ? 'individual' : 'shop',
                            shop_time: hours?.map(day => {
                              return {
                                week: day['key'],
                                open_time:
                                  day['value'][0] === 'Closed' ||
                                  day['value'][0] === 'Open 24 hours'
                                    ? '-'
                                    : day['value'][0].split(' - ')[0],
                                close_time:
                                  day['value'][0] === 'Closed' ||
                                  day['value'][0] === 'Open 24 hours'
                                    ? '-'
                                    : day['value'][0].split(' - ')[1],
                                is_close:
                                  day['value'][0] === 'Closed' ? true : false,
                                is_24Hours_open:
                                  day['value'][0] === 'Open 24 hours'
                                    ? true
                                    : false,
                              };
                            }),
                          },
                          branchInfo: [
                            {
                              branch_address: data.address,
                              branch_pinCode: data.pin_code,
                              branch_city: data.city,
                              manager_name:
                                data.manager_first_name +
                                ' ' +
                                data.manager_last_name,
                              manager_contact: data.manager_user_contact,
                              manager_email: data.manager_user_email,
                              branch_type: 'main',
                            },
                            ...(subBranch.length > 0
                              ? subBranch?.map(returnSubBranchData)
                              : []),
                          ],
                        }).then(
                          res => {
                            console.log('res:::ssssssssss', res);
                            AsyncStorage.setItem(
                              'userHaveAnyShop',
                              JSON.stringify('true'),
                            );
                            dispatch(
                              setShopRegisterId(
                                res.data.createShop.shopInfo.id,
                              ),
                            );
                            setLoading(false);
                            toast.show({
                              title: res.data.createShop.message,
                              placement: 'top',
                              backgroundColor: 'green.600',
                              variant: 'solid',
                            });
                            setTimeout(() => {
                              navigation.navigate('MainDashboard');
                            }, 1000);
                          },
                          error => {
                            setLoading(false);
                            toast.show({
                              title: error.message,
                              placement: 'top',
                              backgroundColor: 'red.600',
                              variant: 'solid',
                            });
                          },
                        );
                  },
                );
              },
            );
          },
          error => {
            console.log('ereo999999', error);
          },
        );
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <VendorHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{position: 'relative'}}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: homeCoverImage}}
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
                hours={hours}
                setHours={setHours}
              />
            )}
            {currentPosition === 1 && (
              <ShopSetUpScreenTwo
                setUploadShopLogo={setUploadShopLogo}
                setUploadShopBackground={setUploadShopBackground}
                uploadShopImages={uploadShopImages}
                setUploadShopImages={setUploadShopImages}
                setUploadShopVideo={setUploadShopVideo}
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
              />
            )}
            {currentPosition === 2 && (
              <ShopSetUpScreenThree
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                onSubmit={onSubmit}
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
                individual={individual}
                subBranch={subBranch}
                setSubBranch={setSubBranch}
              />
            )}
            <View
              style={{
                marginTop: 40,
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 10,
              }}>
              {currentPosition !== 0 && (
                <View style={{width: '45%'}}>
                  <CustomButton
                    name="Back"
                    color="#29977E"
                    backgroundColor="white"
                    borderColor="#29977E"
                    onPress={() => setCurrentPosition(currentPosition - 1)}
                  />
                </View>
              )}

              <View style={{width: '45%'}}>
                <CustomButton
                  name={currentPosition === 2 ? 'Save' : 'Next'}
                  color="#FFFFFF"
                  backgroundColor="#29977E"
                  borderColor="#29977E"
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <VersionAppModel
        modalVisible={versionData?.versionModelVisible}
        versionData={versionData}
      />
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
