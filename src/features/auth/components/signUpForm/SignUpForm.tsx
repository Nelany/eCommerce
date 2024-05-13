import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import './SignUpForm.scss';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerData } from '../../types/app.interface';
import { useCallback, useState } from 'react';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registerData>();
  const navigateToMain = useNavigateToMain();
  const onSubmit: SubmitHandler<registerData> = () => {
    reset();
    navigateToMain();
  };

  const [showPassword, setShowPassword] = useState(false);

  const changePasswordIcon = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  function updateInputPattern() {
    const select = document.getElementById(
      'countrySelect'
    ) as HTMLSelectElement;
    const postalCodeInput = document.getElementById(
      'postalCodeInput'
    ) as HTMLInputElement;

    if (select?.value === 'GB') {
      postalCodeInput.pattern =
        '^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$';
      postalCodeInput.title =
        'Please, enter your postal code, for example B294HJ';
      postalCodeInput.disabled = false;
    } else if (select.value === 'US') {
      postalCodeInput.pattern = '^[0-9]{5}(-[0-9]{4})?$';
      postalCodeInput.title =
        'Please, enter your postal code, for example 32344-4444';
      postalCodeInput.disabled = false;
    }
  }

  return (
    <div>
      <h2>Register Form</h2>
      <form className={'form-register'} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={'form-register__input'}
          {...register('name', {
            required: 'Please, enter your name',
            minLength: 1,
            pattern: {
              value: /[a-zA-Z]/,
              message:
                'Your name must contain at least one character and no special characters or numbers',
            },
          })}
          placeholder="Name"
          type="text"
        />
        {errors?.name && (
          <span className="error-validation">{errors.name.message}</span>
        )}
        <input
          className={'form-register__input'}
          {...register('lastName', {
            required: 'Please, enter your last name',
            minLength: 1,
            pattern: {
              value: /[a-zA-Z]/,
              message:
                'Your last name must contain at least one character and no special characters or numbers',
            },
          })}
          placeholder="Last Name"
          type="text"
        />
        {errors?.lastName && (
          <span className="error-validation">{errors.lastName.message}</span>
        )}
        <input
          className={'form-register__input'}
          {...register('email', {
            required: 'Please, enter your email',
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Enter your email in the format example@email.com',
            },
          })}
          placeholder="Email"
          type="text"
        />
        {errors?.email && (
          <span className="error-validation">{errors.email.message}</span>
        )}
        <div className="password-wrapper">
          <input
            className={'form-register__input'}
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Please, enter your password',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
              },
            })}
            placeholder="Password"
          />
          <span
            className={
              showPassword ? 'password-controller show' : 'password-controller'
            }
            onClick={changePasswordIcon}
          ></span>
        </div>
        {errors.password && (
          <span className="error-validation">{errors.password.message}</span>
        )}
        <input
          className={'form-register__input'}
          {...register('dateBirth', {
            required: true,
            max: '2006-05-10',
          })}
          placeholder="Date of Birth"
          type="date"
        />
        {errors.dateBirth && (
          <span className="error-validation">{`The age must be over 18 years old`}</span>
        )}
        <select
          className={'form-register__input'}
          id="countrySelect"
          onChange={updateInputPattern}
        >
          <option selected={true} disabled={true}>
            Select country
          </option>
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
        </select>
        <input
          className={'form-register__input'}
          {...register('address.city', {
            required: 'Please, enter your city',
            minLength: 1,
            pattern: {
              value: /[a-zA-Z]/,
              message:
                'City must contain at least one character and no special characters or numbers',
            },
          })}
          placeholder="City"
          type="text"
        />
        {errors.address?.city && (
          <span className="error-validation">
            {errors.address?.city.message}
          </span>
        )}
        <input
          className={'form-register__input'}
          {...register('address.street', {
            required: 'Please, enter your street',
            minLength: 1,
          })}
          placeholder="Street"
          type="text"
        />
        {errors.address?.street && (
          <span className="error-validation">{`Please, enter your street`}</span>
        )}
        <input
          className={'form-register__input'}
          id="postalCodeInput"
          {...register('address.postalCode', {
            required: true,
          })}
          placeholder="Postal Code"
          type="text"
          disabled
        />
        {errors.address?.postalCode && (
          <span className="error-validation">
            {
              'Please, enter your postal code, for example B294HJ for United Kingdom or 32344-4444 for United States'
            }
          </span>
        )}
        <Button variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
