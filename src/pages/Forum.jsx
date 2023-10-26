import React, { useEffect, useState } from 'react';
import '../../src/assets/scss/forum.scss';
import Banner from '../components/Forum/Banner';
import ForumContent from '../components/Forum/ForumContent';
import ForumContentMain from '../components/Forum/ForumContentMain';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetMyProfile } from '../Features/users/users_slice';
import { resetActiveForumIdForOngoingRequest, resetJoinForum, resetLeaveForum, triggerGetAllForums } from '../Features/forums/forums_slice';
import { useParams } from 'react-router-dom';
import { renderToast } from '../components/Molecules/CustomToastify';

const Forum = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { getAllForums, joinForum, leaveForum } = useSelector(
    (state) => state.forums
  );
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [joinForumRequestSuccessful, setJoinForumRequestSuccessful] =
    useState(false);
  const [forum, setForum] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  useEffect(() => {
    if (joinForum.status === 'successful') {
      if (joinForum.data === 'You are the admin of the forum.') {
        renderToast({
          status: 'error',
          message: joinForum.data,
        });
      } else {
        renderToast({
          status: 'success',
          message: joinForum.data,
        });
      }
      dispatch(resetJoinForum());
      dispatch(resetActiveForumIdForOngoingRequest());
    } else if (joinForum.status === 'error') {
      dispatch(resetJoinForum());
      dispatch(resetActiveForumIdForOngoingRequest());
    }
    // leave forum
    if (leaveForum.status === 'successful') {
      renderToast({
        status: 'success',
        message: leaveForum.data,
      });
      dispatch(resetLeaveForum());
      dispatch(resetActiveForumIdForOngoingRequest());
    } else if (leaveForum.status === 'error') {
      dispatch(resetLeaveForum());
      dispatch(resetActiveForumIdForOngoingRequest());
    }
  }, [joinForum.status, leaveForum.status]);
  return (
    <div className='forum-wrapper'>
      <Banner
        forum={forum}
        setJoinForumRequestSuccessful={setJoinForumRequestSuccessful}
        joinForumRequestSuccessful={joinForumRequestSuccessful}
      />
      {!forum.isCurrentUserMember && <ForumContent forum={forum} />}
      {forum.isCurrentUserMember && <ForumContentMain forum={forum} />}
    </div>
  );
};

export default Forum;
