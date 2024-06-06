export type UserData = {
  username: string;
  password: string;
  anonymousCart?: {
    id: string;
    typeId: "cart";
  };
};

export type ToastProps = {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isToastOpen: boolean;
};
