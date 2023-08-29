import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCard = ({product}) => {
  const ProductImages = [
    product?.product_image?.front,
    product?.product_image?.back,
    product?.product_image?.side,
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'relative'}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            flexDirection: 'row',
          }}>
          {ProductImages?.map((img, index) => (
            <Image
              key={index}
              source={{uri: img}}
              style={{
                height: 128,
                width: 170,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />
          ))}
        </ScrollView>
        <View style={styles.heartIcon}>
          <TouchableOpacity>
            <Icon name="heart-o" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity>
        <Text style={styles.productNameText} numberOfLines={2}>
          {product?.product_name}
        </Text>
        <View style={styles.shopMain}>
          <Image
            source={{uri: product?.branchInfo?.shop_info?.shop_logo}}
            style={{width: 25, height: 25, borderRadius: 12}}
          />
          <Text style={styles.shopNameText} numberOfLines={1}>
            {product?.branchInfo?.shop_info?.shop_name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
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
    marginTop: 20,
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
