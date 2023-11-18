import React, { useEffect, useState } from 'react';
import Image from '../../assets/images/author1.png';
import { Link, useNavigate } from 'react-router-dom';
import { triggerGetUsers } from '../../Features/users/users_slice';
import { useDispatch, useSelector } from 'react-redux';
import ForumCardsLoader from '../Atoms/skeleton-loaders/ForumCardsLoader';

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

const Member = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUsers } = useSelector((state) => state.users);
  const [numberOfUsersToDisplay, setNumberOfUsersToDisplay] = useState(4);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);

  const handleClick = (e, user) => {
    console.log(e.target.classList);
    if (e.target.classList.contains('connect-btn')) {
      console.log('connect r');
    } else {
      console.log('navigate');
      navigate(`/other-users/${user?.userId}`);
    }
  };

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetUsers(data));
  }, []);
  // console.log('get users', getUsers);
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
              {getUsers.data?.users?.length === 0 ? (
                <p>No members...</p>
              ) : (
                <>
                  {getUsers?.data?.users
                    ?.slice(0, numberOfUsersToDisplay - 1)
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

                            <div className='text-center mt-3 '>
                              <button className='sec-btn connect-btn'>
                                + Connect
                              </button>
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
        onClick={() => setNumberOfUsersToDisplay((prevState) => prevState + 4)}
      >
        <Link className='see-more-btn' to='#'>
          See More
        </Link>
      </div>
    </div>
  );
};

export default Member;
