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
import {
  resetSaveJob,
  resetUnsaveJob,
  triggerGetAllJobs,
  triggerGetSavedJobs,
} from '../Features/jobs/jobs_slice';
import JobCard from '../components/Molecules/JobCard';
import Apply from '../components/Job-Board/Apply';
import { triggerGetMyProfile } from '../Features/users/users_slice';
import JobCardsLoader from '../components/Atoms/skeleton-loaders/job-board-page/JobCardsLoader';
import FilterBoard from '../components/Job-Board/FilterBoard';
import moment from 'moment';
import { renderToast } from '../components/Molecules/CustomToastify';

const JobBoard = () => {
  const { isMobile } = useWindowSize();
  const [filterData, setFilterData] = useState({});
  const { getAllJobs, getSavedJobs, saveJob, unsaveJob } = useSelector(
    (state) => state.jobs
  );
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [apply]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(triggerGetAllJobs());
    dispatch(triggerGetSavedJobs());
    dispatch(triggerGetMyProfile());
  }, []);
  const [getAllJobsLocal, setGetAllJobsLocal] = useState([]);
  useEffect(() => {
    if (getAllJobs?.status === 'successful') {
      setGetAllJobsLocal([...getAllJobs.data?.jobs]);
    }
  }, [getAllJobs?.status]);

  useEffect(() => {
    if (saveJob.status === 'successful' && saveJob.data) {
      renderToast({
        status: 'success',
        message: 'Job Saved',
      });
      dispatch(resetSaveJob());
    }
    if (unsaveJob.status === 'successful' && unsaveJob.data) {
      renderToast({
        status: 'success',
        message: 'Job Unsaved',
      });
      dispatch(resetUnsaveJob());
    }
  }, [saveJob, unsaveJob]);

  // console.log('getSavedJobs', getSavedJobs);
  console.log('jobselected', jobSelected);

  return (
    <div className='job-board-wrapper'>
      {/* {!apply && (
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
      )} */}
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
                      {getAllJobsLocal.length === 0 ? (
                        <></>
                      ) : (
                        <>
                          {getAllJobsLocal.map((job, index) => (
                            <JobCard
                              key={index}
                              job={job}
                              jobSelected={jobSelected}
                              setJobSelected={setJobSelected}
                              setShowJobInfo={setShowJobInfo}
                              getAllJobsLocal={getAllJobsLocal}
                              setGetAllJobsLocal={setGetAllJobsLocal}
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
                <FilterBoard
                  setFilter={setFilter}
                  setFilterData={setFilterData}
                />
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
                  {getSavedJobs.status === 'base' ||
                  getSavedJobs.status === 'loading' ? (
                    <>
                      <JobCardsLoader />
                    </>
                  ) : getSavedJobs.status === 'successful' ? (
                    <>
                      {getSavedJobs.data?.jobs.length === 0 ? (
                        <p>No saved jobs</p>
                      ) : (
                        <>
                          {getSavedJobs.data?.jobs?.map((item, index) => (
                            <div
                              key={index}
                              className={`saved-job ${
                                !item.job?.isClosed &&
                                !item?.job?.hasApplied &&
                                'view'
                              }`}
                              onClick={() => {
                                if (
                                  !item.job?.isClosed &&
                                  !item?.job?.hasApplied
                                ) {
                                  setApply(true);
                                  setJobSelected(item);
                                }
                              }}
                            >
                              <div className='img-con'>
                                <img
                                  src={item.companyDetails.logoUrl}
                                  alt='company'
                                  className=''
                                />
                              </div>
                              <div className='info'>
                                <div className='details'>
                                  <div className=''>
                                    <h5 className=''>{item.job.jobTitle}</h5>
                                    <p className='company'>
                                      {item.job.company}
                                    </p>
                                    <div className='location-wrapper'>
                                      <p className='location'>
                                        {item.job.location}
                                      </p>
                                      <p className='location'>
                                        ({item.job.workPlacePolicy})
                                      </p>
                                    </div>
                                  </div>
                                  <span
                                    className={`status ${
                                      item.job?.isClosed && 'closed'
                                    }`}
                                  >
                                    {item.job?.isClosed
                                      ? 'Application closed'
                                      : item.job?.dateApplied
                                      ? `Applied ${moment(
                                          item?.job?.dateApplied
                                        ).fromNow()}`
                                      : `Posted ${moment(
                                          item?.job?.datePosted
                                        ).fromNow()}`}
                                  </span>
                                </div>
                                <div className='btn-con'>
                                  <HiOutlineChevronRight />
                                </div>
                              </div>
                            </div>
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
            {showJobInfo && (
              <JobInfoCard
                jobSelected={jobSelected}
                setShowJobInfo={setShowJobInfo}
                setApply={setApply}
                setJobSelected={setJobSelected}
                getAllJobsLocal={getAllJobsLocal}
                setGetAllJobsLocal={setGetAllJobsLocal}
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
