import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../../../common/CustomTextInput';
import {Controller, useForm} from 'react-hook-form';
import CustomButton from '../../../../common/CustomButton';
import {NativeBaseProvider, Select, useToast} from 'native-base';
import AddProductDropDown from '../../../../common/AddProductDropDown';
import {getBranchLists} from '../../../../graphql/queries/branchListsQueries';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {FontStyle} from '../../../../../CommonStyle';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import {MultipleImageUploadFile} from '../../../../services/MultipleImageUploadFile';
import {createProduct} from '../../../../graphql/mutations/products';

const AddEditProduct = ({categories, userProfile, setOpenAddEditProduct}) => {
  const toast = useToast();

  const {
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    getValues,
    control,
  } = useForm();

  const [menCategoryLabel, setMenCategoryLabel] = useState([]);
  const [womenCategoryLabel, setWomenCategoryLabel] = useState([]);
  const [productType, setProductType] = useState('');
  const [branchList, setBranchList] = useState([]);
  const [editorDescriptionContent, setEditorDescriptionContent] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const [productImages, setProductImages] = useState([]);
  const [uploadProductImages, setUploadProductImages] = useState([]);
  const ProductImgError = productImages?.filter(item => item !== undefined);
  const [productVideo, setProductVideo] = useState('');
  const [uploadProductVideo, setUploadProductVideo] = useState();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [editProductId, setEditProductId] = useState();

  const richtext = useRef(null);

  const colorsList = [
    'red',
    'pink',
    'yellow',
    'wine',
    'purple',
    'blue',
    'orange',
    'green',
    'white',
    'black',
  ];
  const productTypeData = ['Men', 'Women'];

  const Validate = () => {
    let isValid = true;
    const error = {};

    if (ProductImgError.length !== 3) {
      isValid = false;
      error['productImages'] = 'Please Select Product images*';
    }

    setError(error);
    return isValid;
  };

  useEffect(() => {
    if (ProductImgError?.length === 3) {
      setError({...error, productImages: ''});
    }
  }, [ProductImgError?.length]);

  useEffect(() => {
    setMenCategoryLabel(
      categories?.filter(itm => itm?.category_type === 'Men').map(i => i),
    );
    setWomenCategoryLabel(
      categories?.filter(itm => itm?.category_type === 'Women').map(i => i),
    );
  }, [categories]);

  useEffect(() => {
    if (userProfile?.userCreatedShopId) {
      getBranchLists().then(res => {
        const branches = res?.data.branchList.filter(
          branch => branch.shop_id === userProfile?.userCreatedShopId,
        );

        setBranchList(branches);
      });
    }
  }, [userProfile]);

  const handleEditorChange = content => {
    setEditorDescriptionContent(content);

    if (content === '') {
      setErrorDescription('Product description is required');
    } else {
      setErrorDescription('');
    }
  };

  //   useEffect(() => {
  //     // Set the initial content when the component mounts
  //     richtext.current?.setContentHTML('<p>Hello, Rich Editor!</p>');
  //   }, []);

  const ChooseProductImages = index => {
    let options = {
      title: 'Select Product Image',
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
      } else {
        const newImage = [...productImages]; // Create a copy of the array
        newImage[index] = response.assets[0].uri; // Update value at the specified index
        setProductImages(newImage);

        const newImageFile = [...uploadProductImages]; // Create a copy of the array
        newImageFile[index] = response.assets[0]; // Update value at the specified index
        setUploadProductImages(newImageFile);
      }
    });
  };

  const ChooseProductVideo = () => {
    let options = {
      title: 'Select Product Video',
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
        setProductVideo(response.assets[0].uri);
        setUploadProductVideo(response.assets[0]);
      }
    });
  };

  const onSubmitProduct = data => {
    if (editorDescriptionContent === '') {
      setErrorDescription('Product description is required');
    } else if (Validate()) {
      setErrorDescription('');
      setLoading(true);
      if (editProductId === undefined) {
        MultipleImageUploadFile(uploadProductImages).then(res => {
          uploadProductVideo !== undefined
            ? VideoUploadFile(uploadProductVideo).then(videoResponse => {
                createProduct({
                  productInfo: {
                    branch_id: data.product_branch,
                    category_id: data.product_category,
                    product_color: data.product_color,
                    product_description: editorDescriptionContent,
                    product_name: data.product_name,
                    product_type: data.product_type,
                    product_image: {
                      front: res.data.data.multipleUpload[0],
                      back: res.data.data.multipleUpload[1],
                      side: res.data.data.multipleUpload[2],
                    },
                    product_video: videoResponse.data.data.singleUpload,
                  },
                }).then(
                  res => {
                    toast.show({
                      title: res.data.createProduct.message,
                      placement: 'top',
                      backgroundColor: 'green.600',
                      variant: 'solid',
                    });
                    setLoading(false);
                    handleProductListingModalClose();
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
            : createProduct({
                productInfo: {
                  branch_id: data.product_branch,
                  category_id: data.product_category,
                  product_color: data.product_color,
                  product_description: editorDescriptionContent,
                  product_name: data.product_name,
                  product_type: data.product_type,
                  product_image: {
                    front: res.data.data.multipleUpload[0],
                    back: res.data.data.multipleUpload[1],
                    side: res.data.data.multipleUpload[2],
                  },
                },
              }).then(
                res => {
                  console.log('res:::', res);
                  toast.show({
                    title: res.data.createProduct.message,
                    placement: 'top',
                    backgroundColor: 'green.600',
                    variant: 'solid',
                  });
                  setLoading(false);
                  handleProductListingModalClose();
                },
                error => {
                  setLoading(false);
                  toast.show({
                    title: rerror.message,
                    placement: 'top',
                    backgroundColor: 'red.600',
                    variant: 'solid',
                  });
                },
              );
        });
      }
    }
  };

  const handleProductListingModalClose = () => {
    reset();
    setProductType();
    setProductImages([]);
    setUploadProductImages([]);
    setProductVideo();
    setUploadProductVideo();
    setEditProductId();
    setOpenAddEditProduct(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <View style={styles.addBranchHeader}>
          <Icon
            onPress={() => setOpenAddEditProduct(false)}
            name="arrow-left"
            size={20}
            color="black"
          />
          <Text style={styles.addBranchText}>Back To All Products</Text>
        </View>
        <View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              label="Product Name"
              mode="outlined"
              control={control}
              name="product_name"
              rules={{
                required: 'Product Name is required *',
              }}
              activeOutlineColor="#29977E"
            />
            {errors?.product_name && (
              <Text style={{color: 'red'}}>
                {errors?.product_name?.message}
              </Text>
            )}
          </View>

          <View style={{marginBottom: 15}}>
            <AddProductDropDown
              name="product_color"
              label="Product Color"
              rules={{
                required: 'Product Color is required *',
              }}
              listData={colorsList}
              control={control}
            />
            {errors?.product_color && (
              <Text style={{color: 'red'}}>
                {errors?.product_color?.message}
              </Text>
            )}
          </View>
          <View style={{marginBottom: 15}}>
            <AddProductDropDown
              name="product_type"
              label="Product Type"
              rules={{
                required: 'Product Type is required *',
              }}
              listData={productTypeData}
              control={control}
              setProductType={setProductType}
              AllowGetProductType={true}
            />
            {errors?.product_type && (
              <Text style={{color: 'red'}}>
                {errors?.product_type?.message}
              </Text>
            )}
          </View>

          {productType && (
            <View style={{marginBottom: 15}}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <NativeBaseProvider>
                      <Select
                        selectedValue={value}
                        height="50"
                        placeholder="Product Category"
                        _selectedItem={{
                          bg: 'green.200',
                        }}
                        style={{fontSize: 16}}
                        onValueChange={onChange}>
                        {productType === 'Men'
                          ? menCategoryLabel?.map((item, index) => (
                              <Select.Item
                                key={index}
                                label={item?.category_name}
                                value={item?.id}
                              />
                            ))
                          : womenCategoryLabel?.map((item, index) => (
                              <Select.Item
                                key={index}
                                label={item?.category_name}
                                value={item?.id}
                              />
                            ))}
                      </Select>
                    </NativeBaseProvider>
                  );
                }}
                name="product_category"
                rules={{
                  required: 'Product Category is required *',
                }}
              />
              {errors?.product_category && (
                <Text style={{color: 'red'}}>
                  {errors?.product_category?.message}
                </Text>
              )}
            </View>
          )}

          <View style={{marginBottom: 15}}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => {
                return (
                  <NativeBaseProvider>
                    <Select
                      selectedValue={value}
                      height="50"
                      placeholder="Branch"
                      _selectedItem={{
                        bg: 'green.200',
                      }}
                      style={{fontSize: 16}}
                      onValueChange={onChange}>
                      {branchList?.map((item, index) => (
                        <Select.Item
                          key={index}
                          label={
                            item?.branch_address +
                            ' ' +
                            '(' +
                            item?.branch_type +
                            ')'
                          }
                          value={item?.id}
                        />
                      ))}
                    </Select>
                  </NativeBaseProvider>
                );
              }}
              name="product_branch"
              rules={{
                required: 'Branch is required *',
              }}
            />
            {errors?.product_branch && (
              <Text style={{color: 'red'}}>
                {errors?.product_branch?.message}
              </Text>
            )}
          </View>
          <View style={{marginBottom: 15}}>
            <View style={styles.container}>
              <Text style={styles.desText}>Description</Text>
              <RichToolbar
                style={styles.richToolbar}
                editor={richtext}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.undo,
                  actions.redo,
                ]}
              />
              <RichEditor
                ref={richtext}
                onChange={des => handleEditorChange(des)}
                style={styles.richEditor}
              />
            </View>
            {errorDescription && (
              <Text style={{color: 'red'}}>{errorDescription}</Text>
            )}
          </View>

          <Text style={styles.shopImgText}>Product Images</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {['One', 'Two', 'Three']?.map((item, index) => {
              return (
                <>
                  {productImages[index] ? (
                    <TouchableOpacity
                      onPress={() => ChooseProductImages(index)}
                      key={index}
                      style={styles.shopImagesMain}>
                      <Image
                        resizeMode="cover"
                        source={{uri: productImages[index]}}
                        style={{width: 112, height: 112, borderRadius: 10}}
                      />
                      <TouchableOpacity
                        onPress={() => ChooseProductImages(index)}
                        style={[styles.editIconMain, {top: 5, right: 5}]}>
                        <Icon name="pencil" size={16} color="white" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => ChooseProductImages(index)}
                      key={index}
                      style={styles.shopImagesMain}>
                      <Icon name="image" size={23} color="black" />
                      <Text style={[styles.uploadText, {fontSize: 12}]}>
                        Click to Upload
                      </Text>
                      <Text style={styles.uploadTextInner}>Product Image </Text>
                    </TouchableOpacity>
                  )}
                </>
              );
            })}
          </View>

          {error?.productImages && (
            <Text style={styles.errorText}>{error?.productImages}</Text>
          )}

          <Text style={styles.shopImgText}>Product Video</Text>
          <TouchableOpacity
            onPress={() => ChooseProductVideo()}
            style={[styles.coverMainDiv, {marginTop: 0}]}>
            {productVideo === '' ? (
              <>
                <Icon name="image" size={25} color="black" />
                <Text style={styles.uploadText}>Click to Upload </Text>
                <Text style={styles.uploadTextInner}>Product Video </Text>
              </>
            ) : (
              <Video
                source={{
                  uri: productVideo,
                }}
                style={{width: '100%', height: 150, borderRadius: 10}}
                // controls={true}
                resizeMode="cover"
              />
            )}
            {productVideo && (
              <TouchableOpacity
                onPress={() => ChooseProductVideo()}
                style={[styles.editIconMain, {top: 10, right: 10}]}>
                <Icon name="pencil" size={16} color="white" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          <View style={{width: '100%', marginTop: 20}}>
            <CustomButton
              name="Add Product"
              color="#FFFFFF"
              backgroundColor="#151827"
              borderColor="#29977E"
              onPress={handleSubmit(onSubmitProduct)}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddEditProduct;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
  },
  addBranchHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  addBranchText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },

  container: {
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'gray',
    height: 190,
  },
  richEditor: {
    minHeight: 100, // Set the desired height here
    // You can also use maxHeight or height with percentages or flex values
    // height: '50%',
    // height: 300,
    borderWidth: 1,
    borderColor: 'gray',
  },
  richToolbar: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  desText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    padding: 6,
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
});
