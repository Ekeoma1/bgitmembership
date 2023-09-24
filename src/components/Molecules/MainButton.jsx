import React from 'react';
import '../../assets/scss/molecules.scss';
import loaderIcon from '../../assets/images/loader-icon.svg';
// import loaderIcon from '../../assets/images/loading.svg';

const MainButton = ({
  onClick,
  size,
  outlined,
  text,
  iconLeft,
  iconRight,
  width,
  loading,
  disabled,
}) => {
  return (
    <button
      className={`button-component ${size === 'small' && 'small-btn'} ${
        outlined && 'outlined'
      } ${loading && 'loading'} ${disabled && 'disabled'}`}
      style={{ width }}
      onClick={onClick}
      type='submit'
    >
      {loading ? (
        <div className='img-container'>
          <img src={loaderIcon} alt='' className='' />
        </div>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export default MainButton;
