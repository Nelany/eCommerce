import { SetSearchValue } from '../../types/catalogTypes';
import { BasicBreadcrumbs } from '../breadcrumbs/Breadcrumbs';
import { Drawer } from '../drawer/Drawer';
import SearchInput from '../searchInput/SearchInput';
import { SortSelect } from '../sortSelect/SortSelect';
import './SearchBar.scss';

export const SearchBar = (props: SetSearchValue) => {
  return (
    <>
      <div className="catalog-search-bar">
        <Drawer />
        <SearchInput changeSearchInput={props.changeSearchInput} />
        <SortSelect />
      </div>
      <div className="catalog-breadcrumbs">
        <BasicBreadcrumbs />
      </div>
    </>
  );
};
