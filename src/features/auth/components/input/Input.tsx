import React from 'react';
import { InputProps } from '../../types/authTypes';
import './Input.scss';

const Input = function(props: InputProps) {
  return (
    <div className='input-wrapper'>
      <label className='input-label'>{props.name}:</label>
      <input className='input' type={props.type} name={props.name}></input>
      <p className='error'>{props.error}</p>
    </div>
  )
}


export default Input;