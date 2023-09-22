import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BackGroundStyle} from '../../../../CommonStyle';
import CustomerHeader from '../../../components/CustomerHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import CustomButton from '../../../common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../../../components/ProductCard/ProductCard';

const LikeScreen = () => {
  const navigation = useNavigation();
  const {userProfile, isAuthenticate} = useSelector(state => state?.user);

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <CustomerHeader />
      {userProfile?.product_like_list?.length === 0 || !isAuthenticate ? (
        <View style={styles.emptyMain}>
          {/* <Image
            source={require('../../../images/emptyList.jpg')}
            style={{width: 180, height: 180, borderRadius: 90}}
          /> */}
          <Image
            source={{
              uri: 'https://s3.us-east-1.wasabisys.com/flyontech-rental-productt/images/empty_cart.png',
            }}
            style={{width: 150, height: 170, marginBottom: 20}}
          />
          <Text style={styles.emptyText}>Your wishlist is empty!!</Text>
          <Text style={styles.favText}>
            Save your favorite items so you don&apos;t lose sight of them.
          </Text>
          <View style={{marginTop: 25, width: '50%'}}>
            <CustomButton
              name="Explore Now"
              color="white"
              backgroundColor="#151827"
              onPress={() => navigation.navigate('CustomerHomePage')}
            />
          </View>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.likeText}>Liked Product</Text>
          <View style={styles.cardMainContainer}>
            {userProfile?.product_like_list &&
              userProfile?.product_like_list?.map(product => (
                <ProductCard product={product} key={product.id} />
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  emptyText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  favText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
    width: '70%',
  },
  emptyMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  cardMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingBottom: 3,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  likeText: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
});
