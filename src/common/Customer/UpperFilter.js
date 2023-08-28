import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Popover} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontStyle} from '../../../CommonStyle';
import {RadioButton} from 'react-native-paper';
import {changeSortProductsFilters} from '../../redux/ProductFilter/ProductFilterSlice';
import {useDispatch} from 'react-redux';

const UpperFilter = ({setCurrentPage, setProductDataLimit}) => {
  const dispatch = useDispatch();
  const [oldLatestValue, setOldLatestValue] = useState('new');

  const onChangeSortFilter = newValue => {
    setCurrentPage(0);
    setProductDataLimit(0);
    setOldLatestValue(newValue);
    dispatch(
      changeSortProductsFilters({
        key: 'sortType',
        value: {
          selectedValue: newValue,
        },
      }),
    );
  };

  return (
    <TouchableOpacity>
      <Popover
        trigger={triggerProps => {
          return (
            <Button style={{backgroundColor: 'transparent'}} {...triggerProps}>
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
        }}>
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
  );
};

export default UpperFilter;

const styles = StyleSheet.create({
  sortFilMain: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 63,
    borderWidth: 1,
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
});
