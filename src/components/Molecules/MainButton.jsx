import React from 'react';
import '../../assets/scss/molecules.scss';
// import loaderIcon from '../../assets/images/loader-icon.svg';
// import loaderIcon from '../../assets/images/loading.svg';

const MainButton = ({
  onClick,
  size,
  outlined,
  text,
  iconLeft,
  iconRight,
  width,
  height,
  padding,
  border,
  borderRadius,
  loading,
  disabled,
}) => {
  return (
    <button
      className={`button-component ${size === 'small' && 'small-btn'} ${
        outlined && 'outlined'
      } ${loading && 'loading'} ${disabled && 'disabled'}`}
      style={{ width, height, padding, border, borderRadius }}
      onClick={disabled ? null : onClick}
      type='submit'
    >
      {loading ? (
        <>
          {/* <div className='img-container'>
            <img src={loaderIcon} alt='' className='' />
          </div> */}
          Loading...
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export default MainButton;
