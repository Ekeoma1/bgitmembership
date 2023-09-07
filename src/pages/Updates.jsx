import React, { useState } from 'react';
import '../../src/assets/scss/updates.scss';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Requests from '../components/Updates/Requests';
import WhatsNew from '../components/Updates/WhatsNew';
import News from '../components/Updates/News';
import EmptyState from '../components/Molecules/EmptyState';

const Updates = () => {
  const navigate = useNavigate();
  const [emptyState, setEmptyState] = useState(false);
  return (
    <div className='updates-wrapper bg-color2'>
      <div className='top-section'>
        <div className='container'>
          <div className='page-title-wrapper'>
            <div className='title-wrapper'>
              <div
                className='icon'
                onClick={() => navigate('/')}
              >
                <HiArrowLeft className='text-color' />
              </div>
              <h3 className='text-color'>Updates</h3>
            </div>
          </div>
        </div>
      </div>
      {!emptyState && (
        <>
          <Requests />
          <WhatsNew />
        </>
      )}
      {emptyState && (
        <EmptyState
          title={'No updates just yet.'}
          info={'See our latest News & Events below.'}
        />
      )}
      <News />
    </div>
  );
};

export default Updates;
