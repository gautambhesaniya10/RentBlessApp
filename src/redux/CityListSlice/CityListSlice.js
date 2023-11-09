import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getCityLists} from '../../graphql/queries/areaListsQueries';

export const loadCityListsStart = createAsyncThunk(
  'cistList/fetchCityList',
  async () => {
    const response = await getCityLists();
    return response?.data.cityList;
  },
);

const CityListSlice = createSlice({
  name: 'cityListSlice',
  initialState: {
    cityLists: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadCityListsStart.pending, state => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(loadCityListsStart.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        cityLists: action.payload,
      };
    });
    builder.addCase(loadCityListsStart.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
  },
});

// export const {setShopRegisterId} = CityListSlice.actions;
export default CityListSlice.reducer;