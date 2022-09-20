import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAction } from '@types';

type TableSliceState = {
  loadingStatus: boolean;
  errorStatus: string | undefined;
  items: UserAction[];
};

const initialState: TableSliceState = {
  loadingStatus: false,
  errorStatus: undefined,
  items: [] as UserAction[]
};

export const fetchUserActions = createAsyncThunk<UserAction[], string, { rejectValue: string }>(
  'tableSlice/fetchUserActions',
  async (arg, thunkApi) => {
    try {
      const response = await fetch(arg);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Something went wrong, status code - ${response.status}`);
      }
      return data as UserAction[];
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue('Something went wrong');
    }
  }
);

const tableSlice = createSlice({
  name: 'tableSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserActions.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(fetchUserActions.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.items = action.payload;
      })
      .addCase(fetchUserActions.rejected, (state, action) => {
        state.loadingStatus = false;
        state.errorStatus = action.payload;
      });
  }
});

export default tableSlice.reducer;
