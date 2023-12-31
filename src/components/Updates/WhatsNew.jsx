import React, { useEffect, useState } from 'react';
import { RiHeart3Fill } from 'react-icons/ri';
import { IoMdShareAlt } from 'react-icons/io';
import { BiMessageRoundedDots } from 'react-icons/bi';
import request1 from '../../../src/assets/images/request1.svg';
import request2 from '../../../src/assets/images/request2.svg';
import request3 from '../../../src/assets/images/request3.svg';
import PostCard from '../Molecules/PostCard';
import AuthorImg1 from '../../../src/assets/images/author1.png';
import PostImage from '../../../src/assets/images/post-image.png';
import MainButton from '../Molecules/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllNotifications } from '../../Features/notification/notification_slice';
import SingleLineLoader from '../Atoms/skeleton-loaders/SingleLineLoader';

const WhatsNew = () => {
  const postList = [
    {
      author: 'Karen Emelu',
      authorImage: AuthorImg1,
      role: 'CEO',
      time: '2h',
      content:
        'Hey lovely ladies, it’s half way through the year!  Come unwind and party with us this Saturday, July 8th at our Summer Mixer. Hit the RSVP button to reserve your spot. You don’t want to miss this 💃🏾🍹🎉',
      image: PostImage,
      event: true,
      following: true,
    },
  ];
  const dispatch = useDispatch();
  const { getAllNotifications } = useSelector((state) => state.notification);
  const [notificationsAmount, setNotificationsAmount] = useState(3);
  useEffect(() => {
    dispatch(triggerGetAllNotifications());
  }, []);

  return (
    <div className='whats-new-wrapper'>
      <div className='container'>
        <div className='whats-new-section-content'>
          <div className='section-title-wrapper'>
            <h5 className=''>
              Whats new{' '}
              {getAllNotifications.status === 'base' ||
              getAllNotifications.status === 'loading'  ? (
                <div className='loading'>
                  <SingleLineLoader />
                </div>
              ) : getAllNotifications.status === 'successful' &&
                getAllNotifications.data ? (
                <span>{`(${getAllNotifications.data?.length})`}</span>
              ) : getAllNotifications.status === 'error' ? (
                <></>
              ) : (
                <></>
              )}{' '}
            </h5>
          </div>
          <div className='section-content-wrapper'>
            <div className='section-content'>
              {getAllNotifications.status === 'base' ||
              getAllNotifications.status === 'loading' ? (
                <></>
              ) : getAllNotifications.status === 'successful' ? (
                <>
                  {getAllNotifications.data.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      {getAllNotifications.data
                        .slice(0, notificationsAmount)
                        .map((notification, index) => {
                          const inputString = notification.notificationContent;
                          const tempDiv = document.createElement('div');
                          tempDiv.innerHTML = inputString;
                          const content =
                            tempDiv.querySelector('b').textContent;
                          const remaining = inputString.replace(
                            `<b>${content}</b>`,
                            ''
                          );
                          if (
                            notification.notificationType === 'COMMENT' ||
                            notification.notificationType === 'POST'
                          ) {
                            return (
                              <div
                                className='commented liked-your-comment'
                                key={index}
                              >
                                <div className='main-wrapper'>
                                  <img
                                    src={notification.notificationUserImageUrl}
                                    alt=''
                                    className=''
                                  />
                                  <div className='content'>
                                    <div className=''>
                                      <h3>{`${notification.notificationUserFirstName} ${notification.notificationUserSecondName}`}</h3>
                                      <h5>
                                        {content}
                                        <p>{remaining}</p>
                                      </h5>
                                    </div>
                                    {notification.notificationType ===
                                    'COMMENT' ? (
                                      <span className='comment-icon'>
                                        <BiMessageRoundedDots />
                                      </span>
                                    ) : notification.notificationType ===
                                      'POST' ? (
                                      <span className='like'>
                                        <RiHeart3Fill />
                                      </span>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          } else if (
                            notification.notificationType === 'SHARE'
                          ) {
                            return (
                              <div className='shared-your-post'>
                                <div className='main-wrapper'>
                                  <img src={request1} alt='' className='' />
                                  <div className='content'>
                                    <div className='section-top'>
                                      <div className=''>
                                        <h3>Destiny L</h3>
                                        <h5>
                                          Shared your post<span>:</span>{' '}
                                        </h5>
                                      </div>
                                      <span className='share'>
                                        <IoMdShareAlt />
                                      </span>
                                    </div>
                                    <div className='postcard'>
                                      {postList.map((list, key) => {
                                        return (
                                          <PostCard key={key} list={list} />
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                    </>
                  )}
                </>
              ) : getAllNotifications.status === 'error' ? (
                <></>
              ) : (
                <></>
              )}

              <div className='load-more'>
                <MainButton
                  text={'Load more'}
                  size={'small'}
                  variant={'outlined'}
                  onClick={() =>
                    setNotificationsAmount(notificationsAmount + 1)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
