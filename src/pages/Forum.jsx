import React, { useEffect, useState } from 'react';
import '../../src/assets/scss/forum.scss';
import Banner from '../components/Forum/Banner';
import ForumContent from '../components/Forum/ForumContent';
import ForumContentMain from '../components/Forum/ForumContentMain';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetMyProfile } from '../Features/users/users_slice';
import { triggerGetAllForums } from '../Features/forums/forums_slice';
import { useParams } from 'react-router-dom';

const Forum = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { getAllForums } = useSelector((state) => state.forums);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [joinForumRequestSuccessful, setJoinForumRequestSuccessful] =
    useState(false);
  const [forum, setForum] = useState({});
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data));
  }, [params]);
  useEffect(() => {
    if (getAllForums.status === 'successful') {
      setForum(
        getAllForums.data?.find((item) => item.forumId === params.forumId)
      );
    }
  }, [getAllForums.status]);
  return (
    <div className='forum-wrapper'>
      <Banner
        forum={forum}
        setJoinForumRequestSuccessful={setJoinForumRequestSuccessful}
        joinForumRequestSuccessful={joinForumRequestSuccessful}
      />
      {!joinForumRequestSuccessful && <ForumContent forum={forum} />}
      {joinForumRequestSuccessful && <ForumContentMain forum={forum} />}
    </div>
  );
};

export default Forum;
