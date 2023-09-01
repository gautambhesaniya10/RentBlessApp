import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackGroundStyle, FontStyle} from '../../../../../CommonStyle';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useToast} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../../../common/CustomButton';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import {loadProductsStart} from '../../../../redux/ProductSlice/ProductSlice';
import {changeAppliedProductsFilters} from '../../../../redux/ProductFilter/ProductFilterSlice';
import {getShopDetails} from '../../../../graphql/queries/shopQueries';

const ShopIndividual = () => {
  const route = useRoute();
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  const getShopDetailFromApi = async () => {
    const shopDetails = await getShopDetails({id: shopId});
    setShopDetails(shopDetails);
  };

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

  const getAllProducts = () => {
    dispatch(
      loadProductsStart({
        pageData: {
          skip: 0,
          limit: 6,
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
                source={require('../../../../images/menTshirt.png')}
                style={{width: 64, height: 64, borderRadius: 32}}
              />
              <View>
                <Text style={styles.firstText}>Fashion Bazar</Text>
                <Text style={styles.secText}>Contourz by Taruna Manchanda</Text>
                <Text style={styles.thirdText}>
                  <Image
                    source={require('../../../../images/locationIcon.png')}
                    style={{width: 10, height: 10, tintColor: 'white'}}
                  />{' '}
                  Yogi Chowk
                </Text>

                <View style={styles.followBtnMain}>
                  <View style={{width: '40%'}}>
                    <CustomButton
                      name="Follow"
                      color="black"
                      backgroundColor="#FFF"
                      onPress={() => {}}
                      icon={true}
                      iconName="plus"
                    />
                  </View>
                  <View style={{width: '40%'}}>
                    <CustomButton
                      name="Branches"
                      color="white"
                      borderColor="white"
                      backgroundColor="#151827"
                      onPress={() => {}}
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
                <Text style={styles.numText}>10</Text>
              </View>
              <View style={styles.bottomItemDiv}>
                <Text style={styles.bottomTitleText}>
                  <Icon name="user-o" size={16} color="white" /> Followers
                </Text>
                <Text style={styles.numText}>10</Text>
              </View>
              <View style={styles.bottomItemDiv}>
                <Text style={styles.bottomTitleText}>
                  <Icon name="pencil-square-o" size={16} color="white" />{' '}
                  Reviews
                </Text>
                <Text style={styles.numText}>10</Text>
              </View>
              <View style={styles.bottomItemDiv}>
                <Text style={styles.bottomTitleText}>
                  <Icon name="share" size={16} color="white" /> Share
                </Text>
                <Text style={styles.numText}>10</Text>
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

          <Text>fdsfiudshfiu</Text>
          <Text>fdsfiudshfiu</Text>
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
