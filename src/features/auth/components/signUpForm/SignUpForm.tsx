import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import './SignUpForm.scss';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerData } from '../../types/app.interface';
import { useCallback, useRef, useState } from 'react';

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

  const selectShipping = useRef<HTMLSelectElement>(null);
  const postalCodeInputShipping =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const selectBilling = useRef<HTMLSelectElement>(null);
  const postalCodeInputBilling =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  function updateInputPattern() {
    if (selectShipping.current?.value === 'GB') {
      postalCodeInputShipping.current.pattern =
        '^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$';
      postalCodeInputShipping.current.title =
        'Please, enter your postal code, for example B294HJ';
      postalCodeInputShipping.current.disabled = false;
    } else if (selectShipping.current?.value === 'US') {
      postalCodeInputShipping.current.pattern = '^[0-9]{5}(-[0-9]{4})?$';
      postalCodeInputShipping.current.title =
        'Please, enter your postal code, for example 32344-4444';
      postalCodeInputShipping.current.disabled = false;
    } else if (selectBilling.current?.value === 'GB') {
      postalCodeInputBilling.current.pattern =
        '^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$';
      postalCodeInputBilling.current.title =
        'Please, enter your postal code, for example B294HJ';
      postalCodeInputBilling.current.disabled = false;
    } else if (selectBilling.current?.value === 'US') {
      postalCodeInputBilling.current.pattern = '^[0-9]{5}(-[0-9]{4})?$';
      postalCodeInputBilling.current.title =
        'Please, enter your postal code, for example 32344-4444';
      postalCodeInputBilling.current.disabled = false;
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
        <h4 className={'address-title'}>Shipping address</h4>
        <div className={'checkbox-input-wrapper'}>
          <input type="checkbox" />
          <span>{'Set as default address'}</span>
        </div>
        <div className={'address-wrapper'}>
          <select
            className={'form-register__input'}
            id="countrySelectShipping"
            onChange={updateInputPattern}
            ref={selectShipping}
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
                required: true,
              })}
              placeholder="Postal Code"
              type="text"
              disabled
              ref={postalCodeInputShipping}
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
              onChange={updateInputPattern}
              ref={selectBilling}
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
                  required: 'Please, enter your street',
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
                })}
                placeholder="Postal Code"
                type="text"
                disabled
                ref={postalCodeInputBilling}
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
