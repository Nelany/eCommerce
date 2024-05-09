import Header from '../../../common/components/header/Header';
import SignUpForm from '../components/signUpForm/SignUpForm';
import './AuthPages.scss';

const SignUp = () => {
  return (
    <div className="page auth-page">
      <Header />
      SignUp
      <SignUpForm />
    </div>
  );
};

export default SignUp;
