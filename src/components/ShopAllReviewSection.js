import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../common/CustomButton';
import {Divider, ProgressBar} from 'react-native-paper';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';
import {formatDate, getReviewedTimeString} from '../utils';

const ShopAllReviewSection = ({shopReviews, viewAllBtn, shopDetails}) => {
  const navigation = useNavigation();

  const displayReview = viewAllBtn ? 3 : shopReviews?.length;
  const [latestReview, setLatestReview] = useState(null);

  useEffect(() => {
    if (shopReviews?.length > 0) {
      const sortedReviews = shopReviews
        ?.map(review => ({
          ...review,
          updatedAt: new Date(parseInt(review.updatedAt)),
        }))
        .sort((a, b) => b.updatedAt - a.updatedAt);
      const latest = sortedReviews[0];
      setLatestReview(latest);
    }
  }, [shopReviews]);

  return (
    <View>
      <View style={styles.reviewMainHeader}>
        <View>
          <Text style={styles.reText}>Reviews</Text>
          <Text style={styles.reBoText}>
            Last Review Updated on {formatDate(latestReview?.updatedAt)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WriteReview', {
              state: {
                shopDetails: shopDetails,
                shopReviews: shopReviews,
              },
            })
          }>
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

      <View style={{marginTop: 20}}>
        <Text style={styles.DistributionText}>Rating Distribution</Text>
        {shopReviews?.length > 0
          ? [5, 4, 3, 2, 1]?.map?.((star, index) => (
              <View style={styles.progressBarMain}>
                <Text>
                  {star} {''} <Icon name="star" size={12} color="black" />
                </Text>
                <ProgressBar
                  style={{width: 220}}
                  progress={
                    shopReviews?.filter(itm => itm?.stars === star)?.length /
                    shopReviews?.length
                  }
                  color="green"
                />
                <Text>
                  {shopReviews?.filter(itm => itm.stars === star)?.length}{' '}
                  Reviews
                </Text>
              </View>
            ))
          : // <View style={{paddingVertical: 40}}>
            //   <ActivityIndicator />
            // </View>
            ''}
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
                {getReviewedTimeString(review?.updatedAt)}
              </Text>
            </View>
          </View>
          <Text style={styles.revDesText}>{review?.message}</Text>
          <Divider style={{marginVertical: 20}} />
        </View>
      ))}

      {viewAllBtn && shopReviews?.length > 0 && (
        <View style={{width: '100%', paddingBottom: 30}}>
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
  DistributionText: {
    color: '#31333E',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 18,
  },
  progressBarMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
