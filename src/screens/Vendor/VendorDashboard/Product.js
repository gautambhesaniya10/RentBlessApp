import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackGroundStyle, FontStyle} from '../../../../CommonStyle';
import VendorLogoAndName from '../../../components/VendorLogoAndName';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../../common/CustomButton';
import AddEditProduct from './AddEditProduct/AddEditProduct';
import {loadCategoriesStart} from '../../../redux/CategorySlice/CategoryListSlice';
import ProductListing from './AddEditProduct/ProductListing';

const Product = () => {
  const {vendorShopDetails} = useSelector(state => state?.shopDetail);
  const {userProfile} = useSelector(state => state?.user);
  const {categories} = useSelector(state => state?.categories);

  const [openAddEditProduct, setOpenAddEditProduct] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesStart());
  }, [dispatch, userProfile]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.hederMain}>
        {/* <Icon name="chevron-left" size={20} color="black" /> */}
        <Text style={styles.headerText}>Add Product</Text>
      </View>
      {/* <VendorLogoAndName vendorShopDetails={vendorShopDetails} /> */}
      <View style={{width: '90%', marginHorizontal: 22, marginTop: 20}}>
        <CustomButton
          name="Add Product"
          color="#29977E"
          backgroundColor="#FAFCFC"
          borderColor="#29977E"
          onPress={() => setOpenAddEditProduct(true)}
          icon={true}
          iconName="plus"
        />
      </View>
      {openAddEditProduct ? (
        <AddEditProduct
          categories={categories}
          userProfile={userProfile}
          setOpenAddEditProduct={setOpenAddEditProduct}
        />
      ) : (
        <ProductListing />
      )}
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  hederMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginLeft: 26,
    gap: 15,
  },
  headerText: {
    color: '#151827',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: FontStyle,
  },
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
  },
});
