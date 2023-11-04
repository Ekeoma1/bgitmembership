import React, { useEffect, useState } from 'react';
import SearchBox from '../components/Molecules/SearchBox';
import google from '../../src/assets/images/google.svg';
import Icon from '../components/Icon';
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { VscSettings } from 'react-icons/vsc';
import useWindowSize from '../hooks/useWindowSize';
import '../../src/assets/scss/jobBoard.scss';
import JobInfoCard from '../components/Molecules/JobInfoCard';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllJobs } from '../Features/jobs/jobs_slice';
import JobCard from '../components/Molecules/JobCard';
import Apply from '../components/Job-Board/Apply';
import { triggerGetMyProfile } from '../Features/users/users_slice';
import JobCardsLoader from '../components/Atoms/skeleton-loaders/job-board-page/JobCardsLoader';
import FilterBoard from '../components/Job-Board/FilterBoard';

const JobBoard = () => {
  const { isMobile } = useWindowSize();
  const [filterData, setFilterData] = useState({});
  const { getAllJobs } = useSelector((state) => state.jobs);
  const { getMyProfile } = useSelector((state) => state.users);
  const [searchValue, setSearchValue] = useState('');
  const [showJobInfo, setShowJobInfo] = useState(false);
  const [jobSelected, setJobSelected] = useState({});
  const [filter, setFilter] = useState(false);
  const [apply, setApply] = useState(false);
  const [mobileTab, setMobileTab] = useState('for you');
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const jobsData = [
    {
      id: 1,
      role: 'UX Designer',
      company: 'Google',
      location: 'London (Hybrid)',
      currency: '$',
      price: '45000',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Applied 2 days ago',
    },
    {
      id: 2,
      role: 'Data Analyst',
      company: 'Google',
      location: 'London (Hybrid)',
      currency: '$',
      price: '29500',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Posted 2 days ago',
    },
    {
      id: 3,
      role: 'Software Engineer',
      company: 'Apple',
      location: 'Berlin (Hybrid)',
      currency: '$',
      price: '55500',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Application closed',
    },
    {
      id: 4,
      role: 'Cyber security',
      company: 'Amazon',
      location: 'Paris (Hybrid)',
      currency: '$',
      price: '60000',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Posted 2 days',
    },
    {
      id: 5,
      role: 'Cyber security',
      company: 'Amazon',
      location: 'Paris (Hybrid)',
      currency: '$',
      price: '60000',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Posted 2 days',
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(triggerGetAllJobs());
    dispatch(triggerGetMyProfile());
  }, []);
  console.log('filterdata', filterData);

  return (
    <div className='job-board-wrapper'>
      <div className='search-box-section mx-auto'>
        <div className='search-box-component-wrapper'>
          <SearchBox
            onChange={onChange}
            value={searchValue}
            placeholder='Search'
          />
        </div>
        <button
          onClick={() => {
            setFilter(!filter);
            setShowJobInfo(false);
            // if (isMobile) {
            // }
          }}
          type='submit'
          className='primary-btn small-btn  filter-btn'
        >
          <VscSettings />
          Filter
          <HiOutlineChevronDown />
        </button>
      </div>
      {!filter && (
        <div className='tab-btns'>
          <button
            onClick={() => setMobileTab('for you')}
            className={`${mobileTab === 'for you' ? 'active' : 'inactive'}`}
          >
            For you
          </button>
          <button
            onClick={() => {
              setMobileTab('saved jobs');
              setShowJobInfo(false);
            }}
            className={`${mobileTab === 'saved jobs' ? 'active' : 'inactive'}`}
          >
            Saved Jobs
          </button>
        </div>
      )}
      {!apply && (
        <div className='main-section'>
          <div
            className={`recommended-filters-section ${
              isMobile && showJobInfo && 'hide'
            } ${filter && 'recommended-filters-section2'}`}
          >
            {!filter && (
              <div className='recommended'>
                <div className='section-title'>
                  <h5>Recommended for you</h5>
                  {mobileTab === 'for you' && (
                    <p className='show-mobile'>Jobs based on your interest</p>
                  )}
                </div>
                <div
                  className={` cards ${
                    isMobile
                      ? mobileTab === 'for you'
                        ? ' show '
                        : 'hide'
                      : ''
                  } 
                  `}
                >
                  {getAllJobs.status === 'loading' ? (
                    <>
                      <JobCardsLoader />
                    </>
                  ) : getAllJobs.status === 'successful' ? (
                    <>
                      {getAllJobs?.data?.jobs?.length === 0 ? (
                        <></>
                      ) : (
                        <>
                          {getAllJobs?.data?.jobs?.map((job, index) => (
                            <JobCard
                              key={index}
                              job={job}
                              jobSelected={jobSelected}
                              setJobSelected={setJobSelected}
                              setShowJobInfo={setShowJobInfo}
                            />
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
            {filter && (
              <div className='filters'>
                <div className='arrow' onClick={() => setFilter(false)}>
                  <div className='hide-mobile'>
                    <Icon icon={'arrowLeft'} />
                  </div>
                  <div className='show-mobile'>
                    {/* <Icon icon={'chevronLeft'} /> */}
                    <HiOutlineChevronLeft />
                    <h5 className=''>filters</h5>
                  </div>
                </div>
                <FilterBoard setFilter={setFilter} setFilterData={setFilterData}/>
              </div>
            )}
          </div>
          <div
            className={`saved-jobs-job-info-section ${
              filter && 'saved-jobs-job-info-section2'
            }`}
          >
            {!showJobInfo && (
              <div
                className={` saved-jobs-section ${
                  filter && 'saved-jobs-section2 '
                }  ${
                  isMobile
                    ? mobileTab === 'saved jobs'
                      ? ' show '
                      : 'hide'
                    : ''
                } `}
              >
                <div className='section-title'>
                  <h5>saved jobs</h5>
                </div>
                <div className='saved-jobs'>
                  {jobsData.map((item, index) => (
                    <div key={index} className='saved-job'>
                      <div className='img-con'>
                        <img src={google} alt='company' className='' />
                      </div>
                      <div className='info'>
                        <div className='details'>
                          <div className=''>
                            <h5 className=''>{item.role}</h5>
                            <p className='company'>{item.company}</p>
                            <p className='location'>{item.location}</p>
                          </div>
                          <span className='status'>{item.status}</span>
                        </div>
                        <div className='btn-con'>
                          <HiOutlineChevronRight />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='saved-job'>
                    <div className='img-con'>
                      <img src={google} alt='company' className='' />
                    </div>
                    <div className='info'>
                      <div className='details'>
                        <div className=''>
                          <h5 className=''>Data Analyst </h5>
                          <p className='company'>Google</p>
                          <p className='location'>London (Hybrid)</p>
                        </div>
                        <span className='status'>Applied 2 days ago</span>
                      </div>
                      <div className='btn-con'>
                        <HiOutlineChevronRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showJobInfo && (
              <JobInfoCard
                jobSelected={jobSelected}
                setShowJobInfo={setShowJobInfo}
                setApply={setApply}
                setJobSelected={setJobSelected}
              />
            )}
          </div>
        </div>
      )}
      {apply && <Apply setApply={setApply} jobSelected={jobSelected} />}
    </div>
  );
};

export default JobBoard;
