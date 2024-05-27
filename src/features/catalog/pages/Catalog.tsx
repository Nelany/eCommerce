import { Link } from 'react-router-dom';
import { catalogApi } from '../api/catalogApi';
import useApi from '../../../common/hooks/useApi';
import { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';

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
      {products?.map((product, index) => {
        return (
          <h2 key={index}>name: {product.masterData.current.name['en-GB']}</h2>
        );
      })}
    </div>
  );
};

export default Catalog;
