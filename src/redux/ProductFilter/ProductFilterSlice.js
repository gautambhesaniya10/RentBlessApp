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
      shopId: {
        selectedValue: [],
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
    changeProductsSearchBarData: (state, action) => {
      return {
        ...state,
        [`${action.payload.key}`]: `${action.payload.value}`,
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
  changeProductsSearchBarData,
  emptyProductFilter,
} = productFilterSlice.actions;
export default productFilterSlice.reducer;
