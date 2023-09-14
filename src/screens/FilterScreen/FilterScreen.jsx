import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {shopProductButtonChange} from '../../redux/ShopFilter/ShopFilterSlice';
import {useDispatch, useSelector} from 'react-redux';
// import {Switch} from 'react-native-paper';
import ProductApplyFilter from './ProductApplyFilter';
import ShopApplyFilter from './ShopApplyFilter';
import {Switch} from 'react-native-switch';

const FilterScreen = ({
  handleFilterModelClose,
  setCurrentPage,
  setProductDataLimit,
  setShopCurrentPage,
  setShopDataLimit,
  setShowBottomLoader,
  showOnlyShopDetailPage,
}) => {
  const dispatch = useDispatch();
  const {byShop} = useSelector(state => state?.shopsFiltersReducer);

  return (
    <View
      style={{backgroundColor: '#FFF', height: '100%', position: 'relative'}}>
      <View style={[styles.headerMain, {height: '10%'}]}>
        <View style={styles.innerHeaderLeft}>
          <Text style={styles.filterHeaderText}>Filters</Text>
          {!showOnlyShopDetailPage && (
            <View style={styles.toggleSwitchMain}>
              {/* <Text style={styles.switchText}>Product</Text>
          <Switch
            value={byShop}
            onValueChange={() => dispatch(shopProductButtonChange(!byShop))}
            color="#29977E"
          />
          <Text style={styles.switchText}>Shop</Text> */}

              <Switch
                value={byShop}
                onValueChange={() => dispatch(shopProductButtonChange(!byShop))}
                activeText={'Shop'}
                activeTextStyle={{color: 'black'}}
                inActiveText={'Product'}
                inactiveTextStyle={{color: 'black'}}
                circleSize={30}
                barHeight={27}
                backgroundActive={'#94cbbe'}
                backgroundInactive={'rgba(21, 24, 39, 0.10)'}
                circleActiveColor={'#29977e'}
                circleInActiveColor={'#ffffff'}
                innerCircleStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: byShop ? 0 : 20,
                  marginRight: byShop ? 12 : 0,
                }}
                switchWidthMultiplier={3} // multiplied by the `circleSize` prop to calculate total width
              />
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => handleFilterModelClose()}>
          <Icon name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{height: '90%'}}>
        {!byShop || showOnlyShopDetailPage ? (
          <ProductApplyFilter
            handleFilterModelClose={handleFilterModelClose}
            setCurrentPage={setCurrentPage}
            setProductDataLimit={setProductDataLimit}
            setShowBottomLoader={setShowBottomLoader}
            showOnlyShopDetailPage={showOnlyShopDetailPage}
          />
        ) : (
          <ShopApplyFilter
            handleFilterModelClose={handleFilterModelClose}
            setShopCurrentPage={setShopCurrentPage}
            setShopDataLimit={setShopDataLimit}
            setShowBottomLoader={setShowBottomLoader}
          />
        )}
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomColor: 'rgba(24, 23, 37, 0.10)',
    borderBottomWidth: 1,
  },
  innerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterHeaderText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 22,
  },
  toggleSwitchMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  switchText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});
