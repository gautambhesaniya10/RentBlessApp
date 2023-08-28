import {configureStore} from '@reduxjs/toolkit';
import userProfileReducer from './LoginUserProfileSlice/userSlice';
import ShopDetailSlice from './vendorShopDetailsSlice/ShopDetailSlice';
import CategoryListSlice from './CategorySlice/CategoryListSlice';
import AreaListSlice from './AreaSlice/AreaListSlice';
import ProductFilterSlice from './ProductFilter/ProductFilterSlice';
import ProductSlice from './ProductSlice/ProductSlice';

const store = configureStore({
  reducer: {
    user: userProfileReducer,
    shopDetail: ShopDetailSlice,
    categories: CategoryListSlice,
    areaLists: AreaListSlice,
    productsFiltersReducer: ProductFilterSlice,
    productsData: ProductSlice,
  },
});

export default store;
