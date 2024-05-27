// import img1 from '../../../../assets/test-slider-images/3-1.jpg';
// import img2 from '../../../../assets/test-slider-images/3-2.jpg';
// import img3 from '../../../../assets/test-slider-images/3-3.jpg';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './slider.scss';

export default function CardSlider(props: { slides: string[] }) {
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

  // const slides = [img1, img2, img3];
  return (
    <Carousel {...settings} className="slider">
      {props.slides.map((slide: string, slideIndex: number) => {
        return (
          <div className="slider-item" key={slideIndex}>
            <img className="slider-image" src={slide} />
          </div>
        );
      })}
    </Carousel>
  );
}
