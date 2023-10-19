import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Popover} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontStyle} from '../../../CommonStyle';
import {RadioButton} from 'react-native-paper';
import {changeSortProductsFilters} from '../../redux/ProductFilter/ProductFilterSlice';
import {useDispatch, useSelector} from 'react-redux';
import {changeSortShopsFilters} from '../../redux/ShopFilter/ShopFilterSlice';
import UpperAllListFilter from './UpperAllListFilter';

const UpperFilter = ({
  byShop,
  setShowBottomLoader,
  showOnlyShopDetailPage,
  productsCount,
  shopsCount,
}) => {
  const dispatch = useDispatch();

  const productsFiltersReducer = useSelector(
    state => state.productsFiltersReducer,
  );
  const shopsFiltersReducer = useSelector(state => state?.shopsFiltersReducer);
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);

  const onChangeSortFilter = newValue => {
    setIsOpenPopOver(false);
    !showOnlyShopDetailPage && setShowBottomLoader(false);

    if (!byShop) {
      dispatch(
        changeSortProductsFilters({
          key: 'sortType',
          value: {
            selectedValue: newValue,
          },
        }),
      );
    } else {
      dispatch(
        changeSortShopsFilters({
          key: 'sortType',
          value: {
            selectedValue: newValue,
          },
        }),
      );
    }
  };

  const options = byShop
    ? [
        {label: 'Default', value: ''},
        {label: 'Rating: high to low', value: 'rating'},
        {label: 'Follower: high to low', value: 'follower'},
      ]
    : [
        {label: 'Default', value: ''},
        {label: 'Price: high to low', value: 'high-low'},
        {label: 'Price: low to high', value: 'low-high'},
      ];

  const GetSortByName = value => {
    if (value === 'high-low') {
      return 'Price: high to low';
    } else if (value === 'low-high') {
      return 'Price: low to high';
    } else {
      return 'Sort by';
    }
  };

  const GetSortByNameForShop = value => {
    if (value === 'rating') {
      return 'Rating: high to low';
    } else if (value === 'follower') {
      return 'Follower: high to low';
    } else {
      return 'Sort by';
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // paddingTop: 30,
        }}>
        <Text style={styles.productText}>
          {byShop ? `Shop (${shopsCount})` : `Product (${productsCount})`}
        </Text>
        <TouchableOpacity style={{marginRight: -12}}>
          <Popover
            trigger={triggerProps => {
              return (
                <Button
                  style={{backgroundColor: 'transparent'}}
                  {...triggerProps}
                  onPress={() => setIsOpenPopOver(true)}>
                  <View style={styles.sortFilMain}>
                    {/* <Text
                      style={[
                        styles.latestText,
                        {color: 'rgba(21, 24, 39, 0.40)'},
                      ]}>
                      Sort by:
                    </Text> */}
                    <Text style={styles.latestText}>
                      {/* {oldLatestValue === 'new' ? 'Latest' : 'Oldest'} */}
                      {byShop
                        ? GetSortByNameForShop(
                            shopsFiltersReducer?.sortFilters?.sortType
                              .selectedValue,
                          )
                        : GetSortByName(
                            productsFiltersReducer?.sortFilters.sortType
                              .selectedValue,
                          )}
                      <Icon name="angle-down" size={16} color="black" />
                    </Text>
                  </View>
                </Button>
              );
            }}
            isOpen={isOpenPopOver}
            onClose={() => setIsOpenPopOver(!isOpenPopOver)}>
            <Popover.Content>
              {/* <Popover.Arrow /> */}
              <View style={styles.radioTopMain}>
                <RadioButton.Group
                  onValueChange={newValue => onChangeSortFilter(newValue)}
                  value={
                    byShop
                      ? shopsFiltersReducer?.sortFilters?.sortType.selectedValue
                      : productsFiltersReducer?.sortFilters.sortType
                          .selectedValue
                  }>
                  <View style={styles.radioParent}>
                    {options?.map((item, index) => (
                      <View key={index} style={styles.radioMain}>
                        <RadioButton color="#29977E" value={item?.value} />
                        <Text
                          style={[
                            styles.radioText,
                            {
                              color:
                                (byShop
                                  ? shopsFiltersReducer?.sortFilters?.sortType
                                      .selectedValue
                                  : productsFiltersReducer?.sortFilters.sortType
                                      .selectedValue) === item?.value
                                  ? '#151827'
                                  : 'rgba(21, 24, 39, 0.56)',
                            },
                          ]}>
                          {item?.label}
                        </Text>
                      </View>
                    ))}
                  </View>
                </RadioButton.Group>
              </View>
            </Popover.Content>
          </Popover>
        </TouchableOpacity>
      </View>
      <View>
        <UpperAllListFilter
          showOnlyShopDetailPage={showOnlyShopDetailPage}
          setShowBottomLoader={setShowBottomLoader}
        />
      </View>
    </View>
  );
};

export default UpperFilter;

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
  },
  sortFilMain: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    // padding: 10,
    justifyContent: 'center',
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
  productText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 18,
  },
});
