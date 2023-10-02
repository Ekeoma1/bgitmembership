import React, { useEffect, useRef } from 'react';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';

const SearchBox = ({
  onChange,
  value,
  placeholder,
  enterKeyPressed,
  otherKeysPressed,
}) => {
  const inputContainer = useRef(null);
  // useEffect(() => {
  //   const listener = (event) => {
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       enterKeyPressed();
  //     } else {
  //       otherKeysPressed();
  //     }
  //   };
  //   if (inputContainer.current) {
  //     inputContainer.current.addEventListener('keydown', listener);
  //     return () => {
  //       document.removeEventListener('keydown', listener);
  //     };
  //   }
  // }, [enterKeyPressed, otherKeysPressed]);

  return (
    <div className='search-box-component'>
      <input
        type='text'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        ref={inputContainer}
      />
      <Icon icon='searchIcon' />
    </div>
  );
};

export default SearchBox;
