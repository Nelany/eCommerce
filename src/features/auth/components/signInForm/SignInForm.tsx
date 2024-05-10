// import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import './SignInForm.scss';

type LoginFormTypes = {
  email: string;
  password: string;
};

const SignInForm = () => {
  // const navigateToMain = useNavigateToMain();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormTypes>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginFormTypes> = (data) => {
    // тут проверка, после которой:
    // navigateToMain();
    console.log(data);
    reset();
  };

  return (
    <div className="pop-up">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          type="text"
          placeholder="E-mail"
          className="input"
          autoComplete="off"
          {...register('email', {
            required: 'Please, enter your e-mail!',
          })}
        />

        {errors?.email && <div className="error">{errors.email.message}</div>}

        <input
          type="password"
          placeholder="Password"
          className="input"
          {...register('password', {
            required: 'Please, enter your password!',
          })}
        />

        {errors?.password && (
          <div className="error">{errors.password.message}</div>
        )}

        <Button type="submit" variant="contained">
          {' '}
          Sign In{' '}
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
