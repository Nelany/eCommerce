import './Button.scss';
import { ButtonProps } from '../../types/authTypes';

const Button = function(props: ButtonProps) {
  return (
    <button className='button' type={props.type} onClick={() => props.callback}>{props.text}</button>
  )
}


export default Button;