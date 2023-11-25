import React, { useState } from 'react';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import member1 from '../../../src/assets/images/member1.svg';
import member2 from '../../../src/assets/images/member2.svg';
import member3 from '../../../src/assets/images/member3.svg';
import member4 from '../../../src/assets/images/member4.svg';
import member5 from '../../../src/assets/images/member5.svg';
import msg from '../../../src/assets/images/message-icon.svg';
import { HiOutlineChevronRight } from 'react-icons/hi';

const CommunityCard = ({ community }) => {
  const [more, setMore] = useState(false);
  return (
    <div className='community-card bg-color-card'>
      <div className='card-body'>
        <img src={community.community_img} alt='community-img' className='' />
        {community.recently_joined && (
          <div className='recently-joined'>
            <h5>Recently Joined</h5>
          </div>
        )}
      </div>
      <div className='card-footer'>
        <div className='info'>
          <h3 className='text-color-secondary-bold'>{community.community_name}</h3>
          <div className='members-wrapper'>
            <div class='members-img'>
              <div class='image-con'>
                <img src={member1} alt='community-img-sm' />
              </div>
              <div class='image-con'>
                <img src={member2} alt='community-img-sm' />
              </div>
              <div class='image-con'>
                <img src={member3} alt='community-img-sm' />
              </div>
              <div class='image-con'>
                <img src={member4} alt='community-img-sm' />
              </div>
              <div class='image-con'>
                <img src={member5} alt='community-img-sm' />
              </div>
            </div>
            <div className='members-amount text-color-secondary-normal'>
              <p>{community.community_members}</p>
              <p>Members</p>
            </div>
            <div className='icon-con'>
              <img src={msg} alt='message-icon' className='icon-color' />
              {community.unreadMsg && <div className='msg-circle'></div>}
            </div>
          </div>
        </div>
        <div className='more'>
          <MdOutlineMoreHoriz className='icon secondary-text-color-normal' onClick={() => setMore(true)} />
          <HiOutlineChevronRight
            className='icon-mobile'
          />
          {more && <div className='leave-group'>Leave group</div>}
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
