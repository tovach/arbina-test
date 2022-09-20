import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch, AppRootStore } from '@store/index';
import { fetchUserActions, findActionByInput } from '@store/slices/tableSlice/tableSlice';

export const useAppSelector: TypedUseSelectorHook<AppRootStore> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAsyncActions = () => bindActionCreators({ fetchUserActions }, useAppDispatch());
export const useTableActions = () => bindActionCreators({ findActionByInput }, useAppDispatch());
