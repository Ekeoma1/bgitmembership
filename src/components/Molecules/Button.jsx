import React from 'react';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';

const MainButton = ({ onClick, size, variant, text, iconLeft, iconRight }) => {
  return (
    <button
      className={`button-component ${size === 'small' && 'small-btn'} ${
        variant === 'outlined' && 'outlined'
      }`}
      onClick={onClick}
    >
      {text}
      {/* <Icon icon='searchIcon' /> */}
    </button>
  );
};

export default MainButton;
