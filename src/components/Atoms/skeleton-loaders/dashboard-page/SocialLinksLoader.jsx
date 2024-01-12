import React from 'react';
import '../../../../assets/scss/atoms.scss';

const SocialLinksLoader = () => {
  return (
    <div className='social-links-loader'>
      <div className='details'>
        <div className='info skeleton-loader '></div>
        <div className='info skeleton-loader '></div>
        <div className='info skeleton-loader '></div>
      </div>
    </div>
  );
};
export default SocialLinksLoader;
