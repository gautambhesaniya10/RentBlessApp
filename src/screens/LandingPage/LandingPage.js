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
import {useDispatch} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import {
  landingBanner1,
  landingBanner2,
  landingBanner3,
  landingBanner4,
  landingBanner5,
  landingBanner6,
  store1,
  store2,
  store3,
  store4,
  store5,
} from '../../common/AllLiveImageLink';

const LandingPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('customer');
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselRef = useRef(null);
  const {width: screenWidth} = Dimensions.get('window');

  const TopCarouselData = [
    // {image: landingBanner1},
    // {image: landingBanner3},
    // {image: landingBanner2},
    {image: landingBanner4},
    {image: landingBanner5},
    {image: landingBanner6},
  ];

  const autoplayConfig = {
    autoplay: true,
    autoplayInterval: 2000,
    loop: true,
  };

  const CarouselRenderItem = ({item}) => (
    <View style={styles.sliderMainView}>
      <View style={{width: '100%'}}>
        <Image
          source={{uri: item?.image}}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 8,
            objectFit: 'cover',
          }}
        />
      </View>
      {/* <View style={styles.sliderRightMain}>
        <Text style={styles.sliderH1Text}>Men’s Blazer</Text>
        <Text style={styles.sliderH2Text}>Under ₹699</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CustomerHomePage')}>
          <Text style={styles.sliderH2Text}>+ Explore</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <CustomerHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View>
            <Carousel
              ref={carouselRef}
              data={TopCarouselData}
              renderItem={CarouselRenderItem}
              sliderWidth={screenWidth - 30}
              itemWidth={screenWidth - 30}
              onSnapToItem={index => setActiveSlide(index)} // Update active slide index
              {...autoplayConfig}
            />
            <Pagination
              dotsLength={TopCarouselData?.length} // Number of dots (usually the length of your data)
              activeDotIndex={activeSlide}
              containerStyle={{paddingTop: 10}}
            />
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
                    source={{uri: store1}}
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
                    source={{uri: store2}}
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
                      source={{uri: store3}}
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
                      source={{uri: store4}}
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
                    source={{uri: store5}}
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
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 8,
    flexDirection: 'row',
  },
  sliderRightMain: {
    width: '40%',
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
    // alignSelf: 'center',
    textAlign: 'center',
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
    textAlign: 'center',
  },
  chooseDesText: {
    color: 'rgba(24, 23, 37, 0.56)',
    fontWeight: '400',
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
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
