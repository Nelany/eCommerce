import { useAppDispatch } from '../../../common/hooks/storeHooks';
import { setUser } from '../store/userSlice';

const useDispatchUserId = () => {
  const dispatch = useAppDispatch();

  return (userId: string) => {
    if (!userId) {
      localStorage.removeItem('userId');
    } else {
      localStorage.setItem('userId', userId);
    }

    dispatch(setUser(userId));
  };
};

export default useDispatchUserId;
