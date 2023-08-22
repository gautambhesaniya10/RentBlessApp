import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../../../common/CustomTextInput';
import CustomButton from '../../../../common/CustomButton';
import {getShopOwnerDetail} from '../../../../graphql/queries/shopQueries';
import {getBranchLists} from '../../../../graphql/queries/branchListsQueries';
import Icon from 'react-native-vector-icons/FontAwesome';
import BranchMultiDropDown from '../../../../components/BranchMultiDropDown';
import {FontStyle} from '../../../../../CommonStyle';
import {useToast} from 'native-base';
import {deleteBranch} from '../../../../graphql/mutations/branch';

const SubBranchTab = ({vendorShopDetails, useProfileData}) => {
  const [subBranchList, setSubBranchList] = useState([]);
  const [branchDeleteModalOpen, setBranchDeleteModalOpen] = useState(false);
  const [deleteBranchId, setDeleteBranchId] = useState();
  const [subBranchModalOpen, setSubBranchModalOpen] = useState(false);

  const getAllSubBranchList = () => {
    getBranchLists().then(res => {
      const subBranches = res.data.branchList
        .filter(branch => branch.shop_id === useProfileData?.userCreatedShopId)
        .filter(itm => itm.branch_type === 'sub');
      setSubBranchList(subBranches);
    });
  };

  const onDeleteBranch = deleteItem => {
    setDeleteBranchId(deleteItem?.id);
    setBranchDeleteModalOpen(true);
    console.log('====================================');
    console.log('deleteItemdeleteItemdeleteItem', deleteItem);
    console.log('====================================');
  };

  useEffect(() => {
    if (useProfileData?.userCreatedShopId) {
      getAllSubBranchList();
    }
  }, [useProfileData?.userCreatedShopId]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <View style={{width: '100%', marginBottom: 20}}>
          <CustomButton
            name="Add Sub Branch"
            color="#29977E"
            backgroundColor="#FAFCFC"
            borderColor="#29977E"
            onPress={() => setSubBranchModalOpen(true)}
            icon={true}
            iconName="plus"
          />
        </View>
        {subBranchModalOpen ? (
          <Text>Adddddddddddddd</Text>
        ) : (
          subBranchList?.map((item, index) => (
            <>
              <BranchMultiDropDown
                key={index}
                item={item}
                index={index}
                cardTitle={`Branch ${index + 1}`}
                onDeleteBranch={onDeleteBranch}
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
          ))
        )}

        <View style={{width: '100%'}}>
          <CustomButton
            name="Update"
            color="#FFFFFF"
            backgroundColor="#151827"
            borderColor="#29977E"
            onPress={() => {}}
            // loading={ownerLoading}
          />
        </View>
      </View>
      <BranchDeleteModel
        setBranchDeleteModalOpen={setBranchDeleteModalOpen}
        branchDeleteModalOpen={branchDeleteModalOpen}
        deleteBranchId={deleteBranchId}
        getAllSubBranchList={getAllSubBranchList}
      />
    </View>
  );
};

export default SubBranchTab;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 30,
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
});

const delModelStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    fontFamily: FontStyle,
  },
});

const BranchDeleteModel = ({
  branchDeleteModalOpen,
  setBranchDeleteModalOpen,
  deleteBranchId,
  getAllSubBranchList,
}) => {
  const toast = useToast();
  return (
    <View style={delModelStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={branchDeleteModalOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setBranchDeleteModalOpen(!branchDeleteModalOpen);
        }}>
        <View style={delModelStyles.centeredView}>
          <View style={delModelStyles.modalView}>
            <View>
              <Text style={delModelStyles.modalText}>
                Are you sure delete this branch
              </Text>
              <Text style={[delModelStyles.modalText, {fontWeight: '700'}]}>
                {deleteBranchId}.
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 20,
                gap: 10,
              }}>
              <View style={{width: '40%'}}>
                <CustomButton
                  name="Cancel"
                  color="#29977E"
                  backgroundColor="white"
                  borderColor="#29977E"
                  onPress={() => setBranchDeleteModalOpen(false)}
                />
              </View>
              <View style={{width: '40%'}}>
                <CustomButton
                  name="Delete"
                  color="white"
                  backgroundColor="#dc2626"
                  borderColor="#dc2626"
                  onPress={() => {
                    deleteBranch({id: deleteBranchId}).then(
                      res => {
                        toast.show({
                          title: res.data.deleteBranch,
                          placement: 'top',
                          backgroundColor: 'green.600',
                          variant: 'solid',
                        });
                        getAllSubBranchList();
                      },
                      error => {
                        toast.show({
                          title: error.message,
                          placement: 'top',
                          backgroundColor: 'red.600',
                          variant: 'solid',
                        });
                      },
                    );
                    setBranchDeleteModalOpen(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
