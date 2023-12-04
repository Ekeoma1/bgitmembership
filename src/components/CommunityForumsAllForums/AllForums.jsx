/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/communityForumsAllForums.scss';
import { HiArrowLeft } from 'react-icons/hi';

import SearchBox from '../Molecules/SearchBox';
import FilterBtn from '../Molecules/FilterBtn';
import MainButton from '../Molecules/MainButton';
import FilterBtn2 from '../Molecules/FilterBtn2';
import { useNavigate } from 'react-router-dom';
import ForumCard from '../Molecules/ForumCard';
import EmptyState from '../Molecules/EmptyState';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import OutsideClickHandler from 'react-outside-click-handler';
import defaultForum from '../../../src/assets/images/forumDefault.svg';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllForums } from '../../Features/forums/forums_slice';

const AllForums = ({ setSearchMain }) => {
  const dispatch = useDispatch();
  const { getUsers } = useSelector((state) => state.users);
  const { getAllForums } = useSelector((state) => state.forums);
  const navigate = useNavigate();
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2.4,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1.4,
    },
  };
  const [showFilterBoxSection, setShowFilterBoxSection] = useState(false);
  const [filterData, setFilterData] = useState({
    sort_by: '',
    ui_ux_design: false,
    data_engineering: false,
    software_development: false,
    data_analytics: false,
    uk: false,
    europe: false,
    africa: false,
    asia: false,
    americas: false,
  });
  const handleFilterOnchange = (e) => {
    if (e.target.type === 'radio') {
      setFilterData({ ...filterData, [e.target.name]: e.target.value });
    } else if (e.target.type === 'checkbox') {
      setFilterData({ ...filterData, [e.target.name]: e.target.checked });
    }
  };
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchedCommunities, setSearchedCommunities] = useState([]);
  const [showSearchEmptyState, setShowSearchEmptyState] = useState(false);

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = () => {
    // console.log("search", searchValue);
  };
  const handleFilterBoxSearch = () => {
    setShowFilterBoxSection(false);
    // console.log("filterData", filterData);
  };
  // console.log('empty', showSearchEmptyState);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedForums, setSearchedForums] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const data2 = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data2));
  }, []);
  useEffect(() => {
    if (searchTerm) {
      setShowSearchModal(true);
      // const users = [...getUsers.data?.users];
      // const searchedUsers = users
      //   ?.filter(
      //     (user) =>
      //       user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //       user.secondName.toLowerCase().includes(searchTerm.toLowerCase())
      //   )
      //   .slice(0, 3);
      // setSearchedUsers(searchedUsers);
      const forums = [...getAllForums.data];
      console.log('forums', forums);
      const searchedForums = forums
        ?.filter(
          (forum) =>
            forum.forumName.toLowerCase().includes(searchTerm.toLowerCase())
          // forum.secondName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3);
      setSearchedForums(searchedForums);
    } else {
      setShowSearchModal(false);
    }
  }, [searchTerm]);
  console.log('searchterm', searchTerm);
  return (
    <div className='all-forums-section'>
      <div className='container'>
        <div className='page-title-wrapper'>
          <div className='title-wrapper'>
            <div className='icon' onClick={() => navigate('/forums')}>
              <HiArrowLeft className='text-color22' />
            </div>
            <h3 className='text-color22'>All forums</h3>
          </div>
        </div>
        <div className={`search-box-section mx-auto ${search && 'search'}`}>
          <div className='search-box-component-wrapper'>
            <SearchBox
              onChange={handleChange}
              value={searchTerm}
              placeholder='Search forums'
              height={'4.2rem'}
              // enterKeyPressed={() => setDispatchSearch(true)}
              // otherKeysPressed={() => setDispatchSearch(false)}
            />
            {showSearchModal && (
              <OutsideClickHandler
                onOutsideClick={() => {
                  setShowSearchModal(false);
                }}
              >
                <div className='search-modal-con shadow-sm'>
                  {searchedUsers.length > 0 && (
                    <div className='people'>
                      <h5 className='title'>People</h5>
                      <div className='users'>
                        {searchedUsers.map((user, index) => (
                          <div
                            onClick={() => navigate(`/users/${user.userId}`)}
                            className='user-con'
                            key={index}
                          >
                            <img src={user.imageUrl} alt='' className='' />
                            <div className='wrapper'>
                              <div className='info'>
                                <div className='name'>{`${user.firstName} ${user.secondName}`}</div>
                                <div className='role'>{user.profession}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {searchedForums.length > 0 && (
                    <div className='forums'>
                      <h5 className='title'>Forums</h5>
                      <div className='users'>
                        {searchedForums.map((forum, index) => (
                          <div
                            key={index}
                            className='user-con'
                            onClick={() => navigate(`/forums/${forum.forumId}`)}
                          >
                            <img
                              src={forum.forumImageUrl ?? defaultForum}
                              alt=''
                              className=''
                            />
                            <div className='wrapper'>
                              <div className='info'>
                                <div className='name'>{forum.forumName}</div>
                                <div className='role'>
                                  {forum.userCount} Members
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {searchedUsers.length == 0 && searchedForums.length === 0 && (
                    <p>No results found...</p>
                  )}
                </div>
              </OutsideClickHandler>
            )}
          </div>
          <div className='btn'>
            <MainButton onClick={handleSearch} size={'small'} text={'search'} />
          </div>
        </div>
        {!search && (
          <div className={`filter ${showFilterBoxSection && 'filter2'}`}>
            <div className='filter-btn'>
              <FilterBtn
                onClick={() => setShowFilterBoxSection(!showFilterBoxSection)}
              />
            </div>
            <div className='filter-btn-mobile'>
              <FilterBtn2
                onClick={() => setShowFilterBoxSection(!showFilterBoxSection)}
              />
            </div>
          </div>
        )}
        {showFilterBoxSection && (
          <div className='filter-box-wrapper'>
            <div className='filter-box'>
              <div className='box-content'>
                <div className='group group-1'>
                  <h5>Sort by</h5>
                  <div className='input-wrapper'>
                    <input
                      type='radio'
                      className=''
                      value='newest forums'
                      name='sort_by'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>Newest Forums</p>
                  </div>
                  <div className='input-wrapper'>
                    <input
                      type='radio'
                      className=''
                      value='older forums'
                      name='sort_by'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>Older Forums</p>
                  </div>
                </div>
                <div className='group group-2'>
                  <h5>Industry</h5>
                  <div className='input-wrapper'>
                    <input
                      type='checkbox'
                      className=''
                      name='ui_ux_design'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>UX/UI Design</p>
                  </div>
                  <div className='input-wrapper'>
                    <input
                      type='checkbox'
                      className=''
                      name='data_engineering'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>Data Engineering</p>
                  </div>
                  <div className='input-wrapper'>
                    <input
                      type='checkbox'
                      className=''
                      name='software_development'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>Software Development</p>
                  </div>
                  <div className='input-wrapper'>
                    <input
                      type='checkbox'
                      className=''
                      name='data_analytics'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>Data Analytics</p>
                  </div>
                </div>
                <div className='group group-3'>
                  <h5>Location</h5>
                  <div className='input-wrapper'>
                    <input
                      type='checkbox'
                      className=''
                      name='uk'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>UK</p>
                  </div>
                  <div className='input-wrapper'>
                    <input
                      type='checkbox'
                      className=''
                      name='europe'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>Europe</p>
                  </div>
                  <div className='input-wrapper'>
                    <input
                      type='checkbox'
                      className=''
                      name='africa'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>Africa</p>
                  </div>
                  <div className='input-wrapper'>
                    <input
                      type='checkbox'
                      className=''
                      name='asia'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>Asia</p>
                  </div>
                  <div className='input-wrapper'>
                    <input
                      type='checkbox'
                      className=''
                      name='americas'
                      onChange={(e) => handleFilterOnchange(e)}
                    />
                    <p>Americas (North & South) </p>
                  </div>
                </div>
              </div>
              <div className='btn-wrapper'>
                <MainButton
                  text={'Apply filters'}
                  onClick={handleFilterBoxSearch}
                  size={'small'}
                />
              </div>
            </div>
          </div>
        )}
        {search && (
          <div className='search-results'>
            {showSearchEmptyState ? (
              <div className='empty-state-con'>
                <EmptyState
                  title={'No items match'}
                  info={'No communities found '}
                />
              </div>
            ) : (
              <>
                <div className='forums-cards-wrapper'>
                  <Carousel responsive={responsive}>
                    {searchedCommunities.map((forum, index) => (
                      <ForumCard forum={forum} key={index} />
                    ))}
                  </Carousel>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllForums;
