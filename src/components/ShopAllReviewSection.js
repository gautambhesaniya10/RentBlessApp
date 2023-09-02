import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomButton from '../common/CustomButton';
import {Divider} from 'react-native-paper';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';

const ShopAllReviewSection = ({shopReviews, viewAllBtn, shopDetails}) => {
  const navigation = useNavigation();

  const displayReview = viewAllBtn ? 3 : shopReviews?.length;

  return (
    <View>
      <View style={styles.reviewMainHeader}>
        <View>
          <Text style={styles.reText}>Reviews</Text>
          <Text style={styles.reBoText}>
            Last Review Updated on 20 Dec 2023
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.writeReText}>
            {' '}
            <Icon name="edit" size={20} color="#3346BD" /> Write a Review
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.supMain}>
        <StarRating
          starSize={22}
          starStyle={{marginHorizontal: 0}}
          rating={1}
          maxStars={1}
          emptyColor="#CCCFD2"
          onChange={() => {}}
        />
        <Text style={styles.fiveStarText}>
          5 Superb{' '}
          <Text style={{color: 'rgba(21, 24, 39, 0.40)'}}>
            ({shopReviews?.length} Reviews)
          </Text>
        </Text>
      </View>
      <Divider style={{marginVertical: 20}} />
      {shopReviews?.slice(0, displayReview)?.map((review, index) => (
        <View key={index} style={styles.reviewCardContainer}>
          <View style={styles.cardTopDiv}>
            <Image
              source={require('../images/profileImg.png')}
              style={{width: 50, height: 50}}
            />
            <View>
              <View style={{flexDirection: 'row', gap: 15}}>
                <Text style={styles.reviewNameText}>{review?.user_name}</Text>
                <View style={styles.countStarMain}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    <Icon name="star" size={16} color="white" /> {review?.stars}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: 'rgba(21, 24, 39, 0.56)',
                  fontWeight: '400',
                  fontSize: 14,
                }}>
                {review?.user_type}
              </Text>
            </View>
          </View>
          <Text style={styles.revDesText}>{review?.message}</Text>
          <Divider style={{marginVertical: 20}} />
        </View>
      ))}

      {viewAllBtn && (
        <View style={{width: '100%'}}>
          <CustomButton
            name="View All Reviews"
            color="#151827"
            backgroundColor="#FAFCFC"
            onPress={() =>
              navigation.navigate('ShopReviewAll', {
                state: {shopReviews: shopReviews, shopDetails: shopDetails},
              })
            }
            borderColor="#151827"
          />
        </View>
      )}
    </View>
  );
};

export default ShopAllReviewSection;

const styles = StyleSheet.create({
  reviewMainHeader: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 18,
  },
  reBoText: {
    color: 'rgba(21, 24, 39, 0.40)',
    fontWeight: '400',
    fontSize: 13,
  },
  writeReText: {
    color: '#3346BD',
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  supMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  fiveStarText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 14,
  },
  cardTopDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  countStarMain: {
    backgroundColor: '#29977E',
    borderRadius: 5,
    width: 50,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewNameText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 18,
  },
  revDesText: {
    paddingTop: 18,
  },
});
