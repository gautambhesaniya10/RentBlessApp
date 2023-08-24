import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../../../common/CustomTextInput';
import {Controller, useForm} from 'react-hook-form';
import CustomButton from '../../../../common/CustomButton';
import {NativeBaseProvider, Select} from 'native-base';
import AddProductDropDown from '../../../../common/AddProductDropDown';
import {getBranchLists} from '../../../../graphql/queries/branchListsQueries';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

const AddEditProduct = ({categories, userProfile}) => {
  const {
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    getValues,
    control,
  } = useForm();

  const [menCategoryLabel, setMenCategoryLabel] = useState([]);
  const [womenCategoryLabel, setWomenCategoryLabel] = useState([]);
  const [productType, setProductType] = useState('');
  const [branchList, setBranchList] = useState([]);
  const [editorDescriptionContent, setEditorDescriptionContent] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const richtext = useRef(null);

  const colorsList = [
    'red',
    'pink',
    'yellow',
    'wine',
    'purple',
    'blue',
    'orange',
    'green',
    'white',
    'black',
  ];
  const productTypeData = ['Men', 'Women'];

  useEffect(() => {
    setMenCategoryLabel(
      categories?.filter(itm => itm?.category_type === 'Men').map(i => i),
    );
    setWomenCategoryLabel(
      categories?.filter(itm => itm?.category_type === 'Women').map(i => i),
    );
  }, [categories]);

  useEffect(() => {
    if (userProfile?.userCreatedShopId) {
      getBranchLists().then(res => {
        const branches = res?.data.branchList.filter(
          branch => branch.shop_id === userProfile?.userCreatedShopId,
        );

        setBranchList(branches);
      });
    }
  }, [userProfile]);

  const handleEditorChange = content => {
    setEditorDescriptionContent(content);

    if (content === '') {
      setErrorDescription('Product description is required');
    } else {
      setErrorDescription('');
    }
  };

  //   useEffect(() => {
  //     // Set the initial content when the component mounts
  //     richtext.current?.setContentHTML('<p>Hello, Rich Editor!</p>');
  //   }, []);

  const onSubmitProduct = data => {
    console.log('datapppppp', data);
    if (editorDescriptionContent === '') {
      setErrorDescription('Product description is required');
    } else {
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.addBranchHeader}>
        <Icon onPress={() => {}} name="arrow-left" size={20} color="black" />
        <Text style={styles.addBranchText}>Add Product</Text>
      </View>
      <View>
        <View style={{marginBottom: 15}}>
          <CustomTextInput
            label="Product Name"
            mode="outlined"
            control={control}
            name="product_name"
            rules={{
              required: 'Product Name is required *',
            }}
            activeOutlineColor="#29977E"
          />
          {errors?.product_name && (
            <Text style={{color: 'red'}}>{errors?.product_name?.message}</Text>
          )}
        </View>

        <View style={{marginBottom: 15}}>
          <AddProductDropDown
            name="product_color"
            label="Product Color"
            rules={{
              required: 'Product Color is required *',
            }}
            listData={colorsList}
            control={control}
          />
          {errors?.product_color && (
            <Text style={{color: 'red'}}>{errors?.product_color?.message}</Text>
          )}
        </View>
        <View style={{marginBottom: 15}}>
          <AddProductDropDown
            name="product_type"
            label="Product Type"
            rules={{
              required: 'Product Type is required *',
            }}
            listData={productTypeData}
            control={control}
            setProductType={setProductType}
            AllowGetProductType={true}
          />
          {errors?.product_type && (
            <Text style={{color: 'red'}}>{errors?.product_type?.message}</Text>
          )}
        </View>

        {productType && (
          <View style={{marginBottom: 15}}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => {
                return (
                  <NativeBaseProvider>
                    <Select
                      selectedValue={value}
                      height="50"
                      placeholder="Product Category"
                      _selectedItem={{
                        bg: 'green.200',
                      }}
                      style={{fontSize: 16}}
                      onValueChange={onChange}>
                      {productType === 'Men'
                        ? menCategoryLabel?.map((item, index) => (
                            <Select.Item
                              key={index}
                              label={item?.category_name}
                              value={item?.id}
                            />
                          ))
                        : womenCategoryLabel?.map((item, index) => (
                            <Select.Item
                              key={index}
                              label={item?.category_name}
                              value={item?.id}
                            />
                          ))}
                    </Select>
                  </NativeBaseProvider>
                );
              }}
              name="product_category"
              rules={{
                required: 'Product Category is required *',
              }}
            />
            {errors?.product_category && (
              <Text style={{color: 'red'}}>
                {errors?.product_category?.message}
              </Text>
            )}
          </View>
        )}

        <View style={{marginBottom: 15}}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <NativeBaseProvider>
                  <Select
                    selectedValue={value}
                    height="50"
                    placeholder="Branch"
                    _selectedItem={{
                      bg: 'green.200',
                    }}
                    style={{fontSize: 16}}
                    onValueChange={onChange}>
                    {branchList?.map((item, index) => (
                      <Select.Item
                        key={index}
                        label={
                          item?.branch_address +
                          ' ' +
                          '(' +
                          item?.branch_type +
                          ')'
                        }
                        value={item?.id}
                      />
                    ))}
                  </Select>
                </NativeBaseProvider>
              );
            }}
            name="product_branch"
            rules={{
              required: 'Branch is required *',
            }}
          />
          {errors?.product_branch && (
            <Text style={{color: 'red'}}>
              {errors?.product_branch?.message}
            </Text>
          )}
        </View>
        <View style={{marginBottom: 15}}>
          <View style={styles.container}>
            <Text style={styles.desText}>Description</Text>
            <RichToolbar
              style={styles.richToolbar}
              editor={richtext}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.undo,
                actions.redo,
              ]}
            />
            <RichEditor
              ref={richtext}
              onChange={des => handleEditorChange(des)}
            />
          </View>
          {errorDescription && (
            <Text style={{color: 'red'}}>{errorDescription}</Text>
          )}
        </View>

        <View style={{width: '100%'}}>
          <CustomButton
            name="Add Product"
            color="#FFFFFF"
            backgroundColor="#151827"
            borderColor="#29977E"
            onPress={handleSubmit(onSubmitProduct)}
            // loading={ownerLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default AddEditProduct;

const styles = StyleSheet.create({
  addBranchHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  addBranchText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },

  container: {
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'gray',
    height: 160,
  },
  richToolbar: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  desText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    padding: 6,
  },
});
