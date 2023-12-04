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
    console.log('local', getAllJobsLocal);
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
        setJobSelected(
          getAllJobs?.data?.jobs?.find((item) => item.jobId === job.jobId)
        );
      }}
    >
      <div className='img-con'>
        <img src={job.job.imageUrl ?? google} alt='' className='' />
      </div>
      <div className='info'>
        <h5 className='role'>{job?.job?.job?.jobTitle}</h5>
        <h5 className='company'>{job?.job?.company}</h5>
        <p className='location'>{job?.job?.location}</p>
        <div className='salary-type'>
          <div className='salary'>
            <Icon icon='money' />
            <div className='amount'>
              <h5 className='currency'>{job?.job?.currency}</h5>
              <h5 className='price'>
                {Number(job?.job?.salary).toLocaleString()}
              </h5>
            </div>
          </div>
          <div className='type'>
            <Icon icon='box' />
            <h5 className=''>{job?.job?.jobType}</h5>
          </div>
        </div>
        <h5 className='just-posted'>
          {moment(job?.job?.datePosted).fromNow()}
        </h5>
      </div>
      <button className='save-icon center' onClick={handleSaveUnsaveJob}>
        {job?.isSaved ? <FaBookmark className='active' /> : <FaRegBookmark />}
      </button>
    </div>
  );
};

export default JobCard;
