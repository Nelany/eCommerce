import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import './SignUpForm.scss';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerDate } from '../../types/app.interface';

const SignUpForm = () => {
  const { register, handleSubmit, reset } = useForm<registerDate>();
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
          {...(register('name'),
          {
            required: true,
          })}
          placeholder="Name"
          type="text"
        ></input>
        <input
          className={'form-register__input'}
          {...(register('lastName'),
          {
            required: true,
          })}
          placeholder="Last Name"
          type="text"
        ></input>
        <input
          className={'form-register__input'}
          {...(register('email'),
          {
            required: true,
          })}
          placeholder="Email"
          type="email"
        ></input>
        <input
          className={'form-register__input'}
          {...(register('password'),
          {
            required: true,
          })}
          placeholder="Password"
          type="password"
        ></input>
        <input
          className={'form-register__input'}
          {...(register('dateBirth'),
          {
            required: true,
          })}
          placeholder="Date of Birth"
          type="date"
        ></input>
        <select className={'form-register__input'}>
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
        </select>
        <input
          className={'form-register__input'}
          {...(register('address.city'),
          {
            required: true,
          })}
          placeholder="City"
          type="text"
        ></input>
        <input
          className={'form-register__input'}
          {...(register('address.street'),
          {
            required: true,
          })}
          placeholder="Street"
          type="text"
        ></input>
        <input
          className={'form-register__input'}
          {...(register('address.postalCode'),
          {
            required: true,
          })}
          placeholder="Postal Code"
          type="text"
        ></input>
        <Button variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
