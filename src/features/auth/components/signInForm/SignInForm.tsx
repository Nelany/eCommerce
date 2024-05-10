// import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useState } from 'react';
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
        <input type='text' placeholder='E-mail' className='input' autoComplete='off' {
          ...register('email', {
            required: 'Please, enter your e-mail!',
            pattern: {
              value: /^\S+@\S+\.\S+$/i,
              message: 'error'
            }
          })
         
        }/>

        {errors?.email && (
          <div className='error'>{errors.email.message}</div>
        )}

        <div className='password-wrapper'>
          <input  placeholder='Password' className='input' 
            type={
              showPassword ? "text" : "password"
            } 
            {
            ...register('password', {
              required: 'Please, enter your password!',
              pattern: {
                value: / ^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/i,
                message: 'error'
              }
              
            })
          }/>

          <span href='#' className={showPassword ? 'password-controller show' : 'password-controller'}
            onClick={changePasswordIcon}></span>

        </div>

        {errors?.password && (
            <div className='error'>{errors.password.message}</div>
          )}

      
        <Button type='submit' variant="contained"> Sign In </Button>
      </form>
    </div>
  )
};

export default SignInForm;
