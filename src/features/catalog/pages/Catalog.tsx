import { Link } from 'react-router-dom';
import CardSlider from '../components/slider/slider';

const Catalog = () => {
  return (
    <div className="page catalog-page">
      <h1>CATALOG</h1>
      <Link to={'COOL-ID'}>COOL-PRODUCT</Link>
      <CardSlider />
    </div>
  );
};

export default Catalog;
