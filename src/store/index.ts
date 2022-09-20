import { configureStore } from '@reduxjs/toolkit';
import tableSlice from '@store/slices/tableSlice/tableSlice';

export const appStore = configureStore({
  reducer: {
    tableSlice
  }
});

export type AppRootStore = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
