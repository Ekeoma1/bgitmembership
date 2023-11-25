import React from 'react';
import '../../../../assets/scss/atoms.scss';

const BioLoader = () => {
  return (
    <div className='bio-loader'>
      <div className='details'>
        <div className='title skeleton-loader '></div>
        <div className='info skeleton-loader '></div>
      </div>
      <div className='details'>
        <div className='title2 skeleton-loader '></div>
        <div className='info skeleton-loader '></div>
      </div>
      <div className='details'>
        <div className='title skeleton-loader '></div>
        <div className='info skeleton-loader '></div>
      </div>
    </div>
  );
};
export default BioLoader;
