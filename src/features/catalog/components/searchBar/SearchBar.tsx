import { BasicBreadcrumbs } from '../breadcrumbs/Breadcrumbs';
import { Drawer } from '../drawer/Drawer';
import { SortSelect } from '../sortSelect/SortSelect';
import './SearchBar.scss';

export const SearchBar = () => {
  return (
    <>
      <div className="catalog-search-bar">
        <Drawer />
        <SortSelect />
      </div>
      <div className="catalog-breadcrumbs">
        <BasicBreadcrumbs />
      </div>
    </>
  );
};
