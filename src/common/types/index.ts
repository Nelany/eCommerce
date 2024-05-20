export type UserData = {
  username: string;
  password: string;
};

export type ToastProps = {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isToastOpen: boolean;
};
