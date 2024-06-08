import { mainApi } from '../../main/api/mainApi';
import CircularProgress from '@mui/material/CircularProgress';
import { formatProductData, ProductData } from '../utils/helpers';
import { useEffect, useState } from 'react';
import DetailedProductCard from '../components/detailedProductCard/DetailedProductCard';
import { useParams } from 'react-router-dom';
import useApi from '../../../common/hooks/useApi';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const apiCall = useApi();

  useEffect(() => {
    async function getProduct() {
      if (!id) {
        return;
      }

      const response = await apiCall(mainApi.getProductByKey(id));
      return response ? formatProductData(response) : null;
    }

    getProduct().then((product) => {
      if (product) {
        setProduct(product);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product || !id) {
    return (
      <div className="spinner-wrapper">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className="page product-page">
        <DetailedProductCard productData={product} id={id} />
      </div>
    );
  }
};

export default ProductPage;
