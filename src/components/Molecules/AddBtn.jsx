import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import '../../assets/scss/molecules.scss';

const AddBtn = ({ onClick }) => {
  return (
    <div className='add-button-component' onClick={onClick}>
      <HiOutlinePlus />
    </div>
  );
};

export default AddBtn;
