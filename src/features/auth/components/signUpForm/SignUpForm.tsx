import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import './SignUpForm.scss';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerData } from '../../types/app.interface';
import { useCallback, useState } from 'react';
import { auth } from '../../api/auth';
import useApi from '../../../../common/hooks/useApi';
import useDispatchUserId from '../../hooks/useDispatchUserId';
import useNewUser from '../../../../common/hooks/newUser';
import useDispatchToast from '../../../../common/hooks/useDispatchToast';
import { HttpErrorType } from '@commercetools/sdk-client-v2';

const SignUpForm = () => {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<registerData>();

  const watchShowBilling = watch('showBilling', false);
  const navigateToMain = useNavigateToMain();
  const saveUserId = useDispatchUserId();
  const setToast = useDispatchToast();
  const apiCall = useApi();
  const userMessage = useNewUser();

  const onSubmit: SubmitHandler<registerData> = async (data) => {
    try {
      const response = await auth.createCustomer(data);
      if (response) {
        reset();
        navigateToMain();
        const userData = await apiCall(
          auth.login({ username: data.email, password: data.password })
        );
        if (userData) {
          saveUserId(response.body.customer.id);
        }
        userMessage();
      }
    } catch (error) {
      const serverError = error as HttpErrorType;
      if (
        serverError.message ===
        'There is already an existing customer with the provided email.'
      ) {
        setToast({
          message:
            'A user with this email address already exists, please log in or enter another email address',
          type: 'info',
          isToastOpen: true,
        });
      } else if (
        serverError.statusCode >= 500 &&
        serverError.statusCode < 600
      ) {
        setToast({
          message: 'Oops, something went wrong, try again or try again later',
          type: 'info',
          isToastOpen: true,
        });
      } else {
        setToast({
          message: serverError.message,
          type: 'info',
          isToastOpen: true,
        });
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const changePasswordIcon = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div>
      <h2>Register Form</h2>
      <form className={'form-register'} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={'form-register__input'}
          {...register('firstName', {
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
        {errors?.firstName && (
          <span className="error-validation">{errors.firstName.message}</span>
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
            autoComplete="off"
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
        <h4 className={'address-title'}>Shipping address</h4>
        <div className={'checkbox-input-wrapper'}>
          <input type="checkbox" />
          <span>{'Set as default address'}</span>
        </div>
        <div className={'address-wrapper'}>
          <div className={'address-input-wrapper'}>
            <select
              className={'form-register__input'}
              defaultValue={'Select country'}
              {...register('addressShipping.countryShipping', {
                required: true,
                pattern: {
                  value: /GB|US/,
                  message: 'Must be US or GB',
                },
              })}
            >
              <option disabled={true}>Select country</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
            </select>
            {errors.addressShipping?.countryShipping && (
              <span className="error-validation">
                {errors.addressShipping?.countryShipping.message}
              </span>
            )}
          </div>
          <div className={'address-input-wrapper'}>
            <input
              className={'form-register__input'}
              id="cityShipping"
              {...register('addressShipping.cityShipping', {
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
            {errors.addressShipping?.cityShipping && (
              <span className="error-validation">
                {errors.addressShipping?.cityShipping.message}
              </span>
            )}
          </div>
          <div className={'address-input-wrapper'}>
            <input
              className={'form-register__input'}
              id="streetShipping"
              {...register('addressShipping.streetShipping', {
                required: 'Please, enter your street',
                minLength: 1,
              })}
              placeholder="Street"
              type="text"
            />
            {errors.addressShipping?.streetShipping && (
              <span className="error-validation">{`Please, enter your street`}</span>
            )}
          </div>
          <div className={'address-input-wrapper'}>
            <input
              className={'form-register__input'}
              {...register('addressShipping.postalCodeShipping', {
                required: true,
                validate: {
                  GBOrUS: (value) => {
                    if (getValues().addressShipping.countryShipping === 'US') {
                      return /^[0-9]{5}(-[0-9]{4})?$/.test(value);
                    }
                    if (getValues().addressShipping.countryShipping === 'GB') {
                      return /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/.test(
                        value
                      );
                    }
                    return false;
                  },
                },
              })}
              placeholder="Postal Code"
              type="text"
            />
            {errors.addressShipping?.postalCodeShipping && (
              <span className="error-validation">
                {
                  'Please, enter your postal code, for example B294HJ for United Kingdom or 32344-4444 for United States'
                }
              </span>
            )}
          </div>
        </div>
        <div className={'checkbox-input-wrapper'}>
          <input type="checkbox" {...register('showBilling')} />
          <span>{'Shipping and billing addresses are the same'}</span>
        </div>

        {!watchShowBilling && (
          <div className={'billing-address-wrapper'}>
            <h4 className={'address-title'}>Billing address</h4>
            <div className={'checkbox-input-wrapper'}>
              <input type="checkbox" />
              <span>{'Set as default address'}</span>
            </div>
            <div className={'address-wrapper'}>
              <div className={'address-input-wrapper'}>
                <select
                  {...register('addressBilling.countryBilling', {
                    required: true,
                    pattern: {
                      value: /GB|US/,
                      message: 'Must be US or GB',
                    },
                  })}
                  className={'form-register__input'}
                  defaultValue={'Select country'}
                >
                  <option disabled={true}>Select country</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                </select>
                {errors.addressBilling?.countryBilling && (
                  <span className="error-validation">
                    {errors.addressBilling?.countryBilling.message}
                  </span>
                )}
              </div>
              <div className={'address-input-wrapper'}>
                <input
                  className={'form-register__input'}
                  {...register('addressBilling.cityBilling', {
                    required: true && 'Please, enter your city',
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
                {errors.addressBilling?.cityBilling && (
                  <span className="error-validation">
                    {errors.addressBilling?.cityBilling.message}
                  </span>
                )}
              </div>
              <div className={'address-input-wrapper'}>
                <input
                  className={'form-register__input'}
                  id="streetBilling"
                  {...register('addressBilling.streetBilling', {
                    required: true,
                    minLength: 1,
                  })}
                  placeholder="Street"
                  type="text"
                />
                {errors.addressBilling?.streetBilling && (
                  <span className="error-validation">{`Please, enter your street`}</span>
                )}
              </div>
              <div className={'address-input-wrapper'}>
                <input
                  className={'form-register__input'}
                  id="postalCodeInputBilling"
                  {...register('addressBilling.postalCodeBilling', {
                    required: true,
                    validate: {
                      GBOrUS: (value) => {
                        if (
                          getValues().addressBilling.countryBilling === 'US'
                        ) {
                          return /^[0-9]{5}(-[0-9]{4})?$/.test(value);
                        }
                        if (
                          getValues().addressBilling.countryBilling === 'GB'
                        ) {
                          return /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/.test(
                            value
                          );
                        }
                        return true;
                      },
                    },
                  })}
                  placeholder="Postal Code"
                  type="text"
                />
                {errors.addressBilling?.postalCodeBilling && (
                  <span className="error-validation">
                    {
                      'Please, enter your postal code, for example B294HJ for United Kingdom or 32344-4444 for United States'
                    }
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <Button variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
