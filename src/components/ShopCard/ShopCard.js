import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {locationIcon} from '../../common/AllLiveImageLink';

const ShopCard = ({shop}) => {
  const navigation = useNavigation();
  const [ShopImagesModelShow, setShopImagesModelShow] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'relative'}}>
        <TouchableOpacity
          onPress={() => setShopImagesModelShow(!ShopImagesModelShow)}>
          <Image
            source={{uri: shop?.shop_images[0]?.links}}
            style={{
              height: 128,
              width: '100%',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
        </TouchableOpacity>
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
                source={{uri: locationIcon}}
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
              {`${shop?.shopFollowerCount}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <ShopImageModel
        setShopImagesModelShow={setShopImagesModelShow}
        ShopImagesModelShow={ShopImagesModelShow}
        AllImages={shop?.shop_images}
      />
    </View>
  );
};

export default ShopCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    width: '47%',
    height: 220,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
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

const shopImageModelCss = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 5,
    height: '80%',
    width: '90%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 20,
    color: 'black',
  },
  hederMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

const ShopImageModel = ({
  setShopImagesModelShow,
  ShopImagesModelShow,
  AllImages,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={ShopImagesModelShow}
      onRequestClose={() => {
        setShopImagesModelShow(!ShopImagesModelShow);
      }}>
      <View style={shopImageModelCss.centeredView}>
        <View style={shopImageModelCss.modalView}>
          <View style={shopImageModelCss.hederMain}>
            <Text style={shopImageModelCss.modalText}>Shop All Images</Text>
            <TouchableOpacity onPress={() => setShopImagesModelShow(false)}>
              <Icon name="close" size={22} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 20,
            }}>
            {AllImages?.map((img, index) => (
              <Image
                key={index}
                source={{uri: img?.links}}
                style={{
                  height: '90%',
                  width: 270,
                  objectFit: 'cover',
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
