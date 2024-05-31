import { catalogApi } from '../api/catalogApi';
import useApi from '../../../common/hooks/useApi';
import { useEffect, useState } from 'react';
import type { Product } from '@commercetools/platform-sdk';
import ProductCard from '../components/productCard/ProductCard';
import './Catalog.scss';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Category } from '../types/catalogTypes';
import useDispatchCategories from '../hooks/useDispatchCategories';

const Catalog = () => {
  const apiCall = useApi();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { dispatchSetCategories } = useDispatchCategories();

  useEffect(() => {
    const getCategories = async () => {
      const categoriesResponse = await apiCall(catalogApi.getCategories({}));
      // console.log(categoriesResponse);
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
          setCategories(menuCategories);
          dispatchSetCategories(menuCategories);
          // console.warn(menuCategories);
        }
      }
    });

    const getProducts = async () => {
      const productsResponse = await apiCall(
        catalogApi.getProducts({ limit: 51 })
      );
      return productsResponse;
    };
    getProducts().then((productsResponse) => {
      if (productsResponse?.body.results)
        setProducts(productsResponse?.body.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page catalog-page">
      <h6>{String(categories)}</h6>
      <SearchBar />;
      <div className="cards-container">
        {products?.map((product, index) => {
          return (
            <ProductCard
              genieName={product.masterData.current.name['en-GB']}
              price={String(
                product.masterData.current.masterVariant.prices?.length
                  ? product.masterData.current.masterVariant.prices[0]?.value
                      .centAmount
                  : ''
              )}
              description={
                product.masterData.current.description
                  ? product.masterData.current.description['en-GB']
                  : ''
              }
              key={String(index)}
              productKey={product.masterData.current.masterVariant.key || ''}
              imgSrc={
                product.masterData.current.masterVariant.images?.[0]?.url || ''
              }
              discounted={
                (product.masterData.current.masterVariant.prices &&
                product.masterData.current.masterVariant.prices[0]?.discounted
                  ? String(
                      product.masterData.current.masterVariant.prices[0]
                        .discounted.value.centAmount
                    )
                  : undefined) || ''
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
