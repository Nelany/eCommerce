import { Customer } from '@commercetools/platform-sdk';
import { auth } from '../../auth/api/auth';
import './Profile.scss';
import { useEffect, useState } from 'react';

const Profile = () => {
  const key = localStorage.getItem('userId');
  const [profile, setProfile] = useState<Customer | null>(null);

  useEffect(() => {
    const getCustomer = async () => {
      const profile = await auth.getCustomers(key);
      return profile;
    };
    getCustomer().then((profile) =>
      setProfile(profile.body.results[0] as unknown as Customer)
    );
  }, []);

  let defaultShippingAddress;
  if (profile?.defaultShippingAddressId === profile?.addresses[0].id) {
    defaultShippingAddress = `${profile?.addresses[0].country} ${profile?.addresses[0].city} ${profile?.addresses[0].streetName} ${profile?.addresses[0].postalCode}`;
  }

  let defaultBillingAddress;
  if (profile?.defaultBillingAddressId === profile?.addresses[1].id) {
    defaultBillingAddress = `${profile?.addresses[1].country} ${profile?.addresses[1].city} ${profile?.addresses[1].streetName} ${profile?.addresses[1].postalCode}`;
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
              <span>
                {profile?.addresses[0].country} {profile?.addresses[0].city}{' '}
                {profile?.addresses[0].streetName}{' '}
                {profile?.addresses[0].postalCode}
              </span>
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
              <span>
                {profile?.addresses[1].country} {profile?.addresses[1].city}{' '}
                {profile?.addresses[1].streetName}{' '}
                {profile?.addresses[1].postalCode}
              </span>
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
