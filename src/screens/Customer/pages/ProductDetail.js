import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackGroundStyle, FontStyle} from '../../../../CommonStyle';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../../common/CustomButton';
import StarRating from 'react-native-star-rating-widget';
import {SliderBox} from 'react-native-image-slider-box';
import ProductCard from '../../../components/ProductCard/ProductCard';
import {getProductDetails} from '../../../graphql/queries/productQueries';
import RenderHTML from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {productLike} from '../../../graphql/mutations/products';
import {
  productLikeToggle,
  shopFollowToggle,
} from '../../../redux/LoginUserProfileSlice/userSlice';
import {Button, Popover, useToast} from 'native-base';
import {shopFollow} from '../../../graphql/mutations/shops';

const ProductDetail = () => {
  const route = useRoute();
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {productId} = route?.params?.state;
  const [productDetails, setProductDetails] = useState({});
  const [productLikeByUser, setProductLikeByUser] = useState(false);
  const [shopFollowByUser, setShopFollowByUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {userProfile, isAuthenticate} = useSelector(state => state?.user);

  const getProductDetail = async () => {
    const productDetails = await getProductDetails({id: productId});
    setProductDetails(productDetails);
  };

  const clickedByFollow = () => {
    if (isAuthenticate) {
      shopFollow({
        shopInfo: {
          shop_id: productDetails?.data?.product?.data?.branchInfo?.shop_id,
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
                    value:
                      productDetails?.data?.product?.data?.branchInfo?.shop_id,
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
      itm =>
        itm?.shop_id ===
        productDetails?.data?.product?.data?.branchInfo?.shop_id,
    );

    followedShopsByUser
      ? setShopFollowByUser(true)
      : setShopFollowByUser(false);
  }, [
    isAuthenticate,
    productDetails?.data?.product?.data?.branchInfo?.shop_id,
    productDetails.data?.product?.data?.id,
    userProfile,
  ]);

  const clickedByLike = () => {
    if (isAuthenticate) {
      productLike({
        productInfo: {
          product_id: productId,
          user_id: userProfile?.id,
        },
      }).then(
        res => {
          dispatch(
            !productLikeByUser
              ? productLikeToggle({
                  productInfo: {
                    key: 'like',
                    value: res.data.productLike.data,
                  },
                })
              : productLikeToggle({
                  productInfo: {
                    key: 'disLike',
                    value: productId,
                  },
                }),
          );
          toast.show({
            title: res?.data?.productLike?.message,
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
      setProductLikeByUser(false);
    }

    const likedProductByUser = userProfile?.product_like_list?.find(
      itm => itm?.id === productId,
    );

    likedProductByUser
      ? setProductLikeByUser(true)
      : setProductLikeByUser(false);
  }, [isAuthenticate, productId, userProfile]);

  useEffect(() => {
    getProductDetail();
  }, [route, productId]);

  const productImages = [
    productDetails?.data?.product?.data?.product_image?.front,
    productDetails?.data?.product?.data?.product_image?.back,
    productDetails?.data?.product?.data?.product_image?.side,
  ];

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.productHeaderMain}>
        <View style={styles.leftMainDiv}>
          <Icon
            onPress={() => navigation.goBack()}
            name="angle-left"
            size={24}
            color="white"
          />
          <Image
            source={{
              uri: productDetails?.data?.product?.data?.branchInfo?.shop_info
                .shop_logo,
            }}
            style={{width: 42, height: 42, borderRadius: 22}}
          />
          <View>
            <Text numberOfLines={1} style={styles.productHeadNameText}>
              {
                productDetails?.data?.product?.data?.branchInfo?.shop_info
                  ?.shop_name
              }
            </Text>
            <Text style={styles.dayText}>25 days ago</Text>
          </View>
        </View>
        <View style={styles.rightMainDiv}>
          <View>
            <StarRating
              starSize={15}
              starStyle={{marginHorizontal: 0}}
              rating={Math.round(
                productDetails?.data?.product?.data?.branchInfo?.shop_info
                  ?.shop_rating,
              )}
              maxStars={5}
              emptyColor="#CCCFD2"
              onChange={() => {}}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}>
              <Image
                source={require('../../../images/locationIcon.png')}
                style={{width: 12, height: 12, tintColor: 'white'}}
              />
              <Text numberOfLines={1} style={styles.locationText}>
                {
                  productDetails?.data?.product?.data?.branchInfo
                    ?.branch_address
                }
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => clickedByFollow()}
            style={styles.followBtn}>
            {!shopFollowByUser && <Icon name="plus" size={14} color="white" />}
            <Text style={styles.followBtnText}>
              {shopFollowByUser ? 'UnFollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{position: 'relative'}}>
          <View style={styles.carouselMain}>
            <SliderBox
              imageLoadingColor="green"
              dotColor="green"
              images={productImages}
              sliderBoxHeight={350}
              resizeMethod={'resize'}
              resizeMode={'cover'}
              ImageComponentStyle={{
                borderRadius: 0,
                objectFit: 'cover',
              }}
              // dotStyle={{
              //   marginBottom: 30,
              // }}
              paginationBoxStyle={{
                position: 'absolute',
                bottom: 35,
              }}
              autoplay={false}
            />
            <View style={styles.threeIconMain}>
              <TouchableOpacity
                onPress={() => clickedByLike()}
                style={styles.iconBG}>
                <Icon
                  name={productLikeByUser ? 'heart' : 'heart-o'}
                  size={22}
                  color={productLikeByUser ? 'red' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBG}>
                <Icon name="share-alt" size={22} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBG}>
                <Icon name="exclamation-circle" size={22} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.mainContainer}>
            {/* <Popover
              placement="left"
              trigger={triggerProps => {
                return (
                  <Button
                    colorScheme="danger"
                    alignSelf="center"
                    {...triggerProps}
                    onPress={() => setIsOpen(true)}>
                    Delete Customer
                  </Button>
                );
              }}
              isOpen={isOpen}
              onClose={() => setIsOpen(!isOpen)}>
              <Popover.Content>
                <Popover.Arrow />
                <View style={styles.radioTopMain}>
                  <Text onPress={() => setIsOpen(false)}>GBBBBBBBBB</Text>
                  <Button
                    colorScheme="coolGray"
                    variant="ghost"
                    onPress={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </View>
              </Popover.Content>
            </Popover> */}
            <Text style={styles.proNameText}>
              {productDetails?.data?.product?.data?.product_name}
            </Text>
            <Text style={[styles.aboutNameText, {paddingBottom: 0}]}>
              About
            </Text>
            <View style={{width: '100%'}}>
              {/* <Text style={styles.aboutText}> */}
              <RenderHTML
                contentWidth={300}
                source={{
                  html: `${productDetails?.data?.product?.data?.product_description}`,
                }}
              />
              {/* </Text> */}
            </View>
            <Text style={styles.aboutNameText}>Item Details</Text>
            <Text style={[styles.aboutText, {paddingBottom: 12}]}>
              Category :{' '}
              <Text style={{color: '#151827'}}>
                {
                  productDetails?.data?.product?.data?.categoryInfo
                    ?.category_name
                }
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                paddingBottom: 30,
              }}>
              <Text style={[styles.aboutText]}>Color :</Text>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 12,
                  backgroundColor:
                    productDetails?.data?.product?.data?.product_color,
                }}></View>
            </View>

            <View style={styles.btnMainDev}>
              <View style={{width: '48%'}}>
                <CustomButton
                  name="Send Messages"
                  color="#FFFFFF"
                  backgroundColor="#29977E"
                  onPress={() => {}}
                  borderColor="#29977E"
                  icon={true}
                  iconName="whatsapp"
                />
              </View>
              <View style={{width: '48%'}}>
                <CustomButton
                  name="Show Contact"
                  color="#151827"
                  backgroundColor="rgba(21, 24, 39, 0.10)"
                  onPress={() => {}}
                  borderColor="rgba(21, 24, 39, 0.10)"
                  icon={true}
                  iconName="user-circle-o"
                />
              </View>
            </View>

            <Text style={[styles.aboutNameText, {paddingBottom: 0}]}>
              Similar Products
            </Text>
            <View style={styles.productCardMain}>
              {productDetails?.data?.product?.related &&
                productDetails?.data?.product?.related?.map(
                  (product, index) => (
                    <ProductCard product={product} key={index} />
                  ),
                )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  productHeaderMain: {
    backgroundColor: '#151827',
    width: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftMainDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  rightMainDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  productHeadNameText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FontStyle,
    width: 100,
  },
  dayText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '400',
    fontFamily: FontStyle,
  },
  locationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: FontStyle,
    width: 70,
  },
  followBtn: {
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 8,
  },
  followBtnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
  carouselMain: {
    position: 'relative',
  },
  threeIconMain: {
    position: 'absolute',
    right: 20,
    top: 20,
    gap: 10,
  },
  iconBG: {
    backgroundColor: 'white',
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    elevation: 3,
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#FAFCFC',
    position: 'relative',
    top: -25,
    width: '100%',
    zIndex: 999999,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  proNameText: {
    color: '#151827',
    fontSize: 19,
    fontWeight: '700',
    fontFamily: FontStyle,
    paddingBottom: 22,
  },
  aboutNameText: {
    color: '#151827',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FontStyle,
    paddingBottom: 10,
  },
  aboutText: {
    color: 'rgba(21, 24, 39, 0.56)',
    fontWeight: '400',
    fontSize: 14,
    fontFamily: FontStyle,
  },
  btnMainDev: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  productCardMain: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
