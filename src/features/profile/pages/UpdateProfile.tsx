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
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const key = localStorage.getItem('userId') as string;
  const apiCall = useApi();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Customer | null>(null);

  useEffect(() => {
    const getCustomer = async () => {
      const profile = await apiCall(auth.getCustomers(key));
      return profile;
    };
    getCustomer().then((profileData) => {
      if (!profileData) return;
      const userProfile = profileData?.body.results[0];
      setProfile(userProfile);
    });
  }, []);

  const [firstName, setFirstName] = useState(profile?.firstName);
  const [lastName, setLastName] = useState(profile?.lastName);
  const [birthDate, setBirthDate] = useState(profile?.dateOfBirth);
  const setToast = useDispatchToast();

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
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-form-wrapper">
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
    </div>
  );
};

export default UpdateProfile;
