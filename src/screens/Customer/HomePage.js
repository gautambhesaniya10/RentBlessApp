import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import CustomerHeader from '../../components/CustomerHeader';
import {BackGroundStyle, FontStyle} from '../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import {Button, Popover} from 'native-base';
import ProductCard from '../../components/ProductCard/ProductCard';
import {useSelector} from 'react-redux';

const FilterItemList = ['Sherwani', 'Blazer', 'Suit', 'Indo'];

const HomePage = () => {
  const [SearchText, setSearchText] = useState('');
  const [genderFilter, setGenderFilter] = useState('men');
  const [oldLatestValue, setOldLatestValue] = useState('new');

  const productsFiltersReducer = useSelector(
    state => state.productsFiltersReducer,
  );

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={{position: 'relative'}}>
        <CustomerHeader />
        <View style={styles.searchTextMain}>
          <Icon name="search" size={18} color="black" />
          <TextInput
            onChangeText={value => setSearchText(value)}
            style={{width: '100%'}}
            placeholder="Search  Hear.."
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
            <View style={styles.maleMain}>
              <TouchableOpacity
                onPress={() => setGenderFilter('men')}
                style={[
                  styles.manIcon,
                  {
                    backgroundColor:
                      genderFilter === 'men' ? '#151827' : 'white',
                  },
                ]}>
                <Icon
                  name="male"
                  size={18}
                  color={genderFilter === 'men' ? 'white' : 'black'}
                />
              </TouchableOpacity>
              <Text style={styles.menText}>Men</Text>
            </View>
            <View style={styles.maleMain}>
              <TouchableOpacity
                onPress={() => setGenderFilter('women')}
                style={[
                  styles.manIcon,
                  {
                    backgroundColor:
                      genderFilter === 'women' ? '#151827' : 'white',
                  },
                ]}>
                <Icon
                  name="female"
                  size={18}
                  color={genderFilter === 'women' ? 'white' : 'black'}
                />
              </TouchableOpacity>
              <Text style={styles.menText}>Women</Text>
            </View>
          </View>

          <Text style={styles.productText}>Product</Text>

          <View style={{alignSelf: 'flex-start', marginLeft: -12}}>
            <TouchableOpacity>
              <Popover
                trigger={triggerProps => {
                  return (
                    <Button
                      style={{backgroundColor: 'transparent'}}
                      {...triggerProps}>
                      <View style={styles.sortFilMain}>
                        <Text
                          style={[
                            styles.latestText,
                            {color: 'rgba(21, 24, 39, 0.40)'},
                          ]}>
                          Sort by:
                        </Text>
                        <Text style={styles.latestText}>
                          Latest{' '}
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
                </Popover.Content>
              </Popover>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 6,
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
            }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center',
              }}>
              {FilterItemList?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Text style={styles.filterItemText}>{item}</Text>
                  <TouchableOpacity>
                    <Icon name="close" size={15} color="gray" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productCardMain}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  searchTextMain: {
    backgroundColor: '#FFF',
    width: '90%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 6,
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    gap: 5,
    position: 'absolute',
    top: 60,
    zIndex: 1,
  },
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  maleMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  menText: {
    color: '#151827',
    fontSize: 18,
    fontFamily: FontStyle,
  },
  manIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#D9D9D9',
    borderWidth: 1,
  },
  productText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 20,
    paddingTop: 18,
    paddingBottom: 10,
  },
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
  filterItemText: {
    color: 'rgba(21, 24, 39, 0.56)',
    fontWeight: '600',
    fontSize: 14,
  },
  clearAllText: {
    textDecorationLine: 'underline',
    color: '#151827',
    fontWeight: '700',
    fontSize: 14,
  },

  productCardMain: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 19,
    marginBottom: 20,
  },
});
