import { useForm } from 'react-hook-form';
import { SetSearchValue } from '../../types/catalogTypes';
import './SearchInput.scss';
import { useSearchParams } from 'react-router-dom';

type FormInput = {
  searchValue: string;
};

function SearchInput(props: SetSearchValue) {
  const { register, getValues, reset } = useForm<FormInput>();
  const setPage = useSearchParams()[1];

  function resetForm() {
    props.changeSearchInput('');
    reset();
  }

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        setPage({});
        const value = getValues('searchValue');
        props.changeSearchInput(value);
      }}
    >
      <input
        className="search-input"
        placeholder="Search ..."
        {...register('searchValue')}
      />

      <button
        type="button"
        className="search-button reset"
        onClick={resetForm}
      />
      <button type="submit" className="search-button search" />
    </form>
  );
}

export default SearchInput;
