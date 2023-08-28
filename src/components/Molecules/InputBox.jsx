import React from 'react';
import '../../assets/scss/molecules.scss';
const InputBox = ({ value, onChange, name, placeholder }) => {
  return (
    <div className='input-box-component'>
      <input
        type='text'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  );
};

export default InputBox;
