import './Main.scss';
import { getCustomers } from '../../auth/api/auth';
import useSelectUser from '../../auth/hooks/useSelectUser';
import useDispatchUserId from '../../auth/hooks/useDispatchUserId';

function App() {
  const userId = useSelectUser();
  const setUser = useDispatchUserId();

  const onClick = (userId: string) => {
    // сохраняет пользователя в локалсторэдж и редаксстор:
    setUser(userId);
    // пример получения данных пользователя Джона:
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
        <button
          onClick={
            () => onClick('')
            // еще очистить стор и локалсторэдж от других возможных данных
          }
        >
          {userId}
          (LOG OUT)
        </button>
      </div>
      <button onClick={() => onClick(`Collguy ${Math.random()}`)}>
        create User In Localstorage!!! (LOG IN)
      </button>
    </>
  );
}

export default App;
