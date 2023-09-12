import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ShopCard = ({shop}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'relative'}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            flexDirection: 'row',
          }}>
          {shop?.shop_images?.map((img, index) => (
            <Image
              key={index}
              source={{uri: img?.links}}
              style={{
                height: 128,
                width: 165,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ShopIndividual', {state: {shopId: shop?.id}})
        }>
        <View style={styles.shopMain}>
          <Image
            source={{uri: shop?.shop_logo}}
            style={{width: 35, height: 35, borderRadius: 17}}
          />
          <View>
            <Text style={styles.shopNameText} numberOfLines={1}>
              {shop.shop_name}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}>
              <Image
                source={require('../../images/locationIcon.png')}
                style={{width: 12, height: 12}}
              />
              <Text style={styles.addressNameText} numberOfLines={1}>
                {shop?.branch_info?.length > 1
                  ? shop?.branch_info?.map(
                      itm => itm.branch_type === 'main' && itm.branch_address,
                    )
                  : shop?.branch_info[0]?.branch_address}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardBottomDivMain}>
          <View style={styles.ratingMain}>
            <Icon name="star" size={19} color="#F9A23B" />
            <Text style={styles.ratingParentText}>
              {shop.shop_rating}{' '}
              <Text style={styles.ratingChildText}>
                ({shop?.shopReviewCount})
              </Text>
            </Text>
          </View>
          <View style={styles.ratingMain}>
            <Icon name="user" size={18} color="black" />
            <Text style={styles.ratingParentText}>
              {`${shop?.shopFollowerCount} K`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ShopCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    width: 165,
    height: 220,
    borderRadius: 8,
    elevation: 2,
    marginTop: 20,
  },
  shopNameText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 14,
    width: 120,
  },
  addressNameText: {
    color: 'rgba(21, 24, 39, 0.40)',
    fontWeight: '600',
    fontSize: 14,
    width: 100,
  },
  shopMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingLeft: 8,
    paddingVertical: 10,
    backgroundColor: '#F7F9F9',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(21, 24, 39, 0.16)',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  cardBottomDivMain: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingParentText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 15,
  },
  ratingChildText: {
    color: 'black',
    fontWeight: '300',
  },
});
