// import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import Button from '../button/Button';
import Input from '../input/Input';
import './SignInForm.scss';

const SignInForm = () => {
  // const navigateToMain = useNavigateToMain();
  const onClick = (event: Event) => {
    event?.preventDefault()
    console.log('click');
    // тут проверка, после которой:
    // navigateToMain();
  };
 
  return (
    <div className='pop-up'>
      <h2>Login</h2>
      <form className='auth-form' name='login-form'>
        <Input type='text' name='e-mail' error='e-mail error'/>
        <Input type='password' name='password' error='password error'/>
        <Button type='submit' text='Sign In' callback={onClick}/>
      </form>
    </div>
  );
};

export default SignInForm;
