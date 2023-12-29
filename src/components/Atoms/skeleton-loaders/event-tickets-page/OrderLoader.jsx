import React from 'react';
import '../../../../assets/scss/atoms.scss';
import ImgLoader from '../ImgLoader';
import SingleLineLoader from '../SingleLineLoader';

const OrderLoader = () => {
  return (
    <>
      <div className='order-loader '>
        <div className='date'>
          {/* <SingleLineLoader /> */}
        </div>
        <div className='details'>
          <div className='img'>
            <SingleLineLoader />
          </div>
          <div className='info'>
            <div className='name'>
              <SingleLineLoader />
            </div>
            <div className='date-2'>
              <SingleLineLoader />
            </div>
            <div className='event'>
              <SingleLineLoader />
            </div>
          </div>
        </div>
      </div>
      <div className='order-loader '>
        <div className='date'>
          {/* <SingleLineLoader /> */}
        </div>
        <div className='details'>
          <div className='img'>
            <SingleLineLoader />
          </div>
          <div className='info'>
            <div className='name'>
              <SingleLineLoader />
            </div>
            <div className='date-2'>
              <SingleLineLoader />
            </div>
            <div className='event'>
              <SingleLineLoader />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderLoader;
