import React from 'react';
import { RiHeart3Fill } from 'react-icons/ri';
import { IoMdShareAlt } from 'react-icons/io';
import { BiMessageRoundedDots } from 'react-icons/bi';
import request1 from '../../../src/assets/images/request1.svg';
import request2 from '../../../src/assets/images/request2.svg';
import request3 from '../../../src/assets/images/request3.svg';
import PostCard from '../Molecules/PostCard';
import AuthorImg1 from '../../../src/assets/images/author1.png';
import AuthorImg2 from '../../../src/assets/images/author2.png';
import PostImage from '../../../src/assets/images/post-image.png';
import MainButton from '../Molecules/MainButton';

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
  return (
    <div className='whats-new-wrapper'>
      <div className='container'>
        <div className='whats-new-section-content'>
          <div className='section-title-wrapper'>
            <h5 className=''>
              Whats new <span>{'(4)'}</span>
            </h5>
          </div>
          <div className='section-content-wrapper'>
            <div className='section-content'>
              <div className='liked-your-comment'>
                <div className='main-wrapper'>
                  <img src={request2} alt='' className='' />
                  <div className='content'>
                    <div className=''>
                      <h3>Samantha</h3>
                      <h5>
                        Liked your comment<span className='colon'>:</span>{' '}
                        <p>
                          I’m not sure you know, think it’s gonna rain on the
                          day but i’m travelling from Manchester so gonna bring
                          an umbrella jusssst in case x
                        </p>
                      </h5>
                    </div>
                    <span className='like'>
                      <RiHeart3Fill />
                    </span>
                  </div>
                </div>
              </div>
              <div className='shared-your-post'>
                <div className='main-wrapper'>
                  <img src={request1} alt='' className='' />
                  <div className='content'>
                    <div className='section-top'>
                      <div className=''>
                        <h3>Destiny L</h3>
                        <h5>Shared your post<span>:</span> </h5>
                      </div>
                      <span className='share'>
                        <IoMdShareAlt />
                      </span>
                    </div>
                    <div className='postcard'>
                      {postList.map((list, key) => {
                        return <PostCard key={key} list={list} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className='commented'>
                <div className='main-wrapper'>
                  <img src={request3} alt='' className='' />
                  <div className='content'>
                    <div className=''>
                      <h3>Amaka G</h3>
                      <h5>
                        Commented on your post<span>:</span>{' '}
                        <p>
                          LOOOOOOOL!! 🤣 omd, I can’t wait for the event in 3
                          weeks
                        </p>
                      </h5>
                    </div>
                    <span className='comment-icon'>
                      <BiMessageRoundedDots />
                    </span>
                  </div>
                </div>
              </div>
              <div className='load-more'>
                <MainButton
                  text={'Load more'}
                  size={'small'}
                  variant={'outlined'}
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
