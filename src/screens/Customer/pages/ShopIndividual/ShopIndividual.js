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
import React, {useEffect, useState} from 'react';
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={22} color="black" />
          </TouchableOpacity>
          <View style={styles.mainHeaderContainer}>
            <View style={styles.topInnerMain}>
              <Image
                source={{uri: shopDetails?.shop_logo}}
                style={{width: 64, height: 64, borderRadius: 32}}
              />
              <View>
                <Text style={styles.firstText}>{shopDetails?.shop_name}</Text>
                <Text numberOfLines={1} style={styles.secText}>
                  {
                    "Let's be Effortlessly Cool: Embrace Your Signature Style with Us"
                  }
                </Text>
                <Text style={styles.thirdText}>
                  <Image
                    source={require('../../../../images/locationIcon.png')}
                    style={{width: 10, height: 10, tintColor: 'white'}}
                  />{' '}
                  {shopDetails?.branch_info?.map(
                    itm => itm?.branch_type === 'main' && itm?.branch_address,
                  )}
                </Text>

                <View style={styles.followBtnMain}>
                  <View style={{width: '40%'}}>
                    <CustomButton
                      name={shopFollowByUser ? 'UnFollow' : 'Follow'}
                      color="black"
                      backgroundColor="#FFF"
                      onPress={() => clickedByFollow()}
                      icon={!shopFollowByUser && true}
                      iconName="plus"
                    />
                  </View>
                  <View style={{width: '40%'}}>
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
                      iconName="plus"
                    />
                  </View>
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
              <View style={styles.bottomItemDiv}>
                <Text style={styles.bottomTitleText}>
                  <Icon name="pencil-square-o" size={16} color="white" />{' '}
                  Reviews
                </Text>
                <Text style={styles.numText}>{shopReviews?.length}</Text>
              </View>
              <View style={styles.bottomItemDiv}>
                <TouchableOpacity onPress={() => shareContent()}>
                  <Text style={styles.bottomTitleText}>
                    <Icon name="share" size={16} color="white" /> Share
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.productTitleDiv}>Product</Text>

          {productLoading ? (
            <View style={{marginVertical: 35}}>
              <ActivityIndicator />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              {productsData?.map((product, index) => (
                <>
                  <ProductCard product={product} key={index} />
                </>
              ))}
            </View>
          )}

          <ShopAllReviewSection
            shopReviews={shopReviews}
            viewAllBtn={true}
            shopDetails={shopDetails}
          />
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
    marginVertical: 20,
  },
  topInnerMain: {
    marginHorizontal: 15,
    marginVertical: 15,
    flexDirection: 'row',
    gap: 20,
  },
  firstText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FontStyle,
  },
  secText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FontStyle,
    width: 230,
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
    marginVertical: 18,
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
    fontSize: 14,
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
});
