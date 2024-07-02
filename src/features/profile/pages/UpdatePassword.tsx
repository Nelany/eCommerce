import { Customer } from '@commercetools/platform-sdk';
import { auth } from '../../auth/api/auth';
import './Profile.scss';
import { useEffect, useState } from 'react';
import useApi from '../../../common/hooks/useApi';
import {
  getApiRoot,
  removePreviousToken,
  setUser,
} from '../../../common/api/sdk';
import { Button } from '@mui/material';
import useDispatchToast from '../../../common/hooks/useDispatchToast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updatePasswordData } from '../../auth/types/app.interface';
import { encryptUser } from '../../../common/utils/crypto';

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updatePasswordData>({ mode: 'onChange' });

  const key = localStorage.getItem('userId') as string;
  const [apiCall, isLoading] = useApi();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Customer | null>(null);

  useEffect(() => {
    const getCustomer = async () => {
      const profile = await apiCall(auth.getCustomers(key));
      return profile;
    };
    getCustomer().then((profileData) => {
      if (!profileData) return;
      const userProfile = profileData?.body.results[0];
      setProfile(userProfile);
    });
  }, []);

  const setToast = useDispatchToast();
  const customerVersion = profile?.version as number;

  const onSubmitUpdatePassword = async (data: updatePasswordData) => {
    const response = await apiCall(
      getApiRoot()
        .me()
        .password()
        .post({
          body: {
            version: customerVersion,
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          },
        })
        .execute()
    );

    if (response) {
      setToast({
        message: 'The password has been successfully updated',
        type: 'success',
        isToastOpen: true,
      });
      const user = {
        username: profile?.email as string,
        password: data.newPassword,
      };
      localStorage.setItem('userSecret', encryptUser(user));
      removePreviousToken();
      setUser();
      navigate('/profile');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-form-wrapper">
      <form
        className="edit-form"
        onSubmit={handleSubmit(onSubmitUpdatePassword)}
      >
        <label className="edit-form__label">
          Current password:
          <input
            className="edit-form__input"
            type="text"
            {...register('currentPassword', {
              required: 'Current password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  'Your name must contain at least one character and no special characters or numbers',
              },
            })}
          />
        </label>
        {errors?.currentPassword && (
          <span className="error-validation">
            {errors.currentPassword.message}
          </span>
        )}
        <label className="edit-form__label">
          New password:
          <input
            className={'edit-form__input'}
            type="text"
            {...register('newPassword', {
              required: 'New password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
              },
            })}
            autoComplete="off"
          />
        </label>
        {errors?.newPassword && (
          <span className="error-validation">{errors.newPassword.message}</span>
        )}
        <Button
          className="edit-button"
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          Change Password
        </Button>
        <Button
          className="edit-button"
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
