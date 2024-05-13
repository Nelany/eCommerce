import { Alert, Snackbar } from '@mui/material';
import useSelectToast from '../../hooks/useSelectToast';
import useDispatchToast from '../../hooks/useDispatchToast';

const Toast = () => {
  const props = useSelectToast();
  const { message, type, isToastOpen } = props;
  const setToast = useDispatchToast();
  const handleClose = () => {
    setToast({ ...props, isToastOpen: false });
  };
  return (
    <Snackbar
      open={isToastOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
