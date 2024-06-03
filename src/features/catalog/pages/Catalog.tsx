import { catalogApi, getProductsArgs } from '../api/catalogApi';
import useApi from '../../../common/hooks/useApi';
import { useEffect, useState } from 'react';
import type { ProductProjection } from '@commercetools/platform-sdk';
import ProductCard from '../components/productCard/ProductCard';
import './Catalog.scss';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Category } from '../types/catalogTypes';
import useDispatchCategories from '../hooks/useDispatchCategories';
import { useSelectSort } from '../hooks/useSelectSort';
import { useParams } from 'react-router-dom';
import useSelectCategories from '../hooks/useSelectCategories';
import { findCategoryIdByName } from '../utils/helpers';
import { useSelectFilter } from '../hooks/useSelectFilter';

const Catalog = () => {
  const apiCall = useApi();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const { dispatchSetCategories } = useDispatchCategories();
  const sort = useSelectSort();
  const { id, subId } = useParams();
  const categories = useSelectCategories();

  const [searchValue, setSearchValue] = useState('');
  const filter = useSelectFilter();

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
    console.warn(filter);
    const getProducts = async () => {
      const params: getProductsArgs = {};
      params.text = searchValue;

      if (id || subId) {
        const currentName: string = (subId || id) as string;
        const currentId = findCategoryIdByName(categories, currentName);

        if (currentId) {
          params.categoryId = currentId;
        }
      }
      if (sort) {
        params.sort = sort;
      }
      params.filters = filter;

      const productsResponse = await apiCall(catalogApi.getProducts(params));
      return productsResponse;
    };
    getProducts().then((productsResponse) => {
      console.log(productsResponse);
      if (productsResponse?.body.results)
        setProducts(productsResponse?.body.results);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, subId, categories, sort, searchValue, filter]);

  return (
    <div className="page catalog-page">
      <SearchBar changeSearchInput={setSearchValue} />

      {products.length > 0 ? (
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
