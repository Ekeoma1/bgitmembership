import React, { useRef, useState } from 'react';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';

const SearchBox = ({
  name,
  value,
  setValue,
  placeholder,
  height,
  onChange,
  enterKeyPressed,
  otherKeysPressed,
}) => {
  const inputContainer = useRef(null);
  const [val, setVal] = useState('');

  const handleChange = (e) => {
    setVal(e.target.value);
  };
  console.log('val', val);
  return (
    <div className='search-box-component'>
      <input
        type='text'
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name={name}
        ref={inputContainer}
        style={{ height }}
      />
      <Icon icon='searchIcon' />
    </div>
  );
};

export default SearchBox;
