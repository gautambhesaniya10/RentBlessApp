import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getUserProfile} from '../../graphql/mutations/userProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadUserProfileStart = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await getUserProfile();
    // localStorage.setItem("loginType", response?.data?.user?.user_type);
    AsyncStorage.setItem(
      'userHaveAnyShop',
      JSON.stringify(response?.data?.user?.userHaveAnyShop),
    );
    return response;
  },
);

const userProfileSlice = createSlice({
  name: 'user',
  initialState: {
    userProfile: {},
    isAuthenticate: false,
    userLoading: false,
    error: '',
  },
  reducers: {
    userLogout: (state, action) => {
      return {
        userProfile: {},
        isAuthenticate: false,
        userLoading: false,
        error: '',
      };
    },
    setShopRegisterId: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ['userCreatedShopId']: action.payload,
        },
      };
    },
    productLikeToggle: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ['product_like_list']:
            action.payload.productInfo.key === 'like'
              ? [
                  ...state.userProfile.product_like_list.concat(
                    action.payload.productInfo.value,
                  ),
                ]
              : state.userProfile.product_like_list.filter(
                  product => product.id !== action.payload.productInfo.value,
                ),
        },
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUserProfileStart.pending, state => {
      return {
        ...state,
        userLoading: true,
      };
    });
    builder.addCase(loadUserProfileStart.fulfilled, (state, action) => {
      return {
        ...state,
        userLoading: false,
        userProfile: action.payload.data.user,
        isAuthenticate: true,
      };
    });
    builder.addCase(loadUserProfileStart.rejected, (state, action) => {
      return {
        ...state,
        userLoading: false,
        error: action.payload,
      };
    });
  },
});

export const {setShopRegisterId, productLikeToggle, userLogout} =
  userProfileSlice.actions;
export default userProfileSlice.reducer;
