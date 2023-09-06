import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CheckBox} from 'react-native-elements';
import {colorsList} from '../../../common/Customer/ColorList';
import {useDispatch, useSelector} from 'react-redux';
import {changeAppliedProductsFilters} from '../../../redux/ProductFilter/ProductFilterSlice';

const ProductColorFilter = ({
  productsFiltersReducer,
  selectedColorData,
  setSelectedColorData,
}) => {
  const dispatch = useDispatch();

  console.log('selectedColorData', selectedColorData);

  const OnChangeColor = selColor => {
    const updatedSelection = selectedColorData?.includes(selColor)
      ? selectedColorData?.filter(item => item !== selColor)
      : [...selectedColorData, selColor];
    setSelectedColorData(updatedSelection);

    // dispatch(
    //   changeAppliedProductsFilters({
    //     key: 'productColor',
    //     value: {
    //       selectedValue: selectedColorData
    //     },
    //   }),
    // );
  };

  return (
    <View>
      {colorsList &&
        colorsList?.map((itm, index) => (
          <View key={index}>
            <CheckBox
              title={itm}
              checked={selectedColorData?.includes(itm)}
              onPress={() => OnChangeColor(itm)}
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

export default ProductColorFilter;

const styles = StyleSheet.create({});
