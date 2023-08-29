import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const ShopFilterSlice = createSlice({
  name: 'shopFilter',
  initialState: {
    appliedShopsFilters: {
      locations: {
        selectedValue: [],
      },
      stars: {
        selectedValue: '',
      },
    },
    sortFilters: {
      sortType: {selectedValue: 'new'},
    },
  },
  reducers: {
    changeAppliedShopsFilters: (state, action) => {
      return {
        ...state,
        appliedShopsFilters: {
          ...state.appliedShopsFilters,
          [`${action.payload.key}`]: {
            ...action?.payload.value,
          },
        },
      };
    },
    changeSortShopsFilters: (state, action) => {
      return {
        ...state,
        sortFilters: {
          ...state.sortFilters,
          [`${action.payload.key}`]: action.payload.value,
        },
      };
    },
  },
  extraReducers: builder => {},
});

export const {changeAppliedShopsFilters, changeSortShopsFilters} =
  ShopFilterSlice.actions;
export default ShopFilterSlice.reducer;
