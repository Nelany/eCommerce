import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Slider.scss';

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
    interval: 3000,
  };

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
