import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './slider.scss';

type CallBack = () => void;
type Props = {
  slides: string[];
  autoPlay: boolean;
  showArrows: boolean;
  dots: boolean;
  selectedItem: number;
  openModal?: CallBack;
  pickItem?: (n: number) => void;
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
    selectedItem: props.selectedItem,
  };

  return (
    <Carousel
      {...settings}
      className={props.dots ? 'slider' : 'slider modal'}
      onClickItem={function (slideIndex) {
        props.pickItem && props.pickItem(slideIndex);
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
