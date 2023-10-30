import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BackGroundStyle} from '../../../../../CommonStyle';
import VendorHeader from '../../../../components/VendorHeader';
import CustomButton from '../../../../common/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {
  SHOP_PRODUCT_VISIBLE_DAYS,
  INDIVIDUAL_SHOP_PRODUCT_VISIBLE_DAYS,
} from '@env';
import CustomTextInput from '../../../../common/CustomTextInput';
import {useForm} from 'react-hook-form';

const SubscriptionTab = () => {
  const {vendorShopDetails} = useSelector(state => state?.shopDetail);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const FreeTrialHandler = () => {
    const shopCreatedDate = new Date(Number(vendorShopDetails?.createdAt));
    const currentDate = new Date();

    const FreeTrailDay =
      vendorShopDetails?.shop_type === 'individual'
        ? parseInt(INDIVIDUAL_SHOP_PRODUCT_VISIBLE_DAYS)
        : parseInt(SHOP_PRODUCT_VISIBLE_DAYS);

    let threshold = new Date();
    threshold.setDate(threshold.getDate() - FreeTrailDay);

    if (vendorShopDetails?.subscriptionDate) {
      return false;
    } else {
      return shopCreatedDate >= threshold && shopCreatedDate <= currentDate;
    }
  };

  return (
    <View style={{flex: 1}}>
      <VendorHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: BackGroundStyle}}>
        <View style={styles.mainContainer}>
          <Text style={styles.headerText}>
            Transparent Pricing for Every Stage of Growth
          </Text>
          <Text style={styles.headerSecText}>
            Choose the right plan for your business.
          </Text>
          <View style={styles.boxMain}>
            <Text style={styles.topTitleText}>Free</Text>
            <Text style={styles.bottomTitleText}>
              Powerful essentials for small businesses
            </Text>
            <Text style={styles.topTitleText}>₹0 / Month</Text>
            <Text style={styles.bottomTitleText}>
              Free access to upload products limits may apply
            </Text>

            {FreeTrialHandler() ? (
              <Text
                style={[
                  styles.bottomTitleText,
                  {color: '#29977E', fontWeight: '600'},
                ]}>
                Free Trail is active.
              </Text>
            ) : (
              <Text
                style={[
                  styles.bottomTitleText,
                  {color: 'red', fontWeight: '600'},
                ]}>
                Free Trail is expired.
              </Text>
            )}
            <Text style={styles.listTitleText}>Free access to:</Text>
            <View style={styles.listMain}>
              <Icon name="check-circle" size={26} color="#29977E" />
              <Text style={styles.listText}>Limited Product Upload</Text>
            </View>
            <View style={styles.listMain}>
              <Icon name="check-circle" size={26} color="#29977E" />
              <Text style={styles.listText}>Limited Journeys</Text>
            </View>
            <View style={styles.listMain}>
              <Icon name="check-circle" size={26} color="#29977E" />
              <Text style={styles.listText}>Onboarding & 24/7 Support</Text>
            </View>
            <View style={styles.listMain}>
              <Icon name="check-circle" size={26} color="#29977E" />
              <Text style={styles.listText}>Limited User Permissions</Text>
            </View>
          </View>
          <View style={styles.boxMain}>
            <Text style={styles.topTitleText}>Enterprise</Text>
            <Text style={styles.bottomTitleText}>
              Ultimate control and support for businesses
            </Text>
            <Text style={styles.topTitleText}>Custom</Text>
            <Text style={styles.bottomTitleText}>
              Custom contract & additional features Volume-based discounting
              available
            </Text>
            <View style={{width: '100%', marginBottom: 20, marginTop: 10}}>
              <CustomButton
                name="Contact Sales"
                color="#FFFFFF"
                backgroundColor="#29977E"
                borderColor="#29977E"
                onPress={() => setContactModalVisible(true)}
              />
            </View>
            <Text style={styles.listTitleText}>Custom access to:</Text>
            <View style={styles.listMain}>
              <Icon name="check-circle" size={26} color="#29977E" />
              <Text style={styles.listText}>More Advance Product Upload</Text>
            </View>
            <View style={styles.listMain}>
              <Icon name="check-circle" size={26} color="#29977E" />
              <Text style={styles.listText}>More Advanced Journeys</Text>
            </View>
            <View style={styles.listMain}>
              <Icon name="check-circle" size={26} color="#29977E" />
              <Text style={styles.listText}>Onboarding & 24/7 Support</Text>
            </View>
            <View style={styles.listMain}>
              <Icon name="check-circle" size={26} color="#29977E" />
              <Text style={styles.listText}>Advanced User Permissions</Text>
            </View>
          </View>
        </View>
        <ContactSaleModel
          contactModalVisible={contactModalVisible}
          setContactModalVisible={setContactModalVisible}
        />
      </ScrollView>
    </View>
  );
};

export default SubscriptionTab;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 25,
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 10,
    textAlign: 'center',
  },
  headerSecText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 25,
  },
  topTitleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 15,
  },
  bottomTitleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 15,
  },
  listTitleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 15,
  },
  listMain: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 6,
  },
  listText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  boxMain: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#FFF',
    elevation: 4,
    padding: 16,
    marginBottom: 25,
  },
});

const ContactSaleModel = ({contactModalVisible, setContactModalVisible}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  const onSubmit = data => {
    console.log('dataaa', data);
    setContactModalVisible(false);
    setValue('email', '');
    setValue('description', '');
  };

  return (
    <View style={contactModelStyles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={contactModalVisible}
        onRequestClose={() => {
          setContactModalVisible(!contactModalVisible);
        }}>
        <View style={contactModelStyles.centeredView}>
          <View style={contactModelStyles.modalView}>
            <TouchableOpacity
              onPress={() => setContactModalVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Icon name="close" color="black" size={22} />
            </TouchableOpacity>
            <Text style={contactModelStyles.topTitleText}>Contact Us</Text>
            <Text style={contactModelStyles.topSecText}>
              Custom contract & additional features Volume-based discounting
              available
            </Text>
            <View style={{alignItems: 'center'}}>
              <View style={{width: '80%', marginBottom: 20}}>
                <CustomTextInput
                  label={'Email'}
                  mode="outlined"
                  keyboardType={'email-address'}
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required *',
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid email',
                    },
                  }}
                  activeOutlineColor="#151827"
                  outlineStyle={{borderRadius: 12}}
                />
                {errors?.email && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.email.message}
                  </Text>
                )}
              </View>
              <View style={{width: '80%', marginBottom: 20}}>
                <CustomTextInput
                  label={'Anything Else'}
                  mode="outlined"
                  name="description"
                  control={control}
                  rules={{required: 'Description is required *'}}
                  activeOutlineColor="#151827"
                  outlineStyle={{borderRadius: 12}}
                />
                {errors?.description && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.description.message}
                  </Text>
                )}
              </View>
              <View style={{width: '80%', marginBottom: 20}}>
                <CustomButton
                  name="Contact Us"
                  color="#FFFFFF"
                  backgroundColor="#151827"
                  borderColor="#151827"
                  onPress={handleSubmit(onSubmit)}
                  // loading={loading}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const contactModelStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    width: '90%',
  },
  topTitleText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 15,
  },
  topSecText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 15,
  },
});
