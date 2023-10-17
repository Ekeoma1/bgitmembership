import React from 'react';
import '../../assets/scss/molecules.scss';
import emptyForum from '../../../src/assets/images/empty-forum.svg';

const EmptyState = ({ title, info, height }) => {
  return (
    <div className='empty-state' style={{ height: height }}>
      <img src={emptyForum} alt='empty forum' className='' />
      <h5>{title}</h5>
      <p>{info}</p>
    </div>
  );
};

export default EmptyState;
