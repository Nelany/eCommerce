import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { auth } from '../../api/auth';
import { UserData } from '../../../../common/types';
import useDispatchUserId from '../../hooks/useDispatchUserId';
import useDispatchToast from '../../../../common/hooks/useDispatchToast';
import type { HttpErrorType } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';

import './SignInForm.scss';
import { removePreviousToken } from '../../../../common/api/sdk';
import { encryptUser } from '../../../../common/utils/crypto';
import { saveUserCart } from '../../../catalog/utils/helpers';
import useSelectCart from '../../../cart/hooks/useSelectCart';
import useDispatchCartId from '../../../cart/hooks/useDispatchCart';

const SignInForm = () => {
  const navigateToMain = useNavigateToMain();
  const saveUserId = useDispatchUserId();
  const setToast = useDispatchToast();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const cart = useSelectCart();
  const { dispatchSetCart } = useDispatchCartId();

  const changePasswordIcon = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserData>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    setServerError('');

    if (cart?.id) {
      data.anonymousCart = {
        id: cart.id,
        typeId: 'cart',
      };
    }

    try {
      const response = await auth.login(data);
      console.log(response);
      reset();
      saveUserId(response.body.customer.id);
      localStorage.setItem('userSecret', encryptUser(data));
      const cartId = response.body.cart?.id;
      const cartVersion = response.body.cart?.version;
      const discountId =
        response.body.cart?.discountCodes[0]?.discountCode.id || '';

      if (response.body.cart && cartId && cartVersion) {
        saveUserCart(cartId, cartVersion, discountId);
        dispatchSetCart(response.body.cart);
      }
      removePreviousToken();
      navigateToMain();
    } catch (error) {
      const serverError = error as HttpErrorType;

      if (
        serverError.body?.statusCode === 400 &&
        serverError.body?.error === 'invalid_customer_account_credentials'
      ) {
        setServerError(serverError.message);
      } else {
        setToast({
          message: serverError.message,
          type: 'info',
          isToastOpen: true,
        });
      }
    }
  };

  return (
    <div className="pop-up">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          type="text"
          placeholder="E-mail"
          className="input email"
          autoComplete="off"
          {...register('username', {
            required: 'Please, enter your e-mail!',
            pattern: {
              value: /^\S+@\S+\.\S+$/i,
              message: 'E-mail should look like example@test.com',
            },
          })}
        />

        {errors?.username && (
          <div className="error">{errors.username.message}</div>
        )}

        <div className="password-wrapper">
          <input
            placeholder="Password"
            className="input password"
            autoComplete="off"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Please, enter your password!',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: 'Your password does not match the pattern',
              },
            })}
          />

          <a
            href="#"
            className={
              showPassword ? 'password-controller show' : 'password-controller'
            }
            onClick={changePasswordIcon}
          ></a>
        </div>

        {errors?.password && (
          <div className="error">{errors.password.message}</div>
        )}

        <Tooltip
          anchorSelect=".email"
          place="bottom-end"
          className="clue"
        ></Tooltip>
        <Tooltip anchorSelect=".password" place="bottom-end" className="clue">
          <ul className="password-rules">
            <li>must be at least 8 characters long.</li>
            <li>must contain at least one uppercase letter (A-Z).</li>
            <li>must contain at least one lowercase letter (a-z).</li>
            <li>must contain at least one digit (0-9).</li>
            <li>must not contain leading or trailing whitespace.</li>
          </ul>
        </Tooltip>

        <div className={serverError ? 'server-error show' : 'server-error'}>
          <p className="error-icon"></p>
          <div>
            <p className="error-message">{serverError}</p>
            <p className="error-message">
              Please, check your e-mail and password and try again.
            </p>
          </div>
        </div>

        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
