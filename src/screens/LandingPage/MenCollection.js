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

const MenCollection = () => {
  const navigation = useNavigation();
  const {categories} = useSelector(state => state.categories);

  const [menCategoryLabel, setMenCategoryLabel] = useState([]);
  const [selectedMenCat, setSelectedMenCat] = useState([]);
  const [menSelectedData, setMenProductData] = useState([]);

  useEffect(() => {
    const filterMenData = categories.filter(
      itm => itm?.category_type === 'Men',
    );

    setMenCategoryLabel(filterMenData);
    setSelectedMenCat([filterMenData[0]?.id]);
  }, [categories]);

  const getMenProduct = async () => {
    const response = await getProducts({
      pageData: {
        skip: 0,
        limit: 5,
      },
      filter: {
        category_id: selectedMenCat,
        product_color: [],
      },
      shopId: [],
      sort: 'new',
      search: '',
    });
    setMenProductData(response?.data?.productList?.data);
  };

  useEffect(() => {
    selectedMenCat.length > 0 && getMenProduct();
  }, [selectedMenCat]);

  return (
    <View style={{marginBottom: 40}}>
      <Text style={styles.headingText}>Men’s Collections</Text>
      <Text style={styles.descriptionText}>
        Lorem Ipsum is simply dummy text of the printing
      </Text>

      <View style={styles.menSlideColMain}>
        <View style={styles.leftMain}>
          {menCategoryLabel?.map((item, index) => {
            if (index < 6) {
              return (
                <TouchableOpacity onPress={() => setSelectedMenCat([item?.id])}>
                  <Text
                    style={
                      selectedMenCat[0] === item?.id
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
              style={[
                styles.inActiveColText,
                {textDecorationLine: 'underline'},
              ]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightSliderMain}>
          {menSelectedData?.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 20,
                paddingRight: 20,
              }}>
              {menSelectedData?.map((product, index) => (
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

export default MenCollection;

const styles = StyleSheet.create({
  headingText: {
    alignSelf: 'center',
    color: '#181725',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: FontStyle,
  },
  descriptionText: {
    alignSelf: 'center',
    color: 'rgba(24, 23, 37, 0.56)',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontStyle,
    paddingBottom: 30,
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
