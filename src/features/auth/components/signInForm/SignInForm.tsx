// import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './SignInForm.scss';

type LoginFormTypes = {
  email: string;
  password: string;
};


const SignInForm = () => {
  // const navigateToMain = useNavigateToMain();

  const [showPassword, setShowPassword] = useState(false);

  const changePasswordIcon = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, [])

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<LoginFormTypes>({mode: 'onChange'})

  const onSubmit: SubmitHandler<LoginFormTypes> = data => {
     // тут проверка, после которой:
     // navigateToMain();
    console.log(data);
    reset();
  }

  return (
    <div className='pop-up'>
      <h2 className='login-title'>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <input type='text' placeholder='E-mail' className='input email' autoComplete='off' {
          ...register('email', {
            required: 'Please, enter your e-mail!',
            pattern: {
              value: /^\S+@\S+\.\S+$/i,
              message: 'E-mail should look like example@test.com'
            }
          })
         
        }/>

        {errors?.email && (
          <div className='error'>{errors.email.message}</div>
        )}

        <div className='password-wrapper'>
          <input  placeholder='Password' className='input password' autoComplete='off'
            type={
              showPassword ? "text" : "password"
            } 
            {
            ...register('password', {
              required: 'Please, enter your password!',
              pattern: {
                value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}/,
                message: 'Your password does not match the pattern'
              }
              
            })
          }/>

          <a href='#' className={showPassword ? 'password-controller show' : 'password-controller'}
            onClick={changePasswordIcon}></a>

        </div>

        {errors?.password && (
            <div className='error'>{errors.password.message}</div>
          )}

          <Tooltip anchorSelect=".email" place="bottom-end" className='clue'></Tooltip>
          <Tooltip anchorSelect=".password" place="bottom-end" className='clue'>
            <ul className='password-rules'>
              <li>must be at least 8 characters long.</li>
              <li>must contain at least one uppercase letter (A-Z).</li>
              <li>must contain at least one lowercase letter (a-z).</li>
              <li>must contain at least one digit (0-9).</li>
              <li>must not contain leading or trailing whitespace.</li>
            </ul>

          </Tooltip>

      
        <Button type='submit' variant="contained"> Sign In </Button>
      </form>
    </div>
  )
};

export default SignInForm;
