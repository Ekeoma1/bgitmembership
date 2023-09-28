import React, { useState } from 'react';
import '../../src/assets/scss/forum.scss';
import Banner from '../components/Forum/Banner';
import ForumContent from '../components/Forum/ForumContent';
import ForumContentMain from '../components/Forum/ForumContentMain';

const Forum = () => {
  const [joinForumRequestSuccessful, setJoinForumRequestSuccessful] =
    useState(false);
  return (
    <div className='forum-wrapper'>
      <Banner
        setJoinForumRequestSuccessful={setJoinForumRequestSuccessful}
        joinForumRequestSuccessful={joinForumRequestSuccessful}
      />
      {!joinForumRequestSuccessful && <ForumContent />}
      {joinForumRequestSuccessful && <ForumContentMain />}
    </div>
  );
};

export default Forum;
