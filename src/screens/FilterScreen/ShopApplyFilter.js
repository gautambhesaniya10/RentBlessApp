import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import CustomButton from '../../common/CustomButton';
import ShopByLocation from './ShopFilterSubTab/ShopByLocation';
import ShopRatingsFilter from './ShopFilterSubTab/ShopRatingsFilter';
import {changeAppliedShopsFilters} from '../../redux/ShopFilter/ShopFilterSlice';

const ShopApplyFilter = ({
  handleFilterModelClose,
  setShopCurrentPage,
  setShopDataLimit,
  setShowBottomLoader,
}) => {
  const dispatch = useDispatch();
  const {areaLists} = useSelector(state => state?.areaLists);
  const shopsFiltersReducer = useSelector(state => state?.shopsFiltersReducer);

  const AllCateGory = ['Location', 'Rating'];
  const [selectedCategory, setSelectedCategory] = useState('Location');

  const [selectedLocationData, setSelectedLocationData] = useState([]);
  const [selectedRatingData, setSelectedRatingData] = useState(0);

  const [clearTextShow, setClearTextShow] = useState(false);
  const [clearAllBtnShow, setClearAllBtnShow] = useState(false);

  const clearParticularLocation = () => {
    if (selectedCategory === 'Location') {
      setSelectedLocationData([]);
    }
  };
  const clearAllShopFilter = () => {
    setSelectedLocationData([]);
  };

  useEffect(() => {
    if (selectedCategory === 'Location') {
      if (selectedLocationData?.length > 0) {
        setClearTextShow(true);
      } else {
        setClearTextShow(false);
      }
    } else if (selectedCategory === 'Rating') {
      setClearTextShow(false);
    }
  }, [selectedCategory, selectedLocationData]);

  useEffect(() => {
    if (selectedLocationData?.length > 0) {
      setClearAllBtnShow(true);
    } else {
      setClearAllBtnShow(false);
    }
  }, [selectedLocationData, selectedCategory]);

  const handleCloseShopFilter = () => {
    setShopCurrentPage(0);
    setShopDataLimit(0);
    setShowBottomLoader(false);
    handleFilterModelClose();
  };

  const handleApplyShopFilter = () => {
    dispatch(
      changeAppliedShopsFilters({
        key: 'locations',
        value: {
          selectedValue: selectedLocationData,
        },
      }),
    );

    dispatch(
      changeAppliedShopsFilters({
        key: 'stars',
        value: {
          selectedValue: selectedRatingData.toString(),
        },
      }),
    );
    handleCloseShopFilter();
  };

  useEffect(() => {
    shopsFiltersReducer?.appliedShopsFilters &&
      setSelectedLocationData(
        shopsFiltersReducer?.appliedShopsFilters?.locations?.selectedValue,
      );
  }, [shopsFiltersReducer?.appliedShopsFilters, areaLists]);

  useEffect(() => {
    shopsFiltersReducer?.appliedShopsFilters &&
      setSelectedRatingData(
        Number(shopsFiltersReducer?.appliedShopsFilters?.stars?.selectedValue),
      );
  }, [shopsFiltersReducer.appliedShopsFilters]);

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
            {clearTextShow && (
              <TouchableOpacity onPress={() => clearParticularLocation()}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginTop: 10, paddingBottom: 30, height: 430}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedCategory === 'Location' && (
                <ShopByLocation
                  areaLists={areaLists}
                  selectedLocationData={selectedLocationData}
                  setSelectedLocationData={setSelectedLocationData}
                />
              )}
              {selectedCategory === 'Rating' && (
                <ShopRatingsFilter
                  selectedRatingData={selectedRatingData}
                  setSelectedRatingData={setSelectedRatingData}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.bottomButtonMain}>
        <View style={{width: '40%'}}>
          {clearAllBtnShow && (
            <CustomButton
              name="Clear all"
              color="black"
              borderColor="black"
              backgroundColor="#FFF"
              onPress={() => clearAllShopFilter()}
            />
          )}
        </View>
        <View style={{width: '40%'}}>
          <CustomButton
            name="Apply"
            color="#FFF"
            borderColor="#29977E"
            backgroundColor="#29977E"
            onPress={() => handleApplyShopFilter()}
          />
        </View>
      </View>
    </View>
  );
};

export default ShopApplyFilter;

const styles = StyleSheet.create({
  mainListContainer: {
    width: '100%',
    height: '85%',
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
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopColor: 'rgba(24, 23, 37, 0.10)',
    borderTopWidth: 1,
    backgroundColor: '#FFF',
  },
});