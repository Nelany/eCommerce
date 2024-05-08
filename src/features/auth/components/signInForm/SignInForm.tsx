// import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const PopUp = styled('main')({
  width: 400,
  height: 'max-content',

  display: 'flex',
  flexDirection: 'column',
  gap: 10,

  padding: 8,
  borderRadius: 4,
})

const LoginForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 'inherit'
})

const LoginTitle = styled('h2')({
  fontSize: 24,
})
const SignInForm = () => {
  // const navigateToMain = useNavigateToMain();
  const checkForm = () => {
    console.log('click');
    // тут проверка, после которой:
    // navigateToMain();
  };

  return (
    <PopUp>
      <LoginTitle>Sign in </LoginTitle>
       <LoginForm>
        <TextField autoFocus id='e-mail' label='E-mail:' type='text'/>
        <TextField  id='password' label='Password:' type='password'/>
        <Button type='button' variant="contained" onClick={checkForm}> Sign In </Button>
      </LoginForm>
    </PopUp>
  )

};

export default SignInForm;
