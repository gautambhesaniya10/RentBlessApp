import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const productFilterSlice = createSlice({
  name: 'productFilter',
  initialState: {
    appliedProductsFilters: {
      categoryId: {
        selectedValue: [],
      },
      productColor: {
        selectedValue: [],
      },
      productPrice: {
        selectedValue: {
          min: 0,
          max: 0,
        },
      },
      productListingType: {
        selectedValue: '',
      },
      shopId: {
        selectedValue: [],
      },
      searchBarData: {
        selectedValue: '',
      },
    },
    sortFilters: {
      sortType: {selectedValue: 'new'},
    },
    searchBarData: '',
  },
  reducers: {
    changeAppliedProductsFilters: (state, action) => {
      return {
        ...state,
        appliedProductsFilters: {
          ...state.appliedProductsFilters,
          [`${action.payload.key}`]: {
            ...action?.payload.value,
          },
        },
      };
    },
    changeSortProductsFilters: (state, action) => {
      return {
        ...state,
        sortFilters: {
          ...state.sortFilters,
          [`${action.payload.key}`]: action.payload.value,
        },
      };
    },
    emptyProductFilter: (state, action) => {
      return {
        appliedProductsFilters: {
          categoryId: {
            selectedValue: [],
          },
          productColor: {
            selectedValue: [],
          },
          shopId: {
            selectedValue: [],
          },
        },
        sortFilters: {
          sortType: {selectedValue: 'new'},
        },
        searchBarData: '',
      };
    },
  },
  extraReducers: builder => {},
});

export const {
  changeAppliedProductsFilters,
  changeSortProductsFilters,
  emptyProductFilter,
} = productFilterSlice.actions;
export default productFilterSlice.reducer;
