import './Main.scss';
import { auth } from '../../auth/api/auth';
import useSelectUser from '../../auth/hooks/useSelectUser';
import useDispatchUserId from '../../auth/hooks/useDispatchUserId';
import { mainApi } from '../api/mainApi';
import useApi from '../../../common/hooks/useApi';

function App() {
  const userId = useSelectUser();
  const setUser = useDispatchUserId();
  const apiCall = useApi();

  const getProduct = async () => {
    const product = await apiCall(
      mainApi.getProductByKey('classic-coffee-cup')
    );

    console.log(product);
  };
  const onClick = (userId: string) => {
    // сохраняет пользователя в локалсторэдж и редаксстор:
    setUser(userId);
    // пример получения данных пользователя Джона:
    auth
      .getCustomers('johndoe@example.com')
      .then(console.log)
      .catch(console.error);
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
  const login = () => {
    auth
      .login({ username: 'johndoe@example.com', password: 'secret123' })
      .then(() => {
        setUser(`Collguy ${Math.random()}`);
      })
      .catch(console.warn);
  };

  return (
    <>
      <h1>COOLSTORE</h1>
      <div className="card">
        <button>{userId}</button>
      </div>
      <div className="flex">
        <button onClick={() => onClick(`Collguy ${Math.random()}`)}>
          create User In Localstorage!!!
        </button>
        <button onClick={login}>LOG IN!!!!!!!!!!!!!!!!!!!</button>
        <button onClick={getProduct}>Product</button>
      </div>
    </>
  );
}

export default App;
