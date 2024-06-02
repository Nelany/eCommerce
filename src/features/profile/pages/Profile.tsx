import { Customer } from '@commercetools/platform-sdk';
import { auth } from '../../auth/api/auth';
import './Profile.scss';
import { SetStateAction, useEffect, useState } from 'react';
import useApi from '../../../common/hooks/useApi';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addAddress } from '../../auth/types/app.interface';
import { getApiRoot } from '../../../common/api/sdk';

const Profile = () => {
  const key = localStorage.getItem('userId') as string;
  const [profile, setProfile] = useState<Customer | null>(null);
  const [defaultShippingAddress, setDefaultShippingAddress] =
    useState<string>('');
  const [defaultBillingAddress, setDefaultBillingAddress] =
    useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [billingAddress, setBillingAddress] = useState<string>('');
  const apiCall = useApi();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<addAddress>({ mode: 'onChange' });

  useEffect(() => {
    const getCustomer = async () => {
      const profile = await apiCall(auth.getCustomers(key));
      return profile;
    };
    getCustomer().then((profileData) => {
      if (!profileData) return;
      const userProfile = profileData?.body.results[0];
      setProfile(userProfile);
      const defaultBillingAddress = userProfile.addresses.find(
        (address) => address.id === userProfile.defaultBillingAddressId
      );
      if (defaultBillingAddress) {
        setDefaultBillingAddress(
          `${defaultBillingAddress.country} ${defaultBillingAddress.city} ${defaultBillingAddress.streetName} ${defaultBillingAddress.postalCode}`
        );
      }
      const defaultShippingAddress = userProfile.addresses.find(
        (address) => address.id === userProfile.defaultShippingAddressId
      );
      if (defaultShippingAddress) {
        setDefaultShippingAddress(
          `${defaultShippingAddress.country} ${defaultShippingAddress.city} ${defaultShippingAddress.streetName} ${defaultShippingAddress.postalCode}`
        );
      }
      const billingAddress = userProfile.addresses.find(
        (address) => address.id === userProfile.billingAddressIds?.[0]
      );
      const shippingAddress = userProfile.addresses.find(
        (address) => address.id === userProfile.shippingAddressIds?.[0]
      );
      if (shippingAddress) {
        setShippingAddress(
          `${shippingAddress.country} ${shippingAddress.city} ${shippingAddress.streetName} ${shippingAddress.postalCode}`
        );
      }
      if (billingAddress) {
        setBillingAddress(
          `${billingAddress.country} ${billingAddress.city} ${billingAddress.streetName} ${billingAddress.postalCode}`
        );
      }
    });
  }, []);

  const handleEditClick = () => {
    navigate('/update-profile');
  };

  const handleEditPasswordClick = () => {
    navigate('/update-password');
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    reset();
  };

  const closeModal = () => {
    setModalOpen(false);
    reset();
  };

  const [value, setValueRadio] = useState('1');
  const changeHandler = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setValueRadio(event.target.value);
  };

  const onSubmitAddAddress: SubmitHandler<addAddress> = async (data) => {
    const customerVersion = profile?.version as number;
    const addAddressAction = await getApiRoot()
      .customers()
      .withId({ ID: key })
      .post({
        body: {
          version: customerVersion,
          actions: [
            {
              action: 'addAddress',
              address: {
                streetName: data.streetName,
                postalCode: data.postalCode,
                city: data.city,
                country: data.country,
              },
            },
          ],
        },
      })
      .execute();
    if (addAddressAction && value === '1') {
      const addressId =
        addAddressAction.body.addresses[
          addAddressAction.body.addresses.length - 1
        ].id;
      await getApiRoot()
        .customers()
        .withId({ ID: key })
        .post({
          body: {
            version: addAddressAction.body.version,
            actions: [
              {
                action: 'addShippingAddressId',
                addressId: addressId,
              },
            ],
          },
        })
        .execute();
    } else {
      const addressId =
        addAddressAction.body.addresses[
          addAddressAction.body.addresses.length - 1
        ].id;
      await getApiRoot()
        .customers()
        .withId({ ID: key })
        .post({
          body: {
            version: addAddressAction.body.version,
            actions: [
              {
                action: 'addBillingAddressId',
                addressId: addressId,
              },
            ],
          },
        })
        .execute();
    }
    closeModal();

    //   const addAddressAction: CustomerChangeAddressAction = {
    //     action: 'changeAddress',
    //     address: {
    //       key: 'billing',
    //       streetName: data.billingStreetName,
    //       postalCode: data.shippingPostalCode,
    //       city: data.billingCity,
    //       country: data.billingCountry,
    //     }
    //   };
    //   const response = await apiCall(
    //     getApiRoot()
    //       .customers()
    //       .withId({ ID: key })
    //       .post({
    //         body: {
    //           version: customerVersion,
    //           actions: [addAddressAction]
    //         }
    //       })
    //       .execute()
    //   );
  };

  return (
    <div className="page profile-page">
      <h1>PROFILE</h1>
      <div className="profile-wrapper">
        <div className="buttons-update-wrapper">
          <Button
            variant="contained"
            className="edit-button"
            onClick={handleEditClick}
          >
            Edit profile ✎
          </Button>
          <Button
            variant="contained"
            className="edit-button"
            onClick={handleEditPasswordClick}
          >
            Change password
          </Button>
        </div>
        <div>
          <h2>User info</h2>
          <div className="profile-section">
            <img
              className="profile-icon"
              src="/4092564-about-mobile-ui-profile-ui-user-website_114033.png"
              alt="icon user"
            ></img>
            <span className="user-title">First name:</span>
            <span>{profile?.firstName}</span>
          </div>
          <div className="profile-section">
            <img
              className="profile-icon"
              src="/3643745-human-man-people-person-profile_113435.png"
              alt="icon user"
            ></img>
            <span className="user-title">Last name:</span>
            <span>{profile?.lastName}</span>
          </div>
          <div className="profile-section">
            <img
              className="profile-icon"
              src="/calendar-check_icon-icons.com_56836.png"
              alt="icon calendar"
            ></img>
            <span className="user-title">Date of birth:</span>
            <span>{profile?.dateOfBirth}</span>
          </div>
          <div className="profile-section">
            <img
              className="profile-icon"
              src="/email-outlined-envelope-back-symbol_icon-icons.com_57846.png"
              alt="icon user"
            ></img>
            <span className="user-title">Email:</span>
            <span>{profile?.email}</span>
          </div>
        </div>
        <div>
          <h2>Addresses</h2>
          <div>
            <div className="profile-section">
              <img
                className="profile-icon"
                src="/location_pin_place_map_address_placeholder_route_road_icon_149105.png"
                alt="icon location"
              ></img>
              <span className="user-title">Shipping address:</span>
              <span>{shippingAddress}</span>
            </div>
            <div className="profile-section profile-section_address">
              <span className="user-title">Default shipping address:</span>
              <span>{defaultShippingAddress}</span>
            </div>
          </div>
          <div>
            <div className="profile-section">
              <img
                className="profile-icon"
                src="/location_pin_place_map_address_placeholder_icon_149107.png"
                alt="icon location"
              ></img>
              <span className="user-title">Billing address:</span>
              <span>{billingAddress}</span>
            </div>
            <div className="profile-section">
              <span className="user-title">Default billing address:</span>
              <span>{defaultBillingAddress}</span>
            </div>
            <Button
              variant="contained"
              className="edit-button"
              onClick={openModal}
            >
              Add address
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <form
            className="modal-box"
            onSubmit={handleSubmit(onSubmitAddAddress)}
          >
            <div className="add-address-wrapper">
              <h3>Add address</h3>
              <div className="radio-buttons-wrapper">
                <label>
                  <input
                    type="radio"
                    name="addAddress"
                    value="1"
                    checked={value === '1' ? true : false}
                    onChange={changeHandler}
                  />
                  Shipping address
                </label>
                <label>
                  <input
                    type="radio"
                    name="addAddress"
                    value="2"
                    checked={value === '2' ? true : false}
                    onChange={changeHandler}
                  />
                  Billing address
                </label>
              </div>
              <div className={'address-input-wrapper'}>
                <select
                  className={'edit-form__input'}
                  defaultValue={'Select country'}
                  {...register('country', {
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
                {errors.country && (
                  <span className="error-validation">
                    {errors.country.message}
                  </span>
                )}
              </div>
              <div className={'address-input-wrapper'}>
                <input
                  className={'edit-form__input'}
                  id="cityShipping"
                  {...register('city', {
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
                {errors.city && (
                  <span className="error-validation">
                    {errors.city.message}
                  </span>
                )}
              </div>
              <div className={'address-input-wrapper'}>
                <input
                  className={'edit-form__input'}
                  id="streetShipping"
                  {...register('streetName', {
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
                {errors.streetName && (
                  <span className="error-validation">
                    {errors.streetName.message}
                  </span>
                )}
              </div>
              <div className={'address-input-wrapper'}>
                <input
                  className={'edit-form__input'}
                  {...register('postalCode', {
                    required: true,
                    validate: {
                      GBOrUS: (value) => {
                        if (getValues().country === 'US') {
                          return /^[0-9]{5}(-[0-9]{4})?$/.test(value);
                        }
                        if (getValues().country === 'GB') {
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
                {errors.postalCode && (
                  <span className="error-validation">
                    {
                      'Please, enter your postal code, for example B294HJ for United Kingdom or 32344-4444 for United States'
                    }
                  </span>
                )}
              </div>
            </div>
            <Button variant="contained" className="edit-button" type="submit">
              SAVE
            </Button>
            <Button
              variant="contained"
              className="edit-button"
              onClick={closeModal}
            >
              CANCEL
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
