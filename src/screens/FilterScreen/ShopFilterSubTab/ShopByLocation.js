import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CheckBox} from 'react-native-elements';

const ShopByLocation = ({
  areaLists,
  selectedLocationData,
  setSelectedLocationData,
}) => {
  const handleMenCheckboxChange = item => {
    const updatedSelection = selectedLocationData?.includes(item)
      ? selectedLocationData?.filter(id => id !== item)
      : [...selectedLocationData, item];

    setSelectedLocationData(updatedSelection);
  };

  return (
    <View>
      {areaLists?.map((itm, index) => (
        <View key={index}>
          <CheckBox
            title={itm?.area}
            checked={selectedLocationData?.includes(itm?.pin)}
            onPress={() => handleMenCheckboxChange(itm?.pin)}
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

export default ShopByLocation;

const styles = StyleSheet.create({});
