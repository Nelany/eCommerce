import { useState } from 'react';
import './Main.scss';
import { getCustomers } from '../../auth/api/auth';
import { useNavigateToMain } from '../../../common/hooks/useNavigateToMain';

function App() {
  const [count, setCount] = useState(0);
  const navigateToMain = useNavigateToMain();
  const onClick = () => {
    navigateToMain();
    getCustomers('johndoe@example.com').then(console.log).catch(console.error);
    // пример создания пользователя:
    // createCustomer({
    //   email: 'sveto4ka@example.com',
    //   firstName: 'Sveto4ka',
    //   lastName: 'Nesterova',
    //   password: 'secret123',
    // })
    // .then((response) => {
    //   console.log('Customer created successfully:', response);
    // })
    // .catch((error) => {
    //   console.error('Error creating customer:', error);
    // });
  };

  return (
    <>
      <h1>COOLSTORE</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <button onClick={onClick}>click me</button>
    </>
  );
}

export default App;
