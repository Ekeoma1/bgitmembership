import React from 'react';
import '../../assets/scss/molecules.scss';
import { TfiCheck } from 'react-icons/tfi'
import { LiaTimesSolid } from 'react-icons/lia';


const RequestCard = ({ item }) => {

  return (
    <div className='request-card bg-color-card'>
      <h5 className='text-color-secondary-bold'>{item.time}</h5>
      <img src={item.img} alt='forum-img' className='' />
      <h3>{item.name}</h3>
      <p>Interests: {item.interests}</p>
      <div className='btns'>
        <button className='reject'>
          <LiaTimesSolid className='icon' />
        </button>
        <button className='accept'>
          <TfiCheck className='icon' />
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
