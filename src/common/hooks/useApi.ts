import { useState } from 'react';
import useDispatchToast from './useDispatchToast';

const useNewApi = (): [
  <T>(method: Promise<T>) => Promise<T | undefined>,
  boolean,
] => {
  const setToast = useDispatchToast();
  const [isLoading, setIsLoading] = useState(false);
  return [
    async <T>(method: Promise<T>): Promise<T | undefined> => {
      setIsLoading(true);
      try {
        const response = await method;
        setIsLoading(false);
        return response;
      } catch (error) {
        setToast({
          message: JSON.stringify((error as Error).message),
          type: 'info',
          isToastOpen: true,
        });
        setIsLoading(false);
      }
      return undefined;
    },
    isLoading,
  ];
};

export default useNewApi;
