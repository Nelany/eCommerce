import { Customer } from '@commercetools/platform-sdk';
import { auth } from '../../auth/api/auth';
import './Profile.scss';
import { SetStateAction, useEffect, useState } from 'react';
import useApi from '../../../common/hooks/useApi';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddressResponse, addAddress } from '../../auth/types/app.interface';
import { getApiRoot } from '../../../common/api/sdk';

const Profile = () => {
  const key = localStorage.getItem('userId') as string;
  const [profile, setProfile] = useState<Customer | null>(null);
  const [defaultShippingAddress, setDefaultShippingAddress] =
    useState<string>('');
  const [defaultBillingAddress, setDefaultBillingAddress] =
    useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<AddressResponse[]>([]);
  const [billingAddress, setBillingAddress] = useState<AddressResponse[]>([]);
  const [keyForReload, setKeyforReload] = useState(0);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressResponse | null>(null);
  const apiCall = useApi();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<addAddress>({ mode: 'onChange' });

  const reload = () => {
    setKeyforReload(keyForReload + 1);
  };

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
      const addressesId = userProfile.addresses.map((item) => item.id);
      const billingAddressId = addressesId.filter((value) =>
        userProfile.billingAddressIds?.includes(value as string)
      );
      const billingAddress = userProfile.addresses.filter((value) =>
        billingAddressId.includes(value.id as string)
      );
      const shippingAddressId = addressesId.filter((value) =>
        userProfile.shippingAddressIds?.includes(value as string)
      );
      const shippingAddress = userProfile.addresses.filter((value) =>
        shippingAddressId.includes(value.id as string)
      );
      if (shippingAddress) {
        setShippingAddress(shippingAddress);
      }
      if (billingAddress) {
        setBillingAddress(billingAddress);
      }
    });
  }, [keyForReload, defaultShippingAddress, defaultBillingAddress]);

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
  const customerVersion = profile?.version as number;

  const onSubmitAddAddress: SubmitHandler<addAddress> = async (data) => {
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

    const addressId =
      addAddressAction.body.addresses[
        addAddressAction.body.addresses.length - 1
      ].id;

    let addressTypeResponse;
    if (addAddressAction && value === '1') {
      addressTypeResponse = await getApiRoot()
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
      addressTypeResponse = await getApiRoot()
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

    if (addressTypeResponse) {
      reload();
    }
    closeModal();
  };

  const handleRemoveAddress = async (addressId: string) => {
    const addAddressDelete = await apiCall(
      getApiRoot()
        .customers()
        .withId({ ID: key })
        .post({
          body: {
            version: customerVersion,
            actions: [
              {
                action: 'removeAddress',
                addressId: `${addressId}`,
              },
            ],
          },
        })
        .execute()
    );
    if (addAddressDelete) {
      setDefaultShippingAddress(defaultShippingAddress || '');
      setDefaultBillingAddress(defaultBillingAddress || '');
      reload();
    }
  };

  const handleShippingDefaultAddress = async (addressId: string) => {
    const addShippingDefaultAddress = await apiCall(
      getApiRoot()
        .customers()
        .withId({ ID: key })
        .post({
          body: {
            version: customerVersion,
            actions: [
              {
                action: 'setDefaultShippingAddress',
                addressId: `${addressId}`,
              },
            ],
          },
        })
        .execute()
    );
    if (addShippingDefaultAddress) {
      setDefaultShippingAddress(defaultShippingAddress || '');
      reload();
    }
  };

  const handleBillingDefaultAddress = async (addressId: string) => {
    const addShippingDefaultAddress = await apiCall(
      getApiRoot()
        .customers()
        .withId({ ID: key })
        .post({
          body: {
            version: customerVersion,
            actions: [
              {
                action: 'setDefaultBillingAddress',
                addressId: `${addressId}`,
              },
            ],
          },
        })
        .execute()
    );
    if (addShippingDefaultAddress) {
      setDefaultBillingAddress(defaultBillingAddress || '');
      reload();
    }
  };

  type AddressEditFormProps = {
    address: AddressResponse;
    onAddressUpdate: (updatedAddress: AddressResponse) => void;
  };

  const handleEditAddressClick = (address: AddressResponse) => {
    setSelectedAddress(address);
  };

  const handleAddressUpdate = async (updatedAddress: AddressResponse) => {
    const updateAddress = await apiCall(
      getApiRoot()
        .customers()
        .withId({ ID: key })
        .post({
          body: {
            version: customerVersion,
            actions: [
              {
                action: 'changeAddress',
                addressId: updatedAddress.id,
                address: {
                  country: updatedAddress.country as string,
                  city: updatedAddress.city as string,
                  streetName: updatedAddress.streetName as string,
                  postalCode: updatedAddress.postalCode as string,
                },
              },
            ],
          },
        })
        .execute()
    );
    if (updateAddress) {
      setDefaultBillingAddress(defaultBillingAddress || '');
      setDefaultShippingAddress(defaultShippingAddress || '');
      reload();
    }
  };

  const AddressEditForm: React.FC<AddressEditFormProps> = ({
    address,
    onAddressUpdate,
  }) => {
    const {
      register,
      handleSubmit,
      reset,
      getValues,
      formState: { errors },
    } = useForm({
      defaultValues: address,
    });

    const onSubmit = (data: AddressResponse) => {
      onAddressUpdate(data);
      setSelectedAddress(null);
      reset();
    };

    const cancel = () => {
      setSelectedAddress(null);
      reset();
    };

    return (
      <div className="modal-overlay">
        <form className="modal-box-edit" onSubmit={handleSubmit(onSubmit)}>
          <h2>Edit address</h2>
          <div className={'address-input-wrapper'}>
            <select
              className={'edit-form__input'}
              {...register('country', {
                pattern: {
                  value: /GB|US/,
                  message: 'Must be US or GB',
                },
              })}
            >
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
            </select>
            {errors.country && (
              <span className="error-validation">{errors.country.message}</span>
            )}
          </div>
          <div className={'address-input-wrapper'}>
            <input
              className={'edit-form__input'}
              {...register('city', {
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
              <span className="error-validation">{errors.city.message}</span>
            )}
          </div>
          <div className={'address-input-wrapper'}>
            <input
              className={'edit-form__input'}
              {...register('streetName', {
                minLength: 1,
                pattern: {
                  value: /^\S+$/,
                  message: 'Please, enter your street',
                },
              })}
              placeholder="Street Name"
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
                validate: {
                  GBOrUS: (value) => {
                    if (getValues().country === 'US') {
                      return /^[0-9]{5}(-[0-9]{4})?$/.test(value as string);
                    }
                    if (getValues().country === 'GB') {
                      return /^(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/.test(
                        value as string
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
          <Button variant="contained" className="edit-button" type="submit">
            SAVE
          </Button>
          <Button variant="contained" className="edit-button" onClick={cancel}>
            CANCEL
          </Button>
        </form>
      </div>
    );
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
            <div className="profile-section address-wrapper">
              <div className="address-title-wrapper">
                <img
                  className="profile-icon"
                  src="/location_pin_place_map_address_placeholder_route_road_icon_149105.png"
                  alt="icon location"
                ></img>
                <span className="user-title">Shipping addresses:</span>
              </div>
              <div className="address-list-wrapper">
                {shippingAddress.map((address, index) => (
                  <div className="address-list-wrapper__address" key={index}>
                    <div className="address">
                      <span>{address.country}</span>
                      <span>{address.city}</span>
                      <span>{address.streetName}</span>
                      <span>{address.postalCode}</span>
                    </div>
                    <div className="edit-address-buttons-wrapper">
                      <div
                        className="edit-address-icon"
                        onClick={() => handleEditAddressClick(address)}
                      >
                        ✎
                      </div>
                      <div
                        className="edit-address-icon"
                        onClick={() =>
                          handleRemoveAddress(address.id as string)
                        }
                      >
                        ❌
                      </div>
                      <div
                        className="edit-address-button"
                        onClick={() =>
                          handleShippingDefaultAddress(address.id as string)
                        }
                      >
                        {' '}
                        SAVE TO DEFAULT
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="profile-section profile-section_address">
              <span className="user-title">Default shipping address:</span>
              <span>{defaultShippingAddress}</span>
            </div>
          </div>
          <div>
            <div className="profile-section address-wrapper">
              <div className="address-title-wrapper">
                <img
                  className="profile-icon"
                  src="/location_pin_place_map_address_placeholder_icon_149107.png"
                  alt="icon location"
                ></img>
                <span className="user-title">Billing addresses:</span>
              </div>
              <div className="address-list-wrapper">
                {billingAddress.map((address, index) => (
                  <div className="address-list-wrapper__address" key={index}>
                    <div className="address">
                      <span>{address.country}</span>
                      <span>{address.city}</span>
                      <span>{address.streetName}</span>
                      <span>{address.postalCode}</span>
                    </div>
                    <div className="edit-address-buttons-wrapper">
                      <div
                        className="edit-address-icon"
                        onClick={() => handleEditAddressClick(address)}
                      >
                        ✎
                      </div>
                      <div
                        className="edit-address-icon"
                        onClick={() =>
                          handleRemoveAddress(address.id as string)
                        }
                      >
                        ❌
                      </div>
                      <div
                        className="edit-address-button"
                        onClick={() =>
                          handleBillingDefaultAddress(address.id as string)
                        }
                      >
                        {' '}
                        SAVE TO DEFAULT
                      </div>
                    </div>
                  </div>
                ))}
                {selectedAddress && (
                  <AddressEditForm
                    address={selectedAddress}
                    onAddressUpdate={handleAddressUpdate}
                  />
                )}
              </div>
            </div>
            <div className="profile-section profile-section_address">
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
