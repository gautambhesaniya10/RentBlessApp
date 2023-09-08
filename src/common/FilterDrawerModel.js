import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FilterScreen from '../screens/FilterScreen/FilterScreen';

const FilterDrawerModel = ({
  filterModelOpen,
  handleFilterModelClose,
  setCurrentPage,
  setProductDataLimit,
  setShopCurrentPage,
  setShopDataLimit,
  setShowBottomLoader,
}) => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModelOpen}
      onRequestClose={handleFilterModelClose}>
      <View style={[styles.modalContainer]}>
        <View style={[styles.bottomSheet, {height: windowHeight}]}>
          <View
            style={{
              width: '100%',
            }}>
            <FilterScreen
              handleFilterModelClose={handleFilterModelClose}
              setCurrentPage={setCurrentPage}
              setProductDataLimit={setProductDataLimit}
              setShopCurrentPage={setShopCurrentPage}
              setShopDataLimit={setShopDataLimit}
              setShowBottomLoader={setShowBottomLoader}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterDrawerModel;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 23,
    bottom: 0,
  },
});
