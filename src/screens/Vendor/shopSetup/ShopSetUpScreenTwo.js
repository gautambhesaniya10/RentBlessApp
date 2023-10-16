import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontStyle} from '../../../../CommonStyle';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';

const ShopSetUpScreenTwo = ({
  setCurrentPosition,
  currentPosition,
  uploadShopLogo,
  setUploadShopLogo,
  uploadShopBackground,
  setUploadShopBackground,
  uploadShopImages,
  setUploadShopImages,
  setUploadShopVideo,
}) => {
  const [shopLogo, setShopLogo] = useState('');
  const [shopBackground, setShopBackground] = useState('');
  const [shopImages, setShopImages] = useState([]);
  const ShopImgsError = shopImages?.filter(item => item !== undefined);
  const [shopVideo, setShopVideo] = useState('');
  const [error, setError] = useState({});

  const Validate = () => {
    let isValid = true;
    const error = {};
    if (shopLogo === '') {
      isValid = false;
      error['shopLogo'] = 'Please Select logo*';
    }
    if (shopBackground === '') {
      isValid = false;
      error['shopBackground'] = 'Please Select shop background*';
    }
    if (ShopImgsError.length !== 3) {
      isValid = false;
      error['shopImages'] = 'Please Select shop images*';
    }

    setError(error);
    return isValid;
  };

  useEffect(() => {
    if (ShopImgsError?.length === 3) {
      setError({...error, shopImages: ''});
    }
  }, [ShopImgsError?.length]);

  const HandleNextScreen = () => {
    if (Validate()) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  const ChooseShopLogoImage = () => {
    let options = {
      title: 'Select Shop Logo',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose image from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      // mediaType: 'video',
      // videoQuality: 'high',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setShopLogo(response.assets[0].uri);
        setUploadShopLogo(response.assets[0]);
        setError({...error, shopLogo: ''});
      }
    });
  };

  const ChooseShopCoverImage = () => {
    let options = {
      title: 'Select Shop Cover Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose image from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setShopBackground(response.assets[0].uri);
        setUploadShopBackground(response.assets[0]);
        setError({...error, shopBackground: ''});
      }
    });
  };
  const ChooseShopImages = index => {
    let options = {
      title: 'Select Shop Cover Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose image from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const newImage = [...shopImages]; // Create a copy of the array
        newImage[index] = response.assets[0].uri; // Update value at the specified index
        setShopImages(newImage);

        const newImageFile = [...uploadShopImages]; // Create a copy of the array
        newImageFile[index] = response.assets[0]; // Update value at the specified index
        setUploadShopImages(newImageFile);
      }
    });
  };

  const ChooseShopVideo = () => {
    let options = {
      title: 'Select Shop Video',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose video from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'video',
      videoQuality: 'high',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setShopVideo(response.assets[0].uri);
        setUploadShopVideo(response.assets[0]);
      }
    });
  };

  return (
    <View style={{marginHorizontal: 16}}>
      <TouchableOpacity
        onPress={() => ChooseShopLogoImage()}
        style={styles.logoMainDiv}>
        {shopLogo === '' ? (
          <>
            <Icon name="image" size={25} color="black" />
            <Text style={styles.uploadText}>Click to Upload </Text>
            <Text style={styles.uploadTextInner}>Logo </Text>
          </>
        ) : (
          <Image
            source={{uri: shopLogo}}
            style={{width: 150, height: 150, borderRadius: 100}}
          />
        )}
      </TouchableOpacity>
      {error?.shopLogo && (
        <Text style={[styles.errorText, {alignSelf: 'center'}]}>
          {error?.shopLogo}
        </Text>
      )}

      {/* <View style={{width: '45%'}}>
        <CustomButton
          name="upload"
          color="#FFFFFF"
          backgroundColor="#29977E"
          borderColor="#29977E"
          onPress={() => fileDelete()}
        />
      </View> */}

      <TouchableOpacity
        onPress={() => ChooseShopCoverImage()}
        style={styles.coverMainDiv}>
        {shopBackground === '' ? (
          <>
            <Icon name="image" size={25} color="black" />
            <Text style={styles.uploadText}>Click to Upload </Text>
            <Text style={styles.uploadTextInner}>Cover Image </Text>
          </>
        ) : (
          <Image
            resizeMode="cover"
            source={{uri: shopBackground}}
            style={{width: '100%', height: 148, borderRadius: 10}}
          />
        )}
      </TouchableOpacity>

      {error?.shopBackground && (
        <Text style={styles.errorText}>{error?.shopBackground}</Text>
      )}

      <Text style={styles.shopImgText}>Shop Images</Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
        }}>
        {['One', 'Two', 'Three']?.map((item, index) => {
          return (
            <>
              {shopImages[index] ? (
                <TouchableOpacity
                  onPress={() => ChooseShopImages(index)}
                  key={item}
                  style={styles.shopImagesMain}>
                  <Image
                    resizeMode="cover"
                    source={{uri: shopImages[index]}}
                    style={{width: 112, height: 112, borderRadius: 10}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => ChooseShopImages(index)}
                  key={item}
                  style={[styles.shopImagesMain, {width: '30%'}]}>
                  <Icon name="image" size={23} color="black" />
                  <Text style={[styles.uploadText, {fontSize: 12}]}>
                    Click to Upload
                  </Text>
                  <Text style={styles.uploadTextInner}>Shop Image </Text>
                </TouchableOpacity>
              )}
            </>
          );
        })}
      </View>

      {error?.shopImages && (
        <Text style={styles.errorText}>{error?.shopImages}</Text>
      )}

      <Text style={styles.shopImgText}>Shop Video</Text>
      <TouchableOpacity
        onPress={() => ChooseShopVideo()}
        style={[styles.coverMainDiv, {marginTop: 0}]}>
        {shopVideo === '' ? (
          <>
            <Icon name="image" size={25} color="black" />
            <Text style={styles.uploadText}>Click to Upload </Text>
            <Text style={styles.uploadTextInner}>Shop Video </Text>
          </>
        ) : (
          <Video
            source={{
              uri: shopVideo,
            }}
            style={{width: '100%', height: 150, borderRadius: 10}}
            // controls={true}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
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
    width: 112,
    height: 112,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
    width: '30%',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 6,
  },
});
