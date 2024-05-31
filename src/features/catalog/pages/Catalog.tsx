import { catalogApi } from '../api/catalogApi';
import useApi from '../../../common/hooks/useApi';
import { useEffect, useState } from 'react';
import type { Product } from '@commercetools/platform-sdk';
import ProductCard from '../components/productCard/ProductCard';
import './Catalog.scss';

const Catalog = () => {
  const apiCall = useApi();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await apiCall(catalogApi.getProducts({ limit: 28 }));
      console.log(products);
      return products;
    };
    getProducts().then((products) => {
      if (products?.body.results) setProducts(products?.body.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page catalog-page">
      <h1>CATALOG</h1>

      <div className="cards-container">
        {products?.map((product, index) => {
          console.log(product.masterData.current.masterVariant.prices);
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
