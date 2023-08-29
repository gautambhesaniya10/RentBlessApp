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
import {changeProductsSearchBarData} from '../../redux/ProductFilter/ProductFilterSlice';
import UpperFilter from '../../common/Customer/UpperFilter';
import {
  emptyShopState,
  loadMoreShopStart,
  loadShopsStart,
} from '../../redux/ShopSlice/ShopSlice';
import ShopCard from '../../components/ShopCard/ShopCard';

const FilterItemList = ['Sherwani', 'Blazer', 'Suit', 'Indo'];

const HomePage = () => {
  const dispatch = useDispatch();

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

  const [genderFilter, setGenderFilter] = useState('men');
  const [currentPage, setCurrentPage] = useState(0);
  const [productDataLimit, setProductDataLimit] = useState(0);

  const [shopCurrentPage, setShopCurrentPage] = useState(0);
  const [shopDataLimit, setShopDataLimit] = useState(0);

  const [byShop, setByShop] = useState(false);

  const getAllMoreProducts = () => {
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

  const handleProductScroll = event => {
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

  const EmptyProduct = () => {
    dispatch(emptyProductState());
  };
  const EmptyShop = () => {
    dispatch(emptyShopState());
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
    EmptyProduct();
    EmptyShop();
  }, []);

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
        <CustomerHeader />
        <View style={styles.searchTextMain}>
          <Icon name="search" size={18} color="black" />
          <TextInput
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
      <ScrollView
        onScroll={handleProductScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 20,
              marginTop: 20,
            }}>
            <View style={styles.maleMain}>
              <TouchableOpacity
                onPress={() => setGenderFilter('men')}
                style={[
                  styles.manIcon,
                  {
                    backgroundColor:
                      genderFilter === 'men' ? '#151827' : 'white',
                  },
                ]}>
                <Icon
                  name="male"
                  size={18}
                  color={genderFilter === 'men' ? 'white' : 'black'}
                />
              </TouchableOpacity>
              <Text style={styles.menText}>Men</Text>
            </View>
            <View style={styles.maleMain}>
              <TouchableOpacity
                onPress={() => setGenderFilter('women')}
                style={[
                  styles.manIcon,
                  {
                    backgroundColor:
                      genderFilter === 'women' ? '#151827' : 'white',
                  },
                ]}>
                <Icon
                  name="female"
                  size={18}
                  color={genderFilter === 'women' ? 'white' : 'black'}
                />
              </TouchableOpacity>
              <Text style={styles.menText}>Women</Text>
            </View>
          </View> */}

          <Text style={styles.productText}>{byShop ? 'Shop' : 'Product'}</Text>

          <View style={{alignSelf: 'flex-start', marginLeft: -12}}>
            <UpperFilter
              byShop={byShop}
              setCurrentPage={setCurrentPage}
              setProductDataLimit={setProductDataLimit}
              setShopCurrentPage={setShopCurrentPage}
              setShopDataLimit={setShopDataLimit}
            />
          </View>
          <View style={styles.toggleSwitchMain}>
            <Text style={styles.switchText}>Product</Text>
            <Switch
              value={byShop}
              onValueChange={() => setByShop(!byShop)}
              color="#29977E"
            />
            <Text style={styles.switchText}>Shop</Text>
          </View>
          <View
            style={{
              marginTop: 6,
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
            }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center',
              }}>
              {FilterItemList?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Text style={styles.filterItemText}>{item}</Text>
                  <TouchableOpacity>
                    <Icon name="close" size={15} color="gray" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {!byShop ? (
            productLoading && productsData?.length === 0 ? (
              <View style={styles.loaderDiv}>
                <ActivityIndicator color="green" />
              </View>
            ) : (
              <View style={styles.productCardMain}>
                {productsData?.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
                {productLoading &&
                  productsData?.length > 0 &&
                  currentPage !== numOfPages && (
                    <View style={styles.loaderBottomDiv}>
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
            <View style={styles.productCardMain}>
              {shopsData?.map((shop, index) => (
                <ShopCard key={index} shop={shop} />
              ))}
              {shopLoading &&
                shopsData?.length > 0 &&
                shopCurrentPage !== shopNumOfPages && (
                  <View style={styles.loaderBottomDiv}>
                    <ActivityIndicator color="green" />
                  </View>
                )}
            </View>
          )}
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
  },
  maleMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  menText: {
    color: '#151827',
    fontSize: 18,
    fontFamily: FontStyle,
  },
  manIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#D9D9D9',
    borderWidth: 1,
  },
  productText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 20,
    paddingTop: 18,
    paddingBottom: 10,
  },
  filterItemText: {
    color: 'rgba(21, 24, 39, 0.56)',
    fontWeight: '600',
    fontSize: 14,
  },
  clearAllText: {
    textDecorationLine: 'underline',
    color: '#151827',
    fontWeight: '700',
    fontSize: 14,
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
  },
  toggleSwitchMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  switchText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});
