import { catalogApi, getProductsQueryArgs } from '../api/catalogApi';
import useApi from '../../../common/hooks/useApi';
import { useEffect, useState } from 'react';
import type { ProductProjection } from '@commercetools/platform-sdk';
import ProductCard from '../components/productCard/ProductCard';
import './Catalog.scss';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Category } from '../types/catalogTypes';
import useDispatchCategories from '../hooks/useDispatchCategories';
// import { useSelectSelectedCategory } from '../hooks/useSelectSelectedCategory';
import { useSelectSort } from '../hooks/useSelectSort';
import { useParams } from 'react-router-dom';
import useSelectCategories from '../hooks/useSelectCategories';
import { findCategoryIdByName } from '../utils/helpers';
import CircularProgress from '@mui/material/CircularProgress';

const Catalog = () => {
  const apiCall = useApi();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const { dispatchSetCategories } = useDispatchCategories();
  // const selectedCategoryId = useSelectSelectedCategory();
  const sort = useSelectSort();
  const { id, subId } = useParams();
  const categories = useSelectCategories();

  const [searchValue, setSearchValue] = useState('');
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesResponse = await apiCall(catalogApi.getCategories({}));
      return categoriesResponse;
    };
    getCategories().then((categoriesResponse) => {
      if (categoriesResponse?.body.results) {
        const menuCategories = categoriesResponse?.body.results.reduce(
          (acc, category) => {
            if (!category.parent) {
              acc.push({
                id: category.id,
                name: category.name['en-GB'],
                children: [],
              });
            } else {
              const parentIndex = acc.findIndex(
                (el) => el.id === category.parent?.id
              );
              acc[parentIndex].children?.push({
                id: category.id,
                name: category.name['en-GB'],
              });
            }

            return acc;
          },
          [] as Category[]
        );
        if (menuCategories.length) {
          dispatchSetCategories(menuCategories);
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSpinner(true);

    const getProducts = async () => {
      const params: getProductsQueryArgs = {};
      params.text = searchValue;

      if (id || subId) {
        const currentName: string = (subId || id) as string;
        const currentId = findCategoryIdByName(categories, currentName);

        if (currentId) {
          params.categoryId = currentId;
        }
      }
      console.warn(sort);

      if (sort) {
        params.sort = sort;
      }

      const productsResponse = await apiCall(catalogApi.getProducts(params));
      return productsResponse;
    };
    getProducts().then((productsResponse) => {
      if (productsResponse?.body.results) {
        setSpinner(false);
        setProducts(productsResponse?.body.results);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, subId, categories, sort, searchValue]);

  return (
    <div className="page catalog-page">
      <SearchBar changeSearchInput={setSearchValue} />

      {spinner ? (
        <div className="spinner-wrapper">
          <CircularProgress />
        </div>
      ) : products.length > 0 ? (
        <div className="cards-container">
          {products?.map((product, index) => {
            return (
              <ProductCard
                genieName={product.name['en-GB']}
                price={String(
                  product.masterVariant.prices?.length
                    ? product.masterVariant.prices[0]?.value.centAmount
                    : ''
                )}
                description={
                  product.description ? product.description['en-GB'] : ''
                }
                key={String(index)}
                productKey={product.masterVariant.key || ''}
                imgSrc={product.masterVariant.images?.[0]?.url || ''}
                discounted={
                  (product.masterVariant.prices &&
                  product.masterVariant.prices[0]?.discounted
                    ? String(
                        product.masterVariant.prices[0].discounted.value
                          .centAmount
                      )
                    : undefined) || ''
                }
              />
            );
          })}
        </div>
      ) : (
        <div>Ooops.... Nothing was found </div>
      )}
    </div>
  );
};

export default Catalog;
