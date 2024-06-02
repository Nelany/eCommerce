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
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        const value = getValues('searchValue');
        props.changeSearchInput(value);
      }}
    >
      <input
        className="search-input"
        placeholder="Search ..."
        {...register('searchValue')}
      />
      <button type="submit" className="search-button" />
    </form>
  );
}

export default SearchInput;
