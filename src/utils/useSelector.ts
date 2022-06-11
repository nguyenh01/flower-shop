import { RootState } from '@src/redux/store';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default useSelector;
