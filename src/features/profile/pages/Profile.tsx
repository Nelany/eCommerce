import {
  Customer,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerSetDateOfBirthAction,
} from '@commercetools/platform-sdk';
import { auth } from '../../auth/api/auth';
import './Profile.scss';
import { useEffect, useState } from 'react';
import useApi from '../../../common/hooks/useApi';
import { getApiRoot } from '../../../common/api/sdk';
import { Button } from '@mui/material';
import useDispatchToast from '../../../common/hooks/useDispatchToast';

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

  const [editing, setEditing] = useState<boolean>(false);
  const [firstName, setFirstName] = useState(profile?.firstName);
  const [lastName, setLastName] = useState(profile?.lastName);
  const [birthDate, setBirthDate] = useState(profile?.dateOfBirth);
  const setToast = useDispatchToast();

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleNameChange = async (
    newFirstName: string | undefined,
    newLastName: string | undefined,
    newBirthDate: string | undefined
  ) => {
    const customerVersion = profile?.version as number;
    const changeNameAction: CustomerSetFirstNameAction = {
      action: 'setFirstName',
      firstName: newFirstName || profile?.firstName,
    };

    const changeLastNameAction: CustomerSetLastNameAction = {
      action: 'setLastName',
      lastName: newLastName || profile?.lastName,
    };

    const changeBirthDateAction: CustomerSetDateOfBirthAction = {
      action: 'setDateOfBirth',
      dateOfBirth: newBirthDate || profile?.dateOfBirth,
    };

    const response = await apiCall(
      getApiRoot()
        .customers()
        .withId({ ID: key })
        .post({
          body: {
            version: customerVersion,
            actions: [
              changeNameAction,
              changeLastNameAction,
              changeBirthDateAction,
            ],
          },
        })
        .execute()
    );
    setEditing(false);
    if (response) {
      setToast({
        message: 'The data has been successfully updated',
        type: 'success',
        isToastOpen: true,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleNameChange(firstName, lastName, birthDate);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="page profile-page">
      <h1>PROFILE</h1>
      {editing ? (
        <form className="edit-form" onSubmit={handleSubmit}>
          <label className="edit-form__label">
            First name:
            <input
              className="edit-form__input"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="edit-form__label">
            Last name:
            <input
              className="edit-form__input"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label className="edit-form__label">
            Date of Birth:
            <input
              className="edit-form__input"
              type="date"
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </label>
          <Button className="edit-button" variant="contained" type="submit">
            Save
          </Button>
          <Button
            className="edit-button"
            variant="contained"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <div className="profile-wrapper">
          <div>
            <Button
              variant="contained"
              className="edit-button"
              onClick={handleEditClick}
            >
              Edit profile ✎
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
              <span>{firstName || profile?.firstName}</span>
            </div>
            <div className="profile-section">
              <img
                className="profile-icon"
                src="/3643745-human-man-people-person-profile_113435.png"
                alt="icon user"
              ></img>
              <span className="user-title">Last name:</span>
              <span>{lastName || profile?.lastName}</span>
            </div>
            <div className="profile-section">
              <img
                className="profile-icon"
                src="/calendar-check_icon-icons.com_56836.png"
                alt="icon calendar"
              ></img>
              <span className="user-title">Date of birth:</span>
              <span>{birthDate || profile?.dateOfBirth}</span>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
