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
import { encryptUser } from '../../../../common/utils/crypto';
import { removePreviousToken } from '../../../../common/api/sdk';
import { saveUserCart } from '../../../catalog/utils/helpers';

const SignUpForm = () => {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<registerData>({ mode: 'onChange' });

  const watchShowBilling = watch('showBilling', false);
  const navigateToMain = useNavigateToMain();
  const saveUserId = useDispatchUserId();
  const setToast = useDispatchToast();
  const [apiCall, isLoading] = useApi();
  const userMessage = useNewUser();

  const onSubmit: SubmitHandler<registerData> = async (data) => {
    if (watchShowBilling) {
      data.addressBilling = data.addressShipping;
    }
    if (data.defaultShipping) {
      data.defaultShippingAddress = 0;
    }
    if (data.defaultBilling) {
      data.defaultBillingAddress = 1;
    }
    if (watchShowBilling && data.defaultShipping) {
      data.defaultBillingAddress = 1;
    }
    try {
      const response = await auth.createCustomer({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateBirth,
        addresses: [data.addressShipping, data.addressBilling],
        shippingAddresses: [0],
        billingAddresses: [1],
        defaultShippingAddress: data.defaultShippingAddress,
        defaultBillingAddress: data.defaultBillingAddress,
      });
      if (response) {
        reset();
        const user = { username: data.email, password: data.password };
        const userData = await apiCall(auth.login(user));
        if (userData) {
          saveUserId(response.body.customer.id);
          localStorage.setItem('userSecret', encryptUser(user));
          const cartId = response.body.cart?.id;
          const cartVersion = response.body.cart?.version;
          const discountId =
            response.body.cart?.discountCodes[0]?.discountCode.id || '';

          if (cartId && cartVersion) {
            saveUserCart(cartId, cartVersion, discountId);
          }
          removePreviousToken();
          navigateToMain();
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
              value: /^[a-zA-Z]+$/,
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
              value: /^[a-zA-Z]+$/,
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
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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
            max: '2006-05-20',
          })}
          placeholder="Date of Birth"
          type="date"
        />
        {errors.dateBirth && (
          <span className="error-validation">{`The age must be over 18 years old`}</span>
        )}
        <h4 className={'address-title'}>Shipping address</h4>
        <div className={'checkbox-input-wrapper'}>
          <input type="checkbox" {...register('defaultShipping')} />
          <span>{'Set as default address'}</span>
        </div>
        <div className={'address-wrapper'}>
          <div className={'address-input-wrapper'}>
            <select
              className={'form-register__input'}
              defaultValue={'Select country'}
              {...register('addressShipping.country', {
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
            {errors.addressShipping?.country && (
              <span className="error-validation">
                {errors.addressShipping?.country.message}
              </span>
            )}
          </div>
          <div className={'address-input-wrapper'}>
            <input
              className={'form-register__input'}
              id="cityShipping"
              {...register('addressShipping.city', {
                required: 'Please, enter your city',
                minLength: 1,
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message:
                    'City must contain at least one character and no special characters or numbers',
                },
              })}
              placeholder="City"
              type="text"
            />
            {errors.addressShipping?.city && (
              <span className="error-validation">
                {errors.addressShipping?.city.message}
              </span>
            )}
          </div>
          <div className={'address-input-wrapper'}>
            <input
              className={'form-register__input'}
              id="streetShipping"
              {...register('addressShipping.streetName', {
                required: true,
                minLength: 1,
                pattern: {
                  value: /^\S+$/,
                  message: 'Please, enter your street',
                },
              })}
              placeholder="Street"
              type="text"
            />
            {errors.addressShipping?.streetName && (
              <span className="error-validation">
                {errors.addressShipping?.streetName.message}
              </span>
            )}
          </div>
          <div className={'address-input-wrapper'}>
            <input
              className={'form-register__input'}
              {...register('addressShipping.postalCode', {
                required: true,
                validate: {
                  GBOrUS: (value) => {
                    if (getValues().addressShipping.country === 'US') {
                      return /^[0-9]{5}(-[0-9]{4})?$/.test(value);
                    }
                    if (getValues().addressShipping.country === 'GB') {
                      return /^(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/.test(
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
            {errors.addressShipping?.postalCode && (
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
              <input type="checkbox" {...register('defaultBilling')} />
              <span>{'Set as default address'}</span>
            </div>
            <div className={'address-wrapper'}>
              <div className={'address-input-wrapper'}>
                <select
                  {...register('addressBilling.country', {
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
                {errors.addressBilling?.country && (
                  <span className="error-validation">
                    {errors.addressBilling?.country.message}
                  </span>
                )}
              </div>
              <div className={'address-input-wrapper'}>
                <input
                  className={'form-register__input'}
                  {...register('addressBilling.city', {
                    required: true && 'Please, enter your city',
                    minLength: 1,
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        'City must contain at least one character and no special characters or numbers',
                    },
                  })}
                  placeholder="City"
                  type="text"
                />
                {errors.addressBilling?.city && (
                  <span className="error-validation">
                    {errors.addressBilling?.city.message}
                  </span>
                )}
              </div>
              <div className={'address-input-wrapper'}>
                <input
                  className={'form-register__input'}
                  id="streetBilling"
                  {...register('addressBilling.streetName', {
                    required: true,
                    minLength: 1,
                    pattern: {
                      value: /^\S+$/,
                      message: 'Please, enter your street',
                    },
                  })}
                  placeholder="Street"
                  type="text"
                />
                {errors.addressBilling?.streetName && (
                  <span className="error-validation">
                    {errors.addressBilling?.streetName.message}
                  </span>
                )}
              </div>
              <div className={'address-input-wrapper'}>
                <input
                  className={'form-register__input'}
                  id="postalCodeInputBilling"
                  {...register('addressBilling.postalCode', {
                    required: true,
                    validate: {
                      GBOrUS: (value) => {
                        if (getValues().addressBilling.country === 'US') {
                          return /^[0-9]{5}(-[0-9]{4})?$/.test(value);
                        }
                        if (getValues().addressBilling.country === 'GB') {
                          return /^(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/.test(
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
                {errors.addressBilling?.postalCode && (
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

        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
