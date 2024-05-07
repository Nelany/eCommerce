import { useNavigateToMain } from '../../../../common/hooks/useNavigateToMain';
import './SignUpForm.scss';

const SignUpForm = () => {
  const navigateToMain = useNavigateToMain();
  const onClick = () => {
    // тут проверка, после которой:
    navigateToMain();
  };
  return (
    <div>
      SignUpForm
      <button onClick={onClick}>Sign Up</button>
    </div>
  );
};

export default SignUpForm;
