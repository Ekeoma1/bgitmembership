import React, { useEffect, useState } from 'react';
import Image from '../../assets/images/author1.png';
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import { triggerGetUsers } from '../../Features/users/users_slice';
import { useDispatch, useSelector } from 'react-redux';
import ForumCardsLoader from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { FaUserTimes } from 'react-icons/fa';
import { renderToast } from '../Molecules/CustomToastify';
import {
  resetCancelConnectionRequest,
  resetSendConnectionRequest,
  triggerCancelConnectionRequest,
  triggerSendConnectionRequest,
} from '../../Features/connections/connections_slice';

const memberData = [
  {
    name: 'Jane Smith',
    role: 'UX Engineer',
    location: 'Birmingham, UK',
    img: Image,
  },

  {
    name: 'Celia Dekunle',
    role: 'UX/UI Learner',
    location: 'London, UK',
    img: Image,
  },

  {
    name: 'Nneka Ugwu',
    role: 'UX Intern',
    location: 'Dublin Ireland',
    img: Image,
  },
  {
    name: 'Alisha Akossa',
    role: 'Service Designer',
    location: 'Los angeles, US',
    img: Image,
  },
];

const Member = ({ from, setFrom }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUsers } = useSelector((state) => state.users);
  const { sendConnectionRequest, cancelConnectionRequest } = useSelector(
    (state) => state.connections
  );
  const [numberOfUsersToDisplay, setNumberOfUsersToDisplay] = useState(4);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [activeUser, setActiveUser] = useState({});

  const handleClick = (e, user) => {
    setFrom('member');
    setActiveUser(user);
    const values = { receiverUserId: user?.userId };
    if (e.target.closest('.send-connection')) {
      dispatch(triggerSendConnectionRequest(values));
    } else if (e.target.closest('.cancel-connection')) {
      dispatch(triggerCancelConnectionRequest(values));
    } else {
      navigate(`/users/${user?.userId}`);
    }
  };

  const [getUsersLocal, setGetUsersLocal] = useState([]);
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetUsers(data));
  }, []);
  useEffect(() => {
    if (getUsers.status === 'successful') {
      setGetUsersLocal(
        getUsers.data?.users.filter(
          (item) => item.connectionStatus !== 'Connected'
        )
      );
    }
  }, [getUsers.status]);
  useEffect(() => {
    const data = _.cloneDeep(getUsersLocal);
    const setBactToDefault = () => {
      data.forEach((item) => {
        if (item.userId === activeUser.userId) {
          delete item.requestStatus;
        }
      });
      setGetUsersLocal(data);
      setActiveUser({});
    };
    // send connection request
    if (sendConnectionRequest.status === 'loading') {
      data?.forEach((item) => {
        if (item.userId === activeUser.userId) {
          item.requestStatus = 'loading';
        }
      });
      setGetUsersLocal(data);
    } else if (sendConnectionRequest.status === 'successful') {
      if (sendConnectionRequest.data.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
      } else if (sendConnectionRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection request sent successfully',
        });
        data?.forEach((item) => {
          if (item.userId === activeUser.userId) {
            item.connectionStatus = 'Pending';
          }
        });
        setGetUsersLocal(data);
      }
      dispatch(resetSendConnectionRequest());
      setBactToDefault();
    } else if (sendConnectionRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetSendConnectionRequest());
      setBactToDefault();
    }

    // cancel Join forum request
    if (cancelConnectionRequest.status === 'loading') {
      data.forEach((item) => {
        if (item.userId === activeUser.userId) {
          item.requestStatus = 'loading';
        }
      });
      setGetUsersLocal(data);
    } else if (cancelConnectionRequest.status === 'successful') {
      if (cancelConnectionRequest.data?.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection request canceled successfully.',
        });
        data.forEach((item) => {
          if (item.userId === activeUser.userId) {
            item.connectionStatus = 'Not Connected';
          }
        });
        setGetUsersLocal(data);
      }
      dispatch(resetCancelConnectionRequest());
      setBactToDefault();
    } else if (cancelConnectionRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetCancelConnectionRequest());
      setBactToDefault();
    }
  }, [sendConnectionRequest.status, cancelConnectionRequest.status]);
  // console.log('get users', getUsers);
  // console.log('get usersLocal', getUsersLocal);
  // console.log('activeuser', activeUser);
  return (
    <div className='members-you-may-know-wrapper'>
      <div className='header text-center'>Members you may know</div>
      <div className='member-card-wrapper'>
        <div className='row'>
          {getUsers.status === 'loading' ? (
            <div className='loading-state'>
              <ForumCardsLoader />
            </div>
          ) : getUsers.status === 'successful' ? (
            <>
              {getUsersLocal.filter.length === 0 ? (
                <p>No members...</p>
              ) : (
                <>
                  {getUsersLocal

                    ?.slice(0, numberOfUsersToDisplay)
                    .map((user, key) => {
                      return (
                        <div
                          key={key}
                          className='col-lg-12 col-md-6 '
                          onClick={(e) => handleClick(e, user)}
                        >
                          <div className='member-card mt-3 mx-auto'>
                            <div className='d-flex flex-wrap gap-3 details'>
                              <div
                                style={{
                                  backgroundImage: `url(${user.imageUrl})`,
                                }}
                                className='member-img'
                              ></div>
                              <div>
                                <div className='name'>{`${user.firstName} ${user.secondName}`}</div>
                                <div className='other-data'>
                                  {user.profession}
                                </div>
                                <div className='other-data'>{`${user.city}, ${user.country}`}</div>
                              </div>
                            </div>
                            <div className='text-center mt-3 btn-con'>
                              {user.requestStatus === 'loading' ? (
                                <button className='sec-btn connect-btn send-connection'>
                                  Loading...
                                </button>
                              ) : (
                                <>
                                  {user.connectionStatus === 'Not Connected' ? (
                                    <button className='sec-btn connect-btn send-connection'>
                                      + Connect
                                    </button>
                                  ) : user.connectionStatus === 'Pending' ? (
                                    <button className='sec-btn connect-btn cancel-connection'>
                                      <FaUserTimes /> Cancel Request
                                    </button>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        className='text-center mt-3 d-lg-block d-none'
        onClick={() => setNumberOfUsersToDisplay((prevState) => prevState + 2)}
      >
        <Link className='see-more-btn' to='#'>
          See More
        </Link>
      </div>
    </div>
  );
};

export default Member;
