import React, { useEffect } from 'react';
import { CgLock } from 'react-icons/cg';
import { TbClockHour9 } from 'react-icons/tb';
import adminImg from '../../assets/images/admin.svg';
import ForumCard from '../Molecules/ForumCard';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import forumImg2 from '../../../src/assets/images/forumcard2.svg';

const ForumContent = () => {
  const communities = [
    {
      community_img: forumImg1,
      community_name: 'UX/UI Design',
      info: 'Dorem ipsum dolor sit amet consectetur. Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu',
    },
    {
      community_img: forumImg2,
      community_name: 'Engineer Girls',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu',
    },
  ];
  useEffect(() => {}, []);
  return (
    <div className='forum-content-wrapper bg-color'>
      <div className='container'>
        <div className='forum-content'>
          <div className='about-admin-wrapper'>
            <div className='about-section'>
              <div className='about'>
                <h3>About</h3>
                <p>
                  This is a group for people in the UX/UI industry to share tips
                  and resources about UX Design. Everyone is welcome to share
                  their design process and request feedback.
                </p>
              </div>
              <div className='info'>
                <h3>Info</h3>
                <ol>
                  <li>
                    Be respectful of others Help others in a constructive way.
                  </li>
                  <li>
                    If people are asking for feedback on their work, we
                    encourage comments and criticism but please be kind when
                    doing so.
                  </li>
                  <li>Please avoid spamming.</li>
                </ol>
              </div>
              <div className='section-bottom'>
                <div className='content'>
                  <div className='private'>
                    {/* <PiLockSimpleBold /> */}
                    <CgLock className='icon' />
                    <div className=''>
                      <h5>Private</h5>
                      <p>Only members can see the posts</p>
                    </div>
                  </div>
                  <div className='history'>
                    <TbClockHour9 className='icon' />
                    <div className=''>
                      <h5>Private</h5>
                      <p>Only members can see the posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='admin-section'>
              <h3>Admin</h3>
              <div className='content'>
                <img src={adminImg} alt='admin' />
                <div className=''>
                  <h5>Jenny Smith</h5>
                  <p>UX Design Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
          <div className='related-groups-wrapper'>
            <h3 className='text-color'>Related groups</h3>
            <div className='forum-cards'>
              {communities.map((forum, index) => (
                <ForumCard key={index} forum={forum} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumContent;
