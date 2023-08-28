import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getProducts} from '../../graphql/queries/productQueries';

export const loadProductsStart = createAsyncThunk(
  'product/fetchProducts',
  async payload => {
    const response = await getProducts(payload);
    return response?.data?.productList;
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    productsLimit: 0,
    productsCount: 0,
    numOfPages: 0,
    productsData: [],
    productLoading: false,
    error: '',
  },
  reducers: {
    emptyProductState: (state, action) => {
      return {
        productsLimit: 0,
        productsCount: 0,
        numOfPages: 0,
        productsData: [],
        productLoading: false,
        error: '',
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadProductsStart.pending, state => {
      return {
        ...state,
        productLoading: true,
      };
    });
    builder.addCase(loadProductsStart.fulfilled, (state, action) => {
      return {
        ...state,
        productLoading: false,
        productsLimit: action.payload.limit,
        productsCount: action.payload.count,
        numOfPages: action.payload.noOfPages,
        productsData: [...state.productsData, ...action.payload.data],
      };
    });
    builder.addCase(loadProductsStart.rejected, (state, action) => {
      return {
        ...state,
        productLoading: false,
        error: action.payload,
      };
    });
  },
});

export const {emptyProductState} = productSlice.actions;
export default productSlice.reducer;
