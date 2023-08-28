import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomerHeader from '../../components/CustomerHeader';
import {BackGroundStyle, FontStyle} from '../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import {Button, Popover} from 'native-base';
import ProductCard from '../../components/ProductCard/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  emptyProductState,
  loadProductsStart,
} from '../../redux/ProductSlice/ProductSlice';
import {useIsFocused} from '@react-navigation/native';

const FilterItemList = ['Sherwani', 'Blazer', 'Suit', 'Indo'];

const HomePage = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const productsFiltersReducer = useSelector(
    state => state.productsFiltersReducer,
  );
  const {
    productsLimit,
    productsCount,
    numOfPages,
    productsData,
    productLoading,
    error,
  } = useSelector(state => state.productsData);

  const [SearchText, setSearchText] = useState('');
  const [genderFilter, setGenderFilter] = useState('men');
  const [oldLatestValue, setOldLatestValue] = useState('new');

  const [productPageSkip, setProductPageSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [productDataLimit, setProductDataLimit] = useState(0);

  const getAllProducts = () => {
    dispatch(
      loadProductsStart({
        pageData: {
          skip: productDataLimit,
          limit: 8,
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

  const handleScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isEndReached && !productLoading) {
      loadMoreData();
    }
  };

  const loadMoreData = () => {
    if (currentPage < numOfPages) {
      setCurrentPage(currentPage + 1);
      setProductDataLimit(productDataLimit + 8);
    }
  };

  const EmptyProduct = () => {
    dispatch(emptyProductState());
  };

  useEffect(() => {
    EmptyProduct();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [
    dispatch,
    productsFiltersReducer.appliedProductsFilters,
    productsFiltersReducer.sortFilters,
    productsFiltersReducer.searchBarData,
    productDataLimit,
  ]);

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={{position: 'relative'}}>
        <CustomerHeader />
        <View style={styles.searchTextMain}>
          <Icon name="search" size={18} color="black" />
          <TextInput
            onChangeText={value => setSearchText(value)}
            style={{width: '100%'}}
            placeholder="Search  Hear.."
          />
        </View>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
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
          </View>

          <Text style={styles.productText}>Product</Text>

          <View style={{alignSelf: 'flex-start', marginLeft: -12}}>
            <TouchableOpacity>
              <Popover
                trigger={triggerProps => {
                  return (
                    <Button
                      style={{backgroundColor: 'transparent'}}
                      {...triggerProps}>
                      <View style={styles.sortFilMain}>
                        <Text
                          style={[
                            styles.latestText,
                            {color: 'rgba(21, 24, 39, 0.40)'},
                          ]}>
                          Sort by:
                        </Text>
                        <Text style={styles.latestText}>
                          Latest{' '}
                          <Icon name="angle-down" size={16} color="black" />
                        </Text>
                      </View>
                    </Button>
                  );
                }}>
                <Popover.Content>
                  {/* <Popover.Arrow /> */}
                  <View style={styles.radioTopMain}>
                    <RadioButton.Group
                      onValueChange={newValue => setOldLatestValue(newValue)}
                      value={oldLatestValue}>
                      <View style={styles.radioParent}>
                        <View style={styles.radioMain}>
                          <RadioButton color="#29977E" value="new" />
                          <Text
                            style={[
                              styles.radioText,
                              {
                                color:
                                  oldLatestValue === 'new'
                                    ? '#151827'
                                    : 'rgba(21, 24, 39, 0.56)',
                              },
                            ]}>
                            Latest
                          </Text>
                        </View>
                        <View style={styles.radioMain}>
                          <RadioButton color="#29977E" value="old" />
                          <Text
                            style={[
                              styles.radioText,
                              {
                                color:
                                  oldLatestValue === 'old'
                                    ? '#151827'
                                    : 'rgba(21, 24, 39, 0.56)',
                              },
                            ]}>
                            Oldest
                          </Text>
                        </View>
                      </View>
                    </RadioButton.Group>
                  </View>
                </Popover.Content>
              </Popover>
            </TouchableOpacity>
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

          {productLoading && productsData?.length === 0 ? (
            <View style={styles.loaderDiv}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={styles.productCardMain}>
              {productsData?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
              {productLoading && productsData?.length > 0 && (
                <View style={styles.loaderBottomDiv}>
                  <ActivityIndicator />
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
    marginTop: 50,
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
  sortFilMain: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 63,
    borderWidth: 1,
    borderColor: 'rgba(21, 24, 39, 0.10)',
  },
  latestText: {
    color: '#151827',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FontStyle,
  },
  radioTopMain: {
    width: '100%',
  },
  radioParent: {
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 8,
  },
  radioMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FontStyle,
    paddingRight: 10,
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
});
