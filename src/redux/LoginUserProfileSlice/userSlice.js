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
    setShopRegisterId: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ['userCreatedShopId']: action.payload,
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

export const {setShopRegisterId} = userProfileSlice.actions;
export default userProfileSlice.reducer;
