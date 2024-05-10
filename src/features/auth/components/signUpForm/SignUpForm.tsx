import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import './SignUpForm.scss';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerDate } from '../../types/app.interface';

const SignUpForm = () => {
  const { register, handleSubmit, reset, formState: {errors} } = useForm<registerDate>();
  const navigateToMain = useNavigateToMain();
  const onSubmit: SubmitHandler<registerDate> = () => {
    reset();
    navigateToMain();
  };

  return (
    <div>
      <h2>Register Form</h2>
      <form className={'form-register'} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={'form-register__input'}
          {...register('name',
          {
            required: "Please, enter your name",
            minLength: 1,
            pattern: {
              value: /[a-zA-Z]/,
              message: "Your name must contain at least one character and no special characters or numbers"
            }
          })}
          placeholder="Name"
          type="text"
        />
        {errors?.name && (
          <span className="error-validation">{errors.name.message}</span>
        )}
        <input
          className={'form-register__input'}
          {...register('lastName',
          {
            required: "Please, enter your last name",
            minLength: 1,
            pattern: {
              value: /[a-zA-Z]/,
              message: "Your last name must contain at least one character and no special characters or numbers"
            }
          })}
          placeholder="Last Name"
          type="text"
        />
        {errors?.lastName && (
          <span className="error-validation">{errors.lastName.message}</span>
        )}
        <input
          className={'form-register__input'}
          {...register('email',
          {
            required: "Please, enter your email",
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Enter your email in the format example@email.com"
            }
          })}
          placeholder="Email"
          type="text"
        />
        {errors?.email && (
          <span className="error-validation">{errors.email.message}</span>
        )}
        <input
          className={'form-register__input'}
          {...register('password',
          {
            required: "Please, enter your password",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: "Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
            }
          })}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <span className="error-validation">{errors.password.message}</span>
        )}
        <input
          className={'form-register__input'}
          {...register('dateBirth',
          {
            required: true,
            max: "2006-05-10"
          })}
          placeholder="Date of Birth"
          type="date"
        />
        {errors.dateBirth && (
          <span className="error-validation">{`The age must be over 18 years old`}</span>
        )}
        <select className={'form-register__input'}>
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
        </select>
        <input
          className={'form-register__input'}
          {...register('address.city',
          {
            required: "Please, enter your city",
            minLength: 1,
            pattern: {
              value: /[a-zA-Z]/,
              message: "City must contain at least one character and no special characters or numbers"
            }
          })}
          placeholder="City"
          type="text"
        />
        {errors.address?.city && (
          <span className="error-validation">{errors.address?.city.message}</span>
        )}
        <input
          className={'form-register__input'}
          {...register('address.street',
          {
            required: "Please, enter your street",
            minLength: 1,
          })}
          placeholder="Street"
          type="text"
        />
        <input
          className={'form-register__input'}
          {...register('address.postalCode',
          {
            required: "Please, enter your postal code",
          })}
          placeholder="Postal Code"
          type="text"
        />
        <Button variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
