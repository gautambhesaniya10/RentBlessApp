import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomerHeader from '../../components/CustomerHeader';
import {BackGroundStyle, FontStyle} from '../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator, RadioButton, Switch} from 'react-native-paper';
import ProductCard from '../../components/ProductCard/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  emptyProductState,
  loadMoreProductsStart,
  loadProductsStart,
} from '../../redux/ProductSlice/ProductSlice';
import {
  changeProductsSearchBarData,
  emptyProductFilter,
} from '../../redux/ProductFilter/ProductFilterSlice';
import UpperFilter from '../../common/Customer/UpperFilter';
import {
  emptyShopState,
  loadMoreShopStart,
  loadShopsStart,
} from '../../redux/ShopSlice/ShopSlice';
import ShopCard from '../../components/ShopCard/ShopCard';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import UpperAllListFilter from '../../common/Customer/UpperAllListFilter';

const HomePage = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const productsFiltersReducer = useSelector(
    state => state.productsFiltersReducer,
  );

  const shopsFiltersReducer = useSelector(state => state?.shopsFiltersReducer);

  const {
    productsLimit,
    productsCount,
    numOfPages,
    productsData,
    productLoading,
    error,
  } = useSelector(state => state.productsData);

  const {
    shopsLimit,
    shopsCount,
    numOfPages: shopNumOfPages,
    shopsData,
    loading: shopLoading,
    error: shopError,
  } = useSelector(state => state?.shops);

  const {byShop} = useSelector(state => state?.shopsFiltersReducer);

  const [currentPage, setCurrentPage] = useState(0);
  const [productDataLimit, setProductDataLimit] = useState(0);

  const [shopCurrentPage, setShopCurrentPage] = useState(0);
  const [shopDataLimit, setShopDataLimit] = useState(0);
  const [showBottomLoader, setShowBottomLoader] = useState(false);

  const getAllMoreProducts = () => {
    console.log('productDataLimit', productDataLimit);
    dispatch(
      loadMoreProductsStart({
        pageData: {
          skip: productDataLimit,
          limit: 5,
        },
        filter: {
          category_id:
            productsFiltersReducer.appliedProductsFilters.categoryId
              .selectedValue,
          product_color:
            productsFiltersReducer.appliedProductsFilters.productColor
              .selectedValue,
        },
        shopId:
          productsFiltersReducer.appliedProductsFilters.shopId.selectedValue,
        sort: productsFiltersReducer.sortFilters.sortType.selectedValue,
        search: productsFiltersReducer.searchBarData,
      }),
    );
  };

  // useEffect(() => {
  //   if (
  //     productsFiltersReducer.appliedProductsFilters.categoryId.selectedValue
  //       ?.length > 0 ||
  //     productsFiltersReducer.appliedProductsFilters.productColor.selectedValue
  //       ?.length > 0 ||
  //     productsFiltersReducer.appliedProductsFilters.shopId.selectedValue
  //       ?.length > 0 ||
  //     productsFiltersReducer.sortFilters.sortType.selectedValue === 'old' ||
  //     productsFiltersReducer.searchBarData !== ''
  //   ) {
  //     dispatch(emptyProductFilter());
  //   }
  // }, [!byShop && isFocused]);

  const getAllProducts = () => {
    dispatch(
      loadProductsStart({
        pageData: {
          skip: 0,
          limit: 5,
        },
        filter: {
          category_id:
            productsFiltersReducer.appliedProductsFilters.categoryId
              .selectedValue,
          product_color:
            productsFiltersReducer.appliedProductsFilters.productColor
              .selectedValue,
        },
        shopId:
          productsFiltersReducer.appliedProductsFilters.shopId.selectedValue,
        sort: productsFiltersReducer.sortFilters.sortType.selectedValue,
        search: productsFiltersReducer.searchBarData,
      }),
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(0);
      setShopCurrentPage(0);
      setShopDataLimit(0);
      setProductDataLimit(0);
      setShowBottomLoader(false);
    }, []),
  );

  const handleProductScroll = event => {
    setShowBottomLoader(true);
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (!byShop) {
      if (isEndReached && !productLoading) {
        if (currentPage < numOfPages) {
          setCurrentPage(currentPage + 1);
          setProductDataLimit(productDataLimit + 5);
        }
      }
    } else {
      if (isEndReached && !shopLoading) {
        if (shopCurrentPage < shopNumOfPages) {
          setShopCurrentPage(shopCurrentPage + 1);
          setShopDataLimit(shopDataLimit + 5);
        }
      }
    }
  };

  const getAllMoreShops = () => {
    dispatch(
      loadMoreShopStart({
        pageData: {
          skip: shopDataLimit,
          limit: 5,
        },
        area: shopsFiltersReducer.appliedShopsFilters.locations.selectedValue,
        sort: shopsFiltersReducer.sortFilters.sortType.selectedValue,
        stars: shopsFiltersReducer.appliedShopsFilters.stars.selectedValue,
      }),
    );
  };

  const getAllShops = () => {
    dispatch(
      loadShopsStart({
        pageData: {
          skip: 0,
          limit: 5,
        },
        area: shopsFiltersReducer.appliedShopsFilters.locations.selectedValue,
        sort: shopsFiltersReducer.sortFilters.sortType.selectedValue,
        stars: shopsFiltersReducer.appliedShopsFilters.stars.selectedValue,
      }),
    );
  };

  useEffect(() => {
    getAllShops();
  }, [
    dispatch,
    shopsFiltersReducer.appliedShopsFilters,
    shopsFiltersReducer.sortFilters,
  ]);

  useEffect(() => {
    if (shopDataLimit > 0) {
      getAllMoreShops();
    }
  }, [dispatch, shopDataLimit]);

  useEffect(() => {
    getAllProducts();
  }, [
    dispatch,
    productsFiltersReducer.appliedProductsFilters,
    productsFiltersReducer.sortFilters,
    productsFiltersReducer.searchBarData,
  ]);

  useEffect(() => {
    if (productDataLimit > 0) {
      getAllMoreProducts();
    }
  }, [dispatch, productDataLimit]);

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={{position: 'relative'}}>
        <CustomerHeader homeScreen={true} />
        <View style={styles.searchTextMain}>
          <Icon name="search" size={18} color="black" />
          <TextInput
            value={productsFiltersReducer.searchBarData}
            onChangeText={value => {
              dispatch(
                changeProductsSearchBarData({
                  key: 'searchBarData',
                  value: value,
                }),
              );
              setCurrentPage(0);
              setProductDataLimit(0);
            }}
            style={{width: '100%'}}
            placeholder="Search  Hear.."
          />
        </View>
      </View>
      <View style={styles.FilterBtnMain}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FilterScreen', {
              state: {
                RedirectRoute: 'CustomerHomePage',
              },
            })
          }
          style={styles.filterButton}>
          <Icon name="filter" size={18} color="white" />
          <Text style={styles.filterBtnText}>Filters</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        onScroll={handleProductScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.productText}>
              {byShop ? 'Shop' : 'Product'}
            </Text>

            <View style={{marginRight: -12}}>
              <UpperFilter
                byShop={byShop}
                setCurrentPage={setCurrentPage}
                setProductDataLimit={setProductDataLimit}
                setShopCurrentPage={setShopCurrentPage}
                setShopDataLimit={setShopDataLimit}
                setShowBottomLoader={setShowBottomLoader}
              />
            </View>
          </View>
          <View>
            <UpperAllListFilter
              showOnlyShopDetailPage={false}
              setCurrentPage={setCurrentPage}
              setShopCurrentPage={setShopCurrentPage}
              setProductDataLimit={setProductDataLimit}
              setShopDataLimit={setShopDataLimit}
              setShowBottomLoader={setShowBottomLoader}
            />
          </View>
          <View style={{position: 'relative'}}>
            {!byShop ? (
              productLoading && productsData?.length === 0 ? (
                <View style={styles.loaderDiv}>
                  <ActivityIndicator color="green" />
                </View>
              ) : (
                <View
                  style={[
                    styles.productCardMain,
                    {
                      opacity:
                        productLoading &&
                        productsData?.length > 0 &&
                        !showBottomLoader
                          ? 0.5
                          : 1,
                    },
                  ]}>
                  {productsData?.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                  {productLoading &&
                    productsData?.length > 0 &&
                    currentPage !== numOfPages &&
                    showBottomLoader && (
                      <View style={styles.loaderBottomDiv}>
                        <ActivityIndicator color="green" />
                      </View>
                    )}
                  {productLoading &&
                    productsData?.length > 0 &&
                    !showBottomLoader && (
                      <View style={styles.loaderFilterDiv}>
                        <ActivityIndicator color="green" />
                      </View>
                    )}
                </View>
              )
            ) : shopLoading && shopsData?.length === 0 ? (
              <View style={styles.loaderDiv}>
                <ActivityIndicator color="green" />
              </View>
            ) : (
              <View
                style={[
                  styles.productCardMain,
                  {
                    opacity:
                      shopLoading && shopsData?.length > 0 && !showBottomLoader
                        ? 0.5
                        : 1,
                  },
                ]}>
                {shopsData?.map((shop, index) => (
                  <ShopCard key={index} shop={shop} />
                ))}
                {shopLoading &&
                  shopsData?.length > 0 &&
                  shopCurrentPage !== shopNumOfPages &&
                  showBottomLoader && (
                    <View style={styles.loaderBottomDiv}>
                      <ActivityIndicator color="green" />
                    </View>
                  )}
                {shopLoading && shopsData?.length > 0 && !showBottomLoader && (
                  <View style={styles.loaderFilterDiv}>
                    <ActivityIndicator color="green" />
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  searchTextMain: {
    backgroundColor: '#FFF',
    width: '90%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 6,
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    gap: 5,
    position: 'absolute',
    top: 60,
    zIndex: 1,
  },
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 25,
    // position: 'relative',
    // height: '100%',
  },
  productText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 20,
    paddingTop: 18,
    paddingBottom: 10,
  },

  productCardMain: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  loaderDiv: {
    marginVertical: 100,
  },
  loaderBottomDiv: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
    position: 'absolute',
    bottom: 30,
  },
  loaderFilterDiv: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
    position: 'absolute',
    top: 150,
    // left: '50%',
  },
  FilterBtnMain: {
    position: 'absolute',
    bottom: 10,
    zIndex: 1,
    width: '100%',
  },
  filterButton: {
    backgroundColor: '#29977E',
    width: '30%',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  filterBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
