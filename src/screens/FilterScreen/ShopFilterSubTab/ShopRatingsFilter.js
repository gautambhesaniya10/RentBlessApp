import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Slider} from 'native-base';

const ShopRatingsFilter = () => {
  const [onChangeValue, setOnChangeValue] = useState(1);
  console.log('onChangeValue', onChangeValue);
  return (
    <View style={styles.mainSliderDiv}>
      <Slider
        defaultValue={onChangeValue}
        colorScheme="green"
        maxValue={5}
        onChange={v => {
          setOnChangeValue(Math.floor(v));
        }}>
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </View>
  );
};

export default ShopRatingsFilter;

const styles = StyleSheet.create({
  mainSliderDiv: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
