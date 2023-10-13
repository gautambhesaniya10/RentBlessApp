import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CustomerHeader from '../../components/CustomerHeader';
import {BackGroundStyle, FontStyle} from '../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator, RadioButton, Switch} from 'react-native-paper';
import ProductCard from '../../components/ProductCard/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeProductCurrentPage,
  changeProductDataLimit,
  loadMoreProductsStart,
  loadProductsStart,
} from '../../redux/ProductSlice/ProductSlice';
import UpperFilter from '../../common/Customer/UpperFilter';
import {
  changeShopCurrentPage,
  changeShopDataLimit,
  loadMoreShopStart,
  loadShopsStart,
} from '../../redux/ShopSlice/ShopSlice';
import ShopCard from '../../components/ShopCard/ShopCard';
import FilterDrawerModel from '../../common/FilterDrawerModel';
import {useIsFocused} from '@react-navigation/native';
import {
  landingBanner4,
  landingBanner5,
  landingBanner6,
} from '../../common/AllLiveImageLink';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const HomePage = () => {
  const dispatch = useDispatch();
  const IsFocused = useIsFocused();

  const {width: screenWidth} = Dimensions.get('window');
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplayConfig = {
    autoplay: true,
    autoplayInterval: 2000,
    loop: true,
  };
  const carouselRef = useRef(null);
  const TopCarouselData = [
    // {image: landingBanner1},
    // {image: landingBanner3},
    // {image: landingBanner2},
    {image: landingBanner4},
    {image: landingBanner5},
    {image: landingBanner6},
  ];

  const productsFiltersReducer = useSelector(
    state => state.productsFiltersReducer,
  );
  const shopsFiltersReducer = useSelector(state => state?.shopsFiltersReducer);

  const {
    productsLimit,
    productsCount,
    numOfPages,
    productCurrentPage,
    productDataLimit,
    productsData,
    productLoading,
    error,
  } = useSelector(state => state.productsData);

  const {
    shopsLimit,
    shopsCount,
    numOfPages: shopNumOfPages,
    shopCurrentPage,
    shopDataLimit,
    shopsData,
    loading: shopLoading,
    error: shopError,
  } = useSelector(state => state?.shops);

  const {byShop} = useSelector(state => state?.shopsFiltersReducer);

  const [showBottomLoader, setShowBottomLoader] = useState(false);
  const [filterModelOpen, setFilterModelOpen] = useState(false);

  const getAllMoreProducts = () => {
    dispatch(
      loadMoreProductsStart({
        pageData: {
          skip: productDataLimit,
          limit: 10,
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

  const getAllProducts = () => {
    dispatch(
      loadProductsStart({
        pageData: {
          skip: 0,
          limit: 10,
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
  //   dispatch(emptyProductFilter());
  // }, [IsFocused]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //   }, []),
  // );

  const handleProductScroll = event => {
    setShowBottomLoader(true);
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (!byShop) {
      if (isEndReached && !productLoading) {
        if (productCurrentPage < numOfPages) {
          dispatch(changeProductCurrentPage(productCurrentPage + 1));
          dispatch(changeProductDataLimit(productDataLimit + 10));
        }
      }
    } else {
      if (isEndReached && !shopLoading) {
        if (shopCurrentPage < shopNumOfPages) {
          dispatch(changeShopCurrentPage(shopCurrentPage + 1));
          dispatch(changeShopDataLimit(shopDataLimit + 10));
        }
      }
    }
  };

  const getAllMoreShops = () => {
    dispatch(
      loadMoreShopStart({
        pageData: {
          skip: shopDataLimit,
          limit: 10,
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
          limit: 10,
        },
        area: shopsFiltersReducer.appliedShopsFilters.locations.selectedValue,
        sort: shopsFiltersReducer.sortFilters.sortType.selectedValue,
        stars: shopsFiltersReducer.appliedShopsFilters.stars.selectedValue,
      }),
    );
  };

  useEffect(() => {
    dispatch(changeShopCurrentPage(0));
    dispatch(changeShopDataLimit(0));
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
    dispatch(changeProductCurrentPage(0));
    dispatch(changeProductDataLimit(0));
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

  const CarouselRenderItem = ({item}) => (
    <View style={styles.sliderMainView}>
      <View style={{width: '100%'}}>
        <Image
          source={{uri: item?.image}}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'fill',
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <FilterDrawerModel
        filterModelOpen={filterModelOpen}
        handleFilterModelClose={() => setFilterModelOpen(false)}
        setShowBottomLoader={setShowBottomLoader}
      />
      <View style={{position: 'relative'}}>
        <CustomerHeader homeScreen={true} />
      </View>
      <View style={styles.FilterBtnMain}>
        <TouchableOpacity
          onPress={() => setFilterModelOpen(true)}
          style={styles.filterButton}>
          <Icon name="filter" size={18} color="white" />
          <Text style={styles.filterBtnText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <ScrollView
          onScroll={handleProductScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          {/* <Image
            source={{uri: homeCoverImage}}
            style={{width: '100%', height: 150, objectFit: 'cover'}}
          /> */}
          <View>
            <Carousel
              ref={carouselRef}
              data={TopCarouselData}
              renderItem={CarouselRenderItem}
              sliderWidth={screenWidth}
              itemWidth={screenWidth}
              onSnapToItem={index => setActiveSlide(index)} // Update active slide index
              {...autoplayConfig}
            />
            <Pagination
              dotsLength={TopCarouselData?.length} // Number of dots (usually the length of your data)
              activeDotIndex={activeSlide}
              containerStyle={{
                paddingTop: 10,
                paddingBottom: 0,
              }}
            />
          </View>
          <View style={styles.mainContainer}>
            <View style={{paddingHorizontal: 0, paddingTop: 5}}>
              <UpperFilter
                byShop={byShop}
                setShowBottomLoader={setShowBottomLoader}
                showOnlyShopDetailPage={false}
                shopsCount={shopsCount}
                productsCount={productsCount}
              />
            </View>
            <View style={{position: 'relative'}}>
              {!byShop ? (
                productLoading && productsData?.length === 0 ? (
                  <View style={styles.loaderDiv}>
                    <ActivityIndicator color="green" />
                  </View>
                ) : productsData?.length > 0 ? (
                  <View style={[styles.productCardMain]}>
                    {productsData?.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                    {productLoading &&
                      productsData?.length > 0 &&
                      productCurrentPage !== numOfPages &&
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

                    {productLoading &&
                      productsData?.length > 0 &&
                      !showBottomLoader && (
                        <View
                          style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            top: 0,
                            width: '100%',
                            height: '100%',
                          }}></View>
                      )}
                  </View>
                ) : (
                  <Text style={styles.noDataText}>No Product Available</Text>
                )
              ) : shopLoading && shopsData?.length === 0 ? (
                <View style={styles.loaderDiv}>
                  <ActivityIndicator color="green" />
                </View>
              ) : shopsData?.length > 0 ? (
                <View style={[styles.productCardMain]}>
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
                  {shopLoading &&
                    shopsData?.length > 0 &&
                    !showBottomLoader && (
                      <View style={styles.loaderFilterDiv}>
                        <ActivityIndicator color="green" />
                      </View>
                    )}

                  {shopLoading &&
                    shopsData?.length > 0 &&
                    !showBottomLoader && (
                      <View
                        style={{
                          position: 'absolute',
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          top: 0,
                          width: '100%',
                          height: '100%',
                        }}></View>
                    )}
                </View>
              ) : (
                <Text style={styles.noDataText}>No Shop Available</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 15,
  },
  productText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 20,
  },

  productCardMain: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
    marginTop: 10,
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
    position: 'relative',
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
  sliderMainView: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
  },
  noDataText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: 100,
  },
});
