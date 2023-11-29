import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../../../common/CustomButton';
import {FontStyle} from '../../../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {shopUpdate} from '../../../../graphql/mutations/shops';
import {useToast} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import {fileDelete, fileUpdate, fileUpload} from '../../../../wasabi';
import FastImage from 'react-native-fast-image';
import {isFileOfType} from '../../../../utils';

const ShopLayoutTab = ({
  vendorShopDetails,
  useProfileData,
  updateVendorShopDetailStore,
}) => {
  const toast = useToast();
  const [shopLogo, setShopLogo] = useState('');
  const [uploadShopLogo, setUploadShopLogo] = useState('');
  const [deleteShopLogo, setDeleteShopLogo] = useState('');

  const [shopBackground, setShopBackground] = useState('');
  const [uploadShopBackground, setUploadShopBackground] = useState('');
  const [deleteShopBackground, setDeleteShopBackground] = useState('');

  const [shopImages, setShopImages] = useState([]);
  const [editableShopImages, setEditableShopImages] = useState([]);

  const [shopImagesWasabiUrl, setShopImageWasabiUrl] = useState([]);
  const [deleteShopImages, setDeleteShopImages] = useState([]);

  const [shopVideo, setShopVideo] = useState('');
  const [uploadShopVideo, setUploadShopVideo] = useState('');
  const [deleteShopVideo, setDeleteShopVideo] = useState('');

  const [shopLayoutLoading, setShopLayoutLoading] = useState(false);

  // const srcToFile = async (src, fileName, mimeType) => {
  //   const response = await RNFetchBlob.fetch('GET', src);
  //   const buf = await response.blob();
  //   const file = new File([buf], fileName, {type: mimeType});

  //   let ext = '';
  //   if (mimeType === 'image/png') {
  //     ext = 'jpg';
  //   } else if (mimeType === 'video') {
  //     ext = 'mp4';
  //   }
  //   const storeLocalUrl = await RNFetchBlob.config({
  //     fileCache: true,
  //     appendExt: ext,
  //   }).fetch('GET', src);
  //   const imagePath = storeLocalUrl.path();
  //   const imagePathModify = `file://${imagePath}`;

  //   const reFactorFile = {
  //     ...file?._data,
  //     fileName: file?._data?.name,
  //     fileSize: file?._data?.size,
  //     uri: imagePathModify,
  //   };

  //   return reFactorFile;
  // };

  useEffect(() => {
    setShopImages([]);
    setEditableShopImages([]);

    if (vendorShopDetails) {
      setShopLogo(vendorShopDetails?.shop_logo);

      setShopBackground(vendorShopDetails?.shop_cover_image);

      setShopImageWasabiUrl([...vendorShopDetails?.shop_images]);
      setShopImages([...vendorShopDetails?.shop_images]);

      vendorShopDetails?.shop_video &&
        setShopVideo(vendorShopDetails?.shop_video);
    }
  }, [vendorShopDetails]);

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
        const acceptedFileTypes = ['png', 'jpg', 'jpeg', 'webp', 'heic'];
        const fileName = response.assets[0].fileName || '';
        if (isFileOfType(fileName, acceptedFileTypes)) {
          setShopLogo(response.assets[0].uri);
          setUploadShopLogo(response.assets[0]);
          setDeleteShopLogo('');
        } else {
          toast.show({
            title: 'Selected file type is not supported',
            placement: 'top',
            backgroundColor: 'red.600',
            variant: 'solid',
          });
        }
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
        const acceptedFileTypes = ['png', 'jpg', 'jpeg', 'webp', 'heic'];
        const fileName = response.assets[0].fileName || '';
        if (isFileOfType(fileName, acceptedFileTypes)) {
          setShopBackground(response.assets[0].uri);
          setUploadShopBackground(response.assets[0]);
          setDeleteShopBackground('');
        } else {
          toast.show({
            title: 'Selected file type is not supported',
            placement: 'top',
            backgroundColor: 'red.600',
            variant: 'solid',
          });
        }
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
        const acceptedFileTypes = ['png', 'jpg', 'jpeg', 'webp', 'heic'];
        const fileName = response.assets[0].fileName || '';
        if (isFileOfType(fileName, acceptedFileTypes)) {
          let deleteShopImagesData = deleteShopImages;

          deleteShopImagesData[index] = undefined;
          setDeleteShopImages(() => [...deleteShopImagesData]);

          let editableShopImagesData = editableShopImages;
          editableShopImagesData[index] = {
            oldLink: shopImagesWasabiUrl[index]?.links,
            newData: response.assets[0],
          };

          const newImage = [...shopImages];
          newImage[index] = {links: response.assets[0].uri};
          setShopImages(newImage);
        } else {
          toast.show({
            title: 'Selected file type is not supported',
            placement: 'top',
            backgroundColor: 'red.600',
            variant: 'solid',
          });
        }
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
        setDeleteShopVideo('');
      }
    });
  };

  const deleteImageFiles = async (deletableProducts, type) => {
    try {
      const deletionPromises = deletableProducts.map(deleteProduct =>
        fileDelete(deleteProduct, type),
      );
      await Promise.all(deletionPromises);
    } catch (error) {
      console.error('Error deleting files:', error);
    }
  };

  const emptyImageStates = () => {
    setShopLogo('');
    setUploadShopLogo('');
    setShopBackground('');
    setUploadShopBackground('');
    setShopImages([]);
    setShopImageWasabiUrl([]);
    setEditableShopImages([]);
    setDeleteShopImages([]);
    setDeleteShopLogo('');
    setDeleteShopBackground('');
    setDeleteShopVideo('');
    setShopVideo('');
    setUploadShopVideo('');
  };

  const shopLayoutOnSubmit = async () => {
    setShopLayoutLoading(true);

    let logoResponse = '';
    let backgroundResponse = '';
    let imagesResponse = [];
    let videoResponse = null;

    if (deleteShopLogo) {
      await deleteImageFiles([deleteShopLogo], 'image');
    }

    if (deleteShopBackground) {
      await deleteImageFiles([deleteShopBackground], 'image');
    }

    if (deleteShopImages?.filter(itm => itm !== undefined).length > 0) {
      await deleteImageFiles(
        deleteShopImages?.filter(itm => itm !== undefined),
        'image',
      );
    }

    if (deleteShopVideo) {
      await deleteImageFiles([deleteShopVideo], 'video');
    }

    if (uploadShopLogo) {
      if (vendorShopDetails?.shop_logo) {
        try {
          const shopLogoRes = await fileUpdate(
            vendorShopDetails?.shop_logo,
            'image',
            uploadShopLogo,
          );
          logoResponse = shopLogoRes;
        } catch (error) {
          console.error('Error during file upload:', error);
          return;
        }
      } else {
        try {
          const shopLogoRes = await fileUpload(uploadShopLogo);
          logoResponse = shopLogoRes;
        } catch (error) {
          console.error('Error during file upload:', error);
          return;
        }
      }
    }

    if (uploadShopBackground) {
      if (vendorShopDetails?.shop_cover_image) {
        try {
          const shopCoverRes = await fileUpdate(
            vendorShopDetails?.shop_cover_image,
            'image',
            uploadShopBackground,
          );
          backgroundResponse = shopCoverRes;
        } catch (error) {
          console.error('Error during file upload:', error);
          return;
        }
      } else {
        try {
          const shopCoverRes = await fileUpload(uploadShopBackground);
          backgroundResponse = shopCoverRes;
        } catch (error) {
          console.error('Error during file upload:', error);
          return;
        }
      }
    }

    if (editableShopImages?.length > 0) {
      const uploadPromises = editableShopImages
        ?.filter(itm => itm !== undefined)
        ?.map(shopImage => {
          if (shopImage?.oldLink) {
            return fileUpdate(shopImage?.oldLink, 'image', shopImage?.newData);
          } else {
            return fileUpload(shopImage?.newData);
          }
        });

      try {
        const updateShopImgs = await Promise.all(uploadPromises);
        imagesResponse = updateShopImgs;
      } catch (error) {
        console.error('Error during file upload:', error);
        return;
      }
    }

    if (uploadShopVideo) {
      if (vendorShopDetails?.shop_video) {
        try {
          const shopVideoRes = await fileUpdate(
            vendorShopDetails?.shop_video,
            'video',
            uploadShopVideo,
          );
          videoResponse = shopVideoRes;
        } catch (error) {
          console.error('Error during file upload:', error);
          return;
        }
      } else {
        try {
          const shopVideoRes = await fileUpload(uploadShopVideo);
          videoResponse = shopVideoRes;
        } catch (error) {
          console.error('Error during file upload:', error);
          return;
        }
      }
    }

    const existingLinks = shopImagesWasabiUrl.map(item => item.links);

    const filteredImageResponse = imagesResponse?.filter(
      item => !existingLinks.includes(item),
    );

    let combinedLinks = [
      ...shopImagesWasabiUrl,
      ...filteredImageResponse.map(links => ({links})),
    ];

    if (deleteShopImages?.filter(itm => itm !== undefined).length > 0) {
      combinedLinks = combinedLinks.filter(linkObj => {
        return !deleteShopImages
          ?.filter(itm => itm !== undefined)
          .includes(linkObj.links);
      });
    }

    await shopUpdate({
      shopLayout: {
        id: useProfileData?.userCreatedShopId,
        shop_logo:
          logoResponse || (deleteShopLogo ? '' : vendorShopDetails?.shop_logo),
        shop_cover_image:
          backgroundResponse ||
          (deleteShopBackground ? '' : vendorShopDetails?.shop_cover_image),
        shop_images: combinedLinks?.map(item => ({
          links: item.links,
        })),
        shop_video:
          videoResponse ||
          (deleteShopVideo ? '' : vendorShopDetails?.shop_video),
      },
    }).then(
      res => {
        toast.show({
          title: res.data.updateShop.message,
          placement: 'top',
          backgroundColor: 'green.600',
          variant: 'solid',
        });
        emptyImageStates();
        setShopLayoutLoading(false);
        updateVendorShopDetailStore();
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
                <FastImage
                  style={{width: 150, height: 150, borderRadius: 100}}
                  source={{
                    uri: shopLogo,
                    cache: FastImage.cacheControl.web,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    onPress={() => ChooseShopLogoImage()}
                    style={styles.editIconMain}>
                    <Icon name="pencil" size={16} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShopLogo('');
                      setUploadShopLogo('');
                      setDeleteShopLogo(vendorShopDetails?.shop_logo);
                    }}
                    style={styles.trashIconMain}>
                    <Icon name="trash" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </TouchableOpacity>

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
                <FastImage
                  style={{width: '100%', height: 148, borderRadius: 10}}
                  source={{
                    uri: shopBackground,
                    cache: FastImage.cacheControl.web,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    gap: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => ChooseShopCoverImage()}
                    style={[styles.editIconMain]}>
                    <Icon name="pencil" size={16} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShopBackground('');
                      setUploadShopBackground('');
                      setDeleteShopBackground(
                        vendorShopDetails?.shop_cover_image,
                      );
                    }}
                    style={[styles.trashIconMain]}>
                    <Icon name="trash" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </TouchableOpacity>

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
                          key={index}
                          style={styles.shopImagesMain}>
                          <FastImage
                            style={{width: 112, height: 112, borderRadius: 10}}
                            source={{
                              uri: shopImages[index]?.links,
                              cache: FastImage.cacheControl.web,
                            }}
                            resizeMode="cover"
                          />
                          <View
                            style={{
                              position: 'absolute',
                              top: 6,
                              right: 0,
                              gap: 5,
                            }}>
                            <TouchableOpacity
                              onPress={() => ChooseShopImages(index)}
                              style={[styles.editIconMain]}>
                              <Icon name="pencil" size={16} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setShopImages(
                                  shopImages?.filter(
                                    (itm, idx) => idx !== index,
                                  ),
                                );

                                setEditableShopImages(
                                  editableShopImages.filter(
                                    (itm, idx) => idx !== index,
                                  ),
                                );

                                let deleteShopImagesData = deleteShopImages;

                                deleteShopImagesData[index] =
                                  shopImagesWasabiUrl[index]?.links;
                                setDeleteShopImages(() => [
                                  ...deleteShopImagesData,
                                ]);

                                let shopImagesData = shopImages;
                                shopImagesData[index] = undefined;
                                setShopImages(() => [...shopImagesData]);
                              }}
                              style={[styles.trashIconMain]}>
                              <Icon name="trash" size={16} color="white" />
                            </TouchableOpacity>
                          </View>
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
                <View
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 0,
                    gap: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => ChooseShopVideo()}
                    style={[styles.editIconMain, {top: 10, right: 10}]}>
                    <Icon name="pencil" size={16} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShopVideo('');
                      setUploadShopVideo('');
                      setDeleteShopVideo(vendorShopDetails?.shop_video);
                    }}
                    style={[styles.trashIconMain, {top: 10, right: 10}]}>
                    <Icon name="trash" size={16} color="white" />
                  </TouchableOpacity>
                </View>
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
  },

  trashIconMain: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 6,
  },
});
