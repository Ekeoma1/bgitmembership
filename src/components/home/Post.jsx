import React from 'react';
import CreatePost from './CreatePost';
import Icon from '../Icon';
import PostImage from '../../assets/images/post-image.png';
import AuthorImg1 from '../../assets/images/author1.png';
import AuthorImg2 from '../../assets/images/author2.png';
import PostCard from '../Molecules/PostCard';

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

  {
    author: 'Jenny Smith',
    authorImage: AuthorImg2,
    role: 'UX Design Enthusiast',
    time: '2h',
    content:
      'Hey, does anyone fancy going to a brunch?? Lol in the mood for some food and music. Drop me a message if you’re down x',
    image: null,
    event: false,
    following: false,
  },
];

const Post = () => {
  return (
    <div className='post-wrapper'>
      <div className='d-lg-block d-none'>
        <CreatePost />
      </div>
      <div className='post-card-wrapper'>
        {postList.map((list, key) => {
          return <PostCard key={key} list={list} />;
        })}
      </div>
    </div>
  );
};

export default Post;
