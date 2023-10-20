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

const UpperAllListFilter = ({showOnlyShopDetailPage, setShowBottomLoader}) => {
  const dispatch = useDispatch();
  const productsFiltersReducer = useSelector(
    state => state?.productsFiltersReducer,
  );
  const {categories} = useSelector(state => state?.categories);
  const {allShopsLists, shopsCount} = useSelector(state => state?.shops);
  const {byShop} = useSelector(state => state?.shopsFiltersReducer);
  const shopsFiltersReducer = useSelector(state => state?.shopsFiltersReducer);
  const {areaLists} = useSelector(state => state?.areaLists);

  const [selectedProductFilters, setSelectedProductFilters] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedProductListingType, setSelectedProductListingType] = useState(
    [],
  );
  const [searchProducts, setSearchProducts] = useState([]);

  const [selectedShopFilters, setSelectedShopFilters] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const passValueForProduct = itm => {
    if (itm.type === 'searchBarData' || itm.type === 'productListingType') {
      return '';
    } else if (itm.type === 'productPrice') {
      return {min: 0, max: 0};
    } else {
      return productsFiltersReducer?.appliedProductsFilters[
        itm.type
      ]?.selectedValue?.filter(item => item !== itm.value);
    }
  };

  const handleDeleteParticularFilterBadge = itm => {
    !showOnlyShopDetailPage && setShowBottomLoader(false);
    if (byShop && !showOnlyShopDetailPage) {
      dispatch(
        changeAppliedShopsFilters({
          key: itm.type,
          value: {
            selectedValue:
              itm.type === 'stars'
                ? '0'
                : shopsFiltersReducer?.appliedShopsFilters[
                    itm?.type
                  ].selectedValue?.filter(item => item !== itm.value),
          },
        }),
      );
    } else {
      dispatch(
        changeAppliedProductsFilters({
          key: itm.type,
          value: {
            selectedValue: passValueForProduct(itm),
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
      ...selectedPrices,
      ...selectedProductListingType,
      ...searchProducts,
    ]);
  }, [
    selectedCategories,
    selectedColors,
    selectedShops,
    showOnlyShopDetailPage,
    selectedPrices,
    selectedProductListingType,
    searchProducts,
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

  const priceFilterLabel = price => {
    if (price.min > 0 && price.max === 0) {
      return `Price: Over ${price.min}`;
    } else {
      return `Price: ${price.min} - ${price.max}`;
    }
  };

  useEffect(() => {
    productsFiltersReducer?.appliedProductsFilters.productPrice.selectedValue
      .min === 0 &&
    productsFiltersReducer?.appliedProductsFilters.productPrice.selectedValue
      .max === 0
      ? setSelectedPrices([])
      : setSelectedPrices([
          {
            type: 'productPrice',
            label: priceFilterLabel(
              productsFiltersReducer?.appliedProductsFilters.productPrice
                .selectedValue,
            ),
            value:
              productsFiltersReducer?.appliedProductsFilters.productPrice
                .selectedValue,
          },
        ]);
  }, [
    productsFiltersReducer?.appliedProductsFilters.productPrice.selectedValue,
  ]);

  useEffect(() => {
    productsFiltersReducer?.appliedProductsFilters.productListingType
      .selectedValue === ''
      ? setSelectedProductListingType([])
      : setSelectedProductListingType([
          {
            type: 'productListingType',
            label: `Type: ${productsFiltersReducer?.appliedProductsFilters.productListingType.selectedValue}`,
            value:
              productsFiltersReducer?.appliedProductsFilters.productListingType
                .selectedValue,
          },
        ]);
  }, [
    productsFiltersReducer?.appliedProductsFilters.productListingType
      .selectedValue,
  ]);

  useEffect(() => {
    productsFiltersReducer?.appliedProductsFilters.searchBarData
      .selectedValue &&
    productsFiltersReducer?.appliedProductsFilters.searchBarData
      .selectedValue !== ''
      ? setSearchProducts([
          {
            type: 'searchBarData',
            label:
              productsFiltersReducer?.appliedProductsFilters.searchBarData
                .selectedValue,
            value:
              productsFiltersReducer?.appliedProductsFilters.searchBarData
                .selectedValue,
          },
        ])
      : setSearchProducts([]);
  }, [
    productsFiltersReducer?.appliedProductsFilters.searchBarData.selectedValue,
  ]);

  useEffect(() => {
    setSelectedShopFilters([...selectedLocations, ...selectedRatings]);
  }, [selectedLocations, selectedRatings]);

  useEffect(() => {
    const selectedLocationPins =
      shopsFiltersReducer?.appliedShopsFilters?.locations?.selectedValue;

    const selectedLocations = areaLists?.filter(area =>
      selectedLocationPins?.includes(area?.pin),
    );

    const mappedLocations = selectedLocations?.map(location => ({
      type: 'locations',
      label: location?.area,
      value: location?.pin,
    }));

    setSelectedLocations(mappedLocations);
  }, [
    areaLists,
    shopsFiltersReducer?.appliedShopsFilters?.locations?.selectedValue,
  ]);

  useEffect(() => {
    shopsFiltersReducer?.appliedShopsFilters?.stars?.selectedValue &&
    shopsFiltersReducer?.appliedShopsFilters?.stars?.selectedValue !== '0'
      ? setSelectedRatings([
          {
            type: 'stars',
            label:
              shopsFiltersReducer?.appliedShopsFilters?.stars?.selectedValue,
            value:
              shopsFiltersReducer?.appliedShopsFilters?.stars?.selectedValue,
          },
        ])
      : setSelectedRatings([]);
  }, [shopsFiltersReducer?.appliedShopsFilters?.stars?.selectedValue]);

  return (
    <View>
      {(byShop && !showOnlyShopDetailPage
        ? selectedShopFilters
        : selectedProductFilters
      )?.length > 0 && (
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
            {(byShop && !showOnlyShopDetailPage
              ? selectedShopFilters
              : selectedProductFilters
            )?.map((item, index) => (
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
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              !showOnlyShopDetailPage && setShowBottomLoader(false);
              const passValueForProduct = itm => {
                if (itm === 'searchBarData' || itm === 'productListingType') {
                  return '';
                } else if (itm === 'productPrice') {
                  return {min: 0, max: 0};
                } else {
                  return [];
                }
              };
              if (byShop && !showOnlyShopDetailPage) {
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
                  'productPrice',
                  'productListingType',
                  ...(showOnlyShopDetailPage ? [] : ['shopId']),
                  'searchBarData',
                ].map(itm =>
                  dispatch(
                    changeAppliedProductsFilters({
                      key: itm,
                      value: {
                        selectedValue: passValueForProduct(itm),
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
