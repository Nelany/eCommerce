import img1 from '../../../../assets/test-slider-images/3-1.jpg';
import img2 from '../../../../assets/test-slider-images/3-2.jpg';
import img3 from '../../../../assets/test-slider-images/3-3.jpg';

// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './slider.scss';

export default function CardSlider() {
  const settings = {
    showArrows: false,
    infiniteLoop: true,
    showThumbs: false,
    showStatus: false,
    autoPlay: true,
    swipeable: true,
    emulateTouch: true,
    transitionTime: 1000,
    interval: 5000,
  };
  return (
    <Carousel {...settings} className="slider">
      <div className="slider-item">
        <img className="slider-image" src={img1} />
      </div>
      <div className="slider-item">
        <img className="slider-image" src={img2} />
      </div>
      <div className="slider-item">
        <img className="slider-image" src={img3} />
      </div>
    </Carousel>
  );
}
