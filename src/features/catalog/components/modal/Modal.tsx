import './Modal.scss';
import CardSlider from '../slider/slider';
import { Modal } from '@mui/material';

type CloseModal = () => void;

function BasicModal(props: {
  slides: string[];
  open: boolean;
  close?: CloseModal;
}) {
  return (
    <Modal open={props.open} onClose={props.close} className="product-modal">
      <div className="product-pop-up">
        <CardSlider
          slides={props.slides}
          autoPlay={false}
          showArrows={true}
          dots={false}
        />
        <button onClick={props.close} className="close-modal-button" />
      </div>
    </Modal>
  );
}

export default BasicModal;
