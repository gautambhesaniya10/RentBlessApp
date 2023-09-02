import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BackGroundStyle} from '../../../../../CommonStyle';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BranchMultiDropDown from '../../../../components/BranchMultiDropDown';

const Branches = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {shopDetails} = route?.params?.state;

  return (
    <View style={{flex: 1, backgroundColor: BackGroundStyle}}>
      <View style={styles.backMain}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={{uri: shopDetails?.shop_logo}}
          style={{width: 45, height: 45, borderRadius: 24}}
        />
        <View>
          <Text style={styles.shopNameText}>{shopDetails?.shop_name}</Text>
          <Text>{shopDetails?.branch_info?.length} Branches</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.branchListContainer}>
          {shopDetails?.branch_info?.map((item, index) => (
            <>
              <BranchMultiDropDown
                key={index}
                item={item}
                index={index}
                cardTitle={`Branch ${index + 1}`}
                bottomComponent={
                  <View>
                    <View style={styles.listMain}>
                      <Text style={styles.titleLeftText}>Manager Name :</Text>
                      <Text style={styles.titleRightText}>
                        {item?.manager_name}
                      </Text>
                    </View>
                    <View style={styles.listMain}>
                      <Text style={styles.titleLeftText}>Phone Number :</Text>
                      <Text style={styles.titleRightText}>
                        {item?.manager_contact}
                      </Text>
                    </View>
                    <View style={styles.listMain}>
                      <Text style={styles.titleLeftText}>Branch Address :</Text>
                      <Text style={styles.titleRightText}>
                        {item?.branch_address}
                      </Text>
                    </View>
                    <View style={styles.listMain}>
                      <Text style={styles.titleLeftText}>City :</Text>
                      <Text style={styles.titleRightText}>
                        {item?.branch_city}
                      </Text>
                    </View>
                  </View>
                }
              />
            </>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Branches;

const styles = StyleSheet.create({
  backMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  shopNameText: {
    color: '#151827',
    fontWeight: '600',
    fontSize: 17,
  },
  listMain: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleLeftText: {
    color: 'rgba(21, 24, 39, 0.56)',
    fontSize: 14,
    fontWeight: '600',
  },
  titleRightText: {
    color: '#151827',
    fontSize: 14,
    fontWeight: '600',
  },
  branchListContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
