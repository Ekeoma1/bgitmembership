import React from 'react';
import { HiOutlineMinus } from 'react-icons/hi';
import '../../assets/scss/molecules.scss';

const SubtractBtn = ({ onClick }) => {
  return (
    <div className='subtract-button-component' onClick={onClick}>
      <HiOutlineMinus />
    </div>
  );
};

export default SubtractBtn;
