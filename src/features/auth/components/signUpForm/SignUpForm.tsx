import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import './SignUpForm.scss';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerData } from '../../types/app.interface';
import { useCallback, useRef, useState } from 'react';
import { auth } from '../../api/auth';
import useApi from '../../../../common/hooks/useApi';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registerData>();

  const navigateToMain = useNavigateToMain();
  const apiCall = useApi();
  const onSubmit: SubmitHandler<registerData> = async (data) => {
    const response = await auth.createCustomer({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });
    console.log(response);
    if (response) {
      reset();
      navigateToMain();
      const userData = await apiCall(
        auth.login({ username: data.email, password: data.password })
      );
      console.log(userData);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const changePasswordIcon = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const selectShipping = document.getElementById(
    'countrySelectShipping'
  ) as HTMLSelectElement;
  const postalCodeInputShipping = document.getElementById(
    'postalCodeInputShipping'
  ) as HTMLInputElement;
  const selectBilling = document.getElementById(
    'countrySelectBilling'
  ) as HTMLSelectElement;
  const postalCodeInputBilling = document.getElementById(
    'postalCodeInputBilling'
  ) as HTMLInputElement;

  function updateInputPatternShipping() {
    if (selectShipping.value === 'GB') {
      postalCodeInputShipping.pattern =
        '^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$';
      postalCodeInputShipping.title =
        'Please, enter your postal code, for example B294HJ';
      postalCodeInputShipping.disabled = false;
    } else if (selectShipping.value === 'US') {
      postalCodeInputShipping.pattern = '^[0-9]{5}(-[0-9]{4})?$';
      postalCodeInputShipping.title =
        'Please, enter your postal code, for example 32344-4444';
      postalCodeInputShipping.disabled = false;
    }
  }

  function updateInputPatternBilling() {
    if (selectBilling.value === 'GB') {
      postalCodeInputBilling.pattern =
        '^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$';
      postalCodeInputBilling.title =
        'Please, enter your postal code, for example B294HJ';
      postalCodeInputBilling.disabled = false;
    } else if (selectBilling.value === 'US') {
      postalCodeInputBilling.pattern = '^[0-9]{5}(-[0-9]{4})?$';
      postalCodeInputBilling.title =
        'Please, enter your postal code, for example 32344-4444';
      postalCodeInputBilling.disabled = false;
    }
  }

  const [sameAsDelivery, setSameAsDelivery] = useState(false);
  const billingAddressWrapper =
    useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleCheckboxChange = () => {
    setSameAsDelivery(!sameAsDelivery);
    if (!sameAsDelivery) {
      billingAddressWrapper.current.style.display = 'none';
    } else {
      billingAddressWrapper.current.style.display = 'block';
    }
  };

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
          <select
            className={'form-register__input'}
            id="countrySelectShipping"
            onChange={updateInputPatternShipping}
          >
            <option selected={true} disabled={true}>
              Select country
            </option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
          </select>
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
              id="postalCodeInputShipping"
              {...register('addressShipping.postalCodeShipping', {
                required: false,
              })}
              placeholder="Postal Code"
              type="text"
              disabled
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
          <input
            type="checkbox"
            checked={sameAsDelivery}
            onChange={handleCheckboxChange}
          />
          <span>{'Shipping and billing addresses are the same'}</span>
        </div>
        <div className={'billing-address-wrapper'} ref={billingAddressWrapper}>
          <h4 className={'address-title'}>Billing address</h4>
          <div className={'checkbox-input-wrapper'}>
            <input type="checkbox" />
            <span>{'Set as default address'}</span>
          </div>
          <div className={'address-wrapper'}>
            <select
              className={'form-register__input'}
              id="countrySelectBilling"
              onChange={updateInputPatternBilling}
            >
              <option selected={true} disabled={true}>
                Select country
              </option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
            </select>
            <div className={'address-input-wrapper'}>
              <input
                className={'form-register__input'}
                id="cityBilling"
                {...register('addressBilling.cityBilling', {
                  required: !sameAsDelivery && 'Please, enter your city',
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
                  required: !sameAsDelivery,
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
                  required: false,
                })}
                placeholder="Postal Code"
                type="text"
                disabled
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
        <Button variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
