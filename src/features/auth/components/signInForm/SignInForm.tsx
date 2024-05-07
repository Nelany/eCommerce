import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import './SignInForm.scss';

const SignInForm = () => {
  const navigateToMain = useNavigateToMain();
  const onClick = () => {
    // тут проверка, после которой:
    navigateToMain();
  };
  return (
    <div>
      SignInForm
      <button onClick={onClick}>Sign In</button>
    </div>
  );
};

export default SignInForm;
