import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {BackGroundStyle, FontStyle} from '../../../CommonStyle';
import CustomerHeader from '../../components/CustomerHeader';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MenCollection from './MenCollection';
import WomenCollection from './WomenCollection';
import FeaturedVendors from './FeaturedVendors';
import {loadProductsStart} from '../../redux/ProductSlice/ProductSlice';
import {useDispatch} from 'react-redux';

const LandingPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('customer');

  const scrollViewRef = useRef(null);

  // const getAllProducts = () => {
  //   dispatch(
  //     loadProductsStart({
  //       pageData: {
  //         skip: 0,
  //         limit: 10,
  //       },
  //       filter: {
  //         category_id: [],
  //         product_color: [],
  //       },
  //       shopId: [],
  //       sort: 'new',
  //       search: '',
  //     }),
  //   );
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <CustomerHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={{width: '100%'}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 15,
              }}
              ref={scrollViewRef}>
              {[0, 1, 2, 3]?.map((item, index) => (
                <View key={index} style={styles.sliderMainView}>
                  <View style={{width: 210}}>
                    <Image
                      source={require('../../images/ProductIMg.png')}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 8,
                        objectFit: 'cover',
                      }}
                    />
                  </View>
                  <View style={styles.sliderRightMain}>
                    <Text style={styles.sliderH1Text}>Men’s Blazer</Text>
                    <Text style={styles.sliderH2Text}>Under ₹699</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CustomerHomePage')}>
                      <Text style={styles.sliderH2Text}>+ Explore</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.worksMain}>
            <Text style={styles.worksH1Text}>How It Works</Text>
            <Text style={styles.worksH2Text}>
              Lorem Ipsum is simply dummy text of the printing
            </Text>
          </View>
          <View>
            <View style={styles.tabMain}>
              <TouchableOpacity
                onPress={() => setActiveTab('customer')}
                style={[
                  styles.cusTextMain,
                  activeTab === 'customer' && styles.bottomGreenTab,
                ]}>
                <Text style={styles.TextTab}>Customer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab('vendor')}
                style={[
                  styles.venTextMain,
                  activeTab === 'vendor' && styles.bottomGreenTab,
                ]}>
                <Text style={styles.TextTab}>Vendors</Text>
              </TouchableOpacity>
            </View>
            {activeTab === 'customer' ? (
              <View style={styles.tabBottomMainDiv}>
                <View style={styles.tabBottomInnerLeftMainDiv}>
                  <Image
                    source={require('../../images/storeCloth.png')}
                    style={{width: 40, height: 40, alignSelf: 'center'}}
                  />
                  <View style={{alignSelf: 'center'}}>
                    <Text style={styles.chooseText}>Choose Cloth For Rent</Text>
                    <Text style={styles.chooseDesText}>
                      Choose your rental outfit from different collection
                    </Text>
                  </View>
                </View>
                <View style={styles.tabBottomInnerRightMainDiv}>
                  <Image
                    source={require('../../images/storeCloth.png')}
                    style={{width: 40, height: 40, alignSelf: 'center'}}
                  />
                  <View style={{alignSelf: 'center'}}>
                    <Text style={styles.chooseText}>Connect With Vendors</Text>
                    <Text style={styles.chooseDesText}>
                      After choosing your desired clothing reach out to the
                      vendor directly through whatsapp or a direct phone call to
                      inquire about pricing, availibity and other T&C.
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.tabBottomVendorMain}>
                <View style={styles.tabBottomVendorInnerMainDiv}>
                  <View style={styles.tabBottomInnerLeftMainDiv}>
                    <Image
                      source={require('../../images/ownShopImg.png')}
                      style={{width: 40, height: 40, alignSelf: 'center'}}
                    />
                    <View style={{alignSelf: 'center'}}>
                      <Text style={styles.chooseText}>
                        Create Your Own Shop
                      </Text>
                      <Text style={styles.chooseDesText}>
                        Create your personalized experience by setting up your
                        own shop
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tabBottomInnerRightMainDiv}>
                    <Image
                      source={require('../../images/uploadImg.png')}
                      style={{width: 40, height: 40, alignSelf: 'center'}}
                    />
                    <View style={{alignSelf: 'center'}}>
                      <Text style={styles.chooseText}>Upload Products</Text>
                      <Text style={styles.chooseDesText}>
                        Upload list of rental products
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tabBottomVendorInnerBottom}>
                  <Image
                    source={require('../../images/queryImg.png')}
                    style={{width: 40, height: 40, alignSelf: 'center'}}
                  />
                  <View style={{alignSelf: 'center'}}>
                    <Text style={styles.chooseText}>Get Inquiries</Text>
                    <Text style={styles.chooseDesText}>
                      Wait patiently for inquires to arrive via whatsapp or
                      phone calls
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <MenCollection />
          <WomenCollection />
          <FeaturedVendors />
        </View>
      </ScrollView>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
  },
  sliderMainView: {
    // width: '100%',
    height: 200,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 8,
    flexDirection: 'row',
  },
  sliderRightMain: {
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderH1Text: {
    color: '#181725',
    fontSize: 18,
    fontWeight: '700',
    paddingBottom: 8,
    fontFamily: FontStyle,
  },
  sliderH2Text: {
    color: 'rgba(24, 23, 37, 0.80)',
    fontFamily: FontStyle,
    fontSize: 16,
    fontWeight: '500',
    paddingBottom: 8,
  },
  worksMain: {
    marginTop: 25,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  worksH1Text: {
    alignSelf: 'center',
    color: '#181725',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: FontStyle,
    paddingBottom: 8,
  },
  worksH2Text: {
    alignSelf: 'center',
    color: 'rgba(24, 23, 37, 0.56)',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontStyle,
  },
  tabMain: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: 'rgba(24, 23, 37, 0.04)',
    borderBottomWidth: 2,
    marginBottom: 16,
  },
  cusTextMain: {
    width: '50%',
    // backgroundColor: 'yellow',
    paddingVertical: 12,
  },
  venTextMain: {
    width: '50%',
    // backgroundColor: 'yellow',
    paddingVertical: 12,
  },
  TextTab: {
    color: '#181725',
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'center',
  },
  bottomGreenTab: {
    borderBottomColor: '#29977E',
    borderBottomWidth: 3,
  },
  tabBottomMainDiv: {
    backgroundColor: '#FFF',
    width: '100%',
    elevation: 5,
    borderRadius: 8,
    // height: 150,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 18,
  },
  tabBottomInnerLeftMainDiv: {
    width: '50%',
  },
  tabBottomInnerRightMainDiv: {
    width: '50%',
  },
  chooseText: {
    color: '#181725',
    fontWeight: '700',
    fontSize: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  chooseDesText: {
    color: 'rgba(24, 23, 37, 0.56)',
    fontWeight: '400',
    fontSize: 14,
    alignSelf: 'center',
  },
  tabBottomVendorInnerMainDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  tabBottomVendorMain: {
    backgroundColor: '#FFF',
    elevation: 5,
    borderRadius: 8,
    marginBottom: 40,
    paddingVertical: 25,
    paddingHorizontal: 18,
    width: '100%',
  },
  tabBottomVendorInnerBottom: {
    marginTop: 25,
  },
});
