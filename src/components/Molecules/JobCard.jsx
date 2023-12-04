import { useDispatch, useSelector } from 'react-redux';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';
import google from '../../../src/assets/images/google.svg';
import moment from 'moment';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { triggerSaveJob } from '../../Features/jobs/jobs_slice';
import { useEffect, useRef, useState } from 'react';
const JobCard = ({ job, jobSelected, setJobSelected, setShowJobInfo }) => {
  const { getAllJobs } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const [getAllJobsLocal, setGetAllJobsLocal] = useState([]);
  useEffect(() => {
    if (getAllJobs?.status === 'successful') {
      setGetAllJobsLocal([...getAllJobs.data?.jobs]);
    }
  }, [getAllJobs?.status]);
  // const handleSaveUnsaveJob = () => {
  //   dispatch(triggerSaveJob(job.id));
  // };
  console.log(job.jobId);

  // save unsave job
  const [activeJob, setActiveJob] = useState('');
  const [saveCurrentJob, setSaveCurrentJob] = useState(
    job?.isSavedByCurrentUser
  );
  const timeoutIdRef2 = useRef(null);
  const handleSaveUnsaveJob = () => {
    setActiveJob(job);
    const startTimeout = () => {
      timeoutIdRef2.current = setTimeout(() => {
        // const data = { queryParams: { postId: post.postId } };
        if (!saveCurrentJob) {
          dispatch(triggerSaveJob(job.jobId));
        } else {
          dispatch(triggerSaveJob(job.jobId));
        }
      }, 3000);
    };
    const clearTimeoutIfNeeded = () => {
      if (timeoutIdRef2.current) {
        clearTimeout(timeoutIdRef2.current);
      }
    };
    clearTimeoutIfNeeded();
    startTimeout();
    setSaveCurrentJob(!saveCurrentJob);
  };
  useEffect(() => {
    const data = [...getAllJobs];
    // const data = _.cloneDeep(getAllPostsLocal);
    if (activeJob) {
      if (saveCurrentJob) {
        data?.forEach((item) => {
          if (item.postId === activeJob.postId) {
            item.isSavedByCurrentUser = true;
          }
        });
      } else {
        data?.forEach((item) => {
          if (item.postId === activeJob.postId) {
            item.isSavedByCurrentUser = false;
          }
        });
      }
      setGetAllJobsLocal(data);
    }
  }, [saveCurrentJob]);
  return (
    <div
      className={`job-card-component ${
        job.jobId === jobSelected.jobId && 'selected-job'
      }`}
      onClick={() => {
        setShowJobInfo(true);
        setJobSelected(
          getAllJobs?.data?.jobs?.find((item) => item.jobId === job.jobId)
        );
      }}
    >
      <div className='img-con'>
        <img src={google} alt='' className='' />
      </div>
      <div className='info'>
        <h5 className='role'>{job.jobTitle}</h5>
        <h5 className='company'>{job.company}</h5>
        <p className='location'>{job.location}</p>
        <div className='salary-type'>
          <div className='salary'>
            <Icon icon='money' />
            <div className='amount'>
              <h5 className='currency'>{job.currency}</h5>
              <h5 className='price'>{Number(job.salary).toLocaleString()}</h5>
            </div>
          </div>
          <div className='type'>
            <Icon icon='box' />
            <h5 className=''>{job.jobType}</h5>
          </div>
        </div>
        <h5 className='just-posted'>{moment(job?.datePosted).fromNow()}</h5>
      </div>
      <button className='save-icon center' onClick={handleSaveUnsaveJob}>
        {job?.isSavedByCurrentUser ? (
          <FaBookmark className='active' />
        ) : (
          <FaRegBookmark />
        )}
      </button>
    </div>
  );
};

export default JobCard;
