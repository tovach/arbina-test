import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAction } from '@types';

type TableSliceState = {
  loadingStatus: boolean;
  errorStatus: string | undefined;
  items: UserAction[];
  searchResults: UserAction[];
};

const initialState: TableSliceState = {
  loadingStatus: false,
  errorStatus: undefined,
  items: [] as UserAction[],
  searchResults: [] as UserAction[]
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
  reducers: {
    findActionByInput: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.items = state.searchResults;
      }
      state.items = state.searchResults.filter((obj) =>
        Object.values(obj).some((value) => value.includes(action.payload))
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserActions.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(fetchUserActions.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.items = action.payload;
        state.searchResults = action.payload;
      })
      .addCase(fetchUserActions.rejected, (state, action) => {
        state.loadingStatus = false;
        state.errorStatus = action.payload;
      });
  }
});

export default tableSlice.reducer;
export const { findActionByInput } = tableSlice.actions;
