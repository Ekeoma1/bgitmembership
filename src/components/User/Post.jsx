import React, { useState } from 'react';
import AuthorImg2 from '../../assets/images/author2.png';
import PostCard from '../Molecules/PostCard';

const Post = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const postList = [
    {
      author: 'Jenny Smith',
      authorImage: AuthorImg2,
      role: 'UX Design Enthusiast',
      time: '2h',
      content:
        "So thrilled to share my passion for UX design with all of you! 🎨👩‍💻 The world of user experience is so magical, and I can't wait to create digital wonders that make people's lives easier and more enjoyable! Let's embark on this design adventure together!",
      image: null,
      event: false,
      following: false,
    },
    {
      author: 'Jenny Smith',
      authorImage: AuthorImg2,
      role: 'UX Design Enthusiast',
      time: '2h',
      content:
        "It's like creating colorful rainbows in the digital world! 🌈✨ I'm absolutely in love with UX design and the way it allows me to blend art and technology. Each user's smile is worth a million pixels!",
      image: null,
      event: false,
      following: false,
    },
    {
      author: 'Jenny Smith',
      authorImage: AuthorImg2,
      role: 'UX Design Enthusiast',
      time: '2h',
      content:
        "Understanding users' needs and desires is like solving a fascinating puzzle! I'm diving deep into user research to unlock the secrets of creating meaningful and user-friendly experiences. Can't wait to see my designs come to life!",
      image: null,
      event: false,
      following: false,
    },
    {
      author: 'Jenny Smith',
      authorImage: AuthorImg2,
      role: 'UX Design Enthusiast',
      time: '2h',
      content:
        "Dreaming big and designing even bigger! 🚀💫 UX design has no limits, and I'm ready to explore the endless possibilities it offers. From wireframes to prototypes, I'm embracing every step of the journey. Let's revolutionize the way people interact with technology!",
      image: null,
      event: false,
      following: false,
    },
  ];
  return (
    <div className='post-wrapper'>
      <div className='tabs'>
        <h5
          className={`tab ${activeTab === 'posts' && 'active'}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </h5>
        <h5
          className={`tab ${activeTab === 'likes' && 'active'}`}
          onClick={() => setActiveTab('likes')}
        >
          Likes
        </h5>
        <h5
          className={`tab ${activeTab === 'bookmarks' && 'active'}`}
          onClick={() => setActiveTab('bookmarks')}
        >
          Bookmarks
        </h5>
      </div>
      {activeTab === 'posts' && (
        <div className='post-card-wrapper'>
          {postList.map((list, key) => {
            return <PostCard key={key} list={list} />;
          })}
        </div>
      )}
      {activeTab === 'likes' && (
        <div className='post-card-wrapper'>
          {postList.map((list, key) => {
            return <PostCard key={key} list={list} />;
          })}
        </div>
      )}
      {activeTab === 'bookmarks' && (
        <div className='post-card-wrapper'>
          {postList.map((list, key) => {
            return <PostCard key={key} list={list} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Post;
