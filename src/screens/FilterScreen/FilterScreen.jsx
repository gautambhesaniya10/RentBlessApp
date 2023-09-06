import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackGroundStyle} from '../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {shopProductButtonChange} from '../../redux/ShopFilter/ShopFilterSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Switch} from 'react-native-paper';
import CustomButton from '../../common/CustomButton';
import ProductApplyFilter from './ProductApplyFilter';

const FilterScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();

  const dispatch = useDispatch();
  const {byShop} = useSelector(state => state?.shopsFiltersReducer);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF', position: 'relative'}}>
      <View style={styles.headerMain}>
        <Text style={styles.filterHeaderText}>Filters</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(router?.params?.state?.RedirectRoute)
          }>
          <Icon name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.toggleSwitchMain}>
        <Text style={styles.switchText}>Product</Text>
        <Switch
          value={byShop}
          onValueChange={() => dispatch(shopProductButtonChange(!byShop))}
          color="#29977E"
        />
        <Text style={styles.switchText}>Shop</Text>
      </View>

      <View>{!byShop ? <ProductApplyFilter /> : <Text>Shop Filter</Text>}</View>
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
