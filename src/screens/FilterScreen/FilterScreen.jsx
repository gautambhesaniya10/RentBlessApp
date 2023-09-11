import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {shopProductButtonChange} from '../../redux/ShopFilter/ShopFilterSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Switch} from 'react-native-paper';
import ProductApplyFilter from './ProductApplyFilter';
import ShopApplyFilter from './ShopApplyFilter';

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
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={{backgroundColor: '#FFF', position: 'relative'}}>
      <View style={styles.headerMain}>
        <Text style={styles.filterHeaderText}>Filters</Text>
        <TouchableOpacity onPress={() => handleFilterModelClose()}>
          <Icon name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {!showOnlyShopDetailPage && (
        <View style={styles.toggleSwitchMain}>
          <Text style={styles.switchText}>Product</Text>
          <Switch
            value={byShop}
            onValueChange={() => dispatch(shopProductButtonChange(!byShop))}
            color="#29977E"
          />
          <Text style={styles.switchText}>Shop</Text>
        </View>
      )}

      <View>
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
  filterHeaderText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 20,
  },
  toggleSwitchMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
    padding: 20,
  },
  switchText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});
