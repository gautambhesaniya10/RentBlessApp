import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CheckBox} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import MenWomenTabs from './ProductFilterSubTab/MenWomenTabs';
import CustomButton from '../../common/CustomButton';

const ProductApplyFilter = () => {
  const AllCateGory = ['Men', 'Women', 'Shops', 'Color'];

  const {categories} = useSelector(state => state.categories);

  const [selectedCategory, setSelectedCategory] = useState('Men');

  const [selectedMenCat, setSelectedMenCat] = useState([]);
  const [selectedWomenCat, setSelectedWomenCat] = useState([]);

  const [menSelectedData, setMenSelectedData] = useState([]);
  const [womenSelectedData, setWomenSelectedData] = useState([]);

  const ClearParticularTab = () => {
    if (selectedCategory === 'Men') {
      setSelectedMenCat([]);
      setMenSelectedData([]);
    } else if (selectedCategory === 'Women') {
      setSelectedWomenCat([]);
      setWomenSelectedData([]);
    }
  };
  const clearAllFilter = () => {
    setSelectedMenCat([]);
    setMenSelectedData([]);
    setSelectedWomenCat([]);
    setWomenSelectedData([]);
  };

  return (
    <View style={{position: 'relative'}}>
      <View style={styles.mainListContainer}>
        <View style={styles.mainLeftList}>
          {AllCateGory?.map((cate, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(cate)}
              style={
                selectedCategory === cate
                  ? styles.catSelNameMain
                  : styles.catNameMain
              }>
              <Text
                style={
                  selectedCategory === cate ? styles.selCatName : styles.CatName
                }>
                {cate}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.mainRightList}>
          <View style={styles.chooseMain}>
            <Text style={styles.chooseText}>Choose Categories</Text>
            <TouchableOpacity onPress={() => ClearParticularTab()}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10, paddingBottom: 30, height: 430}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {(selectedCategory === 'Men' || selectedCategory === 'Women') && (
                <MenWomenTabs
                  categories={categories}
                  selectedCategory={selectedCategory}
                  selectedMenCat={selectedMenCat}
                  setSelectedMenCat={setSelectedMenCat}
                  selectedWomenCat={selectedWomenCat}
                  setSelectedWomenCat={setSelectedWomenCat}
                  setMenSelectedData={setMenSelectedData}
                  setWomenSelectedData={setWomenSelectedData}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.bottomButtonMain}>
        <View style={{width: '40%'}}>
          <CustomButton
            name="Clear all"
            color="black"
            borderColor="black"
            backgroundColor="#FFF"
            onPress={() => clearAllFilter()}
          />
        </View>
        <View style={{width: '40%'}}>
          <CustomButton
            name="Apply"
            color="#FFF"
            borderColor="#29977E"
            backgroundColor="#29977E"
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductApplyFilter;

const styles = StyleSheet.create({
  mainListContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  mainLeftList: {
    width: '35%',
    backgroundColor: '#FAFCFC',
  },
  mainRightList: {
    width: '65%',
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  catSelNameMain: {
    paddingVertical: 17,
    paddingLeft: 17,
    borderLeftWidth: 3,
    borderLeftColor: '#29977E',
    backgroundColor: '#FFF',
  },
  selCatName: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  catNameMain: {
    paddingVertical: 17,
    paddingLeft: 20,
  },
  CatName: {
    color: '#rgba(0, 0, 0, 0.80)',
    fontWeight: '400',
    fontSize: 16,
  },
  chooseMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chooseText: {
    color: '#181725',
    fontWeight: '600',
    fontSize: 16,
  },
  clearText: {
    color: '#181725',
    fontWeight: '500',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  bottomButtonMain: {
    position: 'absolute',
    bottom: 143,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopColor: 'rgba(24, 23, 37, 0.10)',
    borderTopWidth: 1,
    backgroundColor: '#FFF',
  },
});
