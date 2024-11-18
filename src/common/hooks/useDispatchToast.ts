import { setToast } from '../store/toastSlice';
import { ToastProps } from '../types';
import { useAppDispatch } from './storeHooks';

const useDispatchToast = () => {
  const dispatch = useAppDispatch();
  return (toastProps: ToastProps) => {
    dispatch(setToast(toastProps));
  };
};

export default useDispatchToast;
