import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShopAllReviewSection from '../../../../components/ShopAllReviewSection';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BackGroundStyle} from '../../../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProgressBar} from 'react-native-paper';

const ShopReviewAll = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {shopReviews} = route?.params?.state;
  const {shopDetails} = route?.params?.state;

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.mainContainer}>
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={22} color="black" />
          </TouchableOpacity>
          <Text style={styles.shopNameText}>{shopDetails?.shop_name}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 28}}>
            <Text style={styles.DistributionText}>Rating Distribution</Text>
            {[5, 4, 3, 2, 1]?.map?.((star, index) => (
              <View style={styles.progressBarMain}>
                <Text>
                  {star} <Icon name="star" size={12} color="black" />
                </Text>
                <ProgressBar
                  style={{width: 240}}
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
            ))}
          </View>

          <ShopAllReviewSection shopReviews={shopReviews} />
        </ScrollView>
      </View>
    </View>
  );
};

export default ShopReviewAll;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  shopNameText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 16,
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
