import React, { useEffect, useState } from 'react';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';

const SearchBox = ({
  onChange,
  value,
  placeholder,
  enterKeyPressed,
  otherKeysPressed,
}) => {
  useEffect(() => {
    const listener = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        enterKeyPressed();
      } else {
        otherKeysPressed();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div className='search-box-component'>
      <input
        type='text'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <Icon icon='searchIcon' />
    </div>
  );
};

export default SearchBox;
