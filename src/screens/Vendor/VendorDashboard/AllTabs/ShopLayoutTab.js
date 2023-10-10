import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../../../common/CustomTextInput';
import CustomButton from '../../../../common/CustomButton';
import {getShopOwnerDetail} from '../../../../graphql/queries/shopQueries';
import {FontStyle} from '../../../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import {deleteMedia} from '../../../../graphql/mutations/deleteMedia';
import {SingleImageUploadFile} from '../../../../services/SingleImageUploadFile';
import {MultipleImageUploadFile} from '../../../../services/MultipleImageUploadFile';
import {VideoUploadFile} from '../../../../services/VideoUploadFile';
import {shopUpdate} from '../../../../graphql/mutations/shops';
import {useToast} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';

const ShopLayoutTab = ({vendorShopDetails, useProfileData}) => {
  const toast = useToast();

  const [shopLogo, setShopLogo] = useState('');
  const [shopBackground, setShopBackground] = useState('');
  const [shopImages, setShopImages] = useState([]);
  // const ShopImgsError = shopImages?.filter(item => item !== undefined);
  const [shopVideo, setShopVideo] = useState('');

  const [uploadShopLogo, setUploadShopLogo] = useState('');
  const [uploadShopBackground, setUploadShopBackground] = useState('');
  const [uploadShopImages, setUploadShopImages] = useState([]);
  const [uploadShopVideo, setUploadShopVideo] = useState('');
  const [shopLayoutAllMediaImages, setShopLayoutAllMediaImages] = useState([]);
  const [shopLayoutAllMediaVideos, setShopLayoutAllMediaVideos] = useState();

  const [error, setError] = useState({});
  const [shopLayoutLoading, setShopLayoutLoading] = useState(false);

  const srcToFile = async (src, fileName, mimeType) => {
    const response = await RNFetchBlob.fetch('GET', src);
    const buf = await response.blob();
    const file = new File([buf], fileName, {type: mimeType});

    let ext = '';
    if (mimeType === 'image/png') {
      ext = 'jpg';
    } else if (mimeType === 'video') {
      ext = 'mp4';
    }
    const storeLocalUrl = await RNFetchBlob.config({
      fileCache: true,
      appendExt: ext,
    }).fetch('GET', src);
    const imagePath = storeLocalUrl.path();
    const imagePathModify = `file://${imagePath}`;

    const reFactorFile = {
      ...file?._data,
      fileName: file?._data?.name,
      fileSize: file?._data?.size,
      uri: imagePathModify,
    };

    return reFactorFile;
  };

  useEffect(() => {
    setShopImages([]);
    setUploadShopImages([]);
    if (useProfileData?.userCreatedShopId) {
      {
        vendorShopDetails?.shop_logo &&
          srcToFile(
            vendorShopDetails?.shop_logo,
            'profileLogo.png',
            'image/png',
          ).then(function (file) {
            setUploadShopLogo(file);
          });
      }
      setShopLogo(vendorShopDetails?.shop_logo);

      {
        vendorShopDetails?.shop_cover_image &&
          srcToFile(
            vendorShopDetails?.shop_cover_image,
            'profileBackGround.png',
            'image/png',
          ).then(function (file) {
            setUploadShopBackground(file);
          });
      }
      setShopBackground(vendorShopDetails?.shop_cover_image);

      vendorShopDetails?.shop_images?.map(img => {
        img?.links &&
          srcToFile(img?.links, 'profile.png', 'image/png').then(function (
            file,
          ) {
            setUploadShopImages(old => [...old, file]);
          });
        setShopImages(old => [...old, img?.links]);
      });

      {
        vendorShopDetails?.shop_video &&
          srcToFile(
            vendorShopDetails?.shop_video,
            'shopVideo.mp4',
            'video',
          ).then(function (file) {
            setUploadShopVideo(file);
          });
      }

      vendorShopDetails?.shop_video &&
        setShopVideo(vendorShopDetails?.shop_video);

      setShopLayoutAllMediaImages([
        vendorShopDetails?.shop_logo,
        vendorShopDetails?.shop_cover_image,
        ...(vendorShopDetails?.shop_images?.length > 0
          ? vendorShopDetails?.shop_images?.map(itm => itm.links)
          : []),
      ]);

      vendorShopDetails?.shop_video &&
        setShopLayoutAllMediaVideos(vendorShopDetails?.shop_video);
    }
  }, [useProfileData, vendorShopDetails]);

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
      mediaType: 'photo',
      // selectionLimit: 10,
      // maxWidth: 500,
      // maxHeight: 500,

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

  function fillArrayWithEmptyValues(arr, targetLength) {
    while (arr.length < targetLength) {
      arr.push({links: 'none'});
    }

    return arr;
  }

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
      // selectionLimit: 10
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

  console.log('uploadShopImages', uploadShopImages);
  const shopLayoutOnSubmit = async () => {
    setShopLayoutLoading(true);

    shopLayoutAllMediaImages
      .filter(itm => itm !== '' && itm !== null)
      .map(img =>
        deleteMedia({
          file: img,
          fileType: 'image',
        }).then(res => {
          setShopLayoutAllMediaImages([]);
        }),
      );

    shopLayoutAllMediaVideos !== undefined &&
      deleteMedia({
        file: shopLayoutAllMediaVideos,
        fileType: 'video',
      }).then(res => setShopLayoutAllMediaVideos());

    console.log('uploadShopImages-=-=-=-', uploadShopImages);

    let logoResponse = '';
    let backgroundResponse = '';
    let imagesResponse = '';
    let videoResponse = null;

    if (uploadShopLogo) {
      logoResponse = await SingleImageUploadFile(uploadShopLogo);
    }
    if (uploadShopBackground) {
      backgroundResponse = await SingleImageUploadFile(uploadShopBackground);
    }
    if (uploadShopImages?.filter(item => item !== undefined).length > 0) {
      imagesResponse = await MultipleImageUploadFile(
        uploadShopImages.filter(item => item !== undefined),
      );
    }
    if (uploadShopVideo) {
      videoResponse = await VideoUploadFile(uploadShopVideo);
    }

    await shopUpdate({
      shopLayout: {
        id: useProfileData?.userCreatedShopId,
        shop_logo: logoResponse?.data?.data?.singleUpload || '',
        shop_cover_image: backgroundResponse?.data?.data?.singleUpload || '',
        shop_images:
          imagesResponse?.data?.data?.multipleUpload?.map(itm => {
            return {links: itm};
          }) || [],
        shop_video: videoResponse?.data?.data?.singleUpload || '',
      },
    }).then(
      res => {
        console.log('owner res:::', res);
        toast.show({
          title: res.data.updateShop.message,
          placement: 'top',
          backgroundColor: 'green.600',
          variant: 'solid',
        });
        setShopLayoutLoading(false);
      },
      error => {
        setShopLayoutLoading(false);
        toast.show({
          title: error.message,
          placement: 'top',
          backgroundColor: 'red.600',
          variant: 'solid',
        });
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <View style={{marginBottom: 20}}>
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
              <>
                <Image
                  source={{uri: shopLogo}}
                  style={{width: 150, height: 150, borderRadius: 100}}
                />
                <TouchableOpacity
                  onPress={() => ChooseShopLogoImage()}
                  style={styles.editIconMain}>
                  <Icon name="pencil" size={16} color="white" />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
          {error?.shopLogo && (
            <Text style={[styles.errorText, {alignSelf: 'center'}]}>
              {error?.shopLogo}
            </Text>
          )}

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
              <>
                <Image
                  resizeMode="cover"
                  source={{uri: shopBackground}}
                  style={{width: '100%', height: 148, borderRadius: 10}}
                />
                <TouchableOpacity
                  onPress={() => ChooseShopCoverImage()}
                  style={[styles.editIconMain, {top: 10, right: 10}]}>
                  <Icon name="pencil" size={16} color="white" />
                </TouchableOpacity>
              </>
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
            {fillArrayWithEmptyValues([...shopImages], 3)?.length > 0 &&
              fillArrayWithEmptyValues([...shopImages], 3)?.map(
                (item, index) => {
                  return (
                    <>
                      {shopImages[index] ? (
                        <TouchableOpacity
                          onPress={() => ChooseShopImages(index)}
                          key={index}
                          style={styles.shopImagesMain}>
                          <Image
                            resizeMode="cover"
                            source={{uri: shopImages[index]}}
                            style={{width: 112, height: 112, borderRadius: 10}}
                          />
                          <TouchableOpacity
                            onPress={() => ChooseShopImages(index)}
                            style={[styles.editIconMain, {top: 5, right: 5}]}>
                            <Icon name="pencil" size={16} color="white" />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => ChooseShopImages(index)}
                          key={index}
                          style={[styles.shopImagesMain, {width: '30%'}]}>
                          <Icon name="image" size={23} color="black" />
                          <Text style={[styles.uploadText, {fontSize: 12}]}>
                            Click to Upload
                          </Text>
                          <Text style={styles.uploadTextInner}>
                            Shop Image{' '}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  );
                },
              )}
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
              <>
                <Video
                  source={{
                    uri: shopVideo,
                  }}
                  style={{width: '100%', height: 150, borderRadius: 10}}
                  // controls={true}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => ChooseShopVideo()}
                  style={[styles.editIconMain, {top: 10, right: 10}]}>
                  <Icon name="pencil" size={16} color="white" />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={{width: '100%'}}>
          <CustomButton
            name="Update"
            color="#FFFFFF"
            backgroundColor="#151827"
            borderColor="#29977E"
            onPress={() => shopLayoutOnSubmit()}
            loading={shopLayoutLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default ShopLayoutTab;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
  },
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
    position: 'relative',
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
    position: 'relative',
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
    position: 'relative',
    backgroundColor: '#FFF',
    alignItems: 'center',
    width: 112,
    height: 112,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
    width: '26%',
  },
  editIconMain: {
    backgroundColor: 'black',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 6,
  },
});
