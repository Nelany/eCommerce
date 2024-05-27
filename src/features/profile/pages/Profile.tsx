import { Customer } from '@commercetools/platform-sdk';
import { auth } from '../../auth/api/auth';
import './Profile.scss';
import { useEffect, useState } from 'react';
import useApi from '../../../common/hooks/useApi';

const Profile = () => {
  const key = localStorage.getItem('userId');
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
      console.log(profileData);
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

  if (!profile) {
    return <h1>Profile Not Found</h1>;
  }

  return (
    <div className="page profile-page">
      <h1>PROFILE</h1>
      <div className="profile-wrapper">
        <div>
          <h2>User info</h2>
          <div className="profile-section">
            <img
              className="profile-icon"
              src="src\assets\profile-page-icons\4092564-about-mobile-ui-profile-ui-user-website_114033.png"
              alt="icon user"
            ></img>
            <span className="user-title">First name:</span>
            <span>{profile?.firstName}</span>
          </div>
          <div className="profile-section">
            <img
              className="profile-icon"
              src="src\assets\profile-page-icons\3643745-human-man-people-person-profile_113435.png"
              alt="icon user"
            ></img>
            <span className="user-title">Last name:</span>
            <span>{profile?.lastName}</span>
          </div>
          <div className="profile-section">
            <img
              className="profile-icon"
              src="src\assets\profile-page-icons\calendar-check_icon-icons.com_56836.png"
              alt="icon calendar"
            ></img>
            <span className="user-title">Date of birth:</span>
            <span>{profile?.dateOfBirth}</span>
          </div>
        </div>
        <div>
          <h2>Addresses</h2>
          <div>
            <div className="profile-section">
              <img
                className="profile-icon"
                src="src\assets\profile-page-icons\location_pin_place_map_address_placeholder_route_road_icon_149105.png"
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
                src="src\assets\profile-page-icons\location_pin_place_map_address_placeholder_icon_149107.png"
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
    </div>
  );
};

export default Profile;
