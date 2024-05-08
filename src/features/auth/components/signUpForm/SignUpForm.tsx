import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import './SignUpForm.scss';
import { TextField, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const countries = [
  {
    value: 'GB',
    label: 'United Kingdom',
  },
  {
    value: 'US',
    label: 'United States',
  },
];

const SignUpForm = () => {
  const navigateToMain = useNavigateToMain();
  // const onClick = () => {
  //   // тут проверка, после которой:
  //   navigateToMain();
  // };

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigateToMain();
  }

  return (
    <React.Fragment>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row">
          <TextField
            label="First name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mt: 2 }}
            fullWidth
          />
          <TextField
            label="Last name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            sx={{ mt: 2 }}
            fullWidth
          />
        </Stack>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mt: 2 }}
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mt: 2 }}
          fullWidth
          autoComplete="current-password"
        />
        <TextField
          label="Date of Birth"
          variant="outlined"
          type="text"
          value={dateOfBirth}
          onChange={(e) => setdateOfBirth(e.target.value)}
          required
          sx={{ mt: 2 }}
          fullWidth
        />
        <Stack spacing={2} direction="row" sx={{ marginBottom: 2, marginTop: 2 }}>
          <TextField
            variant="outlined"
            type="text"
            select
            sx={{ mt: 2 }}
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            SelectProps={{
              native: true,
            }}
            >
            {countries.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            label="City"
            variant="outlined"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            sx={{ mt: 2 }}
            fullWidth
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
          <TextField
            label="Postal code"
            variant="outlined"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            sx={{ mt: 2 }}
            fullWidth
          />
          <TextField
            label="Street"
            variant="outlined"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            sx={{ mt: 2 }}
            fullWidth
          />
        </Stack>
        <Button variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
      </form>
      <small>
        Already have an account? <Link to="/sign-in">Login Here</Link>
      </small>
    </React.Fragment>
  );
  // return (
  //   <div>
  //     SignUpForm
  //     <button onClick={onClick}>Sign Up</button>
  //   </div>
  // );
};

export default SignUpForm;
