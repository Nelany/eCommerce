import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();

  return (
    <div className="page product-page">
      <h1>PRODUCT</h1>
      <h2>{id}</h2>
    </div>
  );
};

export default Product;
