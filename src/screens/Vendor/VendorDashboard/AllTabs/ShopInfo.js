import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../../../../common/CustomButton';

const ShopInfo = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <View style={{width: '100%'}}>
          <Text>Infooooooo</Text>
          <Text>Infooooooo</Text>
          <Text>Infooooooo</Text>
          <Text>Infooooooo</Text>
          <CustomButton
            name="Update"
            color="#FFFFFF"
            backgroundColor="#151827"
            borderColor="#29977E"
            //   onPress={ownerInfoHandleSubmit(ownerInfoOnSubmit)}
            // loading={ownerLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default ShopInfo;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
  },
});
