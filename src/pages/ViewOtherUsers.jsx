import React, { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import '../assets/scss/dashboard.scss';
import ProfileBanner from '../components/Dashboard/ProfileBanner';
import BioCard from '../components/Dashboard/BioCard';
import SocialLinksCard from '../components/Dashboard/SocialLinksCard';
import Group from '../components/Dashboard/Group';
import Posts from '../components/Dashboard/Posts';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetUserProfileById } from '../Features/users/users_slice';
import { triggerGetAllPostsByUserId } from '../Features/posts/posts_slice';

const ViewOtherUsers = () => {
  const param = useParams();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUserProfileById } = useSelector((state) => state.users);
  const { getAllPostsByUserId } = useSelector((state) => state.posts);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  useEffect(() => {
    window.scrollTo(0, 0);
    const data = { queryParams: { userId: param?.id } };
    dispatch(triggerGetUserProfileById(data));
    dispatch(
      triggerGetAllPostsByUserId({ queryParams: { pageNumber, pageSize } })
    );
  }, []);

  return (
    <div className='user-dashboard'>
      <div className='container'>
        <div>
          <button onClick={() => Navigate(-1)}>
            <Icon icon='arrowLeft' />
          </button>
        </div>

        <div className='row mt-5'>
          <div className='col-lg-9 col-12'>
            <ProfileBanner othersView={true} data={getUserProfileById} />
            <BioCard othersView={true} data={getUserProfileById} />
            <Posts data={getAllPostsByUserId} />
            <SocialLinksCard othersView={true} />
            <Group />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOtherUsers;
