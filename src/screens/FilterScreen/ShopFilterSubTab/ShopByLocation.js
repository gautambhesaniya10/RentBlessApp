import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import {capitalizeString} from '../../../common/CapitalizeString';
import SearchTextFiled from '../../../common/SearchTextFiled';

const ShopByLocation = ({
  areaLists,
  selectedLocationData,
  setSelectedLocationData,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleMenCheckboxChange = itm => {
    const updatedSelection = selectedLocationData?.some(
      item => item.area === itm.area && item.pin === itm.pin,
    )
      ? selectedLocationData?.filter(val => val.pin !== itm.pin)
      : [...selectedLocationData, {area: itm.area, pin: itm.pin}];

    setSelectedLocationData(updatedSelection);
  };

  return (
    <View>
      <SearchTextFiled
        value={searchText}
        handleTextSearch={value => setSearchText(value.toLowerCase())}
      />
      {(searchText !== ''
        ? areaLists?.filter(data =>
            data?.area?.toLowerCase().includes(searchText),
          )
        : areaLists
      )?.map((itm, index) => (
        <View key={index}>
          <CheckBox
            title={capitalizeString(itm?.area)}
            checked={selectedLocationData?.some(
              item => item.area === itm.area && item.pin === itm.pin,
            )}
            onPress={() => handleMenCheckboxChange(itm)}
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
