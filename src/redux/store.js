import {configureStore} from '@reduxjs/toolkit';
import userProfileReducer from './LoginUserProfileSlice/userSlice';

const store = configureStore({
  reducer: {
    user: userProfileReducer,
  },
});

export default store;
