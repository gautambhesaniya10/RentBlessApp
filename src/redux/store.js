import {configureStore} from '@reduxjs/toolkit';
import userProfileReducer from './LoginUserProfileSlice/userSlice';
import ShopDetailSlice from './vendorShopDetailsSlice/ShopDetailSlice';

const store = configureStore({
  reducer: {
    user: userProfileReducer,
    shopDetail: ShopDetailSlice,
  },
});

export default store;
