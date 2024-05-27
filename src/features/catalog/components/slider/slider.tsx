import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Slider.scss';

type CallBack = () => void;
type ChangeSlides = (index: number) => void;
type Props = {
  slides: string[];
  autoPlay: boolean;
  showArrows: boolean;
  dots: boolean;
  changeSlidesOrder?: ChangeSlides;
  openModal?: CallBack;
};

function CardSlider(props: Props) {
  const settings = {
    showArrows: props.showArrows,
    infiniteLoop: true,
    showThumbs: false,
    showStatus: false,
    autoPlay: props.autoPlay,
    swipeable: true,
    emulateTouch: true,
    transitionTime: 1000,
    interval: 3000,
  };

  return (
    <Carousel
      {...settings}
      className={props.dots ? 'slider' : 'slider modal'}
      onClickItem={(slideIndex) => {
        props.changeSlidesOrder && props.changeSlidesOrder(slideIndex);
        props.openModal && props.openModal();
      }}
    >
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

export default CardSlider;
