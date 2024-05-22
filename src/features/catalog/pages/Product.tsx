import { useParams } from 'react-router-dom';
import CardSlider from '../components/slider/slider';

const Product = () => {
  const { id } = useParams();

  return (
    <div className="page product-page">
      <h1>PRODUCT</h1>
      <h2>{id}</h2>
      <CardSlider />
    </div>
  );
};

export default Product;
