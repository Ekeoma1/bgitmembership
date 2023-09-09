import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';
import { HiArrowLeft } from 'react-icons/hi';

import SearchBox from '../Molecules/SearchBox';
import FilterBtn from '../Molecules/FilterBtn';
import MainButton from '../Molecules/MainButton';
import FilterBtn2 from '../Molecules/FilterBtn2';
import { useNavigate } from 'react-router-dom';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import forumImg2 from '../../../src/assets/images/forumcard2.svg';
import forumImg3 from '../../../src/assets/images/forumcard3.svg';
import forumImg4 from '../../../src/assets/images/forumcard4.svg';
import ForumCard from '../Molecules/ForumCard';
import EmptyState from '../Molecules/EmptyState';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const AllForums = ({ setSearchMain }) => {
  const navigate = useNavigate();
  const communities = [
    {
      community_img: forumImg1,
      community_name: 'UX/UI Design',
      info: 'Dorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg2,
      community_name: 'Engineer Girls',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg3,
      community_name: 'Data Babes 😍👩🏾‍💻',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg4,
      community_name: 'Data Babes 😍👩🏾‍💻',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg1,
      community_name: 'Data Babes 😍👩🏾‍💻',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg1,
      community_name: 'Data Babes 😍👩🏾‍💻',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg1,
      community_name: 'Data Babes 😍👩🏾‍💻',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
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
  const [dispatchSearch, setDispatchSearch] = useState(false);
  const [searchedCommunities, setSearchedCommunities] = useState([]);
  const [showSearchEmptyState, setShowSearchEmptyState] = useState(false);

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = () => {
    // console.log('search', searchValue);
  };
  useEffect(() => {
    if (dispatchSearch) {
      handleSearch();
      console.log('search', searchValue);
    }
    if (searchValue) {
      let communitiesTemp = [...communities];
      communitiesTemp = communitiesTemp.filter((item) =>
        item.community_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchedCommunities(communitiesTemp);
      setSearch(true);
      setSearchMain(true);
      if (communitiesTemp.length === 0) {
        setShowSearchEmptyState(true);
      } else {
        setShowSearchEmptyState(false);
      }
    } else {
      setSearch(false);
      setSearchMain(false);
    }
    handleSearch();
  }, [dispatchSearch, searchValue]);
  // console.log('empty', showSearchEmptyState);
  // console.log('empty', showSearchEmptyState);
  return (
    <div className='all-forums-section'>
      <div className='container'>
        <div className='page-title-wrapper'>
          <div className='title-wrapper'>
            <div className='icon' onClick={() => navigate('/community-forums')}>
              <HiArrowLeft className='text-color' />
            </div>
            <h3 className='text-color'>All forums</h3>
          </div>
        </div>
        <div className={`search-box-section mx-auto ${search && 'search'}`}>
          <div className='search-box-component-wrapper'>
            <SearchBox
              onChange={onChange}
              value={searchValue}
              placeholder='Search posts'
              enterKeyPressed={() => setDispatchSearch(true)}
              otherKeysPressed={() => setDispatchSearch(false)}
            />
          </div>
          <div className='btn'>
            <MainButton onClick={handleSearch} size={'small'} text={'search'} />
          </div>
        </div>
        {!search && (
          <div className={`filter ${showFilterBoxSection && 'filter2'}`}>
            <div className='filter-btn'>
              <FilterBtn onClick={() => setShowFilterBoxSection(true)} />
            </div>
            <div className='filter-btn-mobile'>
              <FilterBtn2 onClick={() => setShowFilterBoxSection(true)} />
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
                  text={'apply filters'}
                  onClick={() => {
                    setShowFilterBoxSection(false);
                  }}
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
