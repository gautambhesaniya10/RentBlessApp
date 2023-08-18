import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BackGroundStyle, FontStyle} from '../../../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.hederMain}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      <View style={styles.shopImageMain}>
        <Image
          source={require('../../../images/banner.jpg')}
          style={styles.shopImg}
        />
        <Text style={styles.shopNameStyle}>GJ5 Fashion</Text>
      </View>

      <View style={{paddingBottom: 15}}>
        <View style={styles.boxMain}>
          <View>
            <Text style={styles.totalText}>Total Products</Text>
            <Text style={styles.TotalNumberText}>1056</Text>
          </View>
          <View style={styles.iconParent}>
            <Icon name="shopping-cart" color="black" size={22} />
          </View>
        </View>

        <View style={styles.boxMain}>
          <View>
            <Text style={styles.totalText}>Followers</Text>
            <Text style={styles.TotalNumberText}>150 K</Text>
          </View>
          <View style={styles.iconParent}>
            <Icon name="user" color="black" size={22} />
          </View>
        </View>

        <View style={styles.boxMain}>
          <View>
            <Text style={styles.totalText}>Reviews</Text>
            <Text style={styles.TotalNumberText}>56</Text>
          </View>
          <View style={styles.iconParent}>
            <Icon name="edit" color="black" size={22} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  hederMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
    marginLeft: 26,
    gap: 15,
  },
  headerText: {
    color: '#151827',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: FontStyle,
  },
  shopImageMain: {
    alignSelf: 'center',
    gap: 15,
    marginBottom: 20,
  },
  shopImg: {
    height: 140,
    width: 140,
    borderRadius: 70,
    objectFit: 'fill',
  },
  shopNameStyle: {
    color: '#151827',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: FontStyle,
    textAlign: 'center',
  },
  boxMain: {
    width: 280,
    height: 75,
    borderRadius: 8,
    backgroundColor: '#FFF',
    elevation: 4,
    alignSelf: 'center',
    marginBottom: 16,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalText: {
    color: 'rgba(49, 51, 62, 0.56)',
    fontWeight: '700',
    fontSize: 16,
  },
  TotalNumberText: {
    color: '#151827',
    fontWeight: '700',
    fontSize: 18,
  },
  iconParent: {
    backgroundColor: '#F3F6F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
