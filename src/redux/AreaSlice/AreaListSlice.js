import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getCategories} from '../../graphql/queries/categoriesQueries';
import {getAreaLists} from '../../graphql/queries/areaListsQueries';

export const loadAreaListsStart = createAsyncThunk(
  'area/fetchArea',
  async () => {
    const response = await getAreaLists();
    return response?.data.areaList;
  },
);

const AreaSlice = createSlice({
  name: 'area',
  initialState: {
    areaLists: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadAreaListsStart.pending, state => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(loadAreaListsStart.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        areaLists: action.payload,
      };
    });
    builder.addCase(loadAreaListsStart.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
  },
});

// export const {setShopRegisterId} = AreaSlice.actions;
export default AreaSlice.reducer;
