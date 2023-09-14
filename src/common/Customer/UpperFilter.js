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

  const [oldLatestValue, setOldLatestValue] = useState('new');
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);

  useEffect(() => {
    if (!byShop) {
      setOldLatestValue(
        productsFiltersReducer?.sortFilters?.sortType?.selectedValue,
      );
    } else {
      setOldLatestValue(
        shopsFiltersReducer?.sortFilters?.sortType?.selectedValue,
      );
    }
  }, [byShop, productsFiltersReducer, shopsFiltersReducer]);

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
                    <Text
                      style={[
                        styles.latestText,
                        {color: 'rgba(21, 24, 39, 0.40)'},
                      ]}>
                      Sort by:
                    </Text>
                    <Text style={styles.latestText}>
                      {oldLatestValue === 'new' ? 'Latest' : 'Oldest'}
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
                  value={oldLatestValue}>
                  <View style={styles.radioParent}>
                    <View style={styles.radioMain}>
                      <RadioButton color="#29977E" value="new" />
                      <Text
                        style={[
                          styles.radioText,
                          {
                            color:
                              oldLatestValue === 'new'
                                ? '#151827'
                                : 'rgba(21, 24, 39, 0.56)',
                          },
                        ]}>
                        Latest
                      </Text>
                    </View>
                    <View style={styles.radioMain}>
                      <RadioButton color="#29977E" value="old" />
                      <Text
                        style={[
                          styles.radioText,
                          {
                            color:
                              oldLatestValue === 'old'
                                ? '#151827'
                                : 'rgba(21, 24, 39, 0.56)',
                          },
                        ]}>
                        Oldest
                      </Text>
                    </View>
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
    fontSize: 20,
  },
});
