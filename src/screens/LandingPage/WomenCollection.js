import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontStyle} from '../../../CommonStyle';
import {useSelector} from 'react-redux';
import {capitalizeString} from '../../common/CapitalizeString';
import {getProducts} from '../../graphql/queries/productQueries';
import ProductCard from '../../components/ProductCard/ProductCard';
import {useNavigation} from '@react-navigation/native';

const WomenCollection = () => {
  const navigation = useNavigation();
  const {categories} = useSelector(state => state.categories);
  const [woMenCategoryLabel, setWoMenCategoryLabel] = useState([]);
  const [selectedWomenCat, setSelectedWomenCat] = useState([]);
  const [woMenSelectedData, setWoMenProductData] = useState([]);

  useEffect(() => {
    const filterMenData = categories.filter(
      itm => itm?.category_type === 'Women',
    );

    setWoMenCategoryLabel(filterMenData);
    setSelectedWomenCat([filterMenData[0]?.id]);
  }, [categories]);

  const getWoMenProduct = async () => {
    const response = await getProducts({
      pageData: {
        skip: 0,
        limit: 5,
      },
      filter: {
        category_id: selectedWomenCat,
        product_color: [],
      },
      shopId: [],
      sort: 'new',
      search: '',
    });
    setWoMenProductData(response?.data?.productList?.data);
  };

  useEffect(() => {
    selectedWomenCat.length > 0 && getWoMenProduct();
  }, [selectedWomenCat]);

  return (
    <View style={{marginBottom: 40}}>
      <Text style={styles.headingText}>Women’s Collections</Text>
      <Text style={styles.descriptionText}>
        Lorem Ipsum is simply dummy text of the printing
      </Text>

      <View style={styles.menSlideColMain}>
        <View style={styles.leftMain}>
          {woMenCategoryLabel?.map((item, index) => {
            if (index < 6) {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedWomenCat([item?.id])}>
                  <Text
                    style={
                      selectedWomenCat[0] === item?.id
                        ? styles.activeColText
                        : styles.inActiveColText
                    }>
                    {capitalizeString(item?.category_name)}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
          <TouchableOpacity
            onPress={() => navigation.navigate('CustomerHomePage')}>
            <Text
              style={[styles.viewAllBtn, {textDecorationLine: 'underline'}]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightSliderMain}>
          {woMenSelectedData?.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 20,
                paddingRight: 20,
              }}>
              {woMenSelectedData?.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  landingPageCardWith={true}
                />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noDataText}>No Data</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default WomenCollection;

const styles = StyleSheet.create({
  headingText: {
    alignSelf: 'center',
    color: '#181725',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: FontStyle,
    paddingBottom: 5,
  },
  descriptionText: {
    alignSelf: 'center',
    color: 'rgba(24, 23, 37, 0.56)',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontStyle,
    paddingBottom: 30,
    width: '80%',
  },
  menSlideColMain: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  leftMain: {
    width: '30%',
  },
  activeColText: {
    color: '#181725',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: FontStyle,
    paddingBottom: 10,
  },
  inActiveColText: {
    color: 'rgba(24, 23, 37, 0.56)',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: FontStyle,
    paddingBottom: 10,
  },
  viewAllBtn: {
    color: '#29977E',
    fontWeight: '600',
    fontSize: 18,
    paddingBottom: 10,
  },
  rightSliderMain: {
    alignItems: 'center',
    width: '70%',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
  },
});
