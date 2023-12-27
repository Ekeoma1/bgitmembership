import React, { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import '../assets/scss/dashboard.scss';
import ProfileBanner from '../components/Dashboard/ProfileBanner';
import BioCard from '../components/Dashboard/BioCard';
import SocialLinksCard from '../components/Dashboard/SocialLinksCard';
import Group from '../components/Dashboard/Group';
import Resources from '../components/Dashboard/Resources';
import Posts from '../components/Dashboard/Posts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Member from '../components/Dashboard/Member';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetUserProfileById } from '../Features/users/users_slice';
import { triggerGetAllPostsByUserId } from '../Features/posts/posts_slice';
import { triggerGetAllForums } from '../Features/forums/forums_slice';

const Dashboard = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUserProfileById } = useSelector((state) => state.users);

  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [from, setFrom] = useState('');
  useEffect(() => {
    const data = { queryParams: { userId: param?.id } };
    dispatch(triggerGetUserProfileById(data));
    const data2 = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data2));
  }, [param?.id]);

  useEffect(() => {
    if (getUserProfileById.status === 'successful') {
      const data = {
        queryParams: {
          userId: getUserProfileById.data?.userId,
          pageNumber,
          pageSize,
        },
      };
      dispatch(triggerGetAllPostsByUserId(data));
    }
  }, [getUserProfileById]);

  return (
    <div className='user-dashboard'>
      <div className='container'>
        <div>
          <button onClick={() => navigate(-1)}>
            <Icon icon='arrowLeft' />
          </button>
        </div>
        <div className='row mt-5'>
          <div className='col-lg-9 col-12'>
            <ProfileBanner
              data={getUserProfileById}
              from={from}
              setFrom={setFrom}
            />
            {/* show mobile */}
            <div className='dashboard-card d-lg-none'>
              <div className='row gap-md-0 gap-3'>
                <div className='col-md' onClick={() => navigate('/settings')}>
                  <div className='other-pages-btn mb-0'>
                    <div>settings</div>
                    <Icon icon='chevronRightBig' />
                  </div>
                </div>
                <div className='col-md'>
                  <div className='other-pages-btn mb-0'>
                    <div>Event Tickets</div>
                    <Icon icon='chevronRightBig' />
                  </div>
                </div>
              </div>
            </div>
            <BioCard data={getUserProfileById} />
            <SocialLinksCard data={getUserProfileById} />
            {/* show mobile */}
            <div className='dashboard-card d-lg-none'>
              <Member from={from} setFrom={setFrom} />
            </div>
            <Group />
            <Resources />
            <Posts />
          </div>
          {/* show desktop */}
          <div className='col-lg-3 d-lg-block d-none'>
            <Link className='' to='#'>
              <div
                className='other-pages-btn'
                onClick={() => navigate('/settings')}
              >
                <div>settings</div>
                <Icon icon='chevronRightBig' />
              </div>
            </Link>
            <Link to='#'>
              <div className='other-pages-btn'>
                <div>Event Tickets</div>
                <Icon icon='chevronRightBig' />
              </div>
            </Link>
            <Member from={from} setFrom={setFrom} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
