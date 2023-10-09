import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {productLike} from '../../graphql/mutations/products';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useToast} from 'native-base';
import {productLikeToggle} from '../../redux/LoginUserProfileSlice/userSlice';
import {Avatar} from 'react-native-paper';

const ProductCard = ({product, landingPageCardWith}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const ProductImages = [
    product?.product_image?.front,
    product?.product_image?.back,
    product?.product_image?.side,
  ];
  const {userProfile, isAuthenticate} = useSelector(state => state?.user);

  const [productLikeByUser, setProductLikeByUser] = useState(false);

  const clickedByLike = () => {
    if (isAuthenticate) {
      productLike({
        productInfo: {
          product_id: product?.id,
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
                    value: product?.id,
                  },
                }),
          );
          toast.show({
            title: res.data.productLike.message,
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
      itm => itm?.id === product?.id,
    );

    likedProductByUser
      ? setProductLikeByUser(true)
      : setProductLikeByUser(false);
  }, [isAuthenticate, product?.id, userProfile]);

  return (
    <View
      style={[
        styles.mainContainer,
        {width: landingPageCardWith ? 200 : '47%'},
      ]}>
      <View style={{position: 'relative'}}>
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            flexDirection: 'row',
            width: '100%',
          }}>
          {ProductImages?.map((img, index) => (
            <Image
              key={index}
              source={{uri: img}}
              style={{
                height: 180,
                width: '100%',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                objectFit: 'cover',
              }}
            />
          ))}
        </ScrollView> */}
        <View style={{height: 210, width: '100%'}}>
          <Image
            source={{uri: ProductImages[0]}}
            style={{
              height: '100%',
              width: '100%',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              objectFit: 'cover',
            }}
          />
        </View>
        <View style={styles.heartIcon}>
          <TouchableOpacity onPress={() => clickedByLike()}>
            <Icon
              name={productLikeByUser ? 'heart' : 'heart-o'}
              size={18}
              color={productLikeByUser ? 'red' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        disabled={landingPageCardWith ? true : false}
        onPress={() =>
          !landingPageCardWith &&
          navigation.navigate('ProductDetail', {
            state: {
              productId: product?.id,
            },
          })
        }>
        <Text style={styles.productNameText} numberOfLines={2}>
          {product?.product_name}
        </Text>
        <View style={styles.shopMain}>
          {product?.branchInfo?.shop_info?.shop_logo ? (
            <Image
              source={{uri: product?.branchInfo?.shop_info?.shop_logo}}
              style={{width: 25, height: 25, borderRadius: 12}}
            />
          ) : (
            <Avatar.Text
              size={25}
              label={product?.branchInfo?.shop_info?.shop_name?.charAt(0)}
              backgroundColor="#29977E"
            />
          )}

          <Text style={styles.shopNameText} numberOfLines={1}>
            {product?.branchInfo?.shop_info?.shop_name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    // width: '47%',
    height: 300,
    borderRadius: 8,
    elevation: 2,
    // marginTop: 20,
    marginBottom: 20,
  },
  productNameText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 14,
    padding: 8,
  },
  shopNameText: {
    color: 'rgba(21, 24, 39, 0.40)',
    fontWeight: '600',
    fontSize: 14,
    width: 120,
  },
  shopMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 8,
    marginTop: 5,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(21, 24, 39, 0.16)',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});
