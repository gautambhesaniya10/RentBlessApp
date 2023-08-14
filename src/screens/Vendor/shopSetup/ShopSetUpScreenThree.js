import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../../common/CustomTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontStyle} from '../../../../CommonStyle';
import CustomButton from '../../../common/CustomButton';
import {RadioButton} from 'react-native-paper';
import {Box, Select, NativeBaseProvider} from 'native-base';

const ShopSetUpScreenThree = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  individual,
  setCurrentPosition,
  currentPosition,
}) => {
  const [mainBranchShow, setMainBranchShow] = useState(true);
  const [managerShow, setManagerShow] = useState(true);
  const [radioValue, setRadioValue] = useState('no');
  const [subBranchModelOpen, setSubBranchModelOpen] = useState(false);
  return (
    <View style={{marginHorizontal: 16}}>
      <View>
        <TouchableOpacity
          onPress={() => setMainBranchShow(!mainBranchShow)}
          style={styles.labelMain}>
          <Icon
            name={mainBranchShow ? 'angle-up' : 'angle-down'}
            size={33}
            color="black"
          />
          <Text style={styles.labelStyle}>Main Branch</Text>
        </TouchableOpacity>

        {mainBranchShow && (
          <View>
            <View style={{marginBottom: 15}}>
              <CustomTextInput
                label="First Name"
                mode="outlined"
                control={control}
                name="first_name"
                rules={{required: 'First Name is required *'}}
                activeOutlineColor="#29977E"
              />
              {errors?.first_name && (
                <Text style={{color: 'red'}}>
                  {errors?.first_name?.message}
                </Text>
              )}
            </View>
            <View style={{marginBottom: 15}}>
              <CustomTextInput
                label="Last Name"
                mode="outlined"
                control={control}
                name="last_name"
                rules={{required: 'Last Name is required *'}}
                activeOutlineColor="#29977E"
              />
              {errors?.last_name && (
                <Text style={{color: 'red'}}>{errors?.last_name?.message}</Text>
              )}
            </View>
            <View style={{marginBottom: 15}}>
              <CustomTextInput
                label="Email"
                mode="outlined"
                control={control}
                name="user_email"
                rules={{
                  required: 'Email is required *',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                }}
                activeOutlineColor="#29977E"
              />
              {errors?.user_email && (
                <Text style={{color: 'red'}}>
                  {errors?.user_email?.message}
                </Text>
              )}
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setManagerShow(!managerShow)}
          style={styles.labelMain}>
          <Icon
            name={managerShow ? 'angle-up' : 'angle-down'}
            size={33}
            color="black"
          />
          <Text style={styles.labelStyle}>Manager : Save as owner</Text>
        </TouchableOpacity>

        {managerShow && (
          <View>
            <RadioButton.Group
              onValueChange={newValue => setRadioValue(newValue)}
              value={radioValue}>
              <View style={styles.radioParent}>
                <View style={styles.radioMain}>
                  <RadioButton color="#29977E" value="yes" />
                  <Text
                    style={[
                      styles.radioText,
                      {
                        color:
                          radioValue === 'yes'
                            ? '#151827'
                            : 'rgba(21, 24, 39, 0.56)',
                      },
                    ]}>
                    Yes
                  </Text>
                </View>
                <View style={styles.radioMain}>
                  <RadioButton color="#29977E" value="no" />
                  <Text
                    style={[
                      styles.radioText,
                      {
                        color:
                          radioValue === 'no'
                            ? '#151827'
                            : 'rgba(21, 24, 39, 0.56)',
                      },
                    ]}>
                    No
                  </Text>
                </View>
              </View>
            </RadioButton.Group>
            <View style={{marginBottom: 15}}>
              <CustomTextInput
                label="First Name"
                mode="outlined"
                control={control}
                name="first_name"
                rules={{required: 'First Name is required *'}}
                activeOutlineColor="#29977E"
              />
              {errors?.first_name && (
                <Text style={{color: 'red'}}>
                  {errors?.first_name?.message}
                </Text>
              )}
            </View>
            <View style={{marginBottom: 15}}>
              <CustomTextInput
                label="Last Name"
                mode="outlined"
                control={control}
                name="last_name"
                rules={{required: 'Last Name is required *'}}
                activeOutlineColor="#29977E"
              />
              {errors?.last_name && (
                <Text style={{color: 'red'}}>{errors?.last_name?.message}</Text>
              )}
            </View>
            <View style={{marginBottom: 15}}>
              <CustomTextInput
                label="Email"
                mode="outlined"
                control={control}
                name="user_email"
                rules={{
                  required: 'Email is required *',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                }}
                activeOutlineColor="#29977E"
              />
              {errors?.user_email && (
                <Text style={{color: 'red'}}>
                  {errors?.user_email?.message}
                </Text>
              )}
            </View>
            <View style={{marginBottom: 15}}>
              <CustomTextInput
                label="Email"
                mode="outlined"
                control={control}
                name="user_email"
                rules={{
                  required: 'Email is required *',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                }}
                activeOutlineColor="#29977E"
              />
              {errors?.user_email && (
                <Text style={{color: 'red'}}>
                  {errors?.user_email?.message}
                </Text>
              )}
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setSubBranchModelOpen(true)}
          style={styles.SubMainBtn}>
          <Text style={styles.subBtnText}>SUB BRANCH</Text>
          <Icon name="plus" size={16} color="#29977E" />
        </TouchableOpacity>

        <View
          style={{
            marginTop: 40,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            justifyContent: 'space-around',
          }}>
          <View style={{width: '50%'}}>
            <CustomButton
              name="Back"
              color="#29977E"
              backgroundColor="white"
              borderColor="#29977E"
              onPress={() => setCurrentPosition(currentPosition - 1)}
            />
          </View>
          <View style={{width: '50%'}}>
            <CustomButton
              name="Next"
              color="#FFFFFF"
              backgroundColor="#29977E"
              borderColor="#29977E"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>

      <SubBranchModel
        subBranchModelOpen={subBranchModelOpen}
        setSubBranchModelOpen={setSubBranchModelOpen}
        errors={errors}
        control={control}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default ShopSetUpScreenThree;

const styles = StyleSheet.create({
  labelStyle: {
    color: '#151827',
    fontWeight: '700',
    fontSize: 18,
    fontFamily: FontStyle,
  },
  labelMain: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 16,
  },
  radioParent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  radioMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FontStyle,
  },
  SubMainBtn: {
    borderWidth: 1,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 12,
    width: '40%',
    justifyContent: 'center',
    marginTop: 10,
  },
  subBtnText: {
    color: '#29977E',
    fontSize: 14,
    fontWeight: '600',
  },
});

const branchStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 20,
  },
  headerText: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  bottomButtonMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginVertical: 16,
  },
  subTextFieldTwoMain: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

const SubBranchModel = ({
  subBranchModelOpen,
  setSubBranchModelOpen,
  control,
  errors,
  handleSubmit,
  onSubmit,
}) => {
  const [managerDropValue, setManagerDropValue] = useState('');

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={subBranchModelOpen}
        onRequestClose={() => {
          setSubBranchModelOpen(!subBranchModelOpen);
        }}>
        <View style={branchStyles.centeredView}>
          <View style={branchStyles.modalView}>
            <Text style={branchStyles.headerText}>Add Sub Branch</Text>

            <View style={{marginBottom: 15}}>
              <CustomTextInput
                label="First Name"
                mode="outlined"
                control={control}
                name="first_name"
                rules={{required: 'First Name is required *'}}
                activeOutlineColor="#29977E"
              />
              {errors?.first_name && (
                <Text style={{color: 'red'}}>
                  {errors?.first_name?.message}
                </Text>
              )}
            </View>
            <View
              style={[branchStyles.subTextFieldTwoMain, {marginBottom: 15}]}>
              <View style={{width: '48%'}}>
                <CustomTextInput
                  label="First Name"
                  mode="outlined"
                  control={control}
                  name="first_name"
                  rules={{required: 'First Name is required *'}}
                  activeOutlineColor="#29977E"
                />
                {errors?.first_name && (
                  <Text style={{color: 'red'}}>
                    {errors?.first_name?.message}
                  </Text>
                )}
              </View>
              <View style={{width: '48%'}}>
                <CustomTextInput
                  label="First Name"
                  mode="outlined"
                  control={control}
                  name="first_name"
                  rules={{required: 'First Name is required *'}}
                  activeOutlineColor="#29977E"
                />
                {errors?.first_name && (
                  <Text style={{color: 'red'}}>
                    {errors?.first_name?.message}
                  </Text>
                )}
              </View>
            </View>

            <View style={{marginBottom: 70}}>
              <NativeBaseProvider>
                <Select
                  selectedValue={managerDropValue}
                  minWidth="200"
                  height="50"
                  accessibilityLabel="Manager"
                  placeholder="Manager"
                  _selectedItem={{
                    bg: 'green.200',
                  }}
                  mt={1}
                  style={{fontSize: 16}}
                  onValueChange={itemValue => setManagerDropValue(itemValue)}>
                  <Select.Item label="None" value="" />
                  <Select.Item label="Same as owner" value="Same as owner" />
                  <Select.Item
                    label="same as main branch manager"
                    value="same as main branch manager"
                  />
                </Select>
              </NativeBaseProvider>
            </View>

            <View
              style={[branchStyles.subTextFieldTwoMain, {marginBottom: 15}]}>
              <View style={{width: '48%'}}>
                <CustomTextInput
                  label="First Name"
                  mode="outlined"
                  control={control}
                  name="first_name"
                  rules={{required: 'First Name is required *'}}
                  activeOutlineColor="#29977E"
                />
                {errors?.first_name && (
                  <Text style={{color: 'red'}}>
                    {errors?.first_name?.message}
                  </Text>
                )}
              </View>
              <View style={{width: '48%'}}>
                <CustomTextInput
                  label="First Name"
                  mode="outlined"
                  control={control}
                  name="first_name"
                  rules={{required: 'First Name is required *'}}
                  activeOutlineColor="#29977E"
                />
                {errors?.first_name && (
                  <Text style={{color: 'red'}}>
                    {errors?.first_name?.message}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={[branchStyles.subTextFieldTwoMain, {marginBottom: 15}]}>
              <View style={{width: '48%'}}>
                <CustomTextInput
                  label="First Name"
                  mode="outlined"
                  control={control}
                  name="first_name"
                  rules={{required: 'First Name is required *'}}
                  activeOutlineColor="#29977E"
                />
                {errors?.first_name && (
                  <Text style={{color: 'red'}}>
                    {errors?.first_name?.message}
                  </Text>
                )}
              </View>
              <View style={{width: '48%'}}>
                <CustomTextInput
                  label="First Name"
                  mode="outlined"
                  control={control}
                  name="first_name"
                  rules={{required: 'First Name is required *'}}
                  activeOutlineColor="#29977E"
                />
                {errors?.first_name && (
                  <Text style={{color: 'red'}}>
                    {errors?.first_name?.message}
                  </Text>
                )}
              </View>
            </View>
            {/* bottm cancel */}
            <View style={branchStyles.bottomButtonMain}>
              <View style={{width: '30%'}}>
                <CustomButton
                  name="Cancel"
                  color="#29977E"
                  backgroundColor="white"
                  borderColor="#29977E"
                  onPress={() => setSubBranchModelOpen(false)}
                />
              </View>
              <View style={{width: '30%'}}>
                <CustomButton
                  name="Save"
                  color="white"
                  backgroundColor="#29977E"
                  borderColor="#29977E"
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
