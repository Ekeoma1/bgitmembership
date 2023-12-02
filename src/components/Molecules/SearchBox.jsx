import React, { useRef } from 'react';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';

const SearchBox = ({
  onChange,
  value,
  placeholder,
  height,
  enterKeyPressed,
  otherKeysPressed,
}) => {
  const inputContainer = useRef(null);

  return (
    <div className='search-box-component'>
      <input
        type='text'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        ref={inputContainer}
        style={{ height }}
      />
      <Icon icon='searchIcon' />
    </div>
  );
};

export default SearchBox;
