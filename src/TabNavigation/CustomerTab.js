import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePage from '../screens/Customer/HomePage';
import LikeScreen from '../screens/Customer/pages/LikeScreen';
import {useSelector} from 'react-redux';

const CustomerTab = () => {
  const Tab = createBottomTabNavigator();
  const {userProfile} = useSelector(state => state?.user);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#29977E',
        labelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        name="CustomerHomePage"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="LikeScreen"
        component={LikeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Like',
          tabBarIcon: ({color, size}) => (
            <View style={styles.mainLikeTabDiv}>
              <Icon name="heart" color={color} size={22} />
              {userProfile?.product_like_list?.length > 0 && (
                <View style={styles.likeCountMain}>
                  <Text style={styles.likeCount}>
                    {userProfile?.product_like_list?.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerTab;

const styles = StyleSheet.create({
  mainLikeTabDiv: {
    position: 'relative',
  },
  likeCountMain: {
    backgroundColor: 'red',
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'absolute',
    left: 15,
    bottom: 9,
  },
  likeCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
