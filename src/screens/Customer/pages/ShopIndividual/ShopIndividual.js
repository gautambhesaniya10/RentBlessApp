import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {BackGroundStyle, FontStyle} from '../../../../../CommonStyle';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useToast} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../../../common/CustomButton';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import {loadProductsStart} from '../../../../redux/ProductSlice/ProductSlice';
import {changeAppliedProductsFilters} from '../../../../redux/ProductFilter/ProductFilterSlice';
import {
  getShopDetails,
  getShopFollowers,
  getShopReviews,
} from '../../../../graphql/queries/shopQueries';
import {shopFollow} from '../../../../graphql/mutations/shops';
import {shopFollowToggle} from '../../../../redux/LoginUserProfileSlice/userSlice';
import ShopAllReviewSection from '../../../../components/ShopAllReviewSection';
import UpperFilter from '../../../../common/Customer/UpperFilter';
import FilterDrawerModel from '../../../../common/FilterDrawerModel';

const ShopIndividual = () => {
  const route = useRoute();
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {shopId} = route?.params?.state;

  const {
    productsLimit,
    productsCount,
    numOfPages,
    productsData,
    productLoading,
    error,
  } = useSelector(state => state?.productsData);

  const {userProfile, isAuthenticate} = useSelector(state => state?.user);
  const productsFiltersReducer = useSelector(
    state => state.productsFiltersReducer,
  );

  const [shopDetails, setShopDetails] = useState({});
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [shopReviews, setShopReviews] = useState([]);
  const [shopFollowByUser, setShopFollowByUser] = useState(false);

  const [showBottomLoader, setShowBottomLoader] = useState(false);

  const [filterModelOpen, setFilterModelOpen] = useState(false);
  const scrollViewRef = useRef(null);
  const reviewSectionRef = useRef(null);

  const handleScrollToReviewClick = () => {
    if (scrollViewRef.current && reviewSectionRef.current) {
      reviewSectionRef.current.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x, y, width, height) => {
          scrollViewRef.current.scrollTo({y, animated: true});
        },
      );
    }
  };

  const getAllFollowers = () => {
    getShopFollowers({id: shopId}).then(res =>
      setTotalFollowers(res?.data?.shopFollower?.length),
    );
  };

  const getAllReviews = () => {
    getShopReviews({id: shopId}).then(res =>
      setShopReviews(res.data.shopReview),
    );
  };

  const getShopDetailFromApi = async () => {
    const shopDetails = await getShopDetails({id: shopId});
    setShopDetails(shopDetails?.data?.shop);
  };

  const getAllProducts = () => {
    dispatch(
      loadProductsStart({
        pageData: {
          skip: 0,
          limit: productsCount,
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

  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: `https://rentbless.com/shop/${shopId}/`,
        // url: `https://rentbless.com/product/${productId}/`,
      });
    } catch (error) {
      console.error('Error sharing content:', error.message);
    }
  };

  const clickedByFollow = () => {
    if (isAuthenticate) {
      shopFollow({
        shopInfo: {
          shop_id: shopId,
          user_id: userProfile?.id,
        },
      }).then(
        res => {
          dispatch(
            !shopFollowByUser
              ? shopFollowToggle({
                  shopInfo: {
                    key: 'follow',
                    value: res?.data?.shopFollower?.data,
                  },
                })
              : shopFollowToggle({
                  shopInfo: {
                    key: 'unFollow',
                    value: shopId,
                  },
                }),
          );
          toast.show({
            title: res?.data?.shopFollower?.message,
            placement: 'top',
            backgroundColor: 'green.600',
            variant: 'solid',
          });
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
    } else {
      navigation.navigate('LoginMainScreen');
    }
  };

  useEffect(() => {
    if (!isAuthenticate) {
      setShopFollowByUser(false);
    }

    const followedShopsByUser = userProfile?.shop_follower_list?.find(
      itm => itm?.shop_id === shopId,
    );

    followedShopsByUser
      ? setShopFollowByUser(true)
      : setShopFollowByUser(false);
  }, [isAuthenticate, shopId, userProfile]);

  useEffect(() => {
    getShopDetailFromApi();
  }, [shopId]);

  useEffect(() => {
    dispatch(
      changeAppliedProductsFilters({
        key: 'shopId',
        value: {
          selectedValue: [shopId],
        },
      }),
    );
  }, [dispatch, shopId]);

  useEffect(() => {
    getAllReviews();
    getAllFollowers();
    // dispatch(loadCategoriesStart());
    // dispatch(loadAreaListsStart());
  }, [dispatch, userProfile, isFocused]);

  useEffect(() => {
    if (
      productsFiltersReducer?.appliedProductsFilters?.shopId?.selectedValue
        ?.length > 0
    ) {
      getAllProducts();
    }
  }, [
    dispatch,
    productsFiltersReducer.appliedProductsFilters,
    productsFiltersReducer.sortFilters,
    productsFiltersReducer.searchBarData,
    // productPageSkip,
  ]);

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <FilterDrawerModel
        filterModelOpen={filterModelOpen}
        handleFilterModelClose={() => setFilterModelOpen(false)}
        setShowBottomLoader={setShowBottomLoader}
        showOnlyShopDetailPage={true}
      />
      <View style={styles.FilterBtnMain}>
        <TouchableOpacity
          onPress={() => setFilterModelOpen(true)}
          style={styles.filterButton}>
          <Icon name="filter" size={18} color="white" />
          <Text style={styles.filterBtnText}>Filters</Text>
        </TouchableOpacity>
      </View>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.mainHeaderContainer}>
            <View style={styles.topInnerMain}>
              <Image
                source={{uri: shopDetails?.shop_logo}}
                style={{width: 64, height: 64, borderRadius: 32}}
              />
              <View>
                <Text style={styles.firstText}>{shopDetails?.shop_name}</Text>
                <Text numberOfLines={2} style={styles.secText}>
                  {
                    "Let's be Effortlessly Cool: Embrace Your Signature Style with Us"
                  }
                </Text>
                <Text style={styles.thirdText}>
                  <Image
                    source={require('../../../../images/locationIcon.png')}
                    style={{width: 10, height: 10, tintColor: 'red'}}
                  />{' '}
                  {shopDetails?.branch_info?.map(
                    itm => itm?.branch_type === 'main' && itm?.branch_address,
                  )}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Branches', {
                      state: {shopDetails: shopDetails},
                    })
                  }>
                  <Text style={styles.seeBranchLink}>See Branches</Text>
                </TouchableOpacity>

                <View style={styles.followBtnMain}>
                  <View style={{width: '50%'}}>
                    <CustomButton
                      name={shopFollowByUser ? 'UnFollow' : 'Follow'}
                      color="black"
                      backgroundColor="#FFF"
                      onPress={() => clickedByFollow()}
                      icon={!shopFollowByUser && true}
                      iconName="plus"
                    />
                  </View>
                  {/* <View style={{width: '40%'}}>
                    <CustomButton
                      name="Branches"
                      color="white"
                      borderColor="white"
                      backgroundColor="#151827"
                      onPress={() =>
                        navigation.navigate('Branches', {
                          state: {shopDetails: shopDetails},
                        })
                      }
                    />
                  </View> */}
                </View>
              </View>
            </View>
            <View style={styles.cardBottomMain}>
              <View style={styles.bottomItemDiv}>
                <Text style={styles.bottomTitleText}>
                  <Icon name="shopping-cart" size={16} color="white" /> Product
                </Text>
                <Text style={styles.numText}>{productsCount}</Text>
              </View>
              <View style={styles.bottomItemDiv}>
                <Text style={styles.bottomTitleText}>
                  <Icon name="user-o" size={16} color="white" /> Followers
                </Text>
                <Text style={styles.numText}>{totalFollowers}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleScrollToReviewClick()}
                style={styles.bottomItemDiv}>
                <Text style={styles.bottomTitleText}>
                  <Icon name="pencil-square-o" size={16} color="white" />{' '}
                  Reviews
                </Text>
                <Text style={styles.numText}>{shopReviews?.length}</Text>
              </TouchableOpacity>
              <View style={styles.bottomItemDiv}>
                <TouchableOpacity onPress={() => shareContent()}>
                  <Text style={styles.bottomTitleText}>
                    <Icon name="share" size={16} color="white" /> Share
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{}}>
            <UpperFilter
              byShop={false}
              showOnlyShopDetailPage={true}
              productsCount={productsCount}
            />
          </View>

          {productLoading && productsData?.length === 0 ? (
            <View style={{marginVertical: 35}}>
              <ActivityIndicator />
            </View>
          ) : (
            <View
              style={[
                styles.productCardMain,
                {
                  opacity: productLoading && productsData?.length > 0 ? 0.5 : 1,
                },
              ]}>
              {productsData?.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
              {productLoading && productsData?.length > 0 && (
                <View style={styles.loaderFilterDiv}>
                  <ActivityIndicator color="green" />
                </View>
              )}
            </View>
          )}

          <View ref={reviewSectionRef}>
            <ShopAllReviewSection
              shopReviews={shopReviews}
              viewAllBtn={false}
              shopDetails={shopDetails}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopIndividual;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  mainHeaderContainer: {
    width: '100%',
    backgroundColor: '#151827',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  topInnerMain: {
    marginHorizontal: 15,
    marginVertical: 15,
    flexDirection: 'row',
    gap: 20,
  },
  firstText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: FontStyle,
    paddingBottom: 3,
  },
  secText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FontStyle,
    width: 230,
    paddingBottom: 3,
  },
  thirdText: {
    color: 'rgba(255, 255, 255, 0.64)',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FontStyle,
  },

  followBtnMain: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cardBottomMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1F2233',
    borderRadius: 20,
  },
  bottomTitleText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400',
  },
  numText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomItemDiv: {
    alignItems: 'center',
  },
  productTitleDiv: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 18,
  },

  productCardMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    position: 'relative',
    alignSelf: 'center',
    width: '100%',
    marginTop: 10,
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
  loaderFilterDiv: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
    position: 'absolute',
    top: 150,
    // left: '50%',
  },
  seeBranchLink: {
    color: '#3ac1a8',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 5,
  },
});
