import React, { useState } from 'react';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import member1 from '../../../src/assets/images/member1.svg';
import member2 from '../../../src/assets/images/member2.svg';
import member3 from '../../../src/assets/images/member3.svg';
import member4 from '../../../src/assets/images/member4.svg';
import member5 from '../../../src/assets/images/member5.svg';
import msg from '../../../src/assets/images/message-icon.svg';
import spinner from '../../../src/assets/images/spinner2.png';
import community1 from '../../../src/assets/images/community1.svg';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import { useDispatch, useSelector } from 'react-redux';
import {
  triggerCancelJoinForumRequest,
  triggerJoinForum,
  triggerLeaveForum,
} from '../../Features/forums/forums_slice';
import { FaTimes } from 'react-icons/fa';

const CommunityCard = ({ community, setActiveForum }) => {
  const [more, setMore] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leaveForum, joinForum, cancelJoinForumRequest } = useSelector(
    (state) => state.forums
  );
  const handleRequest = (e) => {
    if (
      leaveForum.status === 'base' &&
      joinForum.status === 'base' &&
      cancelJoinForumRequest.status === 'base'
    ) {
      const values = { forumId: community.forumId };
      setActiveForum(community);
      if (e.target.closest('.leave-group')) {
        // dispatch(triggerLeaveForum(values));
        setMore(false);
        console.log('yeap');
      } else if (e.target.closest('.join-group')) {
        dispatch(triggerJoinForum(values));
      } else if (e.target.closest('.cancel-request')) {
        dispatch(triggerCancelJoinForumRequest(values));
      }
    }
  };
  return (
    <div className='community-card bg-color-card22'>
      <div className='card-body'>
        <img
          src={community.forumBackgroundImageUrl ?? community1}
          onClick={() => {
            navigate(`/forum/${community.forumId}`);
          }}
          alt='community-img'
          className=''
        />
        {community.justJoined && (
          <div className='recently-joined'>
            <h5>Recently Joined</h5>
          </div>
        )}
      </div>
      <div className='card-footer'>
        {community.forumMembershipStatus === 'AMember' ? (
          <>
            <div className='info'>
              <h3
                onClick={() => {
                  navigate(`/forum/${community.forumId}`);
                }}
                className='text-color-secondary-bold22'
              >
                {community.forumName}
              </h3>
              <div className='members-wrapper'>
                <div className='members-img'>
                  {community.usersInForum.map((item, index) => (
                    <div key={index} className='image-con'>
                      <img src={item.user.imageUrl} alt='community-img-sm' />
                    </div>
                  ))}
                </div>
                <div
                  onClick={() => {
                    navigate(`/forums/${community.forumId}/members`);
                  }}
                  className='members-amount text-color-secondary-normal22'
                >
                  <p>{community.userCount}</p>
                  <p>Members</p>
                </div>
                <div className='icon-con'>
                  <img src={msg} alt='message-icon' className='icon-color22' />
                  {/* {!community.unreadMsg && <div className='msg-circle'></div>} */}
                </div>
              </div>
            </div>
            <div className='more'>
              {!community.isCurrentUserAdmin && (
                <MdOutlineMoreHoriz
                  className='icon secondary-text-color-normal22'
                  onClick={() => setMore(true)}
                />
              )}
              <HiOutlineChevronRight className='icon-mobile' />
              {
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setMore(false);
                  }}
                >
                  {more && (
                    <div
                      onClick={(e) => handleRequest(e)}
                      className='leave-group'
                    >
                      Leave group
                    </div>
                  )}
                </OutsideClickHandler>
              }
            </div>
          </>
        ) : community.forumMembershipStatus === 'loading' ? (
          <div className='btn-con'>
            <button className={`reach-btn loading`}>
              <img src={spinner} alt='spinner' />
            </button>
          </div>
        ) : community.forumMembershipStatus === 'NotAMembers' ? (
          <div className='btn-con'>
            <button
              onClick={(e) => handleRequest(e)}
              className='join-group reach-btn'
            >
              + Join forum
            </button>
          </div>
        ) : community.forumMembershipStatus === 'Pending' || true ? (
          <div className='btn-con'>
            <button className='cancel-request reach-btn'>
              <FaTimes />
              Cancel request
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
