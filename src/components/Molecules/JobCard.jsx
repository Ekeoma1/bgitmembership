import { useSelector } from 'react-redux';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';
import google from '../../../src/assets/images/google.svg';
import moment from 'moment';
const JobCard = ({
  job,
  jobSelected,
  setJobSelected,
  setShowJobInfo,
}) => {
  const { getAllJobs } = useSelector((state) => state.jobs);
  // console.log(job.jobId);
  return (
    <div
      className={`job-card ${
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
      <div className='tag'>
        <Icon icon={'tag'} />
      </div>
    </div>
  );
};

export default JobCard;
