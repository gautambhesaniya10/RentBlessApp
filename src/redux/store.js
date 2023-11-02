import {configureStore} from '@reduxjs/toolkit';
import userProfileReducer from './LoginUserProfileSlice/userSlice';
import ShopDetailSlice from './vendorShopDetailsSlice/ShopDetailSlice';
import CategoryListSlice from './CategorySlice/CategoryListSlice';
import AreaListSlice from './AreaSlice/AreaListSlice';
import ProductFilterSlice from './ProductFilter/ProductFilterSlice';
import ShopFilterSlice from './ShopFilter/ShopFilterSlice';
import ProductSlice from './ProductSlice/ProductSlice';
import ShopSlice from './ShopSlice/ShopSlice';
import AppVersionSlice from './AppVersionSlice/AppVersionSlice';
import ShopConfigurationsSlice from './ShopConfigurationsSlice/ShopConfigurationsSlice';

const store = configureStore({
  reducer: {
    user: userProfileReducer,
    shopDetail: ShopDetailSlice,
    categories: CategoryListSlice,
    areaLists: AreaListSlice,
    productsFiltersReducer: ProductFilterSlice,
    shopsFiltersReducer: ShopFilterSlice,
    productsData: ProductSlice,
    shops: ShopSlice,
    appVersion: AppVersionSlice,
    shopConfigurations: ShopConfigurationsSlice,
  },
});

export default store;
