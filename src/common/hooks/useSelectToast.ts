import { RootState } from "../store/store";
import { useAppSelector } from "./storeHooks";

const useSelectToast = () =>
  useAppSelector((state: RootState) => state.toast.value);

export default useSelectToast;
