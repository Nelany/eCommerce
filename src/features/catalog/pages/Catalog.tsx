import { Link } from 'react-router-dom';
import { catalogApi } from '../api/catalogApi';
import useApi from '../../../common/hooks/useApi';
import { useEffect, useState } from 'react';
import type { Product } from '@commercetools/platform-sdk';
import ProductCard from '../../auth/components/card/ProductCard';
import './Catalog.scss';

const Catalog = () => {
  const apiCall = useApi();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const getProducts = async () => {
      const products = await apiCall(catalogApi.getProducts({ limit: 12 }));
      console.log(products);
      return products;
    };
    getProducts().then((products) => setProducts(products?.body.results));
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Catalog;
