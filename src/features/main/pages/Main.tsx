import { useState } from 'react';
import './Main.scss';
import { getCustomers } from '../../auth/api/auth';
import Header from '../../../common/components/header/Header';

function Main() {
  const [count, setCount] = useState(0);
  const onClick = () => {
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
      <Header />
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

export default Main;
