import React, { useEffect, useState } from 'react';
import '../../src/assets/scss/forum.scss';
import Banner from '../components/Forum/Banner';
import ForumContent from '../components/Forum/ForumContent';
import ForumContentMain from '../components/Forum/ForumContentMain';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetMyProfile } from '../Features/users/users_slice';
import {
  resetActiveForumIdForOngoingRequest,
  resetJoinForum,
  resetLeaveForum,
  triggerGetAllForums,
  triggerGetForumById,
  triggerGetForumConnectionStatusByForumId,
} from '../Features/forums/forums_slice';
import { useParams } from 'react-router-dom';
import { renderToast } from '../components/Molecules/CustomToastify';

const Forum = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { joinForum, leaveForum, getForumById } = useSelector(
    (state) => state.forums
  );
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [joinForumRequestSuccessful, setJoinForumRequestSuccessful] =
    useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const data = { queryParams: { forumId: params?.forumId } };
    dispatch(triggerGetForumById(data));
    // dispatch(triggerGetAllForums(data));
    dispatch(triggerGetForumConnectionStatusByForumId(data));
  }, [params]);

  return (
    <div className='forum-wrapper'>
      <Banner
        setJoinForumRequestSuccessful={setJoinForumRequestSuccessful}
        joinForumRequestSuccessful={joinForumRequestSuccessful}
      />
      {getForumById.data[0]?.isCurrentUserMember && <ForumContentMain />}
      {!getForumById.data[0]?.isCurrentUserMember && <ForumContent />}
    </div>
  );
};

export default Forum;
