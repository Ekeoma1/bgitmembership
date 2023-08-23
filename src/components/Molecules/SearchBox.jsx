import React from 'react';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';

const SearchBox = ({ onChange, value,placeholder }) => {
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
