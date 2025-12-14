import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TReduxDispatch, TReduxState } from './store.instance';

export const useAppDispatch = () => useDispatch<TReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<TReduxState> = useSelector;
