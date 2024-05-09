import Header from '../../../common/components/header/Header';
import SignInForm from '../components/signInForm/SignInForm';
import './AuthPages.scss';

const SignIn = () => {
  return (
    <div className="page auth-page">
      <Header />
      SignIn
      <SignInForm />
    </div>
  );
};

export default SignIn;
