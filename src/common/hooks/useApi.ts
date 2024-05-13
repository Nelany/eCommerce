import useDispatchToast from './useDispatchToast';

const useNewApi = () => {
  const setToast = useDispatchToast();
  return async <T>(method: Promise<T>): Promise<T | undefined> => {
    try {
      const response = await method;
      return response;
    } catch (error) {
      setToast({
        message: JSON.stringify((error as Error).message),
        type: 'error',
        isToastOpen: true,
      });
    }
    return undefined;
  };
};

export default useNewApi;
