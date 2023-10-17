import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import UpperFilter from '../../../../common/Customer/UpperFilter';
import {useDispatch, useSelector} from 'react-redux';
import {loadProductsStart} from '../../../../redux/ProductSlice/ProductSlice';
import {changeAppliedProductsFilters} from '../../../../redux/ProductFilter/ProductFilterSlice';
import {DataTable} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Modal} from 'react-native';
import CustomButton from '../../../../common/CustomButton';
import {deleteProduct} from '../../../../graphql/mutations/products';
import {useToast} from 'native-base';
import TablePagination from '../../../../components/TablePagination';
import {fileDelete} from '../../../../wasabi';
import {loadVendorShopDetailsStart} from '../../../../redux/vendorShopDetailsSlice/ShopDetailSlice';
import FastImage from 'react-native-fast-image';

const ProductListing = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const {
    productsLimit,
    productsCount,
    numOfPages,
    productsData,
    productLoading,
    error,
  } = useSelector(state => state?.productsData);

  const {appliedProductsFilters, sortFilters} = useSelector(
    state => state.productsFiltersReducer,
  );
  const {vendorShopDetails} = useSelector(state => state?.shopDetail);
  // const useProfileData = useSelector(state => state?.user.userProfile);
  const [productPageSkip, setProductPageSkip] = useState(0);

  const [deletableProductsImages, setDeletableProductsImages] = useState([]);
  const [deletableProductVideo, setDeletableProductVideo] = useState();

  const ProductLimit = 5;

  const getAllProducts = () => {
    dispatch(
      loadProductsStart({
        pageData: {
          skip: productPageSkip,
          limit: ProductLimit,
        },
        filter: {
          category_id: appliedProductsFilters?.categoryId?.selectedValue,
          product_color: appliedProductsFilters?.productColor?.selectedValue,
        },
        shopId: appliedProductsFilters?.shopId?.selectedValue,
        sort: sortFilters?.sortType?.selectedValue,
        search: appliedProductsFilters?.searchBarData?.selectedValue,
      }),
    );
  };

  useEffect(() => {
    if (vendorShopDetails?.id) {
      dispatch(
        changeAppliedProductsFilters({
          key: 'shopId',
          value: {
            selectedValue: [vendorShopDetails?.id],
          },
        }),
      );
    }
  }, [dispatch, vendorShopDetails?.id]);

  useEffect(() => {
    if (appliedProductsFilters.shopId.selectedValue.length > 0) {
      getAllProducts();
    }
  }, [
    dispatch,
    appliedProductsFilters,
    sortFilters,
    isFocused,
    productPageSkip,
  ]);

  const [productDeleteModalOpen, setProductDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState();

  const handlePageChange = pageNumber => {
    const newSkip = (pageNumber - 1) * ProductLimit;
    setProductPageSkip(newSkip);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <View style={{marginTop: 0}}>
          <UpperFilter
            byShop={false}
            showOnlyShopDetailPage={true}
            productsCount={productsCount}
          />
        </View>

        <View style={{marginTop: 15}}>
          <ScrollView horizontal={true}>
            <View style={styles.productTable}>
              {/* Render table headers */}
              <View style={styles.tableRow}>
                {[
                  'NO',
                  'Thumbnail',
                  'Shop Name',
                  'Name',
                  'Color',
                  'Action',
                ].map((itm, index) => (
                  <Text
                    style={[
                      styles.tableHeader,
                      {width: index === 0 ? 60 : 100},
                    ]}>
                    {itm}
                  </Text>
                ))}
                {/* Add more headers as needed */}
              </View>

              {productLoading && productsData?.length === 0 ? (
                <View style={{paddingVertical: 40}}>
                  <ActivityIndicator />
                </View>
              ) : productLoading && productsData?.length > 0 ? (
                <View style={{paddingVertical: 40}}>
                  <ActivityIndicator />
                </View>
              ) : (
                productsData?.map((item, index) => (
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {width: 60}]}>
                      {index + 1}
                    </Text>
                    <View style={[styles.tableCell, {width: 100}]}>
                      <FastImage
                        style={{width: 50, height: 70, alignSelf: 'center'}}
                        source={{
                          uri: item?.product_image?.front,
                          cache: FastImage.cacheControl.web,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                    <Text
                      numberOfLines={2}
                      style={[styles.tableCell, {width: 100}]}>
                      {item?.branchInfo?.shop_info?.shop_name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[styles.tableCell, {width: 100}]}>
                      {item?.product_name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[styles.tableCell, {width: 100}]}>
                      {item?.product_color}
                    </Text>
                    <View style={[styles.tableCell, {width: 100}]}>
                      <View style={{flexDirection: 'row', gap: 8}}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('VendorAddEditProduct', {
                              state: {
                                productEditId: item?.id,
                                editableProductData: item,
                              },
                            })
                          }
                          style={styles.pencilIcon}>
                          <Icon name="pencil" color={'white'} size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setProductDeleteModalOpen(true);
                            setDeleteProductId(item?.id);

                            setDeletableProductsImages(
                              ['front', 'back', 'side'].map(
                                key => item?.product_image[key],
                              ),
                            );

                            if (item?.product_video) {
                              setDeletableProductVideo(item?.product_video);
                            }
                          }}
                          style={[styles.pencilIcon, {backgroundColor: 'red'}]}>
                          <Icon name="trash" color={'white'} size={18} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>

        {productsCount > ProductLimit && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 15,
            }}>
            <TablePagination
              // totalItems={productsCount}
              // itemsPerPage={2}
              numOfPages={numOfPages}
              onPageChange={handlePageChange}
            />
          </View>
        )}
      </View>
      <ProductDeleteModel
        productDeleteModalOpen={productDeleteModalOpen}
        setProductDeleteModalOpen={setProductDeleteModalOpen}
        deleteProductId={deleteProductId}
        getAllProducts={getAllProducts}
        deletableProductsImages={deletableProductsImages}
        deletableProductVideo={deletableProductVideo}
      />
    </View>
  );
};

export default ProductListing;

const ProductDeleteModel = ({
  productDeleteModalOpen,
  setProductDeleteModalOpen,
  deleteProductId,
  getAllProducts,
  deletableProductsImages,
  deletableProductVideo,
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const {vendorShopDetails} = useSelector(state => state?.shopDetail);

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

  const deleteProductHandler = async () => {
    await deleteImageFiles(deletableProductsImages, 'image');
    if (deletableProductVideo) {
      await deleteImageFiles([deletableProductVideo], 'video');
    }

    deleteProduct({id: deleteProductId}).then(
      res => {
        toast.show({
          title: res.data.deleteProduct,
          placement: 'top',
          backgroundColor: 'green.600',
          variant: 'solid',
        });
        getAllProducts();
        dispatch(loadVendorShopDetailsStart(vendorShopDetails?.id));
      },
      error => {
        toast.show({
          title: error.message,
          placement: 'top',
          backgroundColor: 'red.600',
          variant: 'solid',
        });
      },
    );
    setProductDeleteModalOpen(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={productDeleteModalOpen}
        onRequestClose={() => {
          setProductDeleteModalOpen(!productDeleteModalOpen);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Confirmation Modal</Text>
            <Text style={styles.sureText}>
              Are you sure delete this product{' '}
              <Text style={{fontWeight: '600'}}>{deleteProductId}</Text> ?
            </Text>
            <View style={styles.buttonMain}>
              <View style={{width: 80}}>
                <CustomButton
                  name="cancel"
                  color="#151827"
                  backgroundColor="#FAFCFC"
                  borderColor="#151827"
                  onPress={() => setProductDeleteModalOpen(false)}
                />
              </View>
              <View style={{width: 80}}>
                <CustomButton
                  name="Delete"
                  color="white"
                  backgroundColor="#dc2626"
                  borderColor="#dc2626"
                  onPress={() => deleteProductHandler()}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
  },
  pencilIcon: {
    backgroundColor: '#151827',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
  },
  sureText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  buttonMain: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },

  productTable: {
    marginBottom: 20,
    marginHorizontal: 2,
    backgroundColor: 'white',
    elevation: 5,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#151827',
    color: '#FFFF',
  },
  tableCell: {
    padding: 10,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#151827',
    color: '#31333E',
  },
});
