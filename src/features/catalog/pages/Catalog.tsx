import { Link } from 'react-router-dom';
import { catalogApi } from '../api/catalogApi';
import useApi from '../../../common/hooks/useApi';
import { useEffect, useState } from 'react';
import type { Product } from '@commercetools/platform-sdk';
import ProductCard from '../../auth/components/card/ProductCard';
import './Catalog.scss';

const Catalog = () => {
  const apiCall = useApi();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await apiCall(catalogApi.getProducts({ limit: 10 }));
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
      <Link to={'COOL-ID'}>COOL-PRODUCT</Link>
      {products?.map((product) => {
        // return <h2>name: {product.masterData.current.name['en-GB']}</h2>;
        console.log(product.masterData.current.name['en-GB']);
        return undefined;
      })}
      <div className="cards-container">
        {products?.map((product, index) => {
          console.log(product.masterData.current);
          return (
            <ProductCard
              genieName={product.masterData.current.name['en-GB']}
              price={
                String(
                  product.masterData.current.masterVariant.prices
                    ? product.masterData.current.masterVariant.prices[0].value
                        .centAmount
                    : 1000000
                ) + ' $'
              }
              description={
                product.masterData.current.description
                  ? product.masterData.current.description['en-GB']
                  : 'The beast Genie'
              }
              key={String(index)}
              productKey={product.masterData.current.masterVariant.key || ''}
              imgSrc={
                product.masterData.current.masterVariant.images?.[0]?.url || ''
              }
              // "https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/3-ZOznFeM5.jpg"
              // {product.masterData.current.masterVariant.images[0].url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
