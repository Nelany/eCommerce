import {
  Customer,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerSetDateOfBirthAction,
  CustomerChangeEmailAction,
} from '@commercetools/platform-sdk';
import { auth } from '../../auth/api/auth';
import './Profile.scss';
import { useEffect, useState } from 'react';
import useApi from '../../../common/hooks/useApi';
import { getApiRoot } from '../../../common/api/sdk';
import { Button } from '@mui/material';
import useDispatchToast from '../../../common/hooks/useDispatchToast';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateData } from '../../auth/types/app.interface';

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateData>({ mode: 'onChange' });

  const key = localStorage.getItem('userId') as string;
  const apiCall = useApi();
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

  const onSubmit: SubmitHandler<updateData> = async (data) => {
    const customerVersion = profile?.version as number;
    const changeNameAction: CustomerSetFirstNameAction = {
      action: 'setFirstName',
      firstName: data.firstName || profile?.firstName,
    };

    const changeLastNameAction: CustomerSetLastNameAction = {
      action: 'setLastName',
      lastName: data.lastName || profile?.lastName,
    };

    const changeBirthDateAction: CustomerSetDateOfBirthAction = {
      action: 'setDateOfBirth',
      dateOfBirth: data.dateBirth || profile?.dateOfBirth,
    };

    const changeEmailAction: CustomerChangeEmailAction = {
      action: 'changeEmail',
      email: data.email || (profile?.email as string),
    };

    const response = await apiCall(
      getApiRoot()
        .customers()
        .withId({ ID: key })
        .post({
          body: {
            version: customerVersion,
            actions: [
              changeNameAction,
              changeLastNameAction,
              changeBirthDateAction,
              changeEmailAction,
            ],
          },
        })
        .execute()
    );
    if (response) {
      setToast({
        message: 'The data has been successfully updated',
        type: 'success',
        isToastOpen: true,
      });
      navigate('/profile');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-form-wrapper">
      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="edit-form__label">
          First name:
          <input
            className="edit-form__input"
            type="text"
            {...register('firstName', {
              minLength: 1,
              pattern: {
                value: /^[a-zA-Z]+$/,
                message:
                  'Your name must contain at least one character and no special characters or numbers',
              },
            })}
            defaultValue={profile?.firstName}
          />
        </label>
        {errors?.firstName && (
          <span className="error-validation">{errors.firstName.message}</span>
        )}
        <label className="edit-form__label">
          Last name:
          <input
            className="edit-form__input"
            type="text"
            {...register('lastName', {
              minLength: 1,
              pattern: {
                value: /^[a-zA-Z]+$/,
                message:
                  'Your last name must contain at least one character and no special characters or numbers',
              },
            })}
            defaultValue={profile?.lastName}
          />
        </label>
        {errors?.lastName && (
          <span className="error-validation">{errors.lastName.message}</span>
        )}
        <label className="edit-form__label">
          Date of Birth:
          <input
            className="edit-form__input"
            type="date"
            {...register('dateBirth', {
              max: '2006-05-20',
            })}
            defaultValue={profile?.dateOfBirth}
          />
        </label>
        {errors.dateBirth && (
          <span className="error-validation">{`The age must be over 18 years old`}</span>
        )}
        <label className="edit-form__label">
          Email:
          <input
            className="edit-form__input"
            type="text"
            {...register('email', {
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Enter your email in the format example@email.com',
              },
            })}
            defaultValue={profile?.email}
          />
        </label>
        {errors?.email && (
          <span className="error-validation">{errors.email.message}</span>
        )}
        <Button className="edit-button" variant="contained" type="submit">
          Save
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

export default UpdateProfile;
