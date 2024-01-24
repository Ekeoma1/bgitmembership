import { useDispatch, useSelector } from 'react-redux';
import '../../assets/scss/molecules.scss';
import _ from 'lodash';
import Icon from '../Icon';
import google from '../../../src/assets/images/google.svg';
import moment from 'moment';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {
  triggerSaveJob,
  triggerUnSaveJob,
} from '../../Features/jobs/jobs_slice';
import { useEffect, useRef, useState } from 'react';
const JobCard = ({
  job,
  jobSelected,
  setJobSelected,
  setShowJobInfo,
  getAllJobsLocal,
  setGetAllJobsLocal,
}) => {
  const { getAllJobs } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  // save unsave job
  const [activeJob, setActiveJob] = useState('');
  const [saveCurrentJob, setSaveCurrentJob] = useState(job?.isSaved);
  const timeoutIdRef = useRef(null);
  const handleSaveUnsaveJob = () => {
    setActiveJob(job);
    const startTimeout = () => {
      timeoutIdRef.current = setTimeout(() => {
        // const data = { queryParams: { postId: post.postId } };
        if (!saveCurrentJob) {
          const data = { queryParams: { jobId: job.job.jobId } };
          dispatch(triggerSaveJob(data));
        } else {
          const data = { queryParams: { jobId: job.job.jobId } };
          dispatch(triggerUnSaveJob(data));
        }
      }, 3000);
    };
    const clearTimeoutIfNeeded = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
    clearTimeoutIfNeeded();
    startTimeout();
    setSaveCurrentJob(!saveCurrentJob);
  };
  useEffect(() => {
    const data = _.cloneDeep(getAllJobsLocal);
    if (activeJob) {
      if (saveCurrentJob) {
        data?.forEach((item) => {
          if (item.job.jobId === activeJob.job.jobId) {
            item.isSaved = true;
          }
        });
      } else {
        data?.forEach((item) => {
          if (item.job.jobId === activeJob.job.jobId) {
            item.isSaved = false;
          }
        });
      }
      setGetAllJobsLocal(data);
    }
  }, [saveCurrentJob]);

  return (
    <div
      className={`job-card-component ${
        job?.job?.jobId === jobSelected?.job?.jobId && 'selected-job'
      }`}
      onClick={() => {
        setShowJobInfo(true);
        setJobSelected(job);
      }}
    >
      <div className='img-con'>
        <img src={job.companyDetails.logoUrl ?? google} alt='' className='' />
      </div>
      <div className='info'>
        <div className='details'>
          <h5 className='role'>{job?.job?.jobTitle}</h5>
          <h5 className='company'>{job?.job?.company}</h5>
          <p className='location'>{job?.job?.location}</p>
          <div className='salary-type'>
            <div className='salary'>
              <div className='icon-con'>
                <Icon icon='money' />
              </div>
              <div className='amount'>
                <h5 className='currency'>
                  {job?.job?.salary?.match(/[^0-9]+/)
                    ? job?.job?.salary?.match(/[^0-9]+/)[0]
                    : '#'}
                </h5>
                <h5 className='price'>
                  {parseInt(
                    job?.job?.salary.match(/\d+/)[0],
                    10
                  ).toLocaleString()}
                </h5>
              </div>
            </div>
            <div className='type'>
              <div className='icon-con'>
                <Icon icon='box' />
              </div>
              <h5 className=''>{job?.job?.employmentType}</h5>
            </div>
          </div>
        </div>
        <h5 className='just-posted'>
          {moment(job?.job?.datePosted).fromNow()}
        </h5>
      </div>
      <button className='save-icon center' onClick={handleSaveUnsaveJob}>
        {job?.isSaved ? <FaBookmark size={20} className='active' /> : <FaRegBookmark size={20} />}
      </button>
    </div>
  );
};

export default JobCard;
