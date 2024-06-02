import { useForm } from 'react-hook-form';
import { SetSearchValue } from '../../types/catalogTypes';
import './SearchInput.scss';

type FormInput = {
  searchValue: string;
};

function SearchInput(props: SetSearchValue) {
  const { register, getValues } = useForm<FormInput>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = getValues('searchValue');
        props.changeSearchInput(value);
      }}
    >
      <input placeholder="Search ..." {...register('searchValue')} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchInput;
