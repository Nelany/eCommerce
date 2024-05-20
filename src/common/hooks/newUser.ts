import useDispatchToast from './useDispatchToast';

const useNewUser = () => {
  const setToast = useDispatchToast();
  return () => {
      setToast({
        message: 'The user has been successfully created',
        type: 'success',
        isToastOpen: true,
      });
  };
};

export default useNewUser;