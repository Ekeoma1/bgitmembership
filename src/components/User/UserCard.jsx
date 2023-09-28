import React, { useState } from 'react';
import coverPhoto from '../../assets/images/cover-photo.svg';
import profilePhoto from '../../assets/images/admin.svg';
import { IoIosAdd } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';

const UserCard = () => {
  const [connected, setConnected] = useState(false);
  return (
    <div className='user-card-wrapper shadow-sm'>
      <div className='cover-photo-wrapper'>
        <img src={coverPhoto} alt='cover-img' className='cover-photo' />
        <img src={profilePhoto} alt='profile-img' className='profile-photo' />
      </div>
      <div className='card-content'>
        <h5 className='name'>Jenny Smith</h5>
        <h5 className='role'>UX Design Enthusiast</h5>
        <h5 className='connections'>Connections</h5>
        <div className='btns'>
          <>
            {connected ? (
              <button onClick={() => setConnected(false)} className='connected'>
                <FiCheck className='icon' />
                Connected
              </button>
            ) : (
              <button onClick={() => setConnected(true)} className='connect'>
                <IoIosAdd className='icon' />
                Connect
              </button>
            )}
          </>

          <button className='message'>
            <IoIosAdd className='icon' />
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
