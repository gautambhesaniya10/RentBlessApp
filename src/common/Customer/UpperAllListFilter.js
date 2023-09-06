import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {changeAppliedProductsFilters} from '../../redux/ProductFilter/ProductFilterSlice';
import {changeAppliedShopsFilters} from '../../redux/ShopFilter/ShopFilterSlice';

const FilterItemList = ['Sherwani', 'Blazer', 'Suit', 'Indo'];

const UpperAllListFilter = ({showOnlyShopDetailPage}) => {
  const dispatch = useDispatch();
  const productsFiltersReducer = useSelector(
    state => state?.productsFiltersReducer,
  );
  const {categories} = useSelector(state => state?.categories);
  const {allShopsLists, shopsCount} = useSelector(state => state?.shops);
  const {byShop} = useSelector(state => state?.shopsFiltersReducer);

  const [selectedProductFilters, setSelectedProductFilters] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [selectedShopFilters, setSelectedShopFilters] = useState([]);

  const handleDeleteParticularFilterBadge = itm => {
    if (byShop) {
      dispatch(
        changeAppliedShopsFilters({
          key: itm.type,
          value: {
            selectedValue:
              itm.type === 'stars'
                ? '0'
                : shopsFiltersReducer.appliedShopsFilters[
                    itm.type
                  ].selectedValue.filter(item => item !== itm.value),
          },
        }),
      );
    } else {
      dispatch(
        changeAppliedProductsFilters({
          key: itm.type,
          value: {
            selectedValue: productsFiltersReducer?.appliedProductsFilters[
              itm.type
            ].selectedValue?.filter(item => item !== itm.value),
          },
        }),
      );
    }
  };

  useEffect(() => {
    setSelectedProductFilters([
      ...selectedCategories,
      ...(showOnlyShopDetailPage ? [] : selectedShops),
      ...selectedColors,
    ]);
  }, [
    selectedCategories,
    selectedColors,
    selectedShops,
    showOnlyShopDetailPage,
  ]);

  useEffect(() => {
    const selectedCategoryIds =
      productsFiltersReducer?.appliedProductsFilters?.categoryId?.selectedValue;

    const selectedCategories = categories?.filter(category =>
      selectedCategoryIds?.includes(category?.id),
    );

    const mappedCategories = selectedCategories?.map(category => ({
      type: 'categoryId',
      label: category?.category_name,
      value: category?.id,
    }));

    setSelectedCategories(mappedCategories);
  }, [
    categories,
    productsFiltersReducer.appliedProductsFilters.categoryId.selectedValue,
  ]);

  useEffect(() => {
    const selectedShopIds =
      productsFiltersReducer?.appliedProductsFilters?.shopId?.selectedValue;

    const selectedShopsData = allShopsLists?.data.filter(shop =>
      selectedShopIds?.includes(shop.id),
    );

    const mappedShops = selectedShopsData?.map(shop => ({
      type: 'shopId',
      label: shop?.shop_name,
      value: shop?.id,
    }));

    setSelectedShops(mappedShops);
  }, [
    productsFiltersReducer?.appliedProductsFilters?.shopId?.selectedValue,
    allShopsLists?.data,
  ]);

  useEffect(() => {
    setSelectedColors(
      productsFiltersReducer?.appliedProductsFilters?.productColor?.selectedValue?.map(
        color => ({
          type: 'productColor',
          label: color,
          value: color,
        }),
      ),
    );
  }, [
    productsFiltersReducer?.appliedProductsFilters?.productColor?.selectedValue,
  ]);

  return (
    <View>
      {(byShop ? selectedShopFilters : selectedProductFilters)?.length > 0 && (
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
            {(byShop ? selectedShopFilters : selectedProductFilters)?.map(
              (item, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Text style={styles.filterItemText}>{item?.label}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteParticularFilterBadge(item)}>
                    <Icon name="close" size={15} color="gray" />
                  </TouchableOpacity>
                </View>
              ),
            )}
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              if (byShop) {
                ['locations', 'stars'].map(itm =>
                  dispatch(
                    changeAppliedShopsFilters({
                      key: itm,
                      value: {
                        selectedValue: itm === 'stars' ? '0' : [],
                      },
                    }),
                  ),
                );
              } else {
                [
                  'categoryId',
                  'productColor',
                  ...(showOnlyShopDetailPage ? [] : ['shopId']),
                ].map(itm =>
                  dispatch(
                    changeAppliedProductsFilters({
                      key: itm,
                      value: {
                        selectedValue: [],
                      },
                    }),
                  ),
                );
              }
            }}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UpperAllListFilter;

const styles = StyleSheet.create({
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
});
