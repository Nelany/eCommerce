import { BasicBreadcrumbs } from '../breadcrumbs/Breadcrumbs';
import { Drawer } from '../drawer/Drawer';
import './SearchBar.scss';

export const SearchBar = () => {
  return (
    <>
      <div className="catalog-search-bar">
        <Drawer />
      </div>
      <div className="catalog-breadcrumbs">
        <BasicBreadcrumbs />
      </div>
    </>
  );
};
