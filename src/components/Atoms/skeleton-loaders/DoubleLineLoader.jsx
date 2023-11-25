import React from 'react';
import '../../../assets/scss/atoms.scss';

const DoubleLineLoader = () => {
  return (
    <div className='double-line-loader'>
      <div className='line-1 skeleton-loader'></div>
      <div className='line-2 skeleton-loader'></div>
    </div>
  );
};
export default DoubleLineLoader;
