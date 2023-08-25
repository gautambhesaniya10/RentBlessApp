import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontStyle} from '../../../../../CommonStyle';
import {RadioButton} from 'react-native-paper';

const ProductListing = () => {
  const [oldLatestValue, setOldLatestValue] = useState('new');
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={{flex: 1}}>
      <View style={styles.mainContainer}>
        {/* <View style={{width: '40%', position: 'relative'}}>
          <TouchableOpacity
            onPress={() => setShowMenu(!showMenu)}
            style={styles.sortFilMain}>
            <Text
              style={[styles.latestText, {color: 'rgba(21, 24, 39, 0.40)'}]}>
              Sort by:
            </Text>
            <Text style={styles.latestText}>
              Latest <Icon name="angle-down" size={16} color="black" />
            </Text>
          </TouchableOpacity>
          {showMenu && (
            <View style={styles.radioTopMain}>
              <RadioButton.Group
                onValueChange={newValue => setOldLatestValue(newValue)}
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
          )}
        </View> */}
        <View style={{marginTop: 50}}>
          <Text>gdfhgjfd</Text>
          <Text>gdfhgjfd</Text>
          <Text>gdfhgjfd</Text>
          <Text>gdfhgjfd</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
  },
  sortFilMain: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    padding: 8,
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
    position: 'absolute',
    top: 36,
    left: 40,
    zIndex: 1,
  },
  radioParent: {
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 8,
    width: '65%',
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
  },
});
