import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCard = () => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <View style={{position: 'relative'}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../images/menTshirt.png')}
            style={{
              height: 128,
              width: 170,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
          <Image
            source={require('../../images/banner.jpg')}
            style={{
              height: 128,
              width: 170,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
        </ScrollView>
        <View style={styles.heartIcon}>
          <TouchableOpacity>
            <Icon name="heart-o" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.productNameText} numberOfLines={2}>
        Men Pink Textured Single...
      </Text>
      <View style={styles.shopMain}>
        <Image
          source={require('../../images/facebook.png')}
          style={{width: 25, height: 25}}
        />
        <Text style={styles.shopNameText} numberOfLines={1}>
          Fashion Bazar
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    width: 170,
    height: 220,
    borderRadius: 8,
    elevation: 2,
  },
  productNameText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 14,
    padding: 8,
  },
  shopNameText: {
    color: 'rgba(21, 24, 39, 0.40)',
    fontWeight: '600',
    fontSize: 14,
  },
  shopMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 8,
    marginTop: 5,
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
});
