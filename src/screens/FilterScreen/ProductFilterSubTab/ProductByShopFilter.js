import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {capitalizeString} from '../../../common/CapitalizeString';

const ProductByShopFilter = ({selectedShopData, setSelectedShopData}) => {
  const {allShopsLists} = useSelector(state => state?.shops);

  const onChangeShopSelected = ShopID => {
    const updatedSelection = selectedShopData?.includes(ShopID)
      ? selectedShopData?.filter(id => id !== ShopID)
      : [...selectedShopData, ShopID];
    setSelectedShopData(updatedSelection);
  };

  return (
    <View>
      {allShopsLists?.data?.map((itm, index) => (
        <View key={index}>
          <CheckBox
            title={capitalizeString(itm.shop_name)}
            checked={selectedShopData?.includes(itm?.id)}
            onPress={() => onChangeShopSelected(itm?.id)}
            containerStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
              margin: 0,
            }}
            checkedColor="#29977E"
          />
        </View>
      ))}
    </View>
  );
};

export default ProductByShopFilter;

const styles = StyleSheet.create({});
